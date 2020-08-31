import React, { useState, useRef, useCallback, useEffect } from "react";
import { ScrollView, Platform, Alert } from "react-native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import { Fontisto, Feather } from "@expo/vector-icons";
import { format, getYear } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Yup from "yup";

import Header from "../../components/Header";
import {
  Container,
  FormContent,
  FormTitle,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  ErrorMessage,
  FormHeader,
} from "./styles";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import getValidationError from "../../utils/getValidationError";
import api from "../../services/api";
import putFirstLetterUperCase from "../../utils/putFirstLetterUperCase";
import { useRoute } from "@react-navigation/native";

interface Groups {
  label: string;
  value: string;
}

interface Student {
  name: string;
  email: string;
  age: number;
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
  const students = params as Student[];

  const [born, setBorn] = useState(new Date());
  const [gender, setGender] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorGender, setErrorGender] = useState(false);
  const [errorGroup, setErrorGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groups, setGroups] = useState<Groups[]>([]);
  const [formHasError, setFormHasError] = useState(false);
  const [bornError, setBornError] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(0);
  const [initialData, setInitialData] = useState<Student>(students[0]);

  useEffect(() => {
    api.get("groups/list", { params: { city: "" } }).then((response) => {
      const formatedGroups = response.data.map((group) => {
        return {
          label: putFirstLetterUperCase(group.color),
          value: group.id,
        };
      });

      setGroups(formatedGroups);
    });
  }, []);

  useEffect(() => {
    setInitialData(students[selectedStudent]);
    setGender(students[selectedStudent].gender);
    setSelectedGroup(students[selectedStudent].group_id);
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

  const handleDateChange = useCallback((_: any, date: Date | undefined) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (date) {
      setBorn(date);
    }
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleSelectGender = useCallback((value: string) => {
    setGender(value);
  }, []);

  const handleSelectGroup = useCallback((value: string) => {
    setSelectedGroup(value);
  }, []);

  const handleSubmit = useCallback(
    async (data: Student) => {
      try {
        formRef.current?.setErrors({});
        setFormHasError(false);
        setBornError(false);
        setErrorGroup(false);

        const schema = Yup.object().shape({
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

        if (selectedGroup.length === 0) setErrorGroup(true);

        if (getYear(born) === getYear(new Date())) setBornError(true);

        await schema.validate(data, {
          abortEarly: false,
        });
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
    [gender, errorGroup, bornError, errorGender, born, selectedGroup]
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
            <OpenDatePickerButton onPress={handleToggleDatePicker}>
              <OpenDatePickerButtonText erro={bornError}>
                {format(born, "dd/MM/yyyy")}
              </OpenDatePickerButtonText>

              <Fontisto name="date" size={18} color="#005678" />
            </OpenDatePickerButton>

            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="calendar"
                onChange={handleDateChange}
                value={born}
              />
            )}
            <Input name="name" placeholder="Nome completo" />
            <Select
              defaultValue={students[selectedStudent].group_id}
              error={errorGroup}
              handleSelect={handleSelectGroup}
              items={groups}
              placeholder="Turma"
            />
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
              bornError ||
              errorGender ||
              (errorGroup && (
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
