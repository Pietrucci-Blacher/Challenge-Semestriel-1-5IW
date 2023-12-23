import { AuthProvider } from "@/providers/AuthProvider";
import "@/styles/globals.css";
import { ToastProvider } from "@/providers/ToastProvider";
import ChooseLayout from "@/components/ChooseLayout";
import { appWithTranslation } from "next-i18next";
import nextI18n from "../../next-i18next.config";
import { ModalProvider } from "@/providers/ModalProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ModalProvider>
      <ToastProvider>
        <AuthProvider>
          <ChooseLayout>
            <Component {...pageProps} />
          </ChooseLayout>
        </AuthProvider>
      </ToastProvider>
    </ModalProvider>
  );
}

export default appWithTranslation(MyApp, nextI18n);
