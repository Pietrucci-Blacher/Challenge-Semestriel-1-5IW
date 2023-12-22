import { useService } from '@/hooks/useService';
import { useEstablishment } from '@/hooks/useEstablishment';
import { useTeam } from '@/hooks/useTeam';
import { useAuthContext } from '@/providers/AuthProvider';
import { useEffect } from 'react';

export default function Provider() {
    const { user } = useAuthContext();
    const { servicesPerEstablishment, getGetServicesPerEstablishment } =
        useService();
    const { establishments, getMyEstablishments } = useEstablishment();
    // const { establishments, getMyEstablishments } = useTeamMember();

    useEffect(() => {
        const { id } = user;
        if (!id) return;
        getMyEstablishments(id);
    }, [user, getMyEstablishments]);

    useEffect(() => {
        if (!establishments) return;
        const establishmentIds = establishments.map(
            (establishment) => establishment.id,
        );
        getGetServicesPerEstablishment(establishmentIds);
    }, [establishments, getGetServicesPerEstablishment]);

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded">
                    <div className="">Nombre d&apos;établisements</div>
                    <div className="text-4xl">
                        {establishments?.length || 0}
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded">
                    <div className="">Nombre de services</div>
                    <div className="text-4xl">
                        {servicesPerEstablishment?.flat()?.length || 0}
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded">
                    <div className="">Nombre de menbres d&apos;équipe</div>
                    <div className="text-4xl">0</div>
                </div>
                {/*<div className="bg-gray-50 dark:bg-gray-800 p-1 rounded"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded"></div>*/}
            </div>
        </>
    );
}
