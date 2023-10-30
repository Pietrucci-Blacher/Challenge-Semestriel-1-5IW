import {useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import {AuthProvider} from "@/providers/AuthProvider";

function MyApp({Component, pageProps}) {

    return (
        <>
            <ToastContainer/>
            <AuthProvider>

                <Component {...pageProps} />
            </AuthProvider>
        </>
    );
}

export default MyApp;
