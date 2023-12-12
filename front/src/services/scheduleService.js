import httpClient from "./httpClient";

export const addScheduleService = ({ reason, startTime, endTime}) => {
    return httpClient.post(`/schedules`, { reason, startTime, endTime});
};

export const getUserSchedulesService = ({ userId }) => {
    return httpClient.get(`users/${userId}/schedules`);
};

export const updateScheduleService = (id,payload) => {
    return httpClient.patch(`/schedules/${id}`, {...payload});
};

export const deleteScheduleService = (id) => {
    return httpClient.delete(`/schedules/${id}`);
};

