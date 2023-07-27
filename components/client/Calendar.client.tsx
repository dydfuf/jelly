"use client";

import { useState } from "react";
import { Memory } from "app/memory/page";
import Calendar from "components/common/calendar";

interface Props {
  memories: Memory[];
}

export default function ClientCalendar({ memories }: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Calendar
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      events={memories}
    />
  );
}
