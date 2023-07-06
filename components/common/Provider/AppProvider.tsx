import { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { PropsWithChildren } from "react"
import AuthProvider from "./AuthProvider"
import UserProvider from "./UserProvider"

export default function AppProvider({ children, pageProps: { session } }: PropsWithChildren<AppProps>) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </SessionProvider>
  )
}
