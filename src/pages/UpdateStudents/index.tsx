import React, { useState, useRef, useCallback, useEffect } from "react";
import { ScrollView, Alert } from "react-native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import { Feather } from "@expo/vector-icons";
import * as Yup from "yup";

import Header from "../../components/Header";
import {
  Container,
  FormContent,
  FormTitle,
  ErrorMessage,
  FormHeader,
} from "./styles";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import getValidationError from "../../utils/getValidationError";
import api from "../../services/api";
import putFirstLetterUperCase from "../../utils/putFirstLetterUperCase";
import { useRoute, useNavigation } from "@react-navigation/native";

interface Student {
  id: string;
  name: string;
  email: string;
  age: string;
  rg: number;
  cpf: number;
  phone: number;
  whatsapp?: number;
  gender: string;
  group_id: string;
}

const UpdateStudents: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { params } = useRoute();
  const { navigate } = useNavigation();
  const students = params as Student[];

  const [gender, setGender] = useState("");
  const [errorGender, setErrorGender] = useState(false);
  const [formHasError, setFormHasError] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(0);
  const [initialData, setInitialData] = useState<Student>(students[0]);

  useEffect(() => {
    setInitialData(students[selectedStudent]);
    setGender(students[selectedStudent].gender);
  }, [selectedStudent, students]);

  const handleSelectStudent = useCallback(
    (action: "up" | "down") => {
      if (action === "up") {
        if (students[selectedStudent + 1]) {
          setSelectedStudent((oldValue) => oldValue + 1);
        }
      } else {
        if (selectedStudent > 0) setSelectedStudent((oldValue) => oldValue - 1);
      }
    },
    [selectedStudent]
  );

  const handleSelectGender = useCallback((value: string) => {
    setGender(value);
  }, []);

  const handleSubmit = useCallback(
    async (data: Student) => {
      try {
        formRef.current?.setErrors({});
        setFormHasError(false);

        const schema = Yup.object().shape({
          age: Yup.number().required("Idade obrigatória"),
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail válido"),
          rg: Yup.string()
            .max(9, "No máximo 9 digitos")
            .min(9, "No mínimo 9 digitos")
            .required("RG obrigatório"),
          cpf: Yup.string()
            .max(11, "No máximo 11 digitos")
            .min(11, "No mínimo 11 digitos")
            .required("CPF obrigatório"),
          phone: Yup.string()
            .max(11, "DD mais 9 digitos")
            .min(11, "DD mais 9 digitos")
            .required("Telefone obrigatório"),
          whatsapp: Yup.string().notRequired(),
        });

        if (gender === "masculino" || gender === "feminino") {
          setErrorGender(false);
        } else {
          setErrorGender(true);
        }

        await schema.validate(data, {
          abortEarly: false,
        });

        const formateData = {
          ...data,
          gender,
        };

        const response = await api
          .put("students", formateData, {
            params: { student_id: students[selectedStudent].id },
          })
          .catch((err) => {
            Alert.alert("Erro no cadastro", err.response.data.message);
          });

        if (response) {
          Alert.alert(
            "Perfil atualizado",
            "As informações foram atualizadas com sucesso."
          );

          navigate("/Dashboard");
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);

          setFormHasError(true);

          return;
        }

        Alert.alert(
          "Erro no cadastro",
          "Ocorreu um erro ao fazer o cadastro, cheque as informações."
        );
      }
    },
    [gender, errorGender, students, selectedStudent]
  );

  return (
    <Container>
      <Header title="Informações dos alunos" />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      >
        <Form initialData={initialData} ref={formRef} onSubmit={handleSubmit}>
          <FormContent>
            <FormHeader>
              <Feather
                name="arrow-left"
                size={24}
                color={selectedStudent > 0 ? "#005678" : "#D8E2E5"}
                onPress={() => handleSelectStudent("down")}
              />
              <FormTitle>
                {putFirstLetterUperCase(students[selectedStudent].name)}
              </FormTitle>
              <Feather
                name="arrow-right"
                size={24}
                color={students[selectedStudent + 1] ? "#005678" : "#D8E2E5"}
                onPress={() => handleSelectStudent("up")}
              />
            </FormHeader>
            <Input name="age" placeholder="Idade" />
            <Input name="name" placeholder="Nome completo" />
            <Input name="email" placeholder="E-mail" />
            <Input name="cpf" placeholder="CPF" />
            <Input name="rg" placeholder="RG" />
            <Input name="phone" placeholder="Telefone" />
            <Input name="whatsapp" placeholder="WhatsApp" />
            <Select
              defaultValue={students[selectedStudent].gender}
              error={errorGender}
              handleSelect={handleSelectGender}
              items={[
                {
                  label: "Masculino",
                  value: "masculino",
                },
                {
                  label: "Feminino",
                  value: "feminino",
                },
              ]}
              placeholder="Sexo"
            />

            {formHasError ||
              (errorGender && (
                <ErrorMessage>
                  Ops, corrija os campos destacados e tente novamente
                </ErrorMessage>
              ))}

            <Button
              onPress={() => formRef.current?.submitForm()}
              color="secondary"
            >
              Atualizar dados
            </Button>
          </FormContent>
        </Form>
      </ScrollView>
    </Container>
  );
};

export default UpdateStudents;
