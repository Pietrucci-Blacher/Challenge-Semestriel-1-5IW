import axios from "axios";
import { normalize } from "@/utils/data";
import {
    banUnbanUserService,
    deleteUserService,
    editUserService,
    getUserService,
    getUsersService
} from "@/services/datatableService";

export const useDatatable = () => {
    const fetchAllUsersData = async () => {
        try {
            await getUsersService();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchUserData = async (id) => {
        try {
            await getUserService(id);
        } catch (error) {
            console.error("Error fetching data:", error);
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




    // Return an object with the fetchData function
    return {
        fetchAllUsersData,
        fetchUserData,
        banUser,
        editUser,
        deleteUser
    };
};
