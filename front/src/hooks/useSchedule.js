import { useCallback, useState } from 'react';
import {
    addScheduleService,
    deleteScheduleService,
    deleteAdminScheduleService,
    getEstablishmentSchedulesService,
    getSchedulesByTeacherAndEstablishmentService,
    getTeacherSchedulesService,
    updateScheduleService,
    getScheduleByIdService,
} from '@/services/scheduleService';

export const useSchedule = () => {
    const [teacherId, setTeacherId] = useState(null);
    const [establishmentId, setEstablishmentId] = useState(null);
    const [schedule, setSchedule] = useState(null);
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
        [teacherId],
    );

    const updateSchedule = useCallback(
        async (id, payload) => {
            const schedule = await updateScheduleService(id, payload);
            const scheduleIndex = schedules.findIndex(
                (schedule) => schedule.id === +id,
            );
            if (scheduleIndex !== -1) {
                const updatedTeacherSchedules = [...schedules];
                updatedTeacherSchedules[scheduleIndex] = {
                    ...updatedTeacherSchedules[scheduleIndex],
                    ...schedule,
                };
                setSchedules([]);
                setSchedules(updatedTeacherSchedules);
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

    const deleteAdminSchedule = useCallback(
        async (id) => {
            try {
                await deleteAdminScheduleService(id);
                const newSchedules = schedules.filter(
                    (schedule) => schedule.id !== +id,
                );
                setSchedules(newSchedules);
                router.push(`/admin/establishment/${establishmentId}`);
            } catch (error) {
                console.error(
                    'Erreur lors de la suppression du schedule :',
                    error,
                );
            }
        },
        [schedules],
    );

    const getTeacherSchedules = useCallback(
        async (teacherId) => {
            try {
                const data = await getTeacherSchedulesService({ teacherId });
                const schedulesData = data['hydra:member'] ?? [];
                setTeacherId(teacherId);
                setSchedules(schedulesData);
            } catch (error) {
                console.error(
                    'Erreur lors de la récupération des indisponibilités:',
                    error,
                );
            }
        },
        [teacherId],
    );

    const getEstablishmentSchedules = useCallback(async (establishmentId) => {
        try {
            setSchedules([]);
            const data = await getEstablishmentSchedulesService({
                establishmentId,
            });
            const schedulesData = data['hydra:member'] ?? [];
            setSchedules(schedulesData);
            setEstablishmentId(teacherId);
        } catch (error) {
            console.error(
                'Erreur lors de la récupération des indisponibilités:',
                error,
            );
        }
    }, []);

    const getSchedulesByTeacherAndEstablishment = useCallback(
        async ({ establishmentId, teacherId }) => {
            try {
                const data = await getSchedulesByTeacherAndEstablishmentService(
                    { establishmentId, teacherId },
                );
                const schedulesData = data['hydra:member'] ?? [];
                setSchedules(schedulesData);
                setTeacherId(teacherId);
            } catch (error) {
                console.error(
                    'Erreur lors de la récupération des indisponibilités:',
                    error,
                );
            }
        },
        [],
    );

    const getScheduleById = useCallback(async (scheduleId) => {
        try {
            const schedule = await getScheduleByIdService(scheduleId);
            setSchedule(schedule); // Mettez à jour le state avec le schedule trouvé
        } catch (error) {
            console.error(
                'Erreur lors de la récupération du schedule par ID:',
                error,
            );
        }
    }, []);

    return {
        schedules,
        schedule,
        // schedulesByTeacherAndEstablishment,
        addSchedule,
        updateSchedule,
        deleteSchedule,
        getTeacherSchedules,
        getEstablishmentSchedules,
        getScheduleById,
        deleteAdminSchedule,
        getSchedulesByTeacherAndEstablishment,
    };
};
