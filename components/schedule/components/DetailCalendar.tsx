import koLocale from "@fullcalendar/core/locales/ko";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { endOfDay, format, isWithinInterval, startOfDay } from "date-fns";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { Schedule } from "hooks/schedule/useGetSchedule";

interface Props {
  schedules: Schedule[];
  selectedDate: Date;
}

export default function DetailCalendar({ schedules, selectedDate }: Props) {
  const { data: userData } = useSession();
  const userId = userData?.user?.id || "";

  const ref = useRef<FullCalendar>(null);

  const events = schedules
    .filter((schedule) =>
      isWithinInterval(selectedDate, {
        start: startOfDay(new Date(schedule.startDate)),
        end: endOfDay(new Date(schedule.endDate)),
      })
    )
    .map((schedule) => ({
      title: schedule.title,
      start: schedule.isAllDay
        ? format(new Date(selectedDate), "yyyy-MM-dd")
        : schedule.startDate,
      end: schedule.isAllDay
        ? format(new Date(selectedDate), "yyyy-MM-dd")
        : schedule.endDate,
      allDay: schedule.isAllDay,
      ...(userId !== schedule.userId && { color: "red" }),
    }));

  useEffect(() => {
    if (ref.current) {
      ref.current.getApi().gotoDate(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div>
      <FullCalendar
        ref={ref}
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
        events={events}
      />
    </div>
  );
}
