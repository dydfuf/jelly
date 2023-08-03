import koLocale from "@fullcalendar/core/locales/ko";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Schedule } from "hooks/schedule/useGetSchedule";

interface Props {
  schedules: Schedule[];
  selectedDate: Date;
}

export default function DetailCalendar({ schedules, selectedDate }: Props) {
  return (
    <FullCalendar
      plugins={[timeGridPlugin]}
      initialDate={selectedDate}
      initialView={"timeGridDay"}
      headerToolbar={{
        left: "",
        center: "",
        right: "",
      }}
      locale={koLocale}
      contentHeight={"auto"}
      eventContent={(event) => {
        console.log(event);
      }}
      events={[
        {
          title: "Conference",
          start: "2023-07-30",
          end: "2023-08-01",
        },
        {
          title: "Meeting",
          start: "2023-07-31T10:30:00+00:00",
          end: "2023-07-31T12:30:00+00:00",
        },
        {
          title: "Lunch",
          start: "2023-07-31T12:00:00+00:00",
        },
        {
          title: "Birthday Party",
          start: "2023-08-01T07:00:00+00:00",
        },
      ]}
    />
  );
}
