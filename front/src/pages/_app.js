import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
    // useEffect(() => {
    //     // code pour initialiser l'application et appeler le /api/auth/me endpoint
    // }, []);

    return (
        <>
            <ToastContainer />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
