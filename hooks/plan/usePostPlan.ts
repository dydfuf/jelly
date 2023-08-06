import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import usePlanState from "stores/Plan";
import useGetGroup from "../group/useGetGroup";

export default function usePostMemory() {
  const { data: userData } = useSession();
  const { data: group } = useGetGroup();

  const userId = userData?.user?.id || "";
  const groupId = group?.userToGroup.groupId || "";

  const addPlan = usePlanState((state) => state.addPlan);

  const { mutateAsync: createPlan, isLoading } = useMutation(
    ["Create Plan", userId, groupId],
    (data: PostPlanParams) => postPlan(userId, groupId, data),
    {
      onSuccess: (data) => {
        if (data?.data) {
          addPlan({
            ...data?.data,
          });
        }
      },
    }
  );

  return { isLoading, createPlan };
}

export interface PostPlanParams {
  title: string;
  startDate?: string;
  endDate?: string;
  content: string;
  isUndecided: boolean;
}
const postPlan = (userId: string, groupId: string, data: PostPlanParams) => {
  return axios.post(`/api/user/${userId}/group/${groupId}/plan`, data);
};
