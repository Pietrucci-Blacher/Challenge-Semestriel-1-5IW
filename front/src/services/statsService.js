import httpClient from './httpClient';

const getUsersNumber = async () => {
    return await httpClient.get('users');
};

const getActiveCompaniesNumber = async () => {
    return await httpClient.get('establishments');
};

const getTotalCourseBookings = async () => {
    return await httpClient.get('reservations');
};

export { getUsersNumber, getActiveCompaniesNumber, getTotalCourseBookings };
