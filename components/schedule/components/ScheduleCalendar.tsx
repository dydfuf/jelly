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
  isFetching: boolean;
  refetch: () => void;
}

export default function ScheduleCalendar({
  selectedDate,
  setSelectedDate,
  events,
  isFetching,
  refetch,
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
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="flex flex-col schedule">
      <div className="h-30 flex w-full">
        <div className="h-30 mr-auto pl-20 flex items-center">
          {isFetching && "일정 가져오는 중 ..."}
          {!isFetching && (
            <div onClick={() => refetch()}>일정 업데이트하기</div>
          )}
        </div>
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
    </div>
  );
}

type CalendarType = "month" | "week";
