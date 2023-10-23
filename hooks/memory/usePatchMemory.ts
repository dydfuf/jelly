import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Memory } from "./useGetMemory";
import useGetGroup from "../group/useGetGroup";

export default function usePatchMemory() {
  const { data: userData } = useSession();
  const { data: group } = useGetGroup();

  const userId = userData?.user?.id || "";
  const groupId = group?.userToGroup.groupId || "";

  const queryClient = useQueryClient();

  const { mutateAsync: updateMemory, isLoading } = useMutation(
    ["Patch Memory", userId, groupId],
    (data: PatchMemoryParams) => postMemory(userId, groupId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["memory", userId, groupId]);
      },
    }
  );

  return { isLoading, updateMemory };
}

interface PatchMemoryParams {
  id: string;
  content?: string;
  title?: string;
  date?: Date;
  location?: string;
  uploadedImageUrls?: string[];
}
const postMemory = (
  userId: string,
  groupId: string,
  data: PatchMemoryParams
) => {
  return axios.patch<Memory>(
    `/api/user/${userId}/group/${groupId}/memory`,
    data
  );
};
