import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function usePutGroup() {
  const { data: userData } = useSession();
  const userId = userData?.user?.id || "";
  const queryCache = useQueryClient();

  const { mutateAsync: createGroupWithGroupId, isLoading } = useMutation(
    ["Put Group"],
    (groupId: string) => putGroup(userId, groupId),
    {
      onMutate: () => {
        setTimeout(() => {
          queryCache.invalidateQueries({ queryKey: ["group", userId] });
        }, 3000);
      },
    }
  );
  return { createGroupWithGroupId, isLoading };
}

const putGroup = (userId: string, groupId: string) => {
  return axios.put(`/api/user/${userId}/group/${groupId}`);
};
