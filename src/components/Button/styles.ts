import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  width: 100%;
  min-width: 100%;
  height: 50px;
  background: #00a3e4;
  border-radius: 16px;
  margin-top: 24px;
  box-shadow: 5px 4px 10px rgba(22, 33, 39, 0.25);

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'Roboto_500Medium';
  color: #f9f9f9;
  font-size: 18px;
`;
