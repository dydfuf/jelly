import { SessionProvider } from "next-auth/react"
import { PropsWithChildren } from "react"
import AuthProvider from "./AuthProvider"

interface Props {
  pageProps: any
}

export default function AppProvider({ children, pageProps: { session } }: PropsWithChildren<Props>) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  )
}
