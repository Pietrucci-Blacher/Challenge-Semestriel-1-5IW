import {
    getUsersNumber,
    getActiveCompaniesNumber,
    getBookings,
    getBestCompany,
} from '@/services/statsService';
import { useCallback, useState } from 'react';

export const useStats = () => {
    const [userNumber, setUserNumber] = useState(0);
    const [companieNumber, setCompanieNumber] = useState(0);
    const [bookingNumber, setBookingNumber] = useState(0);
    const [recentBookings, setRecentBookings] = useState([]);
    const [bestCompany, setBestCompany] = useState([]);
    const [bookingsGraph, setBookingsGraph] = useState([]);

    const getUserNumber = useCallback(async () => {
        try {
            const data = await getUsersNumber();
            const usersData = data['hydra:member'] ?? [];
            setUserNumber(usersData.length);
        } catch (error) {
            console.error(
                'Erreur lors de la récupération du nombre d utilisateur:',
                error,
            );
        }
    }, []);

    const getCompaniesNumber = useCallback(async () => {
        try {
            const data = await getActiveCompaniesNumber();
            const companiesData = data['hydra:member'] ?? [];
            setCompanieNumber(companiesData.length);
        } catch (error) {
            console.error(
                'Erreur lors de la récupération du nombre d entreprises:',
                error,
            );
        }
    }, []);

    const getTotalBookings = useCallback(async () => {
        try {
            const data = await getBookings();
            const bookingsData = data['hydra:member'] ?? [];
            setBookingNumber(bookingsData.length);
        } catch (error) {
            console.error(
                'Erreur lors de la récupération du nombre de reservations',
                error,
            );
        }
    }, []);

    const getRecentBookings = useCallback(async () => {
        try {
            const data = await getBookings();
            const bookingsData = data['hydra:member'] ?? [];
            const recentBookings = bookingsData.slice(-3);
            setRecentBookings(recentBookings);
        } catch (error) {
            console.error(
                'Erreur lors de la récupération des dernières réservations',
                error,
            );
        }
    }, []);

    const getBestFeedBackCompany = useCallback(async () => {
        try {
            const data = await getBestCompany();
            const companiesData = data['hydra:member'] ?? [];
            console.log(companiesData);
            setBestCompany(companiesData);
        } catch (error) {
            console.error(
                'Erreur lors de la récupération de la meilleure entreprise',
                error,
            );
        }
    }, []);

    const getGraphReservations = useCallback(async () => {
        try {
            const data = await getBookings();
            const bookingsData = data['hydra:member'] ?? [];
            setBookingsGraph(bookingsData);
        } catch (error) {
            console.error(
                'Erreur lors de la récupération des dernières réservations',
                error,
            );
        }
    }, []);

    return {
        userNumber,
        getUserNumber,
        companieNumber,
        getCompaniesNumber,
        bookingNumber,
        getTotalBookings,
        recentBookings,
        getRecentBookings,
        bestCompany,
        getBestFeedBackCompany,
        bookingsGraph,
        getGraphReservations,
    };
};
