import koLocale from "@fullcalendar/core/locales/ko";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";
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
      start: schedule.startDate,
      end: schedule.endDate,
      allDay: schedule.isAllDay,
      ...(userId !== schedule.userId && { color: "red" }),
    }));

  console.log(events);

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
