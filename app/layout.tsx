import "../styles/tailwind.css";
import "../components/common/calendar/calendar.scss";

import { Poppins } from "next/font/google";
import { PropsWithChildren, Suspense } from "react";
import Layout from "components/common/Layout";
import AuthChecker from "components/server/AuthChecker";
import GroupChecker from "components/server/GroupChecker";
import UserChecker from "components/server/UserChecker";

const poppins = Poppins({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html>
      <body className={poppins.className}>
        <Suspense fallback={<div>Auth Checking...</div>}>
          <AuthChecker>
            <Suspense fallback={<div>User Checking...</div>}>
              <UserChecker>
                <Suspense fallback={<div>Group Checking...</div>}>
                  <GroupChecker>
                    <Layout>{children}</Layout>
                  </GroupChecker>
                </Suspense>
              </UserChecker>
            </Suspense>
          </AuthChecker>
        </Suspense>
      </body>
    </html>
  );
}
