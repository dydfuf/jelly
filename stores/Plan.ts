import { create } from "zustand";
import { Plan } from "hooks/plan/useGetPlan";

interface PlanState {
  plans: Plan[];
  addPlan: (plan: Plan) => void;
  initPlans: (plans: Plan[]) => void;
}

const usePlanState = create<PlanState>((set) => ({
  plans: [],
  addPlan: (schedule) =>
    set((state) => ({
      plans: [...state.plans, schedule],
    })),
  initPlans: (plans) => set(() => ({ plans })),
}));

export default usePlanState;
