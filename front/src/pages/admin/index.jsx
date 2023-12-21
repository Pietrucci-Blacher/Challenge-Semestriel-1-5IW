import { useService } from "@/hooks/useService";
import { useEstablishment } from "@/hooks/useEstablishment";
import { useEffect } from "react";

export default function Admin() {
    const { services, getAllServices } = useService();
    const { establishments, getAllEstablishments } = useEstablishment();

    useEffect(() => {
        getAllEstablishments();
        getAllServices();
    }, []);

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded">
                    <div className="">Nombre d&apos;établisements</div>
                    <div className="text-4xl">{establishments?.length || 0}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded">
                    <div className="">Nombre de services</div>
                    <div className="text-4xl">{services?.length || 0}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded"></div>
                {/*<div className="bg-gray-50 dark:bg-gray-800 p-1 rounded"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-1 rounded"></div>*/}
            </div>
        </>
    )
}
