import {
    fetchServiceRequest,
    getAllServicesRequest,
    createServiceRequest,
    updateServiceRequest,
    deleteServiceRequest,
} from '@/services/serviceService'

export  const useService = () => {
    const createService = async (service) => {
        try {
            await createServiceRequest(service);
        } catch (e) {
            console.error("Error creating service: ", e);
        }
    };

    const updateService = async (service) => {
        try {
            await updateServiceRequest(service);
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
            await fetchServiceRequest(service);
        } catch (e) {
            console.error("Error fetching service: ", e);
        }
    };

    const getAllServices = async () => {
        try {
            await getAllServicesRequest();
        } catch (e) {
            console.error("Error fetching all services: ", e);
        }
    };
}
