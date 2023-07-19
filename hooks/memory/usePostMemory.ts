import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import useGetGroup from "../group/useGetGroup";

export default function usePostMemory() {
  const { data: userData } = useSession();
  const { data: group } = useGetGroup();

  const userId = userData?.user?.id || "";
  const groupId = group?.userToGroup.groupId || "";

  const queryCache = useQueryClient();

  const { mutateAsync: createMemory, isLoading } = useMutation(
    ["Create Memory", userId, groupId],
    (data: PostMemoryParams) => postMemory(userId, groupId, data),
    {
      onMutate: () => {
        setTimeout(() => {
          queryCache.invalidateQueries({
            queryKey: ["memory", userId, groupId],
          });
        }, 3000);
      },
    }
  );

  return { isLoading, createMemory };
}

interface PostMemoryParams {
  content: string;
  title: string;
  date: Date;
  location: string;
  uploadedImageUrls: string[];
}
const postMemory = (
  userId: string,
  groupId: string,
  data: PostMemoryParams
) => {
  return axios.post(`/api/user/${userId}/group/${groupId}/memory`, data);
};
