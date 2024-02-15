import {
    fetchCurrentUser,
    getUserFromSession,
    storeUserInSession,
} from '@/services/authService';

import {
    useState,
    useEffect,
    createContext,
    useContext,
    useCallback,
} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(undefined);
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    const fetchUser = useCallback(async () => {
        try {
            const fetchedUser = await fetchCurrentUser();
            setUser(fetchedUser);
            setIsLogged(true);
            storeUserInSession(fetchedUser);
        } catch {
            throw new Error('Erreur lors de la récupération de l’utilisateur.');
        }
    }, []);

    const verifyUser = useCallback(async () => {
        setIsLoading(true);
        let storedUser = getUserFromSession();
        if (!storedUser) {
            try {
                await fetchUser();
            } catch (error) {
                console.error('Erreur lors de la vérification', error);
                setUser(null);
                setIsLogged(false);
            } finally {
                setIsLoading(false);
            }
        } else {
            setUser(storedUser);
            setIsLogged(true);
            setIsLoading(false);
        }
    }, [fetchUser]);



    useEffect(() => {
        verifyUser();
    }, [verifyUser]);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLogged,
                setIsLogged,
                verifyUser,
                fetchUser,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
