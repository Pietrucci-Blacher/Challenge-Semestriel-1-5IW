// Import necessary components and hooks
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import { useTranslation } from 'next-i18next';
import { Navbar, Button, Footer } from 'flowbite-react';

export default function Index() {
    const { t, i18n } = useTranslation('common');
    const changeTo = i18n.language === 'fr' ? 'en' : 'fr';

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-8">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            {t('hero-heading')}
                        </h1>
                        <p className="mt-5 text-xl text-gray-500">
                            {t('hero-subheading')}
                        </p>
                        <Button color="green" className="mt-5">
                            {t('hero-cta')}
                        </Button>
                    </div>
                    <div className="flex space-x-10">
                        {/* Image and Icon containers here */}
                    </div>
                </div>
            </main>

            {/* Additional sections and Footer */}
            <Footer container={true}>{/* Footer content here */}</Footer>
        </div>
    );
}

export async function getStaticProps(context) {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(
                locale ?? 'fr',
                ['common'],
                nextI18NextConfig,
            )),
        },
    };
}
