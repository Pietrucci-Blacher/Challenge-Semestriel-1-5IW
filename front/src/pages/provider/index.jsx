import { useService } from "@/hooks/useService";
import { useEstablishment } from "@/hooks/useEstablishment";
import { useTeamMember  } from "@/hooks/useTeamMember";
import { useEffect } from "react";

export default function Provider() {
    const { services, getAllMyServices } = useService();
    const { establishments, getMyEstablishments } = useEstablishment();
    // const { establishments, getMyEstablishments } = useTeamMember();

    useEffect(() => {
        getMyEstablishments();
        getAllMyServices();
    }, []);

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded">
                    <div className="">Nombre d'établisements</div>
                    <div className="text-4xl">{establishments?.length || 0}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded">
                    <div className="">Nombre de services</div>
                    <div className="text-4xl">{services?.length || 0}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded">
                    <div className="">Nombre de menbres d'équipe</div>
                    <div className="text-4xl">0</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded"></div>
            </div>
        </>
    )
}
