import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import useMemoryState from "stores/memory";
import { Memory } from "./useGetMemory";
import useGetGroup from "../group/useGetGroup";

export default function usePostMemory() {
  const { data: userData } = useSession();
  const { data: group } = useGetGroup();

  const userId = userData?.user?.id || "";
  const groupId = group?.userToGroup.groupId || "";

  const addMemory = useMemoryState((state) => state.addMemory);

  const { mutateAsync: createMemory, isLoading } = useMutation(
    ["Create Memory", userId, groupId],
    (data: PostMemoryParams) => postMemory(userId, groupId, data),
    {
      onSuccess: (data) => {
        if (data?.data) {
          addMemory({
            ...data?.data,
          });
        }
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
  return axios.post<Memory>(
    `/api/user/${userId}/group/${groupId}/memory`,
    data
  );
};
