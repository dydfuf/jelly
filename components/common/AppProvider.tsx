import { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { PropsWithChildren } from "react"
import AuthProvider from "./AuthProvider"

export default function AppProvider({ children, pageProps: { session } }: PropsWithChildren<AppProps>) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  )
}
