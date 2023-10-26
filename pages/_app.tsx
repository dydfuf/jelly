import "../styles/tailwind.css";
import "../components/common/calendar/calendar.scss";
import "swiper/css";
import { AppProps } from "next/app";
import { useEffect } from "react";
import Layout from "components/common/Layout";
import AppProvider from "components/common/Provider/AppProvider";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  });

  return (
    <AppProvider pageProps={pageProps}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default MyApp;
