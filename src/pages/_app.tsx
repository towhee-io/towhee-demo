import '../styles/globals.css';
import { AppProps } from 'next/app';
import { RootProvider } from '../context/Root';
import { useEffect } from 'react';
import Layout from '../components/layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import useRouterScroll from '../hooks/Router';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});

export default function App({ Component, pageProps }: AppProps) {
  // reset scroll position after navigating to new pages
  useRouterScroll();

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <RootProvider>
      <Layout>
        <CssBaseline />
        <Component {...pageProps} />
      </Layout>
    </RootProvider>
  );
}
