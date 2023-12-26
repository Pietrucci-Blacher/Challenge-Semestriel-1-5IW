import {useCallback, useState} from "react";
import {
    addReservation,
    getEstablishmentReservations, getServiceReservations,
    getTeacherReservations,
    getUserReservations
} from "@/services/reservationService";

export const useReservation = () => {
    const [reservations, setReservations] = useState(null)
    const createReservation = useCallback(async (newReservation) => {
        const payload = {
            startTime: newReservation["startTime"],
            endTime: newReservation["endTime"],
            establishment: `/establishments/${newReservation["establishment"]}`,
            service: `/services/${newReservation["service"]}`,
            teacher: `/users/${newReservation["teacher"]}`,
            specialRequests: newReservation["specialRequests"]
        }
        const response = await addReservation(payload)
    }, []);

    const fetchUserReservations = useCallback(async (userId) => {
        const response = await getUserReservations(userId)
        setReservations("a")
    }, []);


    const fetchTeacherReservations = useCallback(async (teacherId) => {
        const response = await getTeacherReservations(teacherId)
        setReservations("a")
    }, []);

    const fetchEstablishmentReservations = useCallback(async (establishmentId) => {
        const response = await getEstablishmentReservations(establishmentId)
        setReservations("a")
    }, []);


    const fetchServiceReservations = useCallback(async (serviceId) => {
        const response = await getServiceReservations(serviceId)
        setReservations("a")
    }, []);


    return {
        reservations,
        createReservation
    }
}