import Image from "next/image";
import { Memory } from "hooks/memory/useGetMemory";

interface Props {
  memories: Memory[];
}

export default function MemoryList({ memories }: Props) {
  return (
    <div>
      {memories.map((memory, i) => (
        <div
          key={`${memory.date}-${memory.title}-${i}`}
          className="w-full border-1 flex flex-col items-center"
        >
          <p className="font-bold text-24 tracking-wider">{memory.title}</p>
          <p className="ml-auto mr-12">{memory.location}</p>
          <div className="flex gap-10 flex-wrap">
            {memory.uploadedImageUrls.map((url) => (
              <Image
                key={url}
                src={url}
                alt="uploaded image"
                width={100}
                height={100}
              />
            ))}
          </div>
          <p className="mr-auto p-8">{memory.content}</p>
        </div>
      ))}
    </div>
  );
}
