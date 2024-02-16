import httpClient from './httpClient';

const loginService = async ({ email, password }) => {
    return await httpClient.post('auth/login', { email, password });
};

const registerService = async ({ lastname, firstname, email, password }) => {
    const plainPassword = password;
    return await httpClient.post('auth/register', {
        lastname,
        firstname,
        email,
        plainPassword,
    });
};

const fetchCurrentUser = async () => {
    const jwtToken = sessionStorage.getItem('token');
    if (!jwtToken) return null;
    return await httpClient.get('auth/me');
};

const refreshToken = async (refreshToken) => {
    return await httpClient.post('/token/refresh', {
        refresh_token: refreshToken,
    });
};

const getUserFromSession = () => {
    const userStr = sessionStorage.getItem('user');
    if (!userStr) return null;

    const userWithExpiry = JSON.parse(userStr);
    const now = new Date();

    if (now.getTime() > userWithExpiry.expiresAt) {
        sessionStorage.removeItem('user');
        return null;
    }
    return userWithExpiry;
};
const storeUserInSession = (user) => {
    if (user) {
        const now = new Date();
        const userWithExpiry = {
            ...user,
            expiresAt: now.getTime() + 120000,
        };
        sessionStorage.setItem('user', JSON.stringify(userWithExpiry));
    }
};

const confirmEmailRequest = (token) => {
    return httpClient.get(`/auth/confirm-email/${token}`);
};

export {
    loginService,
    registerService,
    fetchCurrentUser,
    refreshToken,
    storeUserInSession,
    getUserFromSession,
    confirmEmailRequest,
};
