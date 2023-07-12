import { PropsWithChildren } from "react";
import BottomNavigation from "./BottomNavigation";
import Gnb from "./Gnb";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col h-full">
      <Gnb />
      <div className="flex-1 min-h-screen overflow-auto pt-40 pb-60">
        {children}
      </div>
      <BottomNavigation />
    </div>
  );
}
