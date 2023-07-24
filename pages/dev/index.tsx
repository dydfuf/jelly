import { useState } from "react";
import Calendar from "components/common/calendar";
import MemoryList from "components/memory/components/MemoryList";
import { Memory } from "hooks/memory/useGetMemory";

export default function DevPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events: Memory[] = [
    {
      uploadedImageUrls: [
        "https://imagedelivery.net/yD1CrkDe5Xl7wWtp_piB4Q/012e2658-5c48-42bc-cb79-8864dd517000/public",
        "https://imagedelivery.net/yD1CrkDe5Xl7wWtp_piB4Q/4ab2401e-3fef-4207-f611-6b74dc3a1200/public",
      ],
      title: "123123",
      location: "123123",
      content: "123123",
      date: "2023-07-20T00:00:00.000Z",
      userId: "clk9weg7v0000i8zw3lgiiq1m",
    },
    {
      uploadedImageUrls: [
        "https://imagedelivery.net/yD1CrkDe5Xl7wWtp_piB4Q/012e2658-5c48-42bc-cb79-8864dd517000/public",
      ],
      title: "123123",
      location: "123123",
      content: "123123",
      date: "2023-07-21T00:00:00.000Z",
      userId: "clk9weg7v0000i8zw3lgiiq1m",
    },
  ];

  return (
    <main className="pt-12 px-8 max-w-[640px]">
      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        events={events}
      />
      <MemoryList memories={events} />
    </main>
  );
}
