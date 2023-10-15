import { login, register } from '@/services/auth';
import { useState, useEffect, useCallback } from 'react';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);

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
        const {token} = await login(email, password);
        if(token) {
            setIsLogged(true);
        }
        localStorage.setItem('token', token);
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

    return { user,isLogged ,handleLogin, handleRegister, handleMe, handleLogout };
};

export default useAuth;