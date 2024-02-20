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

// import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer, Persistor } from 'redux-persist'
// Now, modify the render function call to look like the code below:

// // src/index.js
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>()
  const persistorRef = useRef<Persistor>()

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  if (!persistorRef.current) {    
    // Create a persistor to persist the Redux store
    persistorRef.current = persistStore(storeRef.current);    
  }

  return (
    <html lang="en">
      <Head />
      <body>
        {/* <Provider store={storeRef.current} serverState={preloadedState}> */}
        <Provider store={storeRef.current}>
          <PersistGate loading={null} persistor={persistorRef.current}>
            <Header />
              {children}
            <Footer />
          </PersistGate>
        </Provider>
      </body>  
    </html>
  );
}