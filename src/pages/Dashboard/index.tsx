import React, { useState, useEffect, useCallback } from "react";
import { Image, View, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Schedule from "../../components/Schedule";
import { useAuth } from "../../hooks/Auth";
import putFirstLetterUperCase from "../../utils/putFirstLetterUperCase";

import avatarImg from "../../assets/avatar.png";
import avatarBack from "../../assets/avatar_background.png";
import logoImg from "../../assets/logo_menor.png";
import backCards from "../../assets/backCards.png";
import hourglass from "../../assets/hourglass.png";
import trophy from "../../assets/trophy.png";
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
  Content,
  CardsContent,
  Card,
  CardTitle,
  CardImage,
  CardBackground,
  Schedules,
  SchedulesTitle,
  HeaderOptions,
  HeaderOption,
  UpdateEnrollment,
  UpdateEnrollmentTitle,
  UpdateEnrollmentButton,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

interface ISchedules {
  studentName: string;
  schedules: Array<{
    day: string;
    start: string;
    finish: string;
    id: string;
  }>;
}

const Dashboard: React.FC = () => {
  const [openMenuOptions, setOpenMenuOptions] = useState(false);
  const [needsUpdateEnrollment, setNeedsUpdateEnrollment] = useState(false);
  const [students, setStudents] = useState([]);
  const [schedules, setSchedules] = useState<ISchedules[]>([]);

  const { sponsor, signOut, token } = useAuth();
  const { navigate } = useNavigation();

  const headerHeight = useSharedValue(148);
  const optionsOpacity = useSharedValue(0);

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: headerHeight.value,
    };
  });

  const optionsStyle = useAnimatedStyle(() => {
    return {
      opacity: optionsOpacity.value,
    };
  });

  const showStudentsProfile = useCallback(() => {
    navigate("UpdateStudents", students);
  }, [students]);

  const handleToggleOpenMenuOptions = useCallback(() => {
    if (openMenuOptions) {
      optionsOpacity.value = withTiming(
        0,
        {
          duration: 100,
          easing: Easing.ease,
        },
        () => {
          headerHeight.value = withTiming(148, {
            duration: 400,
            easing: Easing.ease,
          });
        }
      );
    } else {
      headerHeight.value = withTiming(
        570,
        {
          duration: 400,
          easing: Easing.ease,
        },
        () => {
          optionsOpacity.value = withTiming(1, {
            duration: 100,
            easing: Easing.ease,
          });
        }
      );
    }

    setOpenMenuOptions(!openMenuOptions);
  }, [openMenuOptions, headerHeight]);

  const redirectByCard = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  useEffect(() => {
    api.defaults.headers.authorization = `Bearer ${token}`;

    api.get(`students/by-sponsor/${sponsor.id}`).then((responseStudents) => {
      setStudents(
        responseStudents.data.map((student) => ({
          ...student,
          age: String(student.age),
        }))
      );

      let getSchedules = {} as ISchedules;
      let needsUpdate = false;

      responseStudents.data.forEach(async (student) => {
        await api.get(`students/show/${student.id}`).then((responseProfile) => {
          if (responseProfile.data.enrollment.status === "pending")
            needsUpdate = true;
        });

        setNeedsUpdateEnrollment(needsUpdate);
      });

      responseStudents.data.forEach(async (student) => {
        await api.get(`groups/${student.group_id}`).then((responseGroups) => {
          getSchedules = {
            studentName: student.name,
            schedules: responseGroups.data.schedules,
          };
        });

        setSchedules((oldValue) => {
          const searchResult = oldValue.find(
            (value) => value.studentName === student.name
          );

          if (!searchResult) {
            return [...oldValue, getSchedules];
          } else {
            return [...oldValue];
          }
        });
      });
    });
  }, [sponsor]);

  return (
    <Container>
      <Header
        style={[
          {
            borderBottomLeftRadius: 48,
            borderBottomRightRadius: 48,
          },
          headerStyle,
        ]}
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
        <HeaderOptions style={optionsStyle}>
          <HeaderOption to="/UpdateSponsor">
            Informações do seu perfil
          </HeaderOption>
          <HeaderOption to="/UpdateStudents" onPress={showStudentsProfile}>
            Perfil dos alunos
          </HeaderOption>
          <HeaderOption to="/Dashboard">Desvincular-se do clube</HeaderOption>
          <HeaderOption to="/Dashboard" onPress={signOut}>
            Sair
          </HeaderOption>

          <UpdateEnrollment>
            <UpdateEnrollmentTitle
              needToUpdateEnrollment={needsUpdateEnrollment}
            >
              {needsUpdateEnrollment === true
                ? "Rematrículas abertas"
                : "Matrículas em dia"}
            </UpdateEnrollmentTitle>
            <UpdateEnrollmentButton enabled={needsUpdateEnrollment}>
              <Feather
                name="arrow-right"
                size={24}
                color={needsUpdateEnrollment === true ? "#eb5757" : "#27ae60"}
              />
            </UpdateEnrollmentButton>
          </UpdateEnrollment>
        </HeaderOptions>
        <HeaderAvatar onPress={handleToggleOpenMenuOptions}>
          <HeaderAvatarBack
            needToUpdateEnrollment={needsUpdateEnrollment}
            style={{
              borderWidth: 4,
              borderRadius: 45,
            }}
            source={avatarBack}
          />
          <HeaderAvatarImg source={avatarImg} />
        </HeaderAvatar>
      </Header>

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 32,
          paddingTop: 8,
        }}
      >
        <CardsContent>
          <Card onPress={() => redirectByCard("Competitions")}>
            <CardTitle>Premiações</CardTitle>

            <CardBackground resizeMode="contain" source={backCards}>
              <CardImage source={trophy} />
            </CardBackground>
          </Card>

          <Card onPress={() => redirectByCard("Dashboard")}>
            <CardTitle>História do clube</CardTitle>

            <CardBackground resizeMode="contain" source={backCards}>
              <CardImage source={hourglass} />
            </CardBackground>
          </Card>
        </CardsContent>

        <Schedules>
          <SchedulesTitle>Horário das aulas</SchedulesTitle>
          {schedules.length === 0 ? (
            <View
              style={{
                marginTop: 32,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="large" color="#00a3e4" />
            </View>
          ) : (
            schedules.map((schedule) => (
              <Schedule
                schedules={schedule.schedules}
                studentName={schedule.studentName}
                key={schedule.studentName}
              />
            ))
          )}
        </Schedules>
      </Content>
    </Container>
  );
};

export default Dashboard;
