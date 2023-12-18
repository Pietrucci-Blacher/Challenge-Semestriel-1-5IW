import httpClient from '@/services/httpClient';

const fetchUserRequest = async (id) => {
    return await httpClient.get(`users/${id}`);
};
export { fetchUserRequest };
