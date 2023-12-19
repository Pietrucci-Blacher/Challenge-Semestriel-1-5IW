import { useCallback, useState } from 'react';
import {
    addScheduleService,
    deleteScheduleService,
    getEstablishmentSchedulesService,
    getSchedulesByUserAndEstablishmentService,
    getUserSchedulesService,
    updateScheduleService,
} from '@/services/scheduleService';

export const useSchedule = () => {
    const [userId, setUserId] = useState(null);
    const [establishmentId, setEstablishmentId] = useState(null);
    const [schedule, setSchedule] = useState(null);
    // const [userSchedules, setUuserSchedules] = useState([])
    const [schedules, setSchedules] = useState([]);

    const addSchedule = useCallback(
        async (newSchedule) => {
            const payload = {
                reason: newSchedule['title'],
                startTime: newSchedule['start'],
                endTime: newSchedule['end'],
                establishment: `/establishments/${newSchedule['establishment']}`,
            };
            const response = await addScheduleService(payload);
        },
        [userId],
    );

    const updateSchedule = useCallback(
        async (id, payload) => {
            const schedule = await updateScheduleService(id, payload);
            const scheduleIndex = schedules.findIndex(
                (schedule) => schedule.id === +id,
            );
            if (scheduleIndex !== -1) {
                const updatedUserSchedules = [...schedules];
                updatedUserSchedules[scheduleIndex] = {
                    ...updatedUserSchedules[scheduleIndex],
                    ...schedule,
                };
                setSchedules([]);
                setSchedules(updatedUserSchedules);
            }
        },
        [schedules],
    );

    const deleteSchedule = useCallback(
        async (id) => {
            try {
                await deleteScheduleService(id);
                const newSchedules = schedules.filter(
                    (schedule) => schedule.id !== +id,
                );
                setSchedules(newSchedules);
            } catch (error) {
                console.error(
                    'Erreur lors de la suppression du schedule :',
                    error,
                );
            }
        },
        [schedules],
    );

    const getUserSchedules = useCallback(
        async (userId) => {
            try {
                setSchedules([]);
                const data = await getUserSchedulesService({ userId });
                const schedulesData = data['hydra:member'] ?? [];
                setUserId(userId);
                setSchedules(schedulesData);
            } catch (error) {
                console.error(
                    'Erreur lors de la récupération des indisponibilités:',
                    error,
                );
            }
        },
        [userId],
    );

    const getEstablishmentSchedules = useCallback(async (establishmentId) => {
        try {
            setSchedules([]);
            const data = await getEstablishmentSchedulesService({
                establishmentId,
            });
            const schedulesData = data['hydra:member'] ?? [];
            setSchedules(schedulesData);
            setEstablishmentId(userId);
        } catch (error) {
            console.error(
                'Erreur lors de la récupération des indisponibilités:',
                error,
            );
        }
    }, []);

    const getSchedulesByUserAndEstablishment = useCallback(
        async ({ establishmentId, userId }) => {
            try {
                const data = await getSchedulesByUserAndEstablishmentService({
                    establishmentId,
                    userId,
                });
                const schedulesData = data['hydra:member'] ?? [];
                setSchedules(schedulesData);
                setUserId(userId);
            } catch (error) {
                console.error(
                    'Erreur lors de la récupération des indisponibilités:',
                    error,
                );
            }
        },
        [],
    );

    return {
        schedules,
        schedule,
        // schedulesByUserAndEstablishment,
        addSchedule,
        updateSchedule,
        deleteSchedule,
        getUserSchedules,
        getEstablishmentSchedules,
        getSchedulesByUserAndEstablishment,
    };
};
