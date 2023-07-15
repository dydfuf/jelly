import { format } from "date-fns";
import Image from "next/image";
import useGetMemory from "hooks/useGetMemory";

export default function MemoryContainer() {
  const { memories, isLoading } = useGetMemory();
  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (!memories) {
    return <div>No Memroy</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      {memories.map(({ title, content, location, uploadedImageUrls, date }) => (
        <div key={`${content}-${title}`} className="border-10">
          <p>date : {format(new Date(date), "yyyy-MM-dd")}</p>
          <p>location : {location}</p>
          <div className="flex gap-10">
            Images :
            {uploadedImageUrls.map((url) => (
              <Image
                key={url}
                src={url}
                alt="uploaded image"
                width={100}
                height={100}
              />
            ))}
          </div>
          <p>title : {title}</p>
          <p>content : {content}</p>
        </div>
      ))}
    </div>
  );
}
