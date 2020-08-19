import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { Picker } from '@react-native-community/picker';

interface ContainerProps {
  erro: boolean;
}

interface PickerProps {
  isFilled: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  color: #929292;
  padding: 0 16px;
  margin-bottom: 24px;
  background: #f9f9f9;
  border-radius: 16px;
  ${Platform.OS === 'ios'
    ? css`
        box-shadow: 5px 4px 10px #c4c4c4;
      `
    : css`
        elevation: 4;
      `}
  ${(props) =>
    props.erro &&
    css`
      border-width: 1px;
      border-color: #eb5757;
    `}
`;

export const SelectPicker = styled(Picker)<PickerProps>`
  ${(props) =>
    props.isFilled === true
      ? css`
          color: #4f4f4f;
        `
      : css`
          color: #929292;
        `}
`;
