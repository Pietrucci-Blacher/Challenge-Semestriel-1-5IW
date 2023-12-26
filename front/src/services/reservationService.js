import httpClient from "./httpClient";

export const addReservation = (payload) => {
    return httpClient.post(`/reservations`, payload);
};

export const getUserReservations = ({ userId }) => {
    return httpClient.get(`users/${userId}/schedules`);
};

export const getTeacherReservations = ({ establishmentId }) => {
    return httpClient.get(`establishments/${establishmentId}/schedules`);
};

export const getEstablishmentReservations = ({ establishmentId,userId }) => {
    return httpClient.get(`establishments/${establishmentId}/users/${userId}/schedules`);
};

export const getServiceReservations = (id,payload) => {
    return httpClient.patch(`/schedules/${id}`, {...payload});
};

