import React, { useCallback } from "react";
import { Image } from "react-native";
import { useAuth } from "../../hooks/Auth";
import checkGif from "../../assets/check.gif";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Container, Title, Description } from "./styles";
import Button from "../../components/Button";

interface ParamsProps {
  email: string;
  password: string;
}

const EnrollmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();
  const { signIn } = useAuth();

  const routeParams = params as ParamsProps;

  const handleButtonPressed = useCallback(() => {
    signIn({
      email: routeParams.email,
      password: routeParams.password,
    });
  }, [routeParams, signIn, reset]);

  return (
    <Container>
      <Image source={checkGif} width={156} height={156} />

      <Title>Matrícula realizada</Title>
      <Description>Bem vindo ao clube Magia da patinação</Description>

      <Button onPress={handleButtonPressed} color="primary">
        Vamos patinar
      </Button>
    </Container>
  );
};

export default EnrollmentCreated;
