import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { map } from "lodash-es";

export default function usePostCloudflareImage() {
  const { mutateAsync: getUploadUrl } = useMutation(
    ["get upload url"],
    getUploadUrlsApi
  );

  const { mutateAsync: uploadImage, isLoading: isUploadImageLoading } =
    useMutation(["upload cloudflare image"], async (photos: File[]) => {
      const { data } = await getUploadUrl(photos.length);
      const results: string[] = [];

      for (const i of map(new Array(photos.length), (_, i) => i)) {
        const formData = new FormData();
        formData.append("file", photos[i], photos[i].name);
        const { data: result } = await postCloudflareImage(
          data.uploadUrls[i],
          formData
        );
        results.push(result.result.variants[0] as string);
      }

      return results;
    });

  return {
    isLoading: isUploadImageLoading,
    uploadImage,
  };
}

const postCloudflareImage = (uploadUrl: string, file: FormData) => {
  return axios.post(uploadUrl, file);
};

interface _UploadUrls {
  uploadUrls: string[];
}

const getUploadUrlsApi = (count: number) => {
  return axios.post<_UploadUrls>("/api/image/upload-url", { count });
};
