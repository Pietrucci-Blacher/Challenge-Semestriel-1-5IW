import httpClient from './httpClient';

const getUsersNumber = () => {
    return httpClient.get('users');
};

const getActiveCompaniesNumber = () => {
    return httpClient.get('establishments');
};

const getBookings = () => {
    return httpClient.get('reservations');
};

const getBestCompany = () => {
    return httpClient.get('feedback');
};

export {
    getUsersNumber,
    getActiveCompaniesNumber,
    getBookings,
    getBestCompany,
};
