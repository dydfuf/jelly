import localFont from "next/font/local";
import { PropsWithChildren } from "react";
import { cn } from "utils/common";
import BottomNavigation from "./BottomNavigation";
import Gnb from "./Gnb";

const BMJUA = localFont({ src: "../../font/BMJUA_ttf.ttf" });

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div
      className={cn(
        "flex flex-col h-[100dvh] overflow-hidden pb-safe",
        BMJUA.className
      )}
    >
      <Gnb />
      <div className="flex-1 overflow-auto overscroll-contain">{children}</div>
      <BottomNavigation />
    </div>
  );
}
