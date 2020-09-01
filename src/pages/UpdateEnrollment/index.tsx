import React, { useState, useCallback, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import Header from "../../components/Header";
import Select from "../../components/Select";
import Button from "../../components/Button";
import {
  Container,
  Description,
  SelectStudent,
  SelectStudentTitle,
  Content,
} from "./styles";
import putFirstLetterUperCase from "../../utils/putFirstLetterUperCase";
import api from "../../services/api";
import { Alert } from "react-native";

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

interface Items {
  label: string;
  value: string;
}

const UpdateEnrollment: React.FC = () => {
  const { params } = useRoute();
  const { reset } = useNavigation();
  const students = params as Student[];

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectError, setSelectError] = useState(false);
  const [items, setItems] = useState<Items[]>([]);

  const handleSelectedStudent = useCallback((value: string) => {
    setSelectedStudent(value);
  }, []);

  const handleSubmit = useCallback(async () => {
    setSelectError(false);

    if (selectedStudent.length === 0) {
      setSelectError(true);
    } else {
      const getStudentId = students.find(
        (student) => student.name === selectedStudent
      );

      await api.put("enrollments", null, {
        params: {
          student_id: getStudentId.id,
        },
      });

      Alert.alert(
        "Rematrícula atualizada",
        `A matrícula de ${selectedStudent} foi atualizada com sucesso`
      );

      reset({
        routes: [
          {
            name: "Dashboard",
          },
        ],
        index: 0,
      });
    }
  }, [selectedStudent, reset, students]);

  useEffect(() => {
    const formatedItems = students.map((student) => {
      return {
        label: putFirstLetterUperCase(student.name),
        value: student.name,
      };
    });

    setItems(formatedItems);
  }, [students]);

  return (
    <Container>
      <Header title="Rematrículas" />

      <Content>
        <Description>
          Opss, parece que você ainda não realizou a rematrícula de seu filho ou
          filha!
        </Description>

        <SelectStudent>
          <SelectStudentTitle>Rematrícula de:</SelectStudentTitle>
          <Select
            error={selectError}
            handleSelect={handleSelectedStudent}
            items={items}
            placeholder="Selecione o aluno"
          />
        </SelectStudent>

        <Button color="secondary" onPress={handleSubmit}>
          Rematricular
        </Button>
      </Content>
    </Container>
  );
};

export default UpdateEnrollment;
