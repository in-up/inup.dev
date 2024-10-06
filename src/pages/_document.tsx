import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="google-site-verification"
            content="RJQJipgMnyEfg3XESXsr7jXnVDOaAr1xtlCGRaoTQSo"
          />
          <link
            rel="stylesheet"
            as="style"
            crossOrigin="anonymous"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
          />
          {/* <link
            rel="webmention"
            href="https://webmention.io/samuelkraft.com/webmention"
          /> */}
          {/* <link
            rel="pingback"
            href="https://webmention.io/samuelkraft.com/xmlrpc"
          /> */}
          <link href="https://github.com/in-up" rel="me" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
