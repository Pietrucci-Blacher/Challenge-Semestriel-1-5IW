import {useCallback, useState} from "react";
import {
    addScheduleService,
    deleteScheduleService,
    getUserSchedulesService,
    updateScheduleService
} from "@/services/scheduleService";

export const useEmployeeSchedule = () => {
    const [userId, setUserId] = useState(null)
    const [schedule, setSchedule] = useState(null)
    const [userSchedules, setUserSchedules] = useState([])
    const [schedules, setSchedules] = useState([])

    const addSchedule = useCallback(async (newSchedule) => {
        const payload = {
            reason: newSchedule["title"],
            startTime: newSchedule["start"],
            endTime: newSchedule["end"],
        }
        const response = await addScheduleService(payload)
        getUserSchedules(userId)
    }, [userId]);


    const updateSchedule = useCallback(async (id, payload) => {
        const data = await updateScheduleService(id, payload)
        const scheduleIndex = userSchedules.findIndex(schedule => schedule.id === +id);
        if (scheduleIndex !== -1) {
            const updatedUserSchedules = [...userSchedules];
            const schedule = getPoint(data)
            updatedUserSchedules[scheduleIndex] = {...updatedUserSchedules[scheduleIndex], ...schedule};
            setUserSchedules([]);
            setUserSchedules(updatedUserSchedules);
        }
    }, [userSchedules]);

    const deleteSchedule = useCallback(async (id) => {
        try {
            await deleteScheduleService(id);
            const newSchedules = userSchedules.filter((schedule) =>  schedule.id !== +id)
            setUserSchedules(newSchedules);
        } catch (error) {
            console.error("Erreur lors de la suppression du schedule :", error);
        }
    }, [userSchedules]);

    const getUserSchedules = useCallback(async (userId) => {
        try {
            const data = await getUserSchedulesService({userId})
            const schedulesData = data["hydra:member"] ?? []
            const result = []
            schedulesData.forEach((element) => {
                result.push(getPoint(element))
            })
            setUserId(userId)
            setUserSchedules(result);
        } catch (error) {
            console.error('Erreur lors de la récupération des indisponibilités:', error);
        }
    }, [userId]);

    // const checkAvailability = useCallback(async (payload) => {
    //     try {
    //         const {employeeId, startDate, endDate} = payload
    //         const response = await fetch(`api/schedule/check-availability/${employeeId}`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({startDate, endDate}),
    //         });
    //
    //         if (!response.ok) {
    //             throw new Error('Network error during schedule fetching and checking');
    //         }
    //
    //         const data = await response.json();
    //         setUnavailability(data.schedule || []);
    //         return data.available;
    //     } catch (error) {
    //         console.error('Error during schedule fetching and checking:', error);
    //         return false; // Retourne false en cas d'erreur
    //     }
    // }, []);

    const getPoint = (schedule) => {
        if (!schedule) return
        const point = {
            id: '',
            title: '',
            start: '',
            end: '',
        };
        point["id"] = schedule["id"];
        point["title"] = schedule["reason"];
        let start = new Date(schedule["startTime"]);
        start.setHours(start.getHours() - 1);
        point["start"] = start.toISOString();
        let end = new Date(schedule["endTime"]);
        end.setHours(end.getHours() - 1);
        point["end"] = end.toISOString();
        return point;
    }

// Exemple d'utilisation


    return {
        schedule,
        userSchedules,
        getUserSchedules,
        addSchedule,
        updateSchedule,
        deleteSchedule,
        // checkAvailability,
    };
};
