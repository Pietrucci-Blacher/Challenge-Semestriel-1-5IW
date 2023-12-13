import httpClient from "@/services/httpClient";

const fetchServiceRequest = (id) => {
    return httpClient.get(`services/${id}`)
}

const fetchMyServicesRequest = () => {
    return httpClient.get('services/me')
}

const getAllServicesRequest = async (filter) => {
    console.log('filter', filter);
    const param = Object.keys(filter)
        .map(key => `${key}=${filter[key]}`)
        .join('&');

    console.log('param', param);

    const query = param ? `?${param}` : '';
    const result = await httpClient.get(`services${query}`);
    return result["hydra:member"];
}

const createServiceRequest = ({title, description, price, establishment, body}) => {
    return httpClient.post('services', {
        title,
        description,
        price,
        establishment,
        body,
    });
}

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
