import { Plan } from "hooks/plan/useGetPlan";

interface Props {
  title: string;
  plans: Plan[];
}

export default function PlanListItem({ title, plans }: Props) {
  return (
    <div className="flex flex-col">
      <p className="text-20 font-bold">{title}</p>
      <div className="flex flex-col bg-gray-100 p-12 gap-y-8">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className="border-1 border-black bg-white flex flex-col px-20 py-8"
          >
            <p className="font-semibold text-center">{plan.title}</p>
            <div className="h-1 w-full bg-black my-8" />
            <p className="text-12">{plan.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
