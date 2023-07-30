"use server";

import { revalidateTag } from "next/cache";
import { uploadImage } from "utils/api/image";
import { postMemory } from "utils/api/memory";

export const handleSubmit = async (formData: FormData) => {
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
};
