import { isBefore } from "date-fns";
import MemoryList from "components/memory/components/MemoryList";
import useGetMemory from "hooks/memory/useGetMemory";

export default function MemoriesContainer() {
  const { memories } = useGetMemory();

  const sortedMemories =
    memories.sort((a, b) => {
      if (isBefore(new Date(b.date), new Date(a.date))) {
        return -1;
      }
      return 0;
    }) || [];

  return (
    <div>
      <p className="text-center">{`총 ${sortedMemories.length}개의 추억`}</p>
      <MemoryList memories={sortedMemories} showDate />
    </div>
  );
}
