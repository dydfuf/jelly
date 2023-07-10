import { signIn, signOut } from "next-auth/react";
import React from "react";
import useGetGroup from "hooks/useGetGroup";
import useUser from "hooks/useUser";

export default function HomeContainer() {
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
      <button onClick={handleSignIn}>sign in</button>
      <button onClick={handleSignOut}>sign out</button>
      <div>
        <p>User Info</p>
        <p>user id : {user?.id}</p>
        <p>user email : {user?.email}</p>
        <p>user name : {user?.name}</p>
        <p>user userHashCode : {user?.userHashCode}</p>
      </div>
      <div>
        <p>Gruop Info</p>
        <p>{gruop?.userToGroup.groupId}</p>
      </div>
    </div>
  );
}
