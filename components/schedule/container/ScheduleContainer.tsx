import { useState } from "react";
import useGetSchedule from "hooks/schedule/useGetSchedule";
import ScheduleCalendar from "../components/ScheduleCalendar";

export default function ScheduleContainer() {
  const { schedules } = useGetSchedule();
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (!schedules) {
    return <div>No schedules</div>;
  }

  return (
    <div className="flex flex-col pt-12 px-8 max-w-[640px] mx-auto">
      <ScheduleCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        events={schedules}
      />
    </div>
  );
}
