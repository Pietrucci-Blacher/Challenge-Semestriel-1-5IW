import httpClient from './httpClient';

export const addReservation = (payload) => {
    return httpClient.post(`/reservations`, payload);
};

export const getReservation = (reservationId) => {
    return httpClient.get(`reservations/${reservationId}`);
};
export const getUserReservations = (userId) => {
    return httpClient.get(`users/${userId}/reservations`);
};

export const getTeacherReservations = (teacherId) => {
    return httpClient.get(`teachers/${teacherId}/reservations`);
};

export const getEstablishmentReservations = (establishmentId) => {
    return httpClient.get(`establishments/${establishmentId}/reservations`);
};

export const getServiceReservations = (serviceId) => {
    return httpClient.get(`services/${serviceId}/reservations`);
};

export const updateReservation = ({ reservationId, startTime, endTime }) => {
    return httpClient.patch(`reservations/${reservationId}`, {
        startTime,
        endTime,
    });
};

export const deleteReservationService = (reservationId) => {
    return httpClient.delete(`reservations/${reservationId}`);
};
