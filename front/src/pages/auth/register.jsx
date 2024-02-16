import Link from 'next/link';
import GenericButton from '@/components/GenericButton';
import Input from '@/components/Input';
import {useEffect, useState} from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import Image from 'next/image';
import { HomeIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslationContext } from '@/providers/TranslationProvider';

export default function Register() {
    const { isLoading, register } = useAuth();
    const { createToastMessage } = useToast();
    const { t } = useTranslationContext();
    const router = useRouter();
    useEffect(() => {
        console.log("isadmin@adminaa.com", isLoading)
    }, [isLoading]);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });
    const { firstname, lastname, email, password } = formData;

    const handleInputEmailChange = (value) => {
        setFormData({ ...formData, email: value });
    };

    const handleInputPasswordChange = (value) => {
        setFormData({ ...formData, password: value });
    };

    const handleInputFirstnameChange = (value) => {
        setFormData({ ...formData, firstname: value });
    };

    const handleInputLastnameChange = (value) => {
        setFormData({ ...formData, lastname: value });
    };

    const handleSubmitRegister = async (event) => {
        event.preventDefault();
        try {
            await register(formData);
            createToastMessage('success', 'Votre compte a bien été crée');
        } catch (error) {
            console.log(error);
            if (error.status !== 500) {
                createToastMessage('error', error.detail);
            } else {
                createToastMessage(
                    'error',
                    'Un compte avec cette adresse email existe déja',
                );
            }
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <Head>
                <title>Coursia - Register</title>
            </Head>
            <div className="relative m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-4/12 p-6 sm:p-12">
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
                        <div className="w-full flex-1 mt-4">
                            <form
                                className="w-full max-w-md bg-white rounded-lg shadow p-8 space-y-3"
                                onSubmit={handleSubmitRegister}
                            >
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    {t('createAccount')}
                                </h1>
                                <div>
                                    <label
                                        htmlFor="firstname"
                                        className="text-sm font-bold text-gray-700 tracking-wide"
                                    >
                                        {' '}
                                        {t('yourFirstName')}
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder={t('firstname')}
                                        value={firstname}
                                        onChange={handleInputFirstnameChange}
                                        className="block w-full px-2.5 py-2"
                                        autoComplete="given-name"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="lastname"
                                        className="text-sm font-bold text-gray-700 tracking-wide"
                                    >
                                        {' '}
                                        {t('yourLastName')}
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder={t('lastname')}
                                        value={lastname}
                                        onChange={handleInputLastnameChange}
                                        className="block w-full px-2.5 py-2"
                                        autoComplete="family-name"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-bold text-gray-700 tracking-wide"
                                    >
                                        {' '}
                                        {t('yourEmail')}
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder={t('emailPlaceholder')}
                                        value={email}
                                        onChange={handleInputEmailChange}
                                        className="block w-full px-2.5 py-2"
                                        autoComplete="email"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        {t('yourPassword')}
                                    </label>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={handleInputPasswordChange}
                                        className="block w-full px-2.5 py-2"
                                        autoComplete="new-password"
                                    />
                                </div>
                                <GenericButton
                                    isLoading={isLoading}
                                    label={t('register')}
                                    onClick={handleSubmitRegister}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-8 py-1 text-center focus:outline-none focus:ring-4 focus:ring-blue-300"
                                />
                            </form>
                            <div className="mt-3 text-center text-sm font-light text-gray-500">
                                {t('haveAccount')}{' '}
                                <Link
                                    href="/auth/login"
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    {t('login')}
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
                        className="w-full bg-contain bg-center bg-no-repeat m-16"
                        style={{
                            backgroundImage:
                                "url('/images/backgrounds/register_back.svg')",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
