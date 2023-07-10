import { PropsWithChildren } from "react";
import useUser from "hooks/useUser";

export default function UserProvider({ children }: PropsWithChildren) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div> Jelly User Check ... </div>;
  }

  if (!user) {
    return <div> No User </div>;
  }

  return <>{children}</>;
}
