import { SessionProvider } from "next-auth/react"
import { PropsWithChildren } from "react"

interface Props {
  pageProps: any
}

export default function AppProvider({ children, pageProps: { session } }: PropsWithChildren<Props>) {
  // return <SessionProvider session={session}>{children}</SessionProvider>
  return <>{children}</>
}
