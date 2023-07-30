"use client";
import { useRouter } from "next/navigation";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function GoToMemory() {
  const router = useRouter();
  const { pending, data } = useFormStatus();

  console.log({ data });

  const onButtonClick = () => {
    router.refresh();
    router.push("/memory");
  };

  return (
    <>{pending && <button onClick={onButtonClick}>go to memory</button>}</>
  );
}
