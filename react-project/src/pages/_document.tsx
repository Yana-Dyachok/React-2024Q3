import { Head, Html, Main, NextScript } from 'next/document';

const NextDocument = () => (
  <Html>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="description" content="react project with next.js" />
      <link rel="icon" href="/favicon-doc.ico" type="image/ico" sizes="32x32" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);
export default NextDocument;
