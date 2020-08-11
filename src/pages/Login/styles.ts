import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const Container = styled.View`
  background: #f2f2f2;
  align-items: center;
  justify-content: center;
  flex: 1;
  position: relative;
`;

export const Content = styled.View`
  padding: 0 32px;
  align-items: center;
`;

export const SignUpContainer = styled(Animated.View)`
  width: 100%;
  align-items: center;
  margin-top: 56px;
`;

export const SignUpDescripion = styled.Text`
  font-size: 16px;
  color: #4f4f4f;
  font-family: 'Roboto_400Regular';
`;

export const SignUpRedirect = styled.Text`
  color: #00a3e4;
  font-family: 'Roboto_700Bold';
  font-size: 24px;
  margin-top: 16px;
`;

export const PatinsBackground = styled.Image`
  position: absolute;
`;
