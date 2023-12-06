import httpClient from "./httpClient";

const applyToBeProviderService = async (payload) => {
    return await httpClient.post('provider_requests', payload, {headers: {'Content-Type': 'multipart/form-data'}})
};

const getListOfRequestsService = async () => {
    return await httpClient.get('provider_requests')
};

const getRequestService = async ({id}) => {
    return await httpClient.get(`provider_requests/${id}`)
};

const updateRequestService = async ({id, status}) => {
    return await httpClient.patch(`provider_requests/${id}`, {status})
};



export {applyToBeProviderService, getListOfRequestsService, getRequestService, updateRequestService};