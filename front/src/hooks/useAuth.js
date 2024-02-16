import {
    fetchCurrentUser,
    loginService,
    registerService,
    confirmEmailRequest,
} from '@/services/authService';
import { useAuthContext } from '@/providers/AuthProvider';
import { useState, useCallback } from 'react';

export const useAuth = () => {
    const { setUser, setIsLogged } = useAuthContext();
    const [isConfirmed, setIsConfirmed] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (credentials) => {
        if (isLoading) return;
        try {
            setIsLoading(true);
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('refreshToken');
            const response = await loginService(credentials);
            const token = response.token;
            const refreshToken = response.refresh_token;
            sessionStorage.setItem('token', token, { expires: 1 });
            sessionStorage.setItem('refreshToken', refreshToken, {
                expires: 7,
            });
            const user = await fetchCurrentUser();
            setIsLogged(true);
            setUser(user);
        } catch (error) {
            console.error(`Erreur de connexion : ${error.message}`);
            throw `Erreur de connexion : ${error.message}`;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (payload) => {
        if (isLoading) return;
        try {
            setIsLoading(true);
            await registerService(payload);
        } catch (error) {
            console.error(`Erreur de inscription : ${error.message}`);
            throw `Erreur de inscription : ${error.message}`;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        sessionStorage.removeItem('user');
        setIsLogged(false);
        setUser(null);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
    };

    const confirmEmail = useCallback(async (token) => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            await confirmEmailRequest(token);
            setIsConfirmed(true);
        } catch (error) {
            setIsConfirmed(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { login, register, logout, confirmEmail, isConfirmed, isLoading };
};
