import GenericButton from '@/components/GenericButton';
import Input from '@/components/Input';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/providers/AuthProvider';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { HomeIcon } from '@heroicons/react/16/solid';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../../next-i18next.config';
export default function Login() {
    const { createToastMessage } = useToast();
    const { user, isLogged } = useAuthContext();
    const { login } = useAuth();
    const { t, i18n } = useTranslation('loginPage');
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputEmailChange = (value) => {
        setFormData({ ...formData, email: value });
    };

    const handleInputPasswordChange = (value) => {
        setFormData({ ...formData, password: value });
    };

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        const { email, password } = formData;
        if (email === '' || password === '') {
            createToastMessage('error', 'Email and password are required');
            return;
        }
        try {
            await login(formData);
            router.push('/profile');
        } catch (error) {
            createToastMessage('error', error);
        }
    };

    useEffect(() => {
        if (!isLogged || !user) return;

        if (user.roles.includes('ROLE_ADMIN')) router.push('/admin');
        else if (user.roles.includes('ROLE_PROVIDER')) router.push('/provider');
        else if (user.roles.includes('ROLE_TEACHER')) router.push('/teacher');
        else router.push('/profile');
    }, [user, isLogged, router]);

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
                                className="w-full max-w-md bg-white rounded-lg shadow p-8 space-y-8"
                                onSubmit={handleSubmitLogin}
                            >
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    {t('connectAccount')}
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
                                        placeholder={t('emailPlaceholder')}
                                        onChange={handleInputEmailChange}
                                        value={formData.email}
                                        autoComplete="email"
                                        className="block w-full px-2.5 py-3"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        {t('password')}
                                    </label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        onChange={handleInputPasswordChange}
                                        value={formData.password}
                                        autoComplete="current-password"
                                        className="block w-full px-2.5 py-3"
                                        required
                                    />
                                    <Link
                                        href="/reset-password/ask"
                                        className="text-blue-600 hover:underline text-sm flex justify-end px-3 mt-1.5"
                                    >
                                        {t('forgotPassword')}
                                    </Link>
                                </div>
                                <GenericButton
                                    label={t('login')}
                                    onClick={handleSubmitLogin}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-8 py-1 text-center focus:outline-none focus:ring-4 focus:ring-blue-300"
                                />
                            </form>
                            <div className="mt-8 text-center text-sm font-light text-gray-500">
                                {t('noAccount')}{' '}
                                <Link
                                    href="/auth/register"
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    {t('signUp')}
                                </Link>
                            </div>
                        </div>
                    </div>
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
    );
}

export async function getStaticProps(context) {
    const { locale } = context;

    return {
        props: {
            // pass the translation props to the page component
            ...(await serverSideTranslations(
                locale ?? 'fr',
                ['loginPage'],
                nextI18NextConfig,
            )),
        },
    };
}
