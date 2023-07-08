import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";
import useUser from "hooks/useUser";

export default function UserProvider({ children }: PropsWithChildren) {
  const { data } = useSession();

  const { user, group, isLoading } = useUser({ id: data?.user?.id || "" });

  if (isLoading) {
    return <div> Jelly User Check ... </div>;
  }

  if (!group?.groupId) {
    return <div> You dont have any group </div>;
  }

  return <>{children}</>;
}
