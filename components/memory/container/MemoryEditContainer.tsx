import * as Form from "@radix-ui/react-form";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import useGetMemory from "hooks/memory/useGetMemory";

import usePatchMemory from "hooks/memory/usePatchMemory";
import useDragScroll from "hooks/useDragScroll";
import usePostCloudflareImage from "hooks/usePostCloudflareImage";

export default function MemoryEditContainer() {
  const { memories } = useGetMemory();
  const router = useRouter();
  const { memoryId } = router.query;

  const memory = memories.filter((memory) => memory.id === String(memoryId))[0];

  const { updateMemory, isLoading } = usePatchMemory();
  const { uploadImage, isLoading: isUploading } = usePostCloudflareImage();

  const scrollRef = useDragScroll();

  const [willUploadFileUrls, setWillUploadFileUrls] = useState<string[]>([]);

  const handleWillUploadFileDeleteClick = (url: string) => {
    const idx = willUploadFileUrls.indexOf(url);
    setWillUploadFileUrls((prev) =>
      prev.slice(0, idx).concat(prev.slice(idx + 1))
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget));

    await updateMemory({
      id: memoryId as string,
      content: data.content as string,
      title: data.title as string,
      date: new Date(data.date as string) as Date,
      location: data.location as string,
      uploadedImageUrls: willUploadFileUrls,
    });

    router.push("/memory");
  };

  useEffect(() => {
    if (memory) {
      setWillUploadFileUrls(memory.uploadedImageUrls);
    }
  }, [memory]);

  if (!memory) {
    return <></>;
  }

  return (
    <div className="flex flex-col pt-12 px-8 max-w-[640px] mx-auto pb-40">
      <Form.Root
        className="w-full flex flex-col gap-y-12"
        onSubmit={(event) => {
          handleSubmit(event);

          event.preventDefault();
        }}
        encType="multipart/form-data"
      >
        <Form.Field className="grid mb-10" name="date">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-20 leading-30">날짜</Form.Label>
            <Form.Message className="text-12" match="valueMissing">
              날짜를 입력해주세요
            </Form.Message>
            <Form.Message className="text-12" match="typeMismatch">
              유효한 날짜를 입력해주세요
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="w-full min-w-full rounded-4 text-black bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] h-40 p-4 appearance-none"
              type="date"
              defaultValue={format(new Date(memory.date), "yyyy-MM-dd")}
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-10" name="location">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-20 leading-30">장소</Form.Label>
            <Form.Message className="text-12" match="valueMissing">
              장소를 입력해주세요
            </Form.Message>
            <Form.Message className="text-12" match="typeMismatch">
              유효한 장소를 입력해주세요
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="w-full min-w-full rounded-4 text-black bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] h-40 p-4 appearance-none"
              defaultValue={memory.location}
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-10" name="title">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-20 leading-30">제목</Form.Label>
            <Form.Message className="text-12" match="valueMissing">
              제목을 입력해주세요
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="w-full min-w-full rounded-4 text-black bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] h-40 p-4 appearance-none	"
              defaultValue={memory.title}
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-10" name="photo">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-20 leading-30">사진</Form.Label>
            <Form.Message className="text-12" match="valueMissing">
              사진을 등록해주세요
            </Form.Message>
          </div>
          <div
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="px-8 w-full overflow-x-scroll hide-scrollbar"
            ref={scrollRef}
          >
            <div className="w-max gap-x-20 flex mt-15">
              {willUploadFileUrls.length > 0 &&
                willUploadFileUrls.map((url) => (
                  <div
                    key={url}
                    className="w-200 h-200 relative rounded-4 border-4 border-dashed border-black flex"
                    onClick={() => handleWillUploadFileDeleteClick(url)}
                  >
                    <div className="bg-red-200 flex items-center justify-center rounded-full w-30 h-30 border-1 border-black absolute right-2 top-0 translate-x-1/2 -translate-y-1/2 z-[1000] shadow-[2px_2px_0px_0px_#000]">
                      X
                    </div>
                    <Image
                      src={url}
                      className="object-contain"
                      width={300}
                      height={300}
                      alt="willUploadImage"
                    />
                  </div>
                ))}
              <div className="w-200 h-200 rounded-4 text-black bg-white border-4 border-dashed border-black p-4 appearance-none flex">
                <label
                  className="w-full h-full flex items-center justify-center"
                  htmlFor="photo-input"
                >
                  <div className="whitespace-pre-line text-center">
                    {isUploading
                      ? "사진을 업로딩 중입니다."
                      : "여기를 클릭하여\n 사진을 등록해보세요"}
                  </div>
                </label>
                <Form.Control asChild>
                  <input
                    className="hidden"
                    type="file"
                    accept="image/png, image/jpeg"
                    multiple
                    id="photo-input"
                    onChange={async (event) => {
                      const files = Array.from(event.target.files as FileList);
                      const uploadedImageUrls = await uploadImage(files);
                      setWillUploadFileUrls((prev) => [
                        ...prev,
                        ...uploadedImageUrls,
                      ]);
                    }}
                  />
                </Form.Control>
              </div>
            </div>
          </div>
        </Form.Field>

        <Form.Field className="grid mb-10" name="content">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-20 leading-30">내용</Form.Label>
            <Form.Message className="text-12" match="valueMissing">
              내용을 입력해주세요
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea
              className="w-full min-w-full rounded-4 text-black bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] h-160 p-4 appearance-none"
              defaultValue={memory.content}
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className="text-28 tracking-widest mt-24 border-4 rounded-4 bg-purple-200 shadow-[4px_4px_0px_0px_#000] border-black w-full h-60">
            {isLoading ? "수정중" : "수정하기"}
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
