import { Html, Head, Main, NextScript } from 'next/document';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Document() {
    return (
        <Html>
            <Head>
                <meta charSet="utf-8" />
                <link rel="shortcut icon" href="/favicons/favicon.ico" />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/favicons/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicons/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicons/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest.json" />
            </Head>
            <body>
                <Main />
                <NextScript />
                <SpeedInsights />
            </body>
        </Html>
    );
}
