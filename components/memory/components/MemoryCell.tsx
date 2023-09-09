import { DayCellContentArg } from "@fullcalendar/core";
import { isSameDay } from "date-fns";
import Image from "next/image";
import { Memory } from "hooks/memory/useGetMemory";
import { cn } from "utils/common";

interface Props extends DayCellContentArg {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  events: Memory[];
}

export default function MemoryCell(props: Props) {
  const { dayNumberText, date, setSelectedDate, selectedDate, events } = props;

  const images = events
    .filter((event) => isSameDay(new Date(event.date), date))
    .flatMap((event) => event.uploadedImageUrls)
    .slice(0, 2);

  const handleDayClick = () => {
    setSelectedDate(date);
  };

  return (
    <div
      className={cn("flex flex-col gap-y-4 cursor-pointer h-full", {
        "bg-yellow-100 border-1 border-black shadow-[2px_2px_0px_0px_#000]":
          isSameDay(selectedDate, date),
      })}
      onClick={handleDayClick}
    >
      <span className="text-12 text-center">
        {dayNumberText.replace("일", "")}
      </span>
      <div
        className={cn("flex w-full h-full px-4 gap-x-2", {
          "justify-center": images.length === 1,
        })}
      >
        {images.length > 0 &&
          images.map((image) => (
            <Image
              key={image}
              src={image}
              width={0}
              height={0}
              sizes="100vh"
              className="w-auto h-1/2 rounded-4"
              alt="memory-image"
            />
          ))}
      </div>
    </div>
  );
}
