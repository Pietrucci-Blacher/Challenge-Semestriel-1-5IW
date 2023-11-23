import httpClient from "@/services/httpClient";

const fetchServiceRequest = async (id) => {
    return await httpClient.get(`services/${id}`)
}

const getAllServicesRequest = async () => {
    return await httpClient.get(`services`)
}

const createServiceRequest = async (data) => {
    return await httpClient.post(`services`, data)
}

const updateServiceRequest = async (id, data) => {
    return await httpClient.put(`services/${id}`, data)
}

const deleteServiceRequest = async (id) => {
    return await httpClient.delete(`services/${id}`)
}




export { fetchServiceRequest, getAllServicesRequest, createServiceRequest, updateServiceRequest, deleteServiceRequest}
