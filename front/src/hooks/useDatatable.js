import { useCallback, useState } from 'react';
import {
    deleteUserService,
    editUserService,
    getUserService,
    getUsersService,
    updateUserRoleService,
} from '@/services/datatableService';
import { normalize } from '@/utils/data';

export const useDatatable = () => {
    const [data, setData] = useState([]);
    const [userDetails, setUserDetails] = useState({});

    const getHighestRoleLabel = (roles) => {
        const roleHierarchy = {
            ROLE_ADMIN: 4,
            ROLE_PROVIDER: 3,
            ROLE_TEACHER: 2,
            ROLE_USER: 1,
        };

        const roleLabels = {
            ROLE_ADMIN: 'Administrateur',
            ROLE_PROVIDER: 'Prestataire',
            ROLE_TEACHER: 'Enseignant',
            ROLE_USER: 'Utilisateur',
        };

        const rolesArray = Array.isArray(roles) ? roles : [roles];

        let highestRoleRank = 0;
        let highestRoleKey = 'ROLE_USER';
        rolesArray.forEach((role) => {
            if (roleHierarchy[role] > highestRoleRank) {
                highestRoleRank = roleHierarchy[role];
                highestRoleKey = role;
            }
        });

        return roleLabels[highestRoleKey];
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
        try {
            await deleteUserService(id);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    const updateUserRole = useCallback(async (role, userId) => {
        const userRole = `ROLE_${role}`;
        try {
            await updateUserRoleService({ userRole, userId });
        } catch (error) {
            console.error('Error updating user:', error);
        }
    }, []);

    return {
        fetchAllUsersData,
        fetchUserData,
        editUser,
        deleteUser,
        userDetails,
        setUserDetails,
        data,
        setData,
        updateUserRole,
    };
};
