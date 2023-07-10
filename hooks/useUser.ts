import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function useUser() {
  const { data } = useSession();
  const userId = data?.user?.id || "";

  const { data: userData, isLoading } = useQuery(["user", userId], () => getUserById(userId), {
    enabled: !!userId,
  });

  return {
    user: userData?.data.user,
    isLoading,
  };
}

interface _User {
  user: {
    id: string;
    name: string;
    email: string;
    userHashCode?: string;
  };
}

const getUserById = (id: string) => {
  return axios.get<_User>(`/api/user/${id}`);
};
