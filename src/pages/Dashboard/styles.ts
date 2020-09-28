import { RectButton, ScrollView } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";
import Animated from "react-native-reanimated";
import { Link } from "@react-navigation/native";

interface IHeaderAvatarBackProps {
  needToUpdateEnrollment: boolean;
}

interface IHeaderEnrollmentProps {
  needToUpdateEnrollment: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled(Animated.View)`
  background: #005678;
  padding: 32px 16px 0;
  margin-bottom: 32px;
  align-items: center;
  position: relative;
  z-index: 1;
`;

export const HeaderInfo = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderWelcome = styled.View`
  align-items: flex-end;
`;

export const HeaderWelcomeText = styled.Text`
  color: #eaeaea;
  font-size: 14px;
  font-family: "Roboto_400Regular";
`;

export const HeaderWelcomeSponsor = styled.Text`
  color: #eaeaea;
  font-size: 16px;
  font-family: "Roboto_700Bold";
`;

export const HeaderOptions = styled(Animated.View)`
  margin-top: 32px;
`;

export const HeaderOption = styled(Link)`
  text-align: center;
  color: #eaeaea;
  font-size: 21px;
  font-family: "Roboto_500Medium";
  margin-bottom: 16px;
`;

export const UpdateEnrollment = styled.View`
  align-items: center;
  margin-bottom: 98px;
  margin-top: 24px;
`;

export const UpdateEnrollmentTitle = styled.Text<IHeaderEnrollmentProps>`
  font-size: 28px;
  color: #27ae60;
  font-family: "Roboto_700Bold";
  max-width: 200px;
  text-align: center;

  ${(props) =>
    props.needToUpdateEnrollment &&
    css`
      color: #eb5757;
    `}
`;

export const UpdateEnrollmentButton = styled(RectButton)`
  background: #f2f2f2;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-top: 24px;
`;

export const HeaderAvatar = styled(RectButton)`
  position: absolute;
  bottom: -24px;
`;

export const HeaderAvatarBack = styled.Image<IHeaderAvatarBackProps>`
  border-color: #27ae60;

  ${(props) =>
    props.needToUpdateEnrollment &&
    css`
      border-color: #eb5757;
    `}
`;

export const HeaderAvatarImg = styled.Image`
  position: absolute;
  top: 12px;
  left: 4.78px;
`;

export const Content = styled(ScrollView)`
  position: relative;
`;

export const CardsContent = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  padding: 0 16px;
  margin-bottom: 32px;
`;

export const Card = styled(RectButton)`
  width: 144px;
  height: 116px;
  background: #eaeaea;
  border-radius: 8px;
  padding: 8px;
  margin: 0 8px;

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CardBackground = styled.ImageBackground``;

export const CardTitle = styled.Text`
  text-align: center;
  color: #00111f;
  font-size: 14px;
  font-family: "Roboto_500Medium";
  margin-bottom: 16px;
`;

export const CardImage = styled.Image`
  max-width: 50px;
  max-height: 50px;
`;

export const Schedules = styled.View`
  flex-direction: column;
  width: 100%;
  padding: 0 32px;
`;

export const SchedulesTitle = styled.Text`
  color: #005678;
  font-size: 21px;
  font-family: "Roboto_700Bold";
  font-size: 21px;
  text-align: center;
`;
