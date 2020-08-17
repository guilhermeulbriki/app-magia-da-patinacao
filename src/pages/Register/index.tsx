import React, { useCallback, useState, useRef } from 'react';
import { Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Fontisto } from '@expo/vector-icons';
import {
  Container,
  FormContent,
  FormTitle,
  FormAffiliationContent,
  FormInputAffiliation,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  FormConditionalContent,
} from './styles';
import Header from '../../components/Header';
import { Form } from '@unform/mobile';
import Select from '../../components/Select';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { FormHandles, Scope } from '@unform/core';

const Register: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [affiliation, setAffiliation] = useState('');
  const [gender, setGender] = useState('');
  const [born, setBorn] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = useCallback(
    (data) => {
      console.log({
        data,
        affiliation,
        gender,
        born,
      });
    },
    [affiliation, gender, born]
  );

  const handleDateChange = useCallback((_: any, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      setBorn(date);
    }
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleSelectAffiliation = useCallback((value: string) => {
    console.log(value);
    setAffiliation(value);
  }, []);

  const handleSelectGender = useCallback((value: string) => {
    console.log(value);
    setGender(value);
  }, []);

  return (
    <Container>
      <Header title="Cadastro de Responsável" />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      >
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormContent>
            <FormTitle>Você é...</FormTitle>
            <FormAffiliationContent>
              <Select
                handleSelect={handleSelectAffiliation}
                items={[
                  {
                    label: 'Mãe',
                    value: 'mae',
                  },
                  {
                    label: 'Pai',
                    value: 'pai',
                  },
                  {
                    label: 'Outro',
                    value: 'outro',
                  },
                  {
                    label: 'Próprio aluno',
                    value: 'aluno',
                  },
                ]}
                placeholder="Filialidade"
              />
              <FormInputAffiliation />
            </FormAffiliationContent>

            <FormTitle>Informações pessoais:</FormTitle>
            <OpenDatePickerButton onPress={handleToggleDatePicker}>
              <OpenDatePickerButtonText>
                Data de nascimento
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

            <FormConditionalContent>
              <Input name="name" placeholder="Nome completo" />
              <Input name="password" placeholder="Senha" secureTextEntry />
              <Input name="email" placeholder="E-mail" />
              <Input name="cpf" placeholder="CPF" />
              <Input name="rg" placeholder="RG" />
              <Input name="phone" placeholder="Telefone" />
              <Input name="whatsapp" placeholder="WhatsApp" />
              <Select
                handleSelect={handleSelectGender}
                items={[
                  {
                    label: 'Masculino',
                    value: 'male',
                  },
                  {
                    label: 'Feminino',
                    value: 'female',
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

              <Button
                onPress={() => formRef.current?.submitForm()}
                color="secondary"
              >
                Avançar
              </Button>
            </FormConditionalContent>
          </FormContent>
        </Form>
      </ScrollView>
    </Container>
  );
};

export default Register;
