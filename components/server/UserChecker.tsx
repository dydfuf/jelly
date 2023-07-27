import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import { getCurrentUser } from "utils/api/session";

interface _User {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

async function getUser({ id }: { id: string }): Promise<_User> {
  const res = await fetch(`http://localhost:3000/api/user/${id}`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json() as unknown as _User;
}

export default async function UserChecker({ children }: PropsWithChildren) {
  const user = await getCurrentUser();

  const data = await getUser({ id: user?.id || "" });

  if (!data.user) {
    return notFound();
  }

  return <>{children}</>;
}
