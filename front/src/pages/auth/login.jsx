import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuthContext } from '@/providers/AuthProvider';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { useTranslation } from 'next-i18next';

import GenericButton from '@/components/GenericButton';
import Input from '@/components/Input';

export default function Login() {
    const { createToastMessage } = useToast();
    const { user, isLogged } = useAuthContext();
    const { login } = useAuth();
    const { t, i18n } = useTranslation('loginPage');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const router = useRouter();

    const handleInputEmailChange = (event) => {
        setFormData({ ...formData, email: event.target.value });
    };

    const handleInputPasswordChange = (event) => {
        setFormData({ ...formData, password: event.target.value });
    };

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        const { email, password } = formData;
        if (email === '' || password === '') {
            createToastMessage('error', 'Email and password are required');
            return;
        }
        try {
            await login({ email, password });
            await router.push('/profile');
        } catch (error) {
            createToastMessage('error', error.message);
        }
    };

    useEffect(() => {
        if (isLogged && user) {
            router.push('/profile');
        }
    }, [user, isLogged, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Log in
                    </h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link
                                href="/forgot-password"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Log in
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center">
                    <Link
                        href="/signup"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Don't have an account? Sign up
                    </Link>
                </div>
            </div>
            <div className="hidden lg:block relative w-0 flex-1">
                {/* Mettez ici votre image d'illustration */}
            </div>
        </div>
    );
}
