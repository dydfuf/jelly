"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function Submit() {
  const { pending } = useFormStatus();

  return (
    <button className="border-1 w-full" disabled={pending}>
      {pending ? "등록중" : "등록하기"}
    </button>
  );
}
