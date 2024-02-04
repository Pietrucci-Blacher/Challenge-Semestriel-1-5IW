import httpClient from './httpClient';

const getUsersNumber = async () => {
    return await httpClient.get('users');
};

export { getUsersNumber };
