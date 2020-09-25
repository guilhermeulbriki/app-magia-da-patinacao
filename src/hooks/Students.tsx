import AsyncStorage from "@react-native-community/async-storage";
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import { Alert } from "react-native";

import api from "../services/api";
import { useAuth } from "./Auth";

interface AuthContextData {
  students: IStudent[];
  add(student: IStudent): Promise<void>;
  update(student: IStudent): Promise<void>;
  remove(id: string): Promise<void>;
}

interface IStudent {
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

interface AuthState {
  students: IStudent[];
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const StudentsProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const { sponsor } = useAuth();

  useEffect(() => {
    async function loadStoraged(): Promise<void> {
      if (sponsor) {
        const response = await api.get(`students/by-sponsor/${sponsor.id}`);

        const formatedStudents = response.data.map((student) => {
          return {
            ...student,
            age: String(student.age),
          };
        });

        setData({ students: formatedStudents });
      }
    }

    loadStoraged();
  }, [sponsor]);

  const add = useCallback(
    async (student: IStudent) => {
      const response = await api.post("students", student);

      setData({ students: [...data.students, response.data] });
    },
    [data.students]
  );

  const update = useCallback(
    async (student: IStudent) => {
      api
        .put("students", student, {
          params: { student_id: student.id },
        })
        .then((response) => {
          const updatedStudents = data.students.map((studentMap) => {
            if (studentMap.id === student.id) {
              return response.data;
            }

            return studentMap;
          });

          setData({ students: updatedStudents });

          Alert.alert(
            "Perfil atualizado",
            "As informações foram atualizadas com sucesso."
          );
        })
        .catch((err) => {
          let description = "As informações foram atualizadas com sucesso.";

          if (err) description = err.response.data.message;

          Alert.alert("Erro ao atualizar", description);
        });
    },
    [data.students]
  );

  const remove = useCallback(
    async (id: string) => {
      await api
        .delete("students", { params: { id } })
        .catch((err) => console.log(err.response.data.message));

      const updatedStudents = data.students.filter(
        (student) => student.id !== id
      );

      setData({ students: updatedStudents });
    },
    [data.students]
  );

  return (
    <AuthContext.Provider
      value={{
        students: data.students,
        add,
        remove,
        update,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useStudents(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useStudents must be used within an AuthProvider");
  }

  return context;
}
