import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import useMemoryState from "stores/memory";
import useGetGroup from "../group/useGetGroup";

export default function useDeleteMemory() {
  const { data: userData } = useSession();
  const { data: group } = useGetGroup();

  const userId = userData?.user?.id || "";
  const groupId = group?.userToGroup.groupId || "";

  const _deleteMemory = useMemoryState((state) => state.deleteMemory);

  const { mutateAsync, isLoading } = useMutation(
    ["Delete Memory", userId, groupId],
    (data: DeleteMemoryParams) => deleteMemoryAPI(userId, groupId, data),
    {
      onMutate: (data) => {
        _deleteMemory(data?.memoryId);
      },
    }
  );

  return { isLoading, deleteMemory: mutateAsync };
}

interface DeleteMemoryParams {
  memoryId: string;
}
const deleteMemoryAPI = (
  userId: string,
  groupId: string,
  data: DeleteMemoryParams
) => {
  return axios.delete<{ memoryId: string }>(
    `/api/user/${userId}/group/${groupId}/memory`,
    {
      data,
    }
  );
};
