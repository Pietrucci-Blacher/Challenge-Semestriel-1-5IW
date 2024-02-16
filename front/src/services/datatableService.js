import httpClient from './httpClient';

const getUsersService = async () => {
    return await httpClient.get(`users`);
};

const getUserService = async (id) => {
    return await httpClient.get(`users/${id}`);
};

const editUserService = async (id, data) => {
    return await httpClient.patch(`users/${id}`, data);
};

const deleteUserService = async (id) => {
    return await httpClient.delete(`users/${id}`);
};
const updateUserRoleService = async ({userRole, userId}) => {
    return await httpClient.patch(`users/${userId}/change_role`, {roles:[userRole]});
};

export { getUsersService, getUserService, editUserService, deleteUserService, updateUserRoleService };
