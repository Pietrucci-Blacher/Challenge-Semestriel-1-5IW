import { useCallback, useState } from 'react';
import {
    deleteUserService,
    editUserService,
    getUserService,
    getUsersService,
} from '@/services/datatableService';
import { normalize } from '@/utils/data';

export const useDatatable = () => {
    const [data, setData] = useState([]);
    const [userDetails, setUserDetails] = useState({});
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
            setUserDetails((prevDetails) => ({
                ...prevDetails,
                [id]: response,
            }));
        } catch (error) {
            console.error('Error fetching user:', error);
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
        console.log('id', id);
        try {
            await deleteUserService(id);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    return {
        fetchAllUsersData,
        fetchUserData,
        editUser,
        deleteUser,
        userDetails,
        data,
        setData,
    };
};
