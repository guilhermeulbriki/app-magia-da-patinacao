import styled, { css } from 'styled-components/native';

interface IHeaderAvatarBackProps {
  needToUpdateEnrollment: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  background: #005678;
  padding: 32px 16px 0;
  align-items: center;
  height: 158px;
`;

export const HeaderInfo = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderWelcome = styled.View`
  align-items: flex-end;
  margin-bottom: 24px;
`;

export const HeaderWelcomeText = styled.Text`
  color: #eaeaea;
  font-size: 14px;
  font-family: 'Roboto_400Regular';
`;

export const HeaderWelcomeSponsor = styled.Text`
  color: #eaeaea;
  font-size: 16px;
  font-family: 'Roboto_700Bold';
`;

export const HeaderAvatar = styled.View`
  position: relative;
`;

export const HeaderAvatarBack = styled.Image<IHeaderAvatarBackProps>`
  border-color: #eb5757;

  ${props =>
    props.needToUpdateEnrollment &&
    css`
      border-color: #27ae60;
    `}
`;

export const HeaderAvatarImg = styled.Image`
  position: absolute;
  top: 12px;
  left: 4.78px;
`;
