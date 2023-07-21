import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function useUser() {
  const { data } = useSession();
  const userId = data?.user?.id || "";

  const { data: userData, isLoading } = useQuery(
    ["user", userId],
    () => getUserById(userId),
    {
      enabled: !!userId,
      initialData: () => {
        return {
          data: {
            user: {
              id: "clk9weg7v0000i8zw3lgiiq1m",
              name: "최용열",
              email: "dydfuf38@gmail.com",
              emailVerified: null,
              image:
                "https://lh3.googleusercontent.com/a/AAcHTtfBBfbHwQooYk5HUrfuM9gzfY7JEl2RaAz-X-kJPJe4=s96-c",
            },
          },
        };
      },
    }
  );

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
  };
}

const getUserById = (id: string) => {
  return axios.get<_User>(`/api/user/${id}`);
};
