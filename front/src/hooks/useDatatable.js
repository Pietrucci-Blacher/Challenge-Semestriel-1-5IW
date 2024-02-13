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

    const getHighestRoleLabel = (roles) => {
        const roleHierarchy = {
            ROLE_USER: 1,
            ROLE_TEACHER: 2,
            ROLE_PROVIDER: 3,
            ROLE_ADMIN: 4,
        };

        const roleLabels = {
            ROLE_USER: 'Utilisateur',
            ROLE_TEACHER: 'Enseignant',
            ROLE_PROVIDER: 'Fournisseur',
            ROLE_ADMIN: 'Administrateur',
        };

        const highestRole = roles.reduce((prev, current) => {
            return roleHierarchy[current] > roleHierarchy[prev]
                ? current
                : prev;
        });

        return roleLabels[highestRole];
    };

    const fetchAllUsersData = useCallback(async () => {
        try {
            const response = await getUsersService();
            const normalizedData = normalize(response);
            const dataWithRoleLabels = normalizedData.map((user) => ({
                ...user,
                roles: getHighestRoleLabel(user.roles),
            }));
            setData(dataWithRoleLabels);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, []);

    const fetchUserData = useCallback(async (id) => {
        try {
            const response = await getUserService(id);
            const userWithRoleLabel = {
                ...response,
                roles: getHighestRoleLabel(response.roles),
            };
            setUserDetails((prevDetails) => ({
                ...prevDetails,
                [id]: userWithRoleLabel,
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
