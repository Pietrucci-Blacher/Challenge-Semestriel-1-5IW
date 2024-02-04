import {
    getUsersNumber,
    getActiveCompaniesNumber,
    getTotalCourseBookings,
} from '@/services/statsService';
import { useCallback, useState } from 'react';

export const useStats = () => {
    const [userNumber, setUserNumber] = useState(0);
    const [companieNumber, setCompanieNumber] = useState(0);
    const [bookingNumber, setBookingNumber] = useState(0);

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
            const data = await getTotalCourseBookings();
            const bookingsData = data['hydra:member'] ?? [];
            setCompanieNumber(bookingsData.length);
        } catch (error) {
            console.error(
                'Erreur lors de la récupération du nombre d entreprises:',
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
    };
};
