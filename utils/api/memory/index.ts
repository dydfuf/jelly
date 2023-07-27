import { getCurrentGroup } from "../group";
import { getCurrentUser } from "../session";

export interface Memory {
  uploadedImageUrls: string[];
  title: string;
  location: string;
  content: string;
  date: string;
  userId: string;
}

export async function getMemories(): Promise<Memory[]> {
  const user = await getCurrentUser();
  const group = await getCurrentGroup();

  const userId = user?.id || "";
  const groupId = group?.userToGroup.groupId;

  const res = await fetch(
    `http://localhost:3000/api/user/${userId}/group/${groupId}/memory`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json() as unknown as Memory[];
}
