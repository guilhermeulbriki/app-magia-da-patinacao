import React, { useState, useEffect } from "react";
import { Image } from "react-native";

import avatarImg from "../../assets/avatar.png";
import avatarBack from "../../assets/avatar_background.png";
import logoImg from "../../assets/logo_menor.png";
import backCards from "../../assets/backCards.png";
import hourglass from "../../assets/hourglass.png";
import trophy from "../../assets/trophy.png";
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
  Content,
  CardsContent,
  Card,
  CardTitle,
  CardImage,
  CardBackground,
  Schedules,
  Schedule,
  SchedulesTitle,
  ScheduleName,
  ScheduleDayContent,
  ScheduleDay,
  ScheduleTime,
} from "./styles";
import api from "../../services/api";

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
  const { sponsor } = useAuth();
  const [students, setStudents] = useState([]);
  const [schedules, setSchedules] = useState<ISchedules[]>([]);

  useEffect(() => {
    api.get(`students/by-sponsor/${sponsor.id}`).then((response) => {
      setStudents(response.data);

      let getSchedules = {} as ISchedules;

      response.data.forEach(async (student) => {
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

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 32,
          paddingTop: 8,
        }}
      >
        <CardsContent>
          <Card>
            <CardTitle>Premiações</CardTitle>

            <CardBackground resizeMode="contain" source={backCards}>
              <CardImage source={trophy} />
            </CardBackground>
          </Card>

          <Card>
            <CardTitle>História do clube</CardTitle>

            <CardBackground resizeMode="contain" source={backCards}>
              <CardImage source={hourglass} />
            </CardBackground>
          </Card>
        </CardsContent>

        <Schedules>
          <SchedulesTitle>Horário das aulas</SchedulesTitle>

          {schedules.map((schedule) => (
            <Schedule key={schedule.studentName}>
              <ScheduleName>
                {putFirstLetterUperCase(schedule.studentName)}
              </ScheduleName>

              {schedule.schedules.map((scheduleTime) => (
                <ScheduleDayContent key={scheduleTime.id}>
                  <ScheduleDay>
                    {putFirstLetterUperCase(scheduleTime.day)}:
                  </ScheduleDay>
                  <ScheduleTime>
                    {scheduleTime.start} - {scheduleTime.finish}
                  </ScheduleTime>
                </ScheduleDayContent>
              ))}
            </Schedule>
          ))}
        </Schedules>
      </Content>
    </Container>
  );
};

export default Dashboard;
