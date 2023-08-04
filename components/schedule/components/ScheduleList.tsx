import { Schedule } from "hooks/schedule/useGetSchedule";
import DetailCalendar from "./DetailCalendar";

interface Props {
  schedules: Schedule[];
  selectedDate: Date;
}

export default function ScheduleList({ schedules, selectedDate }: Props) {
  return <DetailCalendar schedules={schedules} selectedDate={selectedDate} />;
}
