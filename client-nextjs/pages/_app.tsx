// import styles from '@/styles/'
import '@/styles/bulma_minireset_pure.scss';
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return <Layout>
          <Component {...pageProps} />
        </Layout>
}
