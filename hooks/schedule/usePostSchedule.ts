import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { RecurringType } from "components/schedule/type";
import useGetGroup from "./group/useGetGroup";

export default function usePostPlan() {
  const { data: userData } = useSession();
  const { data: group } = useGetGroup();

  const userId = userData?.user?.id || "";
  const groupId = group?.userToGroup.groupId || "";

  const queryCache = useQueryClient();

  const { mutateAsync: createSchedule, isLoading } = useMutation(
    ["Create Schedule", userId, groupId],
    (data: PostScheduleParams) => postSchedule(userId, groupId, data),
    {
      onMutate: () => {
        setTimeout(() => {
          queryCache.invalidateQueries({
            queryKey: ["schedule", userId, groupId],
          });
        }, 3000);
      },
    }
  );

  return { isLoading, createSchedule };
}

export interface PostScheduleParams {
  allDay?: boolean;
  content: string;
  endTime: string;
  recurring: RecurringType;
  recurringEndTime: string;
  startTime: string;
  title: string;
}
const postSchedule = (
  userId: string,
  groupId: string,
  data: PostScheduleParams
) => {
  return axios.post(`/api/user/${userId}/group/${groupId}/schedule`, data);
};
