import useGetSchedule from "hooks/schedule/useGetSchedule";

export default function ScheduleContainer() {
  const { schedules, isLoading } = useGetSchedule();
  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (!schedules || schedules.length === 0) {
    return <div>No schedules</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      {schedules.map(
        ({
          title,
          startDate,
          endDate,
          content,
          groupId,
          recurringScheduleId,
        }) => (
          <div key={`${content}-${title}`} className="border-10">
            <p>title: {title}</p>
            <p>startDate: {startDate}</p>
            <p>endDate: {endDate}</p>
            <p>content : {content}</p>
            <p>groupId : {groupId}</p>
            <p>recurringScheduleId : {recurringScheduleId}</p>
          </div>
        )
      )}
    </div>
  );
}
