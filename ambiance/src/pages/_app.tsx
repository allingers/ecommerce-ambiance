// _app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import Layout from '@/components/Layout';
import { SessionProvider } from 'next-auth/react';

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </SessionProvider>
    </MantineProvider>
  );
}

export default App;
