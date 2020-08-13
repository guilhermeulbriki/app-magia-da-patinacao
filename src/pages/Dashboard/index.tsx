import React from "react";
import { Image } from "react-native";

import avatarImg from "../../assets/avatar.png";
import avatarBack from "../../assets/avatar_background.png";
import logoImg from "../../assets/logo_menor.png";
import { useAuth } from "../../hooks/Auth";
import putFirstLetterUperCase from "../../utils/putFirstLetterUperCase";
import {
  Container,
  Header,
  HeaderInfo,
  HeaderWelcome,
  HeaderWelcomeText,
  HeaderWelcomeSponsor,
  HeaderAvatar,
  HeaderAvatarBack,
  HeaderAvatarImg,
  // eslint-disable-next-line import/namespace
} from "./styles";

const Dashboard: React.FC = () => {
  const { sponsor } = useAuth();

  return (
    <Container>
      <Header
        style={{
          borderBottomLeftRadius: 48,
          borderBottomRightRadius: 48,
        }}
      >
        <HeaderInfo>
          <Image source={logoImg} />

          <HeaderWelcome>
            <HeaderWelcomeText>Bem vindo</HeaderWelcomeText>
            <HeaderWelcomeSponsor>
              {putFirstLetterUperCase(sponsor.name)}
            </HeaderWelcomeSponsor>
          </HeaderWelcome>
        </HeaderInfo>
        <HeaderAvatar>
          <HeaderAvatarBack
            needToUpdateEnrollment
            style={{
              borderWidth: 4,
              borderRadius: 45,
            }}
            source={avatarBack}
          />
          <HeaderAvatarImg source={avatarImg} />
        </HeaderAvatar>
      </Header>
    </Container>
  );
};

export default Dashboard;
