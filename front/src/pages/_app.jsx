import {AuthProvider} from '@/providers/AuthProvider';
import '@/styles/globals.css';
import {ToastProvider} from '@/providers/ToastProvider';
import ChooseLayout from '@/components/ChooseLayout';
import {Chart, registerables} from 'chart.js';
import 'chart.js/auto';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import {SpeedInsights} from '@vercel/speed-insights/next';
import PropTypes from 'prop-types';
import {TranslationProvider} from "@/providers/TranslationProvider";

Chart.register(...registerables);

function MyApp({Component, pageProps}) {
    return (
        <TranslationProvider>
            <ToastProvider>
                <AuthProvider>
                    <ChooseLayout>
                        <Component {...pageProps} />
                        <SpeedInsights/>
                    </ChooseLayout>
                </AuthProvider>
            </ToastProvider>
        </TranslationProvider>
    );
}

MyApp.propsTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
