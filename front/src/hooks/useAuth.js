import {fetchCurrentUser, loginService, registerService} from "@/services/authService";
import {useAuthContext} from "@/providers/AuthProvider";

export const useAuth = () => {
    const {setUser, setIsLogged} = useAuthContext();

    const login = async (credentials) => {
        try {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('refreshToken');
            const response = await loginService(credentials);
            const token = response.token
            const refreshToken = response.refresh_token
            sessionStorage.setItem('token', token, {expires: 1});
            sessionStorage.setItem('refreshToken', refreshToken, {expires: 7});
            const user = await fetchCurrentUser()
            setIsLogged(true);
            setUser(user);
        } catch (error) {
            console.error(`Erreur de connexion : ${error.message}`)
            throw `Erreur de connexion : ${error.message}`
        }
    };

    const register = async (payload) => {
        await registerService(payload);
    };

    const logout = () => {
        sessionStorage.removeItem('user')
        setIsLogged(false);
        setUser(null);
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("refreshToken")
    };

    return {login, register, logout};
};
