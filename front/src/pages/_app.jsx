import {AuthProvider} from "@/providers/AuthProvider";
import '@/styles/globals.css'
import {ToastProvider} from "@/providers/ToastProvider";
import { appWithTranslation } from "next-i18next";
import nextI18n from "../../next-i18next.config";

function MyApp({Component, pageProps}) {

    return (
        <ToastProvider>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </ToastProvider>
    );
}

export default appWithTranslation(MyApp, nextI18n);
