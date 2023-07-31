import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { RecurringType } from "components/schedule/type";
import useGetGroup from "hooks/group/useGetGroup";
import useScheduleState from "stores/schedule";

export default function usePostPlan() {
  const { data: userData } = useSession();
  const { data: group } = useGetGroup();

  const userId = userData?.user?.id || "";
  const groupId = group?.userToGroup.groupId || "";

  const addSchedule = useScheduleState((state) => state.addSchedule);

  const { mutateAsync: createSchedule, isLoading } = useMutation(
    ["Create Schedule", userId, groupId],
    (data: PostScheduleParams) => postSchedule(userId, groupId, data),
    {
      onSuccess: (data) => {
        if (data?.data) {
          addSchedule({
            ...data?.data,
          });
        }
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
