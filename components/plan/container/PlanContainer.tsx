import { useState } from "react";
import useGetPlan from "hooks/plan/useGetPlan";
import { cn } from "utils/common";
import PlanList from "../components/PlanList";
import PlanTitle from "../components/PlanTitle";
import { PlanShowType } from "../type";

export default function PlanContainer() {
  const { plans } = useGetPlan();
  const [planShowType, setPlanShowType] = useState<PlanShowType>("month");

  if (!plans) {
    return <div>No schedules</div>;
  }

  return (
    <div className="flex flex-col pt-12 px-8 max-w-[640px] mx-auto">
      <PlanTitle />
      <div className="flex ml-auto">
        <button
          className={cn("w-60 border-1 rounded-6", {
            "bg-slate-400": planShowType === "month",
          })}
          onClick={() => setPlanShowType("month")}
        >
          월
        </button>
        <button
          className={cn("w-60 border-1 rounded-6", {
            "bg-slate-400": planShowType === "day",
          })}
          onClick={() => setPlanShowType("day")}
        >
          일
        </button>
      </div>

      <PlanList plans={plans} planShowType={planShowType} />
    </div>
  );
}
