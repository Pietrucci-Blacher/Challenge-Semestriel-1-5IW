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

export { getUsersNumber, getActiveCompaniesNumber, getBookings };
