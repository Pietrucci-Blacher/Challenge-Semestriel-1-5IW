import {
    fetchServiceRequest,
    fetchMyServicesRequest,
    getAllServicesRequest,
    createServiceRequest,
    updateServiceRequest,
    deleteServiceRequest, getEstablishmentServicesRequest,
} from '@/services/serviceService'
import {useCallback, useState} from "react";

export const useService = () => {
    const [establishmentId, setEstablishmentId] = useState(null);
    const [establishmentServices, setEstablishmentServices] = useState([]);
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

    const getAllServices = async () => {
        try {
            const response = await getAllServicesRequest();
            setServices(response)
        } catch (e) {
            console.error("Error fetching all services: ", e);
        }
    };
    const getEstablishmentServices = useCallback(async (establishmentId) => {
        try {
            const response = await getEstablishmentServicesRequest(establishmentId);
            console.log("resp, ", response)
            setEstablishmentServices(response)
            setEstablishmentId(establishmentId)
        } catch (e) {
            console.error("Error fetching all services: ", e);
        }
    }, [establishmentId])

    return {
        service,
        services,
        establishmentServices,
        createService,
        updateService,
        deleteService,
        getService,
        getAllServices,
        getAllMyServices,
        getEstablishmentServices
    };
}

