import { TextInput, Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View``;

export const FormContent = styled.View`
  margin-top: 24px;
  padding: 0 32px;
`;

export const FormTitle = styled.Text`
  margin-top: 32px;
  margin-bottom: 24px;
  font-size: 18px;
  font-family: 'Roboto_500Medium';
  color: #4f4f4f;
`;

export const FormAffiliationContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FormInputAffiliation = styled(TextInput)`
  border-bottom-color: #647279;
  border-bottom-width: 1px;
  width: 144px;
  margin-left: 16px;
`;

export const OpenDatePickerButton = styled(RectButton)`
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
  justify-content: space-between;
  align-items: center;
`;

export const OpenDatePickerButtonText = styled.Text`
  color: #929292;
  font-size: 16px;
  font-family: 'Roboto_400Regular';
`;

export const FormConditionalContent = styled.View``;
