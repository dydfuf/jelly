import { getCurrentUser } from "../session";

interface _Group {
  userToGroup: {
    id: string;
    userId: string;
    groupId: string;
  };
  count: number;
}

async function getGroup(): Promise<_Group> {
  const user = await getCurrentUser();
  const userId = user?.id || "";

  const res = await fetch(`http://localhost:3000/api/user/${userId}/group`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json() as unknown as _Group;
}

export async function getCurrentGroup() {
  const group = await getGroup();

  return group;
}
