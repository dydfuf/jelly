import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppInitialProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import AuthProvider from "./AuthProvider";
import GroupProvider from "./GroupProvider";
import UserProvider from "./UserProvider";

export default function AppProvider({
  children,
  pageProps: { session },
}: PropsWithChildren<AppInitialProps>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <AuthProvider>
          <UserProvider>
            <GroupProvider>{children}</GroupProvider>
          </UserProvider>
        </AuthProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
