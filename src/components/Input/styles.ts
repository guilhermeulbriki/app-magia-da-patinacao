import { Feather } from '@expo/vector-icons';
import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background: #f9f9f9;
  margin-bottom: 24px;
  border-radius: 16px;
  ${Platform.OS === 'ios'
    ? css`
        box-shadow: 5px 4px 10px #c4c4c4;
      `
    : css`
        elevation: 4;
      `}
  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #eb5757;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #00a3e4;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #4f4f4f;
  font-size: 18px;
  font-family: 'Roboto_400Regular';
`;
export const Icon = styled(Feather)`
  margin-right: 16px;
`;
