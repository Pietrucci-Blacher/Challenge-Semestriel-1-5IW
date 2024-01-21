import httpClient from './httpClient';

export const createFeedback = (payload) => {
    return httpClient.post('/feedback', payload);
};

export const getFeedbacksFromEstablishmentId = async (id) => {
    const result = await httpClient.get(`/establishments/${id}/feedback`);
    return result['hydra:member'];
};

export const getEstablishmentNote = (id) => {
    return httpClient.get(`/establishments/${id}/note`);
};
