import { isSameDay } from "date-fns";
import { useState } from "react";
import MemoryCalendar from "components/memory/components/MemoryCalendar";
import useGetMemory from "hooks/memory/useGetMemory";
import useMemoryState from "stores/memory";
import MemoryList from "../components/MemoryList";

export default function MemoryContainer() {
  const { isFetching, refetch } = useGetMemory();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const memories = useMemoryState((state) => state.memories);

  const selectedDateMemory = memories?.filter((memory) =>
    isSameDay(new Date(memory.date), selectedDate)
  );

  if (!memories) {
    return <div>No Memroy</div>;
  }

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="flex flex-col pt-12 px-8 max-w-[640px] mx-auto memory">
      <div className="h-30 mr-auto pl-20 flex items-center">
        {isFetching && "추억 가져오는 중 ..."}
        {!isFetching && <div onClick={() => refetch()}>추억 업데이트하기</div>}
      </div>
      <MemoryCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        events={memories}
      />
      <div className="w-[calc(100%_-_16px)] h-4 bg-black rounded-full mx-auto" />
      <MemoryList memories={selectedDateMemory || []} />
    </div>
  );
}
