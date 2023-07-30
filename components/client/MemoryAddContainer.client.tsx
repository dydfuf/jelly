import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { uploadImage } from "utils/api/image";
import { postMemory } from "utils/api/memory";
import * as Form from "./FormClient.client";
import GoToMemory from "./GoToMemory";
import Submit from "./Submit.client";

export default function MemoryAddContainer() {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const data = Object.fromEntries(formData);
    const { uploadedImageUrls } = await uploadImage(formData);
    await postMemory({
      content: data.content as string,
      title: data.title as string,
      date: new Date(data.date as string) as Date,
      location: data.location as string,
      uploadedImageUrls,
    });

    revalidateTag("memory");
    redirect("/memory");
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form.Root
        className="w-full"
        encType="multipart/form-data"
        action={handleSubmit}
      >
        <Form.Field className="grid mb-10" name="date">
          <div className="flex items-baseline justify-between">
            <Form.Label className="leading-35" htmlFor="date">
              날짜
            </Form.Label>
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
              id="date"
              type="date"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-10" name="location">
          <div className="flex items-baseline justify-between">
            <Form.Label className="leading-35" htmlFor="location">
              장소
            </Form.Label>
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
              id="location"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-10" name="photo">
          <div className="flex items-baseline justify-between">
            <Form.Label className="leading-35" htmlFor="photo">
              사진
            </Form.Label>
            <Form.Message className="text-12" match="valueMissing">
              사진을 등록해주세요
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
              id="photo"
              type="file"
              accept="image/png, image/jpeg"
              multiple
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-10" name="title">
          <div className="flex items-baseline justify-between">
            <Form.Label className="leading-35" htmlFor="title">
              제목
            </Form.Label>
            <Form.Message className="text-12" match="valueMissing">
              제목을 입력해주세요
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
              id="title"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid mb-10" name="content">
          <div className="flex items-baseline justify-between">
            <Form.Label className="leading-35" htmlFor="content">
              내용
            </Form.Label>
            <Form.Message className="text-12" match="valueMissing">
              내용을 입력해주세요
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea
              className="w-full inline-flex items-center justify-center rounded-4 text-white bg-slate-300 border-1"
              id="content"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <Submit />
        </Form.Submit>
      </Form.Root>
      <GoToMemory />
    </Suspense>
  );
}
