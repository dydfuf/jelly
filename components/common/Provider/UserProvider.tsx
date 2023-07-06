import { useSession } from "next-auth/react"
import { PropsWithChildren } from "react"

export default function UserProvider({ children }: PropsWithChildren) {
  const { data } = useSession()
  console.log({ data })
  return <>{children}</>
}
