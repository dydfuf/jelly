import { use } from "react";
import ClientCalendar from "components/client/Calendar.client";
import MemoryContainer from "components/client/MemoryContainer.client";
import MemoryList from "components/memory/components/MemoryList";
import { getCurrentGroup } from "utils/group";
import { getCurrentUser } from "utils/session";

export interface Memory {
  uploadedImageUrls: string[];
  title: string;
  location: string;
  content: string;
  date: string;
  userId: string;
}

async function getMemories(): Promise<Memory[]> {
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

export default function MemoryPage() {
  const memories = use(getMemories());

  return (
    <div className="flex flex-col pt-12 px-8 max-w-[640px]">
      <MemoryContainer memories={memories} />
    </div>
  );
}
