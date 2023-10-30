import { fetchCurrentUser, loginService, registerService } from "@/services/authService";
import {useAuthContext} from "@/providers/AuthProvider";

export const useAuth = () => {
    const { setUser, setIsLogged } = useAuthContext();

    const login = async (credentials) => {
        try {
            const response = await loginService(credentials);
            const token = response.token
            const refreshToken = response.refresh_token
            localStorage.setItem('token', token)
            localStorage.setItem('refreshToken', refreshToken)
            const user = await fetchCurrentUser()
            setIsLogged(true);
            setUser(user);
        } catch (error) {
            console.error('Erreur de connexion', error);
        }
    };

    const register = async (payload) => {
        await registerService(payload);
        // Logique supplémentaire si nécessaire
    };

    const logout = async () => {
        // Logique de déconnexion
        setIsLogged(false);
        setUser(null);
    };

    return { login, register, logout };
};
