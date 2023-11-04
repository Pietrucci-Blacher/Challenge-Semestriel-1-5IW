import {AuthProvider} from "@/providers/AuthProvider";
import '@/styles/globals.css'
import {ToastProvider} from "@/providers/ToastProvider";

function MyApp({Component, pageProps}) {

    return (
        <>
            <ToastProvider>
                <AuthProvider>
                    <Component {...pageProps} />
                </AuthProvider>
            </ToastProvider>
        </>
    );
}

export default MyApp;
