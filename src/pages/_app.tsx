import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import theme from "../styles/theme";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import { UIProvider } from "src/contexts";
import { SWRConfig } from "swr";
import { appWithTranslation } from "next-i18next";
import { useTranslation } from "next-i18next";
import nextI18NextConfig from "../../next-i18next.config.js";

function App({ Component, pageProps }: AppProps) {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{t("appTitle")}</title>
      </Head>
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            fetch(url).then((response) => response.json()),
        }}
      >
        <UIProvider>
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
        </UIProvider>
      </SWRConfig>
    </>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
