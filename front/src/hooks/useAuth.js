import { getCurrentUser, login, register } from '@/services/auth';
import { refresh } from '@/services/token';
import { useState, useEffect, useCallback } from 'react';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    
    // useEffect(async () => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         const user = await handleMe();
    //         setUser(user);
    //     }
    // }
    //     , []);

    const handleLogin = useCallback(async (data) => {
        const { email, password } = data;
        const response = await login(email, password);
        const token = response?.token;
        const refreshToken = response?.refresh_token;
        if(token.length > 0 && refreshToken.length > 0) {
            setIsLogged(true);
            setToken(token);
            setRefreshToken(refreshToken);
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
        }
    }, []);

    const handleRegister = useCallback(async (data) => {
        const { firstname, lastname, email, password } = data;
        await register(firstname, lastname, email, password);
    }, []);

    const handleLogout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('token');
    }, []);


    const handleMe = useCallback(async () => {
        // retravailler cette function avec les interceptors d'axios
        const token = localStorage.getItem('token');
        if (token) {
            const response = await getCurrentUser(token);
            if (response.message === 'Expired JWT Token') {
                const currentRefreshToken = localStorage.getItem('refreshToken');
                const response = await refresh(currentRefreshToken);
                const token = response?.token;
                const newRefreshToken = response?.refresh_token;
                if(token.length > 0 && newRefreshToken.length > 0) {
                    setIsLogged(true);
                    setToken(token);
                    setRefreshToken(newRefreshToken);
                    localStorage.setItem('token', token);
                    localStorage.setItem('refreshToken', newRefreshToken);
                    const user = await getCurrentUser(token);
                    setUser(user);
                }
            }
            setUser(response);
        }
    }, []);

    return { user, isLogged, token, refreshToken, handleLogin, handleRegister, handleMe, handleLogout };
};

export default useAuth;