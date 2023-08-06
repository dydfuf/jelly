import { signOut } from "next-auth/react";
import React from "react";

export default function SettingsContainer() {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-12 h-40">
        <button className="border-1 bg-slate-300 px-8" onClick={handleSignOut}>
          sign out
        </button>
      </div>
    </div>
  );
}
