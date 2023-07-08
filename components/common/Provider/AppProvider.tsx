import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppInitialProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import AuthProvider from "./AuthProvider";
import UserProvider from "./UserProvider";

export default function AppProvider({ children, pageProps: { session } }: PropsWithChildren<AppInitialProps>) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <AuthProvider>
          <UserProvider>{children}</UserProvider>
        </AuthProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
