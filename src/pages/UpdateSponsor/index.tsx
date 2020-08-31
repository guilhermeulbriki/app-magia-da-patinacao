import React, { useRef, useCallback, useState, useEffect } from "react";
import { Platform, ScrollView, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { Form } from "@unform/mobile";
import { FormHandles, Scope } from "@unform/core";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

import Header from "../../components/Header";
import Select from "../../components/Select";
import getAgeByDate from "../../utils/getAgeByDate";
import {
  Container,
  FormContent,
  FormTitle,
  FormAffiliationContent,
  FormInputAffiliation,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  FormConditionalContent,
  ErrorMessage,
  FormBlockContent,
  FormBlockContentTop,
  FormBlockText,
  FormBlockContentBottom,
} from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/Auth";
import getValidationError from "../../utils/getValidationError";
import api from "../../services/api";

interface UpdateSponsor {
  name: string;
  password: string;
  email: string;
  born: Date;
  rg: string;
  cpf: string;
  phone: string;
  whatsapp?: string;
  gender: "masculino" | "feminino";
  affiliation: "pai" | "mae" | "outro" | "aluno";
  address: {
    street: string;
    neighborhood: string;
    complement?: string;
    number: number;
    cep: number;
    city: string;
  };
}

const UpdateSponsor: React.FC = () => {
  const { sponsor, updateSponsor } = useAuth();
  const { goBack } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const [affiliation, setAffiliation] = useState("");
  const [otherAffiliation, setOtherAffiliation] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [formHasError, setFormHasError] = useState(false);
  const [gender, setGender] = useState("");
  const [errorGender, setErrorGender] = useState(false);
  const [born, setBorn] = useState(new Date());
  const [isBlocked, setIsblocked] = useState(true);

  const initialData = {
    ...sponsor,
    address: {
      ...sponsor.addressAsJson,
      cep: String(sponsor.addressAsJson.cep),
      number: String(sponsor.addressAsJson.number),
      complement: String(sponsor.addressAsJson.complement),
    },
  };

  useEffect(() => {
    if (sponsor.type === "outro") {
      setAffiliation("outro");
      setOtherAffiliation(sponsor.type);
    } else {
      setAffiliation(sponsor.type);
    }
    setBorn(new Date(sponsor.born));
    setIsAdult(true);
    setGender(sponsor.gender);
  }, [sponsor]);

  useEffect(() => {
    if (isAdult && affiliation.length > 0) {
      if (affiliation !== "outro") {
        setIsblocked(false);
      } else {
        if (otherAffiliation.length > 0) {
          setIsblocked(false);
        } else {
          setIsblocked(true);
        }
      }
    } else {
      setIsblocked(true);
    }
  }, [isAdult, affiliation, otherAffiliation]);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleSelectAffiliation = useCallback((value: string) => {
    setAffiliation(value);
  }, []);

  const handleSubmit = useCallback(
    async (data: UpdateSponsor) => {
      try {
        formRef.current?.setErrors({});
        setFormHasError(false);

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail válido"),
          password: Yup.string().required("Senha é obrigatória"),
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
          address: Yup.object().shape({
            street: Yup.string().required("Logradouro obrigatório"),
            neighborhood: Yup.string().required("Bairro obrigatório"),
            complement: Yup.string().notRequired(),
            number: Yup.string().notRequired(),
            cep: Yup.string()
              .required("CEP obrigatório")
              .min(8, "No mínimo 8 digitos")
              .max(8, "No máximo 8 digitos"),
            city: Yup.string().required("Cidade obrigatória"),
          }),
        });

        if (gender === "masculino" || gender === "feminino") {
          setErrorGender(false);
        } else {
          setErrorGender(true);
        }

        await schema.validate(data, {
          abortEarly: false,
        });

        const formatedData = {
          gender,
          born: new Date(born),
          type: affiliation,
          ...data,
          number: Number(data.address.number),
          cep: Number(data.address.cep),
        };

        const response = await api.put("sponsor/profile", formatedData);

        updateSponsor(response.data);

        Alert.alert("Perfil atualizado com sucesso!");

        goBack();
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
    [gender, born, affiliation]
  );

  const handleDateChange = useCallback((_: any, date: Date | undefined) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (date) {
      setBorn(date);
    }

    if (getAgeByDate(date) > 17) {
      setIsAdult(true);
    } else {
      setIsAdult(false);
    }
  }, []);

  const handleSelectGender = useCallback((value: string) => {
    setGender(value);
  }, []);

  return (
    <Container>
      <Header title="Informações do seu perfil" />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      >
        <Form initialData={initialData} ref={formRef} onSubmit={handleSubmit}>
          <FormContent>
            <FormTitle>Você é...</FormTitle>
            <FormAffiliationContent>
              <Select
                defaultValue={sponsor.type}
                handleSelect={handleSelectAffiliation}
                items={[
                  {
                    label: "Mãe",
                    value: "mae",
                  },
                  {
                    label: "Pai",
                    value: "pai",
                  },
                  {
                    label: "Outro",
                    value: "outro",
                  },
                  {
                    label: "Próprio aluno",
                    value: "aluno",
                  },
                ]}
                placeholder="Filialidade"
              />
              {affiliation === "outro" && (
                <FormInputAffiliation
                  value={otherAffiliation}
                  onChangeText={(text) => setOtherAffiliation(text)}
                  placeholder="Informe a filialidade..."
                />
              )}
            </FormAffiliationContent>

            <FormTitle>Informações pessoais:</FormTitle>
            <OpenDatePickerButton onPress={handleToggleDatePicker}>
              <OpenDatePickerButtonText erro={!isAdult}>
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
            {isBlocked === false ? (
              <FormConditionalContent>
                <Input name="name" placeholder="Nome completo" />
                <Input name="password" placeholder="Senha" secureTextEntry />
                <Input name="email" placeholder="E-mail" />
                <Input name="cpf" placeholder="CPF" />
                <Input name="rg" placeholder="RG" />
                <Input name="phone" placeholder="Telefone" />
                <Input name="whatsapp" placeholder="WhatsApp" />
                <Select
                  error={errorGender}
                  defaultValue={sponsor.gender}
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

                <FormTitle>Endereço:</FormTitle>
                <Scope path="address">
                  <Input name="street" placeholder="Logradouro" />
                  <Input name="number" placeholder="Número" />
                  <Input name="complement" placeholder="Complemento" />
                  <Input name="neighborhood" placeholder="Bairro" />
                  <Input name="cep" placeholder="CEP" />
                  <Input name="city" placeholder="Cidade" />
                </Scope>

                {formHasError && (
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
              </FormConditionalContent>
            ) : (
              <FormBlockContent>
                <FormBlockContentTop>
                  <Ionicons name="ios-lock" size={50} color="#004865" />
                  <FormBlockText>
                    Informe sua data de nascimento e filialidade para
                    prosseguirmos!
                  </FormBlockText>
                </FormBlockContentTop>

                <FormBlockContentBottom>
                  Lembrando que você precisa ser maior de idade para
                  continuarmos.
                </FormBlockContentBottom>
              </FormBlockContent>
            )}
          </FormContent>
        </Form>
      </ScrollView>
    </Container>
  );
};

export default UpdateSponsor;
