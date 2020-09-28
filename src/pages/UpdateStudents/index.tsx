import React, { useState, useRef, useCallback, useEffect } from "react";
import { ScrollView, Alert, Modal, Platform } from "react-native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import { Feather, Fontisto, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Yup from "yup";

import Header from "../../components/Header";
import {
  Container,
  Actions,
  FormContent,
  FormTitle,
  ErrorMessage,
  FormHeader,
  DeleteStudent,
  AddStudent,
  ModalContainer,
  ModalHeader,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  ConfirmButton,
  ConfirmButtonText,
} from "./styles";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import getValidationError from "../../utils/getValidationError";
import putFirstLetterUperCase from "../../utils/putFirstLetterUperCase";
import { useStudents } from "../../hooks/Students";
import { format, getYear } from "date-fns";
import api from "../../services/api";
import getAgeByDate from "../../utils/getAgeByDate";

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

interface Groups {
  label: string;
  value: string;
}

const UpdateStudents: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const addFormRef = useRef<FormHandles>(null);
  const { students, add, update, remove } = useStudents();
  const { navigate } = useNavigation();

  const [gender, setGender] = useState("");
  const [genderModal, setGenderModal] = useState("");
  const [errorGender, setErrorGender] = useState(false);
  const [errorGenderModal, setErrorGenderModal] = useState(false);
  const [formHasError, setFormHasError] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(0);
  const [initialData, setInitialData] = useState<Student>(students[0]);
  const [showModal, setShowModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bornError, setBornError] = useState(false);
  const [born, setBorn] = useState(new Date());
  const [errorGroup, setErrorGroup] = useState(false);
  const [groups, setGroups] = useState<Groups[]>([]);
  const [selectedGroup, setSelectedGroup] = useState("");

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

  const handleSelectGenderModal = useCallback((value: string) => {
    setGenderModal(value);
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
          id: students[selectedStudent].id,
        };

        update(formateData);
        navigate("Dashboard");
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

  const handleDelete = useCallback(async () => {
    const { id } = students[selectedStudent];

    remove(id);

    setSelectedStudent(0);
  }, [selectedStudent, students]);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleAddStudent = useCallback(
    async (data) => {
      try {
        addFormRef.current?.setErrors({});
        setFormHasError(false);
        setBornError(false);
        setErrorGroup(false);
        setErrorGenderModal(false);

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

        console.log(genderModal === "masculino" || genderModal === "feminino");

        if (genderModal === "masculino" || genderModal === "feminino") {
          setErrorGenderModal(false);
        } else {
          setErrorGenderModal(true);
        }

        if (selectedGroup.length === 0) setErrorGroup(true);

        if (getYear(born) === getYear(new Date())) setBornError(true);

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!errorGroup && !bornError && !errorGenderModal) {
          const formatedData = {
            ...data,
            gender: genderModal,
            age: getAgeByDate(new Date(born)),
            group_id: selectedGroup,
          };

          // await add(formatedData);

          // setShowModal(false);
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          addFormRef.current?.setErrors(errors);

          setFormHasError(true);

          return;
        }

        Alert.alert(
          "Erro no cadastro",
          "Ocorreu um erro ao fazer o cadastro, cheque as informações."
        );
      }
    },
    [genderModal, born, selectedGroup, errorGenderModal, errorGroup, bornError]
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

  const handleSelectGroup = useCallback((value: string) => {
    setSelectedGroup(value);
  }, []);

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

            {(formHasError || errorGender) && (
              <ErrorMessage>
                Ops, corrija os campos destacados e tente novamente
              </ErrorMessage>
            )}

            <Button
              onPress={() => formRef.current?.submitForm()}
              color="secondary"
            >
              Atualizar dados
            </Button>

            <Actions>
              <DeleteStudent onPress={handleDelete}>
                Excluir aluno
              </DeleteStudent>
              <AddStudent onPress={() => setShowModal(true)}>
                Adicionar aluno
              </AddStudent>
            </Actions>
          </FormContent>
        </Form>
      </ScrollView>
      <Modal
        onRequestClose={closeModal}
        animationType="slide"
        visible={showModal}
        transparent={true}
      >
        <ModalContainer contentContainerStyle={{ padding: 16 }}>
          <ModalHeader>
            <FormTitle>Adicionar novo aluno</FormTitle>
            <AntDesign
              onPress={closeModal}
              name="close"
              color="#FA1111"
              size={24}
            />
          </ModalHeader>
          <Form ref={addFormRef} onSubmit={handleAddStudent}>
            <OpenDatePickerButton onPress={handleToggleDatePicker}>
              <OpenDatePickerButtonText
                onPress={handleToggleDatePicker}
                erro={bornError}
              >
                {format(born, "dd/MM/yyyy")}
              </OpenDatePickerButtonText>

              <Fontisto name="date" size={18} color="#005678" />
            </OpenDatePickerButton>

            {showDatePicker && (
              <DateTimePicker
                style={{ position: "absolute" }}
                mode="date"
                display="calendar"
                onChange={handleDateChange}
                value={born}
              />
            )}
            <Input name="name" placeholder="Nome completo" />
            <Select
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
              error={errorGenderModal}
              handleSelect={handleSelectGenderModal}
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
            {(formHasError || bornError || errorGender || errorGroup) && (
              <ErrorMessage>
                Ops, corrija os campos destacados e tente novamente
              </ErrorMessage>
            )}
            <ConfirmButton onPress={() => addFormRef.current?.submitForm()}>
              <ConfirmButtonText>Adicionar</ConfirmButtonText>
            </ConfirmButton>
          </Form>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default UpdateStudents;
