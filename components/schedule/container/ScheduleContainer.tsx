import { useState } from "react";
import { env } from "env.mjs";
import useGetSchedule from "hooks/schedule/useGetSchedule";
import ScheduleCalendar from "../components/ScheduleCalendar";
import ScheduleList from "../components/ScheduleList";

export default function ScheduleContainer() {
  const { isFetching, refetch, schedules } = useGetSchedule();
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (!schedules) {
    return <div>No schedules</div>;
  }

  return (
    <div className="flex flex-col pt-12 px-8 max-w-[640px] mx-auto">
      <button onClick={sendNotification}>send</button>
      <button onClick={subscribeUser}>subscribe</button>
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

async function sendNotification() {
  try {
    const response = await fetch("/api/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

async function subscribeUser() {
  console.log("subscript");
  navigator.serviceWorker.ready.then((registration) => {
    console.log("register");
    registration.pushManager.getSubscription().then((subscription) => {
      if (subscription) {
        console.log("Already subscribed");
      } else {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.WEB_PUSH_PUBLIC_KEY,
          })
          .then((subscription) => {
            // save subscription on DB
            fetch("/api/subscribe", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(subscription),
            });
          });
      }
    });
  });
}
