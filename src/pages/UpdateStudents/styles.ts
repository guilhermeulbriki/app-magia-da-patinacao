import { Platform, TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { RectButton, ScrollView } from "react-native-gesture-handler";

interface PickerButtonProps {
  erro: boolean;
}

export const Container = styled.View``;

export const FormContent = styled.View`
  margin-top: 24px;
  padding: 0 32px;
`;

export const FormHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 24px 0;
`;

export const FormTitle = styled.Text`
  font-size: 18px;
  font-family: "Roboto_500Medium";
  color: #4f4f4f;
`;

export const OpenDatePickerButton = styled(RectButton)`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  margin-top: 24px;
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

export const ErrorMessage = styled.Text`
  margin-top: 16px;
  font-size: 16px;
  color: #eb5757;
  text-align: center;
`;

export const Actions = styled.View`
  flex-direction: row;
  margin-top: 24px;
  padding: 0 16px;
  justify-content: space-between;
`;

export const DeleteStudent = styled.Text`
  color: #eb5757;
  text-align: center;
  font-size: 14px;
`;

export const AddStudent = styled.Text`
  color: #219653;
  text-align: center;
  font-size: 14px;
`;

export const ModalContainer = styled(ScrollView)`
  margin: 8px;
  border-radius: 16px;
  background: #f9f9f9;
  position: relative;
  z-index: 2;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ConfirmButton = styled(TouchableOpacity)`
  background: #005678;
  width: 100%;
  height: 50px;
  border-radius: 16px;
  margin-top: 24px;
  align-items: center;
  justify-content: center;
  ${Platform.OS === "ios"
    ? css`
        box-shadow: 5px 4px 10px #c4c4c4;
      `
    : css`
        elevation: 4;
      `}
`;

export const ConfirmButtonText = styled.Text`
  color: #f9f9f9;
  font-size: 16px;
  font-family: "Roboto_500Medium";
`;
