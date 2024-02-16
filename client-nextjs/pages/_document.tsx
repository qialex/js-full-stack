import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className='html'>
      <Head>
        <title>Full stack demo app. Aleksandr Ishchenko</title>
        <meta name="description" content="Full stack demo app. Aleksandr Ishchenko" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className='body'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
