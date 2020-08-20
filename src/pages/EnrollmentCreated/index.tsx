import React, { useCallback } from 'react';
import { EvilIcons } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Container, Title, Description } from './styles';
import Button from '../../components/Button';

interface RouteParams {
  studentData: {
    name: string;
    email: string;
    born: Date;
    rg: number;
    cpf: number;
    phone: number;
    whatsapp?: number;
    gender: 'masculino' | 'feminino';
  };
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
    affiliation: 'pai' | 'mae' | 'outro' | 'aluno';
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

const EnrollmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const handleButtonPressed = useCallback(() => {
    console.log(routeParams);
  }, []);

  return (
    <Container>
      <EvilIcons name="check" size={156} color="#00A3E4" />

      <Title>Matrícula realizada</Title>
      <Description>Bem vindo ao clube Magia da patinação</Description>

      <Button onPress={handleButtonPressed} color="primary">
        Vamos patinar
      </Button>
    </Container>
  );
};

export default EnrollmentCreated;
