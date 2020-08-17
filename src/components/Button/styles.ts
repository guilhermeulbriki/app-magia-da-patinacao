import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

interface ButtonProps {
  color: 'primary' | 'secondary';
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  min-width: 100%;
  height: 50px;
  ${(props) =>
    props.color === 'primary'
      ? css`
          background: #00a3e4;
        `
      : css`
          background: #005678;
        `}

  border-radius: 16px;
  margin-top: 24px;
  ${Platform.OS === 'ios'
    ? css`
        box-shadow: 5px 4px 10px #c4c4c4;
      `
    : css`
        elevation: 4;
      `}
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'Roboto_500Medium';
  color: #f9f9f9;
  font-size: 18px;
`;
