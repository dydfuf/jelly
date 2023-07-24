import { Poppins } from "next/font/google";
import { PropsWithChildren } from "react";
import { cn } from "utils/common";
import BottomNavigation from "./BottomNavigation";
import Gnb from "./Gnb";

const poppins = Poppins({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div
      className={cn(
        "flex flex-col h-[100dvh] overflow-hidden",
        poppins.className
      )}
    >
      <Gnb />
      <div className="flex-1 overflow-auto overscroll-contain">{children}</div>
      <BottomNavigation />
    </div>
  );
}
