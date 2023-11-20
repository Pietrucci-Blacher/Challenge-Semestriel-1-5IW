import {
    fetchCurrentUser,
    getUserFromSession,
    storeUserInSession
} from "@/services/authService";

import {useState, useEffect, createContext, useContext} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(undefined);
    const [isLogged, setIsLogged] = useState(undefined);
    const verifyUser = async () => {
        console.log("called")
        let storedUser = getUserFromSession();
        if (!storedUser) {
            console.log("cc")
            try {
                await fetchUser()
            } catch (error) {
                console.error('Erreur lors de la vérification', error);
                setUser(null)
                setIsLogged(false)
            }
        } else {
            setUser(storedUser);
            setIsLogged(true);
        }
    };
    const fetchUser = async () => {
        try {
            const fetchedUser = await fetchCurrentUser();
            setUser(fetchedUser);
            setIsLogged(true);
            storeUserInSession(fetchedUser);
        } catch {
            throw "error recuperation user"
        }
    }
    useEffect(() => {
        verifyUser();
    }, []);
    return (
        <AuthContext.Provider value={{user, setUser, isLogged, setIsLogged, verifyUser, fetchUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
