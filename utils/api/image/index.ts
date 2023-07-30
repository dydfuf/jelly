import { map } from "lodash-es";

const getUploadUrlsApi = async (count: number) => {
  const res = await fetch("http://localhost:3000/api/image/upload-url", {
    method: "POST",
    body: JSON.stringify({ count }),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  return res.json() as unknown as _UploadUrls;
};

interface _UploadUrls {
  uploadUrls: string[];
}

const uploadImageToCloudFlare = async (url: string, formData: FormData) => {
  const res = await fetch(url, {
    method: "POST",
    body: formData,
    cache: "no-cache",
  });

  return res.json();
};

export const uploadImage = async (formData: FormData) => {
  const files = formData.getAll("photo");
  const { uploadUrls } = await getUploadUrlsApi(files.length);

  const uploadedImageUrls: string[] = [];

  for (const i of map(new Array(files.length), (_, i) => i)) {
    const formData = new FormData();
    formData.append("file", files[i] as Blob, crypto.randomUUID());
    const { result } = (await uploadImageToCloudFlare(
      uploadUrls[i],
      formData
    )) as any;
    console.log({ result });
    uploadedImageUrls.push(result.variants[0]);
  }

  return { uploadedImageUrls };
};
