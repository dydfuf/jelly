import { format } from "date-fns";
import { groupBy, map } from "lodash-es";
import { Plan } from "hooks/plan/useGetPlan";
import PlanListItem from "./PlanListItem";
import { PlanShowType } from "../type";

interface Props {
  plans: Plan[];
  planShowType: PlanShowType;
}

export default function PlanList({ plans, planShowType }: Props) {
  const undecidedPlans = plans.filter((plan) => plan.isUndecided);

  const decidedPlans = plans.filter((plan) => !plan.isUndecided).reverse();

  const zippedByMonthPlans = decidedPlans.map((plan) => ({
    month: format(new Date(plan.startDate), "MM월"),
    plan,
  }));

  const mergedData = map(groupBy(zippedByMonthPlans, "month"), (group) => ({
    month: group[0].month,
    value: map(group, "plan"),
  }));

  return (
    <div className="flex flex-col gap-12">
      <PlanListItem title={"일정 미정"} plans={undecidedPlans} />
      {planShowType === "day" &&
        decidedPlans.map((plans, idx) => {
          const title = `${format(
            new Date(plans.startDate),
            "MM월 dd일"
          )} ~ ${format(new Date(plans.endDate), "MM월 dd일")}`;
          return (
            <PlanListItem
              key={`${title}-${idx}`}
              title={title}
              plans={[plans]}
            />
          );
        })}
      {planShowType === "month" &&
        mergedData.map((data) => (
          <PlanListItem
            key={data.month}
            title={data.month}
            plans={data.value}
          />
        ))}
    </div>
  );
}
