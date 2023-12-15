import {
    fetchServiceRequest,
    fetchMyServicesRequest,
    getAllServicesRequest,
    createServiceRequest,
    updateServiceRequest,
    deleteServiceRequest,
    searchServiceRequest,
} from '@/services/serviceService'
import {useState} from "react";

export const useService = () => {
    const [service, setService] = useState(null);
    const [services, setServices] = useState(null);
    const createService = async (data) => {
        try {
            return await createServiceRequest(data);
        } catch (e) {
            console.error("Error creating service: ", e);
        }
    };

    const updateService = async (service) => {
        try {
            return await updateServiceRequest(service);
        } catch (e) {
            console.error("Error updating service: ", e);
        }
    };

    const deleteService =  async (service) => {
        try {
            await deleteServiceRequest(service);
        } catch (e) {
            console.error("Error deleting service: ", e);
        }
    };

    const getService = async (service) => {
        try {
            const response = await fetchServiceRequest(service);
            setService(response)
        } catch (e) {
            console.error("Error fetching service: ", e);
        }
    };

    const getAllMyServices = async () => {
        try {
            const response = await fetchMyServicesRequest();
            setServices(response)
        } catch (e) {
            console.error("Error fetching all yours services: ", e);
        }
    };

    const getAllServices = async (filter) => {
        try {
            const response = await getAllServicesRequest(filter);
            setServices(response)
        } catch (e) {
            console.error("Error fetching all services: ", e);
        }
    };

    return {
        service,
        services,
        createService,
        updateService,
        deleteService,
        getService,
        getAllServices,
        getAllMyServices
    };
}

