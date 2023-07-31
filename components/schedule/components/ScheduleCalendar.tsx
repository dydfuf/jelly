import koLocale from "@fullcalendar/core/locales/ko";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useRef, useState } from "react";
import { Schedule } from "hooks/schedule/useGetSchedule";
import { cn } from "utils/common";
import PlanCell from "./ScheduleCell";

interface Props {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  events: Schedule[];
}

export default function ScheduleCalendar({
  selectedDate,
  setSelectedDate,
  events,
}: Props) {
  const [calendarType, setCalendarType] = useState<CalendarType>("week");
  const initialView = calendarType === "week" ? "dayGridWeek" : "dayGridMonth";

  const ref = useRef<FullCalendar>(null);

  useEffect(() => {
    if (!ref) {
      return;
    }
    if (!ref.current) {
      return;
    }

    ref.current.getApi().changeView(initialView, selectedDate);
  }, [calendarType, initialView, selectedDate]);

  return (
    <>
      <div className="flex ml-auto">
        <button
          className={cn("w-60 border-1 rounded-6", {
            "bg-slate-400": calendarType === "week",
          })}
          onClick={() => setCalendarType("week")}
        >
          주
        </button>
        <button
          className={cn("w-60 border-1 rounded-6", {
            "bg-slate-400": calendarType === "month",
          })}
          onClick={() => setCalendarType("month")}
        >
          월
        </button>
      </div>
      <FullCalendar
        ref={ref}
        plugins={[dayGridPlugin]}
        initialDate={selectedDate}
        initialView={initialView}
        contentHeight={"auto"}
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next",
        }}
        locale={koLocale}
        titleFormat={(date) => format(date.date.marker, "yyyy년 MM월")}
        dayHeaderFormat={(date) =>
          format(date.date.marker, "dd EEE", { locale: ko })
        }
        dayCellContent={(cell) => (
          <PlanCell
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            events={events}
            {...cell}
          />
        )}
        nowIndicator={true}
        selectable={true}
      />
    </>
  );
}

type CalendarType = "month" | "week";
