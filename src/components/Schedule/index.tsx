import React from "react";

import {
  Container,
  ScheduleName,
  ScheduleDayContent,
  ScheduleDay,
  ScheduleTime,
} from "./styles";
import putFirstLetterUperCase from "../../utils/putFirstLetterUperCase";

interface IScheduleData {
  studentName: string;
  schedules: Array<{
    day: string;
    start: string;
    finish: string;
    id: string;
  }>;
}

const Schedule: React.FC<IScheduleData> = ({ studentName, schedules }) => {
  return (
    <Container>
      <ScheduleName>{putFirstLetterUperCase(studentName)}</ScheduleName>

      {schedules.map((schedule) => (
        <ScheduleDayContent key={schedule.id}>
          <ScheduleDay>{putFirstLetterUperCase(schedule.day)}:</ScheduleDay>
          <ScheduleTime>
            {schedule.start} - {schedule.finish}
          </ScheduleTime>
        </ScheduleDayContent>
      ))}
    </Container>
  );
};

export default Schedule;
