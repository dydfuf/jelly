import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import useScheduleState from "stores/schedule";
import useGetGroup from "../group/useGetGroup";

export default function useGetSchedule() {
  const { data: userData } = useSession();
  const userId = userData?.user?.id || "";
  const { data: gruop } = useGetGroup();
  const groupId = gruop?.userToGroup.groupId || "";

  const [schedules, initSchedule] = useScheduleState((state) => [
    state.schedules,
    state.initSchedule,
  ]);

  const { isFetching, refetch, data } = useQuery(
    ["schedule", userId, groupId],
    () => getSchedules(userId, groupId),
    {
      enabled: !!userId && !!groupId,
      onSuccess: (data) => {
        if (data?.data) {
          initSchedule(data?.data);
        }
      },
      initialData: () => {
        return { data: schedules };
      },
    }
  );

  return { isFetching, refetch, schedules: data?.data };
}

export interface Schedule {
  title: string;
  startDate: string;
  endDate: string;
  content: string;
  groupId: string;
  recurringScheduleId?: string;
  isAllDay: boolean;
  userId: string;
}
const getSchedules = (userId: string, groupId: string) => {
  return axios.get<Schedule[]>(`/api/user/${userId}/group/${groupId}/schedule`);
};
