import httpClient from './httpClient';

const getUsersNumber = async () => {
    return await httpClient.get('users');
};

const getActiveCompaniesNumber = async () => {
    return await httpClient.get('establishments');
};

const getBookings = async () => {
    return await httpClient.get('reservations');
};

const getBestCompany = async () => {
    return await httpClient.get('feedback');
};

export {
    getUsersNumber,
    getActiveCompaniesNumber,
    getBookings,
    getBestCompany,
};
