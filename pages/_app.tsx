import "../styles/tailwind.css";
import { AppProps } from "next/app";
import Layout from "components/common/Layout";
import AppProvider from "components/common/Provider/AppProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider pageProps={pageProps}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default MyApp;
