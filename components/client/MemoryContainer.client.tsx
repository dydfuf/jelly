"use client";

import { isSameDay } from "date-fns";
import { useState } from "react";
import { Memory } from "app/memory/page";
import Calendar from "components/common/calendar";
import MemoryList from "components/memory/components/MemoryList";

interface Props {
  memories: Memory[];
}

export default function MemoryContainer({ memories }: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateMemories = memories.filter((memory) =>
    isSameDay(new Date(selectedDate), new Date(memory.date))
  );

  return (
    <>
      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        events={memories}
      />
      <MemoryList memories={selectedDateMemories} />
    </>
  );
}
