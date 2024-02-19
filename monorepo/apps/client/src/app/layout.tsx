'use client'
import 'bulma/css/bulma.css';

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../store/store'

import Head from '../components/head'
import Header from '../components/header'
import Footer from '../components/footer'

// server state
// const preloadedState = window.__PRELOADED_STATE__ || {}
// delete window.__PRELOADED_STATE__

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <html lang="en">
      <Head />
      <body>
        {/* <Provider store={storeRef.current} serverState={preloadedState}> */}
        <Provider store={storeRef.current}>
          <Header />
            {children}
          <Footer />
        </Provider>
      </body>  
    </html>
  );
}