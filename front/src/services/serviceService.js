import httpClient from '@/services/httpClient';

const fetchServiceRequest = (id) => {
    return httpClient.get(`services/${id}`);
};

const fetchMyServicesRequest = () => {
    return httpClient.get('services/me');
};

const getAllServicesRequest = async () => {
    const result = await httpClient.get('services');
    return result['hydra:member'];
};

const getEstablishmentServicesRequest = async (establishmentId) => {
    const result = await httpClient.get(
        `establishments/${establishmentId}/services`,
    );
    return result['hydra:member'];
};

const createServiceRequest = ({
    title,
    description,
    price,
    establishment,
    body,
}) => {
    return httpClient.post('services', {
        title,
        description,
        price,
        establishment,
        body,
    });
};

const updateServiceRequest = (id, data) => {
    return httpClient.put(`services/${id}`, data);
};

const deleteServiceRequest = (id) => {
    return httpClient.delete(`services/${id}`);
};

export {
    fetchServiceRequest,
    fetchMyServicesRequest,
    getAllServicesRequest,
    getEstablishmentServicesRequest,
    createServiceRequest,
    updateServiceRequest,
    deleteServiceRequest,
};
