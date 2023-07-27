import { redirect } from "next/navigation";
import { PropsWithChildren, use } from "react";
import { getCurrentUser } from "utils/api/session";

export default function AuthChecker({ children }: PropsWithChildren) {
  const user = use(getCurrentUser());

  if (!user) {
    return redirect("/api/auth/signin");
  }

  return <>{children}</>;
}
