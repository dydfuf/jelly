import { create } from "zustand";
import { Schedule } from "hooks/schedule/useGetSchedule";

interface ScheduleState {
  schedules: Schedule[];
  addSchedule: (schedule: Schedule[]) => void;
  initSchedule: (schedules: Schedule[]) => void;
}

const useScheduleState = create<ScheduleState>((set) => ({
  schedules: [],
  addSchedule: (schedule) =>
    set((state) => ({
      schedules: [...state.schedules, ...schedule],
    })),
  initSchedule: (schedules) => set(() => ({ schedules })),
}));

export default useScheduleState;
