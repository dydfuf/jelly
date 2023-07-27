import { use } from "react";
import MemoryContainer from "components/client/MemoryContainer.client";
import { getMemories } from "utils/api/memory";

export default function MemoryPage() {
  const memories = use(getMemories());

  return (
    <div className="flex flex-col pt-12 px-8 max-w-[640px]">
      <MemoryContainer memories={memories} />
    </div>
  );
}
