import { Platform, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ContainerProps {
  modalShowed: boolean;
}

interface PickerButtonProps {
  erro: boolean;
}

export const Container = styled.View<ContainerProps>`
  ${(props) =>
    props.modalShowed &&
    css`
      opacity: 0.7;
    `};
`;

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

export const OpenDatePickerButtonText = styled.Text<PickerButtonProps>`
  color: #4f4f4f;
  font-size: 16px;
  font-family: 'Roboto_400Regular';
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

export const ModalContainer = styled.View`
  margin: 16px;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 16px;
  background: #f9f9f9;
  position: relative;
`;

export const ModalTitle = styled.Text`
  font-size: 21px;
  margin-top: 16px;
  color: #00111f;
  font-family: 'Roboto_500Medium';
  text-align: center;
  margin-bottom: 16px;
`;

export const ModalText = styled.Text`
  color: #4f4f4f;
  font-size: 14px;
  line-height: 24px;
  text-align: justify;
`;

export const ModalValidation = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const ModalValitationThermes = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CheckText = styled.Text`
  color: #00111f;
  margin-left: 4px;
`;

export const ModalValitationClock = styled.Text`
  color: #929292;
  font-family: 'Roboto_500Medium';
  font-size: 16px;
`;

export const ModalClose = styled(AntDesign)`
  position: absolute;
  right: 14px;
  top: 14px;
`;

export const ConfirmButton = styled(TouchableOpacity)`
  background: #005678;
  width: 100%;
  height: 50px;
  border-radius: 16px;
  margin-top: 24px;
  align-items: center;
  justify-content: center;
  ${Platform.OS === 'ios'
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
  font-family: 'Roboto_500Medium';
`;
