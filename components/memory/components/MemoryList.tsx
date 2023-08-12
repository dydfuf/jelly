import Image from "next/image";
import useDeleteMemory from "hooks/memory/useDeleteMemory";
import { Memory } from "hooks/memory/useGetMemory";

interface Props {
  memories: Memory[];
}

export default function MemoryList({ memories }: Props) {
  const { deleteMemory } = useDeleteMemory();

  const handleMemoryDelete = (memoryId: string) => {
    deleteMemory({ memoryId });
  };

  return (
    <div className="mx-8 mt-20 pb-40 gap-y-20 flex flex-col">
      {memories.map((memory) => (
        <div
          key={`${memory.date}-${memory.title}`}
          className="w-full border-4 border-black flex flex-col items-center shadow-[4px_4px_0px_0px_#000] bg-white"
        >
          <div
            className="ml-auto mt-4 mr-6 bg-red-200 flex items-center justify-center rounded-full w-20 h-20 border-1 border-black shadow-[2px_2px_0px_0px_#000]"
            onClick={() => {
              handleMemoryDelete(memory.id);
            }}
          >
            X
          </div>
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
          <p className="mr-auto p-8 whitespace-pre-wrap">{memory.content}</p>
        </div>
      ))}
      {memories.length === 0 && (
        <div className="text-center mt-20">
          아직 추억이 없어요.
          <br />
          우측 상단의 + 아이콘을 클릭하여 추억을 등록할 수 있어요.
        </div>
      )}
    </div>
  );
}
