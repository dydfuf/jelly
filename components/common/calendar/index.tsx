import koLocale from "@fullcalendar/core/locales/ko";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { format } from "date-fns";
import { Memory } from "hooks/memory/useGetMemory";
import DayCell from "./DayCell";

interface Props {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  events: Memory[];
}

export default function Calendar({
  selectedDate,
  setSelectedDate,
  events,
}: Props) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialDate={selectedDate}
      initialView="dayGridMonth"
      contentHeight={"auto"}
      headerToolbar={{
        left: "prev",
        center: "title",
        right: "next",
      }}
      locale={koLocale}
      titleFormat={(date) => format(date.date.marker, "yyyy년 MM월")}
      dayCellContent={(cell) => (
        <DayCell
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          events={events}
          {...cell}
        />
      )}
      nowIndicator={true}
      selectable={true}
    />
  );
}
