import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  position: relative;
`;

export const Content = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background: #005678;
  padding: 32px 16px 48px;
  ${Platform.OS === 'ios'
    ? css`
        box-shadow: 5px 4px 10px #c4c4c4;
      `
    : css`
        elevation: 4;
      `}
`;

export const HeaderBack = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HeaderBackText = styled.Text`
  color: #eaeaea;
  font-size: 14px;
  margin-left: 4px;
  font-family: 'Roboto_400Regular';
`;

export const TitleWrapper = styled.View`
  position: absolute;
  bottom: -20.5px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  position: relative;
  z-index: 2;
  max-width: 310px;
  background: #f9f9f9;
  padding: 8px 32px;
  border-radius: 8px;
  color: #00111f;
  font-size: 21px;
  font-family: 'Roboto_500Medium';
  ${Platform.OS === 'ios'
    ? css`
        box-shadow: 5px 4px 10px #c4c4c4;
      `
    : css`
        elevation: 4;
      `}
  flex-direction: row;
  align-items: center;
`;
