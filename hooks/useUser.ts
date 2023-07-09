import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Params {
  id: string;
}

export default function useUser({ id }: Params) {
  const { data: userData, isLoading: isGetUserLoading } = useQuery(["user", id], () => getUserById(id), {
    enabled: !!id,
  });

  const isLoading = [isGetUserLoading].some((x) => x);

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
