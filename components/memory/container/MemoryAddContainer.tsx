import * as Form from "@radix-ui/react-form";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import usePostMemory from "hooks/memory/usePostMemory";
import usePostCloudflareImage from "hooks/usePostCloudflareImage";

export default function MemoryAddContainer() {
  const { createMemory, isLoading } = usePostMemory();
  const { uploadImage, isLoading: isUploading } = usePostCloudflareImage();
  const router = useRouter();

  // 이미지를 업로드 한다.
  // 업로드된 이미지 주소리스트를 넘겨준다.

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget));
    const formData = new FormData(event.currentTarget);

    const uploadedImageUrls = await uploadImage(
      formData.getAll("photo") as File[]
    );

    await createMemory({
      content: data.content as string,
      title: data.title as string,
      date: new Date(data.date as string) as Date,
      location: data.location as string,
      uploadedImageUrls,
    });

    router.push("/memory");
  };

  return (
    <div className="flex flex-col pt-12 px-8 max-w-[640px] mx-auto">
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
          <Form.Control asChild>
            <input
              className="w-full min-w-full rounded-4 text-black bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] h-40 p-4 appearance-none"
              type="file"
              accept="image/png, image/jpeg"
              multiple
            />
          </Form.Control>
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
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className="text-28 tracking-widest mt-24 border-4 rounded-4 bg-purple-200 shadow-[4px_4px_0px_0px_#000] border-black w-full h-60">
            {isUploading || isLoading ? "등록중" : "등록하기"}
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
