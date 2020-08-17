import React from 'react';
import { Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo_menor.png';
import {
  Container,
  Content,
  HeaderBack,
  HeaderBackText,
  TitleWrapper,
  Title,
} from './styles';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { goBack } = useNavigation();

  return (
    <Container>
      <Content>
        <Image source={logoImg} />
        <HeaderBack onPress={goBack}>
          <Feather name="arrow-left" size={18} color="#EAEAEA" />
          <HeaderBackText>Voltar</HeaderBackText>
        </HeaderBack>
      </Content>

      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
    </Container>
  );
};

export default Header;
