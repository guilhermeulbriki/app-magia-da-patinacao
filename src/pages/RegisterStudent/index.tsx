import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Platform, ScrollView, Alert, Modal } from 'react-native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Fontisto } from '@expo/vector-icons';
import { format, getYear } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Yup from 'yup';
import {
  Container,
  FormContent,
  FormTitle,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  ErrorMessage,
  ModalContainer,
  ModalTitle,
  ModalText,
  ModalValidation,
  ModalClose,
  ModalValitationThermes,
  CheckText,
  ModalValitationClock,
  ConfirmButton,
  ConfirmButtonText,
} from './styles';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import CheckBox from '@react-native-community/checkbox';
import putFirstLetterUperCase from '../../utils/putFirstLetterUperCase';
import getValidationError from '../../utils/getValidationError';
import getAgeByDate from '../../utils/getAgeByDate';

interface RegisterStudent {
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

interface RouteParams {
  sponsorData: {
    name: string;
    password: string;
    email: string;
    born: Date;
    rg: string;
    cpf: string;
    phone: string;
    whatsapp?: string;
    gender: 'masculino' | 'feminino';
    type: 'pai' | 'mae' | 'outro' | 'aluno';
    address: {
      street: string;
      neighborhood: string;
      complement?: string;
      number: number;
      cep: number;
      city: string;
    };
  };
}

interface Groups {
  label: string;
  value: string;
}

const RegisterStudent: React.FC = () => {
  const [born, setBorn] = useState(new Date());
  const [gender, setGender] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorGender, setErrorGender] = useState(false);
  const [errorGroup, setErrorGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [groups, setGroups] = useState<Groups[]>([]);
  const [formHasError, setFormHasError] = useState(false);
  const [bornError, setBornError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [studentData, setStudentData] = useState<RegisterStudent>(
    {} as RegisterStudent
  );
  const [acceptThermes, setAcceptThermes] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const { navigate, reset } = useNavigation();
  const { params } = useRoute();
  const { sponsorData } = params as RouteParams;

  useEffect(() => {
    api.get('groups/list', { params: { city: '' } }).then((response) => {
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
    if (sponsorData.type === 'aluno') {
      setBorn(sponsorData.born);
      setGender(sponsorData.gender);
    }
  }, [sponsorData]);

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

  const handleSelectGender = useCallback((value: string) => {
    setGender(value);
  }, []);

  const handleSelectGroup = useCallback((value: string) => {
    setSelectedGroup(value);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleSubmit = useCallback(
    async (data: RegisterStudent) => {
      try {
        formRef.current?.setErrors({});
        setFormHasError(false);
        setBornError(false);
        setErrorGroup(false);

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          rg: Yup.string()
            .max(9, 'No máximo 9 digitos')
            .min(9, 'No mínimo 9 digitos')
            .required('RG obrigatório'),
          cpf: Yup.string()
            .max(11, 'No máximo 11 digitos')
            .min(11, 'No mínimo 11 digitos')
            .required('CPF obrigatório'),
          phone: Yup.string()
            .max(11, 'DD mais 9 digitos')
            .min(11, 'DD mais 9 digitos')
            .required('Telefone obrigatório'),
          whatsapp: Yup.string().notRequired(),
        });

        if (gender === 'masculino' || gender === 'feminino') {
          setErrorGender(false);
        } else {
          setErrorGender(true);
        }

        if (selectedGroup.length === 0) setErrorGroup(true);

        if (getYear(born) === getYear(new Date())) setBornError(true);

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!errorGroup && !bornError && !errorGender) {
          setShowModal(true);
          setStudentData({
            name: data.name,
            email: data.email,
            age: getAgeByDate(born),
            group_id: selectedGroup,
            rg: data.rg,
            cpf: data.cpf,
            phone: data.phone,
            whatsapp: data.whatsapp,
            gender: gender,
          });
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);

          setFormHasError(true);

          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer o cadastro, cheque as informações.'
        );
      }
    },
    [gender, errorGroup, bornError, errorGender, born, selectedGroup]
  );

  const confirmSubmit = useCallback(() => {
    if (acceptThermes) {
      try {
        api
          .post('sponsors', sponsorData)
          .then((createdSponsor) => {
            api
              .post('sessions/sponsor', {
                email: sponsorData.email,
                password: sponsorData.password,
              })
              .then((bearerSponsorToken) => {
                api
                  .post('students', studentData, {
                    headers: {
                      Authorization: `Bearer ${bearerSponsorToken.data.token}`,
                    },
                  })
                  .then((createdStudent) => {
                    api
                      .post('enrollments', null, {
                        params: { student_id: createdStudent.data.id },
                        headers: {
                          Authorization: `Bearer ${bearerSponsorToken.data.token}`,
                        },
                      })
                      .then((createdEnrollment) => {
                        setShowModal(false);
                        reset({
                          routes: [
                            {
                              name: 'EnrollmentCreated',
                              params: {
                                email: sponsorData.email,
                                password: sponsorData.password,
                              },
                            },
                          ],
                          index: 0,
                        });
                      })
                      .catch((err) => {
                        Alert.alert(
                          'Erro ao efetuar a matrícula',
                          err.response.data.message
                        );
                      });
                  })
                  .catch((err) => {
                    Alert.alert(
                      'Erro ao cadastrar o aluno',
                      err.response.data.message
                    );
                  });
              })
              .catch((err) => {
                Alert.alert(
                  'Erro ao efetuar o login do responsável',
                  err.response.data.message
                );
              });
          })
          .catch((err) => {
            Alert.alert(
              'Erro ao cadastrar o responsável',
              err.response.data.message
            );
          });
      } catch (err) {
        Alert.alert('Erro ao realizar a matrícula', err);
      }
    }
  }, [acceptThermes, navigate, sponsorData, studentData, reset]);

  return (
    <>
      <Container modalShowed={showModal}>
        <Header title="Matrícula do Aluno" />

        <ScrollView
          contentContainerStyle={{
            paddingBottom: 140,
          }}
        >
          <Form
            initialData={sponsorData.type === 'aluno' ? sponsorData : {}}
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <FormContent>
              <FormTitle>Informações do aluno:</FormTitle>
              <OpenDatePickerButton onPress={handleToggleDatePicker}>
                <OpenDatePickerButtonText erro={bornError}>
                  {format(born, 'dd/MM/yyyy')}
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
                error={errorGender}
                defaultValue={
                  sponsorData.type === 'aluno' ? sponsorData.gender : ''
                }
                handleSelect={handleSelectGender}
                items={[
                  {
                    label: 'Masculino',
                    value: 'masculino',
                  },
                  {
                    label: 'Feminino',
                    value: 'feminino',
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
                Avançar
              </Button>
            </FormContent>
          </Form>
        </ScrollView>
      </Container>
      <Modal
        onRequestClose={closeModal}
        transparent={true}
        visible={showModal}
        animationType="slide"
      >
        <ScrollView>
          <ModalContainer>
            <ModalClose
              onPress={closeModal}
              name="close"
              color="#FA1111"
              size={24}
            />
            <ModalTitle>TERMO DE ADESÃO DE ASSOCIADO - 2020</ModalTitle>
            <ModalText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              orci dolor, maximus vel dui vel, pulvinar ultricies nulla. Cras
              eros mi, molestie nec ornare id, finibus ut urna. Aenean in justo
              scelerisque, tempus erat vel, sodales est. Suspendisse eget sapien
              elementum, egestas eros sed, tristique risus. Vivamus vel pharetra
              elit, sit amet posuere lacus. Etiam id elementum ex. Nunc placerat
              turpis at tristique ultrices. Integer quis erat ut lectus sagittis
              pulvinar. Nam diam lorem, pretium a ligula ut, sodales luctus est.
              Sed nec orci et metus porttitor viverra. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed non erat tincidunt,
              suscipit mauris ut, varius justo. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Integer orci dolor, maximus vel dui
              vel, pulvinar ultricies nulla. Cras eros mi, molestie nec ornare
              id, finibus ut urna. Aenean in justo scelerisque, tempus erat vel,
              sodales est. Suspendisse eget sapien elementum, egestas eros sed,
              tristique risus. Vivamus vel pharetra elit, sit amet posuere
              lacus. Etiam id elementum ex. Nunc placerat turpis at tristique
              ultrices. Integer quis erat ut lectus sagittis pulvinar. Nam diam
              lorem, pretium a ligula ut, sodales luctus est. Sed nec orci et
              metus porttitor viverra. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed non erat tincidunt, suscipit mauris ut,
              varius justo.
            </ModalText>
            <ModalValidation>
              <ModalValitationThermes>
                <CheckBox
                  disabled={false}
                  value={acceptThermes}
                  onValueChange={(value) => setAcceptThermes(value)}
                />
                <CheckText>Aceito os termos</CheckText>
              </ModalValitationThermes>
              <ModalValitationClock>00:00</ModalValitationClock>
            </ModalValidation>
            <ConfirmButton onPress={confirmSubmit}>
              <ConfirmButtonText>Matricular</ConfirmButtonText>
            </ConfirmButton>
          </ModalContainer>
        </ScrollView>
      </Modal>
    </>
  );
};

export default RegisterStudent;
