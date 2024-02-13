import { useResetPassword } from '@/hooks/useResetPassword';
import { useState } from 'react';
import Input from '@/components/Input';
import GenericButton from '@/components/GenericButton';
import Image from 'next/image';
import { HomeIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../../next-i18next.config';
import { useTranslation } from 'next-i18next';

export default function AskResetPassword() {
    const [email, setEmail] = useState('');
    const { askResetPassword, isLoading, error } = useResetPassword();
    const router = useRouter();
    const { t, i18n } = useTranslation('resetPage');
    const [formData] = useState({
        email: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email } = formData;
        if (email === '') {
            createToastMessage('error', 'Email is required');
            return;
        }
        await askResetPassword(email);
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="relative m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-4/12 p-6 sm:p-12 gap-2">
                    <div className="flex items-center justify-center gap-2">
                        <Image
                            src="/favicons/icon.svg"
                            width={64}
                            height={64}
                            alt="Logo"
                            className="rounded-[20px]"
                        />
                        <h2 className="text-3xl text-center font-extrabold">
                            Coursia
                        </h2>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-full flex-1 mt-8">
                            <form
                                onSubmit={handleSubmit}
                                className="w-full max-w-md bg-white rounded-lg shadow p-8 space-y-8"
                            >
                                <h1 className="text-3xl text-center font-extrabold">
                                    {t('titleReset')}
                                </h1>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        {t('yourEmail')}
                                    </label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        onChange={setEmail}
                                        value={email}
                                        autoComplete="email"
                                        className="block w-full px-2.5 py-3"
                                        required
                                    />
                                </div>
                                <GenericButton
                                    label={
                                        isLoading
                                            ? 'Envoi en cours...'
                                            : 'Réinitialiser le mot de passe'
                                    }
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-8 py-1 text-center focus:outline-none focus:ring-4 focus:ring-blue-300"
                                />
                            </form>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div className="absolute bottom-0 left-0 mb-4 ml-4">
                                <button
                                    onClick={() => router.push('/')}
                                    className="flex items-center text-gray-600 bg-transparent hover:bg-gray-100 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                >
                                    <HomeIcon
                                        className="h-5 w-5 mr-2"
                                        aria-hidden="true"
                                    />
                                    {t('returnHome')}
                                </button>
                            </div>
                            <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                                <div
                                    className="w-full bg-contain bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage:
                                            "url('/images/backgrounds/login_back.svg')",
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps(context) {
    const { locale } = context;

    return {
        props: {
            // pass the translation props to the page component
            ...(await serverSideTranslations(
                locale ?? 'fr',
                ['resetPage'],
                nextI18NextConfig,
            )),
        },
    };
}
