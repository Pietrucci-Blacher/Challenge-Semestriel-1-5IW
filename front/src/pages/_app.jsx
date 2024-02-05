import { AuthProvider } from '@/providers/AuthProvider';
import '@/styles/globals.css';
import { ToastProvider } from '@/providers/ToastProvider';
import ChooseLayout from '@/components/ChooseLayout';
import { appWithTranslation } from 'next-i18next';
import nextI18n from '../../next-i18next.config';
import { Chart, registerables } from 'chart.js';
import 'chart.js/auto';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

Chart.register(...registerables);

function MyApp({ Component, pageProps }) {
    return (
        <ToastProvider>
            <AuthProvider>
                <ChooseLayout>
                    <Component {...pageProps} />
                </ChooseLayout>
            </AuthProvider>
        </ToastProvider>
    );
}

export default appWithTranslation(MyApp, nextI18n);
