import { signIn, signOut } from "next-auth/react"
import React from "react"

export default function HomeContainer() {
  const handleSignIn = () => {
    signIn()
  }
  const handleSignOut = async () => {
    signOut()
  }

  return (
    <div className="flex flex-col">
      <button onClick={handleSignIn}>sign in</button>
      <button onClick={handleSignOut}>sign out</button>
    </div>
  )
}
