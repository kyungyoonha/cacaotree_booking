import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import theme from "../styles/theme";
import Head from "next/head";

import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    localStorage.setItem("test", "1");
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>카카오트리스파 예약폼입니다.</title>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: theme.main,
            },
          }}
        >
          <Component {...pageProps} />
        </ConfigProvider>
      </ThemeProvider>
    </>
  );
}
