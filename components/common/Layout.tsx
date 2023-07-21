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
    <div className={cn("flex flex-col h-full", poppins.className)}>
      <Gnb />
      <div className="flex-1 min-h-screen overflow-auto py-60">{children}</div>
      <BottomNavigation />
    </div>
  );
}
