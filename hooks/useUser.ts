import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Params {
  id: string;
}

export default function useUser({ id }: Params) {
  const { data: userData, isLoading: isGetUserLoading } = useQuery(["user", id], () => getUserById(id), {
    enabled: !!id,
  });

  const { data: groupData, isLoading: isGetGroupLoading } = useQuery(["group", id], () => getGroupByUserId(id), {
    enabled: !!id && !!userData?.data,
  });

  const isLoading = [isGetUserLoading, isGetGroupLoading].some((x) => x);

  return {
    user: userData?.data,
    group: groupData?.data,
    isLoading,
  };
}

interface _User {
  id: string;
  name: string;
  email: string;
  userHashCode?: string;
}

const getUserById = (id: string) => {
  return axios.get<_User>(`/api/user/${id}`);
};

interface _Group {
  groupId: string;
}

const getGroupByUserId = (id: string) => {
  return axios.get<_Group>(`/api/user/${id}/group`);
};

const postGroup = (userId: string) => {
  return axios.post(``);
};
