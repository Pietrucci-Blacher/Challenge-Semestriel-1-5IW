import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
    // useEffect(() => {
    //     // code pour initialiser l'application et appeler le /api/auth/me endpoint
    // }, []);

    return <Component {...pageProps} />;
}

export default MyApp;
