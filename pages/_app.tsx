import { AppProps } from "next/app"
import AppProvider from "components/common/AppProvider"
import "../styles/tailwind.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
