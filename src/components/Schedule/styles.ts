import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin-top: 16px;
`;

export const SchedulesTitle = styled.Text`
  color: #005678;
  font-size: 21px;
  font-family: "Roboto_700Bold";
  font-size: 21px;
  text-align: center;
`;

export const Schedule = styled.View`
  margin-top: 16px;
  width: 100%;
`;

export const ScheduleName = styled.Text`
  color: #4f4f4f;
  font-size: 16px;
  margin-bottom: 8px;
  font-family: "Roboto_500Medium";
`;

export const ScheduleDayContent = styled.View`
  background: #dfdfdf;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  height: 40px;
  flex-direction: row;
  align-items: center;
  padding-left: 24px;
  position: relative;
  border-left-color: #00a3e4;
  border-left-width: 4px;
  margin-bottom: 8px;
`;

export const ScheduleDay = styled.Text`
  color: #4f4f4f;
  font-family: "Roboto_500Medium";
  font-size: 16px;
  width: 70px;
  margin-right: 16px;
`;

export const ScheduleTime = styled.Text`
  color: #005678;
  font-family: "Roboto_500Medium";
  font-size: 16px;
`;
