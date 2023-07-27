"use client";

import { usePathname } from "next/navigation";

interface Props {
  href: string;
}

export default function ActiveLine({ href }: Props) {
  const pathname = usePathname();

  return (
    <>
      {pathname === href && (
        <div className="w-full h-4 rounded-full bg-black absolute top-0" />
      )}
    </>
  );
}
