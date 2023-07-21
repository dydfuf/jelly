import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function useGetGroup() {
  const { data: userData } = useSession();
  const userId = userData?.user?.id || "";

  const { data, isLoading, refetch } = useQuery(
    ["group", userId],
    () => getGroupByUserId(userId),
    {
      enabled: !!userId,
      initialData: () => {
        return {
          data: {
            userToGroup: {
              id: "clk9wewa3000ei8zwk5eszhy5",
              userId: "clk9weg7v0000i8zw3lgiiq1m",
              groupId: "clk9wev6k000ci8zwsqf5uv1p",
            },
            count: 2,
          },
        };
      },
    }
  );

  return { data: data?.data, isLoading: isLoading, refetch };
}

interface _Group {
  userToGroup: {
    id: string;
    userId: string;
    groupId: string;
  };
  count: number;
}

const getGroupByUserId = (userId: string) => {
  return axios.get<_Group>(`/api/user/${userId}/group`);
};
