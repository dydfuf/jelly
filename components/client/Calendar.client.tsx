"use client";

import { useState } from "react";
import Calendar from "components/common/calendar";
import { Memory } from "utils/api/memory";

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
