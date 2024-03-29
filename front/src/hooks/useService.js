import {
    createServiceRequest,
    deleteServiceRequest,
    fetchMyServicesRequest,
    fetchServiceRequest,
    getAllServicesRequest,
    getEstablishmentServicesRequest,
    updateServiceRequest,
} from '@/services/serviceService';
import { useCallback, useState } from 'react';

export const useService = () => {
    const [establishmentId, setEstablishmentId] = useState(null);
    const [establishmentServices, setEstablishmentServices] = useState([]);
    const [servicesPerEstablishment, setServicesPerEstablishment] = useState(
        [],
    );
    const [service, setService] = useState(null);
    const [services, setServices] = useState(null);
    const createService = async (data) => {
        try {
            return await createServiceRequest(data);
        } catch (e) {
            console.error('Error creating service: ', e);
        }
    };

    const updateService = async (service) => {
        try {
            return await updateServiceRequest(service);
        } catch (e) {
            console.error('Error updating service: ', e);
        }
    };

    const deleteService = async (service) => {
        try {
            await deleteServiceRequest(service);
        } catch (e) {
            console.error('Error deleting service: ', e);
        }
    };

    const getService = useCallback(async (service) => {
        try {
            const response = await fetchServiceRequest(service);
            setService(response);
        } catch (e) {
            console.error('Error fetching service: ', e);
        }
    }, []);

    const getAllMyServices = async () => {
        try {
            const response = await fetchMyServicesRequest();
            setServices(response);
        } catch (e) {
            console.error('Error fetching all yours services: ', e);
        }
    };

    const getAllServices = useCallback(async () => {
        try {
            const response = await getAllServicesRequest();
            setServices(response);
        } catch (e) {
            console.error('Error fetching all services: ', e);
        }
    }, []);

    const getServicesByFilters = useCallback(async (filter = {}) => {
        try {
            const response = await getAllServicesRequest(filter);
            setServices(response);
        } catch (e) {
            console.error('Error fetching all services: ', e);
        }
    }, []);

    const getEstablishmentServices = useCallback(async (establishmentId) => {
        try {
            const response =
                await getEstablishmentServicesRequest(establishmentId);
            setEstablishmentServices(response);
            setEstablishmentId(establishmentId);
        } catch (e) {
            console.error('Error fetching all services: ', e);
        }
    }, []);

    const getGetServicesPerEstablishment = useCallback(
        async (establishmentIds) => {
            try {
                const promises = establishmentIds.map(
                    async (establishmentId) => {
                        return await getEstablishmentServicesRequest(
                            establishmentId,
                        );
                    },
                );
                const services = await Promise.all(promises);
                setServicesPerEstablishment(services);
            } catch (e) {
                console.error('Error fetching all services: ', e);
            }
        },
        [],
    );

    return {
        service,
        services,
        establishmentServices,
        servicesPerEstablishment,
        createService,
        updateService,
        deleteService,
        getService,
        getAllServices,
        getServicesByFilters,
        getAllMyServices,
        getEstablishmentServices,
        getGetServicesPerEstablishment,
    };
};
