import httpClient from "./httpClient";



const login = async (email, password) => {
    return await httpClient.post('auth/login', { email, password });
};

const register = async (lastname, firstname, email, password) => {
    return await httpClient.post('auth/register', { lastname, firstname, email, password })
};

const me = async () => {
    return await httpClient.get('auth/me')
};

export { login, register, me };