import {AuthProvider} from "@/providers/AuthProvider";
import '@/styles/globals.css'
import {ToastProvider} from "@/providers/ToastProvider";
import ChooseLayout from "@/components/ChooseLayout";

function MyApp({Component, pageProps}) {
    return (
        <>
        <ToastProvider>
            <AuthProvider>
                <ChooseLayout>
                    <Component {...pageProps} />
                </ChooseLayout>
            </AuthProvider>
        </ToastProvider>
        </>
    );
}

export default MyApp;
