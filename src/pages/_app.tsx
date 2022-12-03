import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import theme from "../styles/theme";
import Head from "next/head";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>카카오트리스파 예약폼입니다.</title>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
