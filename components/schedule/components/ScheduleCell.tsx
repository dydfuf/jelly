import { DayCellContentArg } from "@fullcalendar/core";
import { endOfDay, isSameDay, isWithinInterval, startOfDay } from "date-fns";
import { Schedule } from "hooks/schedule/useGetSchedule";
import { cn } from "utils/common";

interface Props extends DayCellContentArg {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  events: Schedule[];
}

export default function ScheduleCell(props: Props) {
  const { dayNumberText, date, setSelectedDate, selectedDate, events } = props;

  const schedules = events
    .filter((event) =>
      isWithinInterval(date, {
        start: startOfDay(new Date(event.startDate)),
        end: endOfDay(new Date(event.endDate)),
      })
    )
    .slice(0, 2);

  const handleDayClick = () => {
    setSelectedDate(date);
  };

  return (
    <div
      className={cn("flex flex-col gap-y-4 cursor-pointer h-full", {
        "bg-black/10 rounded-4": isSameDay(selectedDate, date),
      })}
      onClick={handleDayClick}
    >
      <span className="text-12 text-center">
        {dayNumberText.replace("일", "")}
      </span>
      <div className="w-full flex flex-col overflow-hidden gap-y-2">
        {schedules.map((schedule) => (
          <div
            key={schedule.title}
            className="w-full  text-8 bg-blue-300 rounded-4 px-4 line-clamp-2 shrink-0"
          >
            {schedule.title}
          </div>
        ))}
      </div>
    </div>
  );
}
