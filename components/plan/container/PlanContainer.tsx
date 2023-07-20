import useGetPlan from "hooks/plan/useGetPlan";

export default function PlanContainer() {
  const { plans, isLoading } = useGetPlan();
  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (!plans || plans.length === 0) {
    return <div>No schedules</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      {plans.map(({ title, startDate, endDate, content, groupId }) => (
        <div key={`${content}-${title}`} className="border-10">
          <p>title: {title}</p>
          <p>startDate: {startDate}</p>
          <p>endDate: {endDate}</p>
          <p>content : {content}</p>
          <p>groupId : {groupId}</p>
        </div>
      ))}
    </div>
  );
}
