import { isBefore } from "date-fns";
import MemoryList from "components/memory/components/MemoryList";
import useGetMemory from "hooks/memory/useGetMemory";

export default function MemoriesContainer() {
  const { memories } = useGetMemory();

  const s = memories.sort((a, b) => {
    if (isBefore(new Date(a.date), new Date(b.date))) {
      return 1;
    }
    return 0;
  });

  return <MemoryList memories={s || []} showDate />;
}
