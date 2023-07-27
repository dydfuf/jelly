import { isSameDay } from "date-fns";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Calendar from "components/common/calendar";
import useGetMemory from "hooks/memory/useGetMemory";
import MemoryList from "../components/MemoryList";

export default function MemoryContainer() {
  const { data: userData } = useSession();
  const _userId = userData?.user?.id || "";

  const { memories, isLoading } = useGetMemory();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateMemory = memories?.filter((memory) =>
    isSameDay(new Date(memory.date), selectedDate)
  );

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (!memories) {
    return <div>No Memroy</div>;
  }

  return (
    <div className="flex flex-col pt-12 px-8 max-w-[640px]">
      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        events={memories}
      />
      <MemoryList memories={selectedDateMemory || []} />
    </div>
  );
}
