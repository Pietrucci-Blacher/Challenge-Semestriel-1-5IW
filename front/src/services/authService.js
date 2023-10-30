import httpClient from "./httpClient";
const loginService = async ({email, password}) => {
    return await httpClient.post('auth/login', {email, password});
};

const registerService = async ({lastname, firstname, email, password}) => {
    return await httpClient.post('auth/register', {lastname, firstname, email, password})
};

const fetchCurrentUser = async () => {
    if (localStorage.getItem('token')) return await httpClient.get('auth/me')
};

const refreshToken = async (refreshToken) => {
    return await httpClient.post('/token/refresh', {refresh_token: refreshToken})
};


export {loginService, registerService, fetchCurrentUser, refreshToken};