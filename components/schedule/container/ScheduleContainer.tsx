import { useState } from "react";
import useGetSchedule from "hooks/schedule/useGetSchedule";
import ScheduleCalendar from "../components/ScheduleCalendar";
import ScheduleList from "../components/ScheduleList";

export default function ScheduleContainer() {
  const { isFetching, refetch, schedules } = useGetSchedule();
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (!schedules) {
    return <div>No schedules</div>;
  }

  async function showNotification() {
    const result = await Notification.requestPermission();
    if (result === "granted") {
      console.log({ result });
      const noti = new Notification("Hello!", {
        body: "It’s me.",
      });
      console.log(noti);
    }
  }

  return (
    <div className="flex flex-col pt-12 px-8 max-w-[640px] mx-auto">
      <button onClick={showNotification}>노티</button>
      <ScheduleCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        events={schedules}
        isFetching={isFetching}
        refetch={refetch}
      />
      <ScheduleList schedules={schedules} selectedDate={selectedDate} />
    </div>
  );
}
