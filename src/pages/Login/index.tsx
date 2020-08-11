/* eslint-disable no-unused-expressions */
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useRef, useCallback, useEffect } from 'react';
import { TextInput, Alert } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
} from 'react-native-reanimated';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.png';
import signInBackground from '../../assets/signInBackground.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/Auth';
import getValidationError from '../../utils/getValidationError';
import {
  Container,
  Content,
  SignUpContainer,
  SignUpDescripion,
  SignUpRedirect,
  PatinsBackground,
} from './styles';

interface SignInData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const imagePosition = useSharedValue(-30);
  const signUpPosition = useSharedValue(30);
  const { signIn } = useAuth();

  useEffect(() => {
    imagePosition.value = withTiming(0, {
      duration: 500,
      easing: Easing.bounce,
    });

    signUpPosition.value = withTiming(0, {
      duration: 500,
      easing: Easing.bounce,
    });
  }, []);

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: imagePosition.value }],
    };
  });

  const signUnStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: signUpPosition.value }],
    };
  });

  const handleSubmit = useCallback(async (data: SignInData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationError(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro na autentificação',
        'Ocorreu um erro ao fazer login, cheque as credenciais.'
      );
    }
  }, []);

  return (
    <Container>
      <PatinsBackground source={signInBackground} />
      <Content>
        <Animated.Image
          style={[
            {
              marginBottom: 56,
            },
            imageStyle,
          ]}
          source={logoImg}
        />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            name="email"
            icon="mail"
            placeholder="E-mail"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />

          <Input
            ref={passwordInputRef}
            secureTextEntry
            name="password"
            icon="lock"
            placeholder="Senha"
            returnKeyType="send"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />

          <Button
            onPress={() => {
              formRef.current?.submitForm();
            }}>
            Logar
          </Button>
        </Form>

        <SignUpContainer style={signUnStyle}>
          <SignUpDescripion>Não possui uma conta?</SignUpDescripion>
          <SignUpRedirect>Cadastre-se</SignUpRedirect>
        </SignUpContainer>
      </Content>
    </Container>
  );
};

export default Login;
