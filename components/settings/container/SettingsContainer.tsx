import { signIn, signOut } from "next-auth/react";
import React from "react";
import useGetGroup from "hooks/useGetGroup";
import useUser from "hooks/useUser";

export default function SettingsContainer() {
  const handleSignIn = () => {
    signIn();
  };
  const handleSignOut = () => {
    signOut();
  };

  const { user } = useUser();
  const { data: gruop } = useGetGroup();

  return (
    <div className="flex flex-col">
      <div className="flex gap-12 h-40">
        <button className="border-1 bg-slate-300 px-8" onClick={handleSignIn}>
          sign in
        </button>
        <button className="border-1 bg-slate-300 px-8" onClick={handleSignOut}>
          sign out
        </button>
      </div>
      <div>
        <p>User Info</p>
        <p>user id : {user?.id}</p>
        <p>user email : {user?.email}</p>
        <p>user name : {user?.name}</p>
      </div>
      <div>
        <p>Gruop Info</p>
        <p>{gruop?.userToGroup.groupId}</p>
      </div>
    </div>
  );
}
