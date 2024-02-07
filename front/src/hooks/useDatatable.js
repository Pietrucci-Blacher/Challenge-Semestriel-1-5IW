import { useCallback, useState } from 'react';
import {
    banUnbanUserService,
    deleteUserService,
    editUserService,
    getUserService,
    getUsersService,
} from '@/services/datatableService';
import { normalize } from '@/utils/data';

export const useDatatable = () => {
    const [data, setData] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const fetchAllUsersData = useCallback(async () => {
        try {
            const response = await getUsersService();
            setData(normalize(response));
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, []);

    const fetchUserData = useCallback(async (id) => {
        try {
            const response = await getUserService(id);
            setUserDetails(response);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }, []);

    const banUser = useCallback(async (id) => {
        try {
            await banUnbanUserService(id);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    const editUser = useCallback(async (id, data) => {
        try {
            await editUserService(id, data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    const deleteUser = useCallback(async (id) => {
        try {
            await deleteUserService(id);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    return {
        fetchAllUsersData,
        fetchUserData,
        banUser,
        editUser,
        deleteUser,
        userDetails,
        data,
    };
};
