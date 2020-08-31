import { TextInput, Platform } from "react-native";
import styled, { css } from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

interface PickerButtonProps {
  erro: boolean;
}

export const Container = styled.View`
  position: relative;
`;

export const FormContent = styled.View`
  margin-top: 24px;
  padding: 0 32px;
`;

export const FormTitle = styled.Text`
  margin-top: 32px;
  margin-bottom: 24px;
  font-size: 18px;
  font-family: "Roboto_500Medium";
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
  ${Platform.OS === "ios"
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

export const OpenDatePickerButtonText = styled.Text<PickerButtonProps>`
  color: #4f4f4f;
  font-size: 16px;
  font-family: "Roboto_400Regular";
  ${(props) =>
    props.erro &&
    css`
      color: #eb5757;
    `}
`;

export const FormConditionalContent = styled.View``;

export const FormBlockContent = styled.View`
  width: 100%;
  margin: 0 auto;
  margin-top: 80px;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const FormBlockContentTop = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

export const FormBlockText = styled.Text`
  font-family: "Roboto_600Medium";
  margin-left: 16px;
  color: #00111f;
  font-size: 16px;
  line-height: 26px;
`;

export const FormBlockContentBottom = styled.Text`
  text-align: center;
  font-size: 14px;
  line-height: 24px;
  margin-top: 16px;
`;

export const ErrorMessage = styled.Text`
  margin-top: 16px;
  font-size: 16px;
  color: #eb5757;
  text-align: center;
`;
