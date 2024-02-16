import httpClient from './httpClient';

export const createEstablishment = ({ name, street, city, zipCode }) => {
    return httpClient.post('/establishments', {
        name,
        street,
        city,
        zipCode,
    });
};

export const getEstablishmentById = (id) => {
    return httpClient.get(`/establishments/${id}`);
};

export const getMyEstablishments = (userId) => {
    return httpClient.get(`users/${userId}/establishments`);
};

export const deleteEstablishment = (id) => {
    return httpClient.delete(`/establishments/${id}`);
};

/**
 * update an establishment
 *
 * @param {number} id - establishment id
 * @param {{
 *     name: string,
 *     street: string,
 *     city: string,
 *     zipCode: string,
 *     photoEstablishment: string,
 * }} content - establishment content
 */
export const updateEstablishment = (id, content) => {
    return httpClient.patch(`/establishments/${id}`, content);
};

/**
 * Get all establishments for admin only
 */
export const getAllEstablishments = async () => {
    const result = await httpClient.get('/establishments');
    return result['hydra:member'];
};
