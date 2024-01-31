import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <meta charSet="utf-8"/>
                <link rel="shortcut icon" href="/favicons/favicon.ico"/>
            </Head>
            <body>
            <Main />
                <NextScript />
            </body>
        </Html>
    );
}
