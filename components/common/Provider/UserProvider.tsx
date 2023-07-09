import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";
import useUser from "hooks/useUser";

export default function UserProvider({ children }: PropsWithChildren) {
  const { data } = useSession();

  const { user, isLoading } = useUser({ id: data?.user?.id || "" });

  if (isLoading) {
    return <div> Jelly User Check ... </div>;
  }

  if (!user) {
    return <div> No User </div>;
  }

  return <>{children}</>;
}
