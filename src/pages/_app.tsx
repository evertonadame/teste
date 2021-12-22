import type { AppProps } from 'next/app';
import {
  Provider,
} from 'next-auth/client';
import NProgress from 'nprogress';
import Router from 'next/router';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';

import AppProvider from 'hooks';

import { Layout } from 'components/layout';

import GlobalStyle from 'styles/global';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <>
    <GlobalStyle />
    <Provider session={pageProps.session}>
      <AppProvider>
        <ToastContainer className="toast" />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </Provider>
  </>
);
export default MyApp;
