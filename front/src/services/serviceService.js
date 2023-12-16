import httpClient from "@/services/httpClient";
import { urlParameters } from "@/utils/utils";

const fetchServiceRequest = (id) => {
    return httpClient.get(`services/${id}`)
}

const fetchMyServicesRequest = () => {
    return httpClient.get('services/me')
}

const getAllServicesRequest = async (filter = {}) => {
    const query = urlParameters(filter);
    const result = await httpClient.get(`services${query}`);
    return result["hydra:member"];
}

const createServiceRequest = (payload) => {
    return httpClient.post('services', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

// const createServiceRequest = ({title, description, price, establishment, body}) => {
//     return httpClient.post('services', {
//         title,
//         description,
//         price,
//         establishment,
//         body,
//     });
// }

const updateServiceRequest = (id, data) => {
    return httpClient.put(`services/${id}`, data)
}

const deleteServiceRequest = (id) => {
    return httpClient.delete(`services/${id}`)
}

export {
    fetchServiceRequest,
    fetchMyServicesRequest,
    getAllServicesRequest,
    createServiceRequest,
    updateServiceRequest,
    deleteServiceRequest,
}
