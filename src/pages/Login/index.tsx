import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useRef, useCallback } from 'react';
import { TextInput } from 'react-native';

import logoImg from '../../assets/logo.png';
import signInBackground from '../../assets/signInBackground.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {
  Container,
  Content,
  LogoImage,
  SignUpContainer,
  SignUpDescripion,
  SignUpRedirect,
  PatinsBackground,
} from './styles';

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(() => {
    console.log('submit');
  }, []);

  return (
    <Container>
      <PatinsBackground source={signInBackground} />
      <Content>
        <LogoImage source={logoImg} />

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

        <SignUpContainer>
          <SignUpDescripion>Não possui uma conta?</SignUpDescripion>
          <SignUpRedirect>Cadastre-se</SignUpRedirect>
        </SignUpContainer>
      </Content>
    </Container>
  );
};

export default Login;
