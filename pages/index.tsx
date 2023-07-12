import { useRouter } from "next/router";
import { useEffect } from "react";

export default function JellyWeb() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/memory");
  }, [router]);

  return <></>;
}
