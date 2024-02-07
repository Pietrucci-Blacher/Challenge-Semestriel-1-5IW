import httpClient from './httpClient';
import { urlParameters } from '@/utils/utils';

export const createFeedback = (payload) => {
    return httpClient.post('/feedback', payload);
};

export const getFeedbacks = async (filter = {}) => {
    const params = urlParameters(filter);
    const result = await httpClient.get(`/feedback${params}`);
    return result['hydra:member'];
};

export const getFeedbacksFromEstablishmentId = async (id) => {
    const result = await httpClient.get(`/establishments/${id}/feedback`);
    return result['hydra:member'];
};

export const getFeedbacksFromServiceId = async (id) => {
    const result = await httpClient.get(`/services/${id}/feedback`);
    return result['hydra:member'];
};

export const getFeedbacksFromUserId = async (id) => {
    const result = await httpClient.get(`/users/${id}/feedback`);
    return result['hydra:member'];
};

export const getEstablishmentNote = (id) => {
    return httpClient.get(`/establishments/${id}/note`);
};

export const getServiceNote = (id) => {
    return httpClient.get(`/services/${id}/note`);
};

export const deleteFeedback = (id) => {
    return httpClient.delete(`/feedback/${id}`);
}
