import { useCallback, useState } from 'react';
import {
    addReservation,
    deleteReservationService,
    getEstablishmentReservations,
    getReservation,
    getServiceReservations,
    getTeacherReservations,
    getUserReservations,
    updateReservation,
} from '@/services/reservationService';

export const useReservation = () => {
    const [userId, setUserId] = useState(null);
    const [reservation, setReservation] = useState({});
    const [reservations, setReservations] = useState([]);
    const createReservation = useCallback(async (payload) => {
        const response = await addReservation(payload);
    }, []);

    const fetchReservation = useCallback(async (reservationId) => {
        try {
            const response = await getReservation(reservationId);
            setReservation(response);
        } catch (e) {
            setReservation(null);
            throw e;
        }
    }, []);

    const moveReservation = useCallback(async (payload) => {
        try {
            const response = await updateReservation(payload);
            setReservation(response);
        } catch (e) {
            setReservation(null);
            throw e;
        }
    }, []);

    const fetchUserReservations = useCallback(
        async (userId) => {
            const response = await getUserReservations(userId);
            const reservations = response['hydra:member'];
            setReservations(reservations);
            setUserId(userId);
        },
        [userId],
    );

    const fetchTeacherReservations = useCallback(async (teacherId) => {
        const response = await getTeacherReservations(teacherId);
        setReservations(response);
    }, []);

    const fetchEstablishmentReservations = useCallback(
        async (establishmentId) => {
            const response =
                await getEstablishmentReservations(establishmentId);
            setReservations(response);
        },
        [],
    );

    const fetchServiceReservations = useCallback(async (serviceId) => {
        const response = await getServiceReservations(serviceId);
        setReservations(response);
    }, []);

    const deleteReservation = useCallback(async (reservationId) => {
        deleteReservationService(reservationId);
    }, []);

    return {
        reservation,
        reservations,
        createReservation,
        fetchReservation,
        fetchUserReservations,
        fetchEstablishmentReservations,
        moveReservation,
        deleteReservation,
    };
};
