import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import useGetGroup from "hooks/group/useGetGroup";
import useMemoryState from "stores/memory";

export default function useGetMemory() {
  const { data: userData } = useSession();
  const userId = userData?.user?.id || "";
  const { data: gruop } = useGetGroup();
  const groupId = gruop?.userToGroup.groupId || "";

  const [memories, initMemory] = useMemoryState((state) => [
    state.memories,
    state.initMemory,
  ]);

  const { data, isFetching, refetch } = useQuery(
    ["memory", userId, groupId],
    () => getMemories(userId, groupId),
    {
      enabled: !!userId && !!groupId,
      onSuccess: (data) => {
        if (data?.data) {
          initMemory(data?.data);
        }
      },
      initialData: () => {
        return { data: memories };
      },
    }
  );

  return { isFetching, memories: data?.data, refetch };
}

export interface Memory {
  uploadedImageUrls: string[];
  title: string;
  location: string;
  content: string;
  date: string;
  userId: string;
}
const getMemories = (userId: string, groupId: string) => {
  return axios.get<Memory[]>(`/api/user/${userId}/group/${groupId}/memory`);
};
