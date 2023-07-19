import * as Form from "@radix-ui/react-form";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import usePostCloudflareImage from "hooks/usePostCloudflareImage";
import usePostMemory from "hooks/memory/usePostMemory";

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
    <>
      <Form.Root
        className="w-full"
        onSubmit={(event) => {
          handleSubmit(event);

          event.preventDefault();
        }}
        encType="multipart/form-data"
      >
        <Form.Field className="grid mb-10" name="date">
          <div className="flex items-baseline justify-between">
            <Form.Label className="leading-35">날짜</Form.Label>
            <Form.Message className="text-12" match="valueMissing">
              날짜를 입력해주세요
            </Form.Message>
            <Form.Message className="text-12" match="typeMismatch">
              유효한 날짜를 입력해주세요
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
              type="date"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-10" name="location">
          <div className="flex items-baseline justify-between">
            <Form.Label className="leading-35">장소</Form.Label>
            <Form.Message className="text-12" match="valueMissing">
              장소를 입력해주세요
            </Form.Message>
            <Form.Message className="text-12" match="typeMismatch">
              유효한 장소를 입력해주세요
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-10" name="photo">
          <div className="flex items-baseline justify-between">
            <Form.Label className="leading-35">사진</Form.Label>
            <Form.Message className="text-12" match="valueMissing">
              사진을 등록해주세요
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
              type="file"
              accept="image/png, image/jpeg"
              multiple
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-10" name="title">
          <div className="flex items-baseline justify-between">
            <Form.Label className="leading-35">제목</Form.Label>
            <Form.Message className="text-12" match="valueMissing">
              제목을 입력해주세요
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-10" name="content">
          <div className="flex items-baseline justify-between">
            <Form.Label className="leading-35">내용</Form.Label>
            <Form.Message className="text-12" match="valueMissing">
              내용을 입력해주세요
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea
              className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className="border-1 w-full">
            {isUploading || isLoading ? "등록중" : "등록하기"}
          </button>
        </Form.Submit>
      </Form.Root>
    </>
  );
}
