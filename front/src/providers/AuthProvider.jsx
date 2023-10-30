import httpClient from "@/services/httpClient";
import {fetchCurrentUser, loginService, registerService} from "@/services/authService";

import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        verifyUser();
        console.log("chiiiil", children)
    }, []);
    const verifyUser = async () => {
        try {
            const user = await fetchCurrentUser()
            setUser(user);
        } catch (error) {
            console.error('Erreur lors de la vérification', error);
        }
        setLoading(false);
    };
    return (
        <AuthContext.Provider value={{ user, setUser, loading, isLogged, setIsLogged}}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
