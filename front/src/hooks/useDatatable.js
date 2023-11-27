import {useState} from "react";
import {
    banUnbanUserService,
    deleteUserService,
    editUserService,
    getUserService,
    getUsersService
} from "@/services/datatableService";
import {normalize} from "@/utils/data";

export const useDatatable = () => {
    const [data, setData] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const fetchAllUsersData = async () => {
        try {
            const response = await getUsersService();
            setData(normalize(response));
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchUserData = async (id) => {
        try {
            const response = await getUserService(id);
            setUserDetails(response);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const banUser = async (id) => {
        try {
            await banUnbanUserService(id);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const editUser = async (id, data) => {
        try {
            await editUserService(id, data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await deleteUserService(id);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };




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
