import { login, register } from '@/services/auth';
import { useState, useEffect, useCallback } from 'react';

const useAuth = () => {
    const [user, setUser] = useState(null);

    // useEffect(async () => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         const user = await handleMe();
    //         setUser(user);
    //     }
    // }
    //     , []);

    const handleLogin = useCallback(async (email, password) => {
        const user = await login(email, password);
        setUser(user);
    }, []);

    const handleRegister = useCallback(async (data) => {
        const { firstname, lastname, email, password } = data;
        const user = await register(firstname, lastname, email, password);
        setUser(user);
    }, []);

    const handleLogout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('token');
    }, []);


    const handleMe = useCallback(async () => {
        console.log("handleMe");
    }, []);

    return { user, handleLogin, handleRegister, handleMe, handleLogout };
};

export default useAuth;