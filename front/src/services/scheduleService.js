import httpClient from './httpClient';

export const addScheduleService = ({
    reason,
    startTime,
    endTime,
    establishment,
}) => {
    return httpClient.post(`/schedules`, {
        reason,
        startTime,
        endTime,
        establishment,
    });
};

export const getUserSchedulesService = ({ userId }) => {
    return httpClient.get(`users/${userId}/schedules`);
};

export const getEstablishmentSchedulesService = ({ establishmentId }) => {
    return httpClient.get(`establishments/${establishmentId}/schedules`);
};

export const getSchedulesByUserAndEstablishmentService = ({
    establishmentId,
    userId,
}) => {
    return httpClient.get(
        `establishments/${establishmentId}/users/${userId}/schedules`,
    );
};

export const updateScheduleService = (id, payload) => {
    return httpClient.patch(`/schedules/${id}`, { ...payload });
};

export const deleteScheduleService = (id) => {
    return httpClient.delete(`/schedules/${id}`);
};

export const deleteAdminScheduleService = (id) => {
    return httpClient.delete(`/schedules/${id}`);
};

export const getScheduleByIdService = (id) => {
    return httpClient.get(`/schedules/${id}`);
};
