import httpClient from './httpClient';

const BASE_URL = 'auth/reset-password';

const askResetPasswordRequest = async (email) => {
    return await httpClient.post(`${BASE_URL}/ask`, { email });
};

const checkResetTokenRequest = async (token) => {
    return await httpClient.get(`${BASE_URL}/validate/${token}`);
};

const updatePasswordRequest = async (token, newPassword) => {
    return await httpClient.post(`${BASE_URL}/reset/${token}`, { newPassword });
};

export {
    askResetPasswordRequest,
    checkResetTokenRequest,
    updatePasswordRequest,
};
