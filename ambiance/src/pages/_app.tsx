// _app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import Layout from '@/components/Layout';

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}

export default App;
