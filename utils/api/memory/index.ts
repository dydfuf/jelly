import { getCurrentGroup } from "../group";
import { getCurrentUser } from "../session";

export interface Memory {
  uploadedImageUrls: string[];
  title: string;
  location: string;
  content: string;
  date: string;
  userId: string;
}

export async function getMemories(): Promise<Memory[]> {
  const user = await getCurrentUser();
  const group = await getCurrentGroup();

  const userId = user?.id || "";
  const groupId = group?.userToGroup.groupId;

  const res = await fetch(
    `http://localhost:3000/api/user/${userId}/group/${groupId}/memory`,
    {
      next: { tags: ["memory"] },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json() as unknown as Memory[];
}

interface PostMemoryParams {
  content: string;
  title: string;
  date: Date;
  location: string;
  uploadedImageUrls: string[];
}

export async function postMemory(params: PostMemoryParams) {
  const user = await getCurrentUser();
  const group = await getCurrentGroup();

  const userId = user?.id || "";
  const groupId = group.userToGroup.groupId;

  const res = await fetch(
    `http://localhost:3000/api/user/${userId}/group/${groupId}/memory`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...params }),
    }
  );

  return res;
}

// export default function usePostMemory() {
//   const { data: userData } = useSession();
//   const { data: group } = useGetGroup();

//   const userId = userData?.user?.id || "";
//   const groupId = group?.userToGroup.groupId || "";

//   const queryCache = useQueryClient();

//   const { mutateAsync: createMemory, isLoading } = useMutation(
//     ["Create Memory", userId, groupId],
//     (data: PostMemoryParams) => postMemory(userId, groupId, data),
//     {
//       onMutate: () => {
//         setTimeout(() => {
//           queryCache.invalidateQueries({
//             queryKey: ["memory", userId, groupId],
//           });
//         }, 3000);
//       },
//     }
//   );

//   return { isLoading, createMemory };
// }

// const postMemory = (
//   userId: string,
//   groupId: string,
//   data: PostMemoryParams
// ) => {
//   return axios.post(`/api/user/${userId}/group/${groupId}/memory`, data);
// };
