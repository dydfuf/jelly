import { useSession } from "next-auth/react"
import { PropsWithChildren } from "react"

export default function AuthProvider({ children }: PropsWithChildren) {
  const { status } = useSession({ required: true })

  return (
    <>
      {status === "loading" && <div> isLoading ... </div>}
      {status === "authenticated" && children}
    </>
  )
}
