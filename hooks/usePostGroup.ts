import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function usePostgroup() {
  const { data: userData } = useSession();
  const userId = userData?.user?.id || "";
  const queryCache = useQueryClient();

  const { mutateAsync: createGroup, isLoading } = useMutation(["Create Group", userId], () => postGroup(userId), {
    onMutate: () => {
      setTimeout(() => {
        queryCache.invalidateQueries({ queryKey: ["group", userId] });
      }, 3000);
    },
  });

  return { isLoading, createGroup };
}

const postGroup = (userId: string) => {
  return axios.post(`/api/group/${userId}`);
};
