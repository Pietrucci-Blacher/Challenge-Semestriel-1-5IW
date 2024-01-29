import { Html, Head, Main, NextScript } from 'next/document';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Document() {
    return (
        <Html>
            <Head>
                <meta charSet="utf-8" />
            </Head>
            <body>
                <Main />
                <NextScript />
                <SpeedInsights />
            </body>
        </Html>
    );
}
