import { getUsersNumber } from '@/services/statsService';
import { useCallback, useState } from 'react';

export const useStats = () => {
    const [userNumber, setUserNumber] = useState(0);

    const getUserNumbers = useCallback(async (userId) => {
        try {
            const data = await getUsersNumber();
            const usersData = data['hydra:member'] ?? [];
            console.log(usersData);
            setUserNumber(usersData.length);
        } catch (error) {
            console.error(
                'Erreur lors de la récupération du nombre d utilisateur:',
                error,
            );
        }
    }, []);

    return {
        userNumber,
        getUserNumbers,
    };
};
