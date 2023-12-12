import * as service from "@/services/establishmentService";
import {useCallback, useState} from "react";

export const useEstablishment = () => {
    const [establishment, setEstablishment] = useState(null);
    const [establishments, setEstablishments] = useState(null);
    const [establishmentId , setEstablishmentId] = useState(null)

    const getEstablishmentById = useCallback(async (id) => {
        const response = await service.getEstablishmentById(id);
        setEstablishment(response);
        setEstablishmentId(id)
    }, [establishmentId])

    const getMyEstablishments = async () => {
        setEstablishments(null);
        const response = await service.getMyEstablishments();
        setEstablishments(response);
    };

    const getAllEstablishments = async () => {
        const response = await service.getAllEstablishments();
        setEstablishments(null);
        setEstablishments(response);
    };
    return {
        establishment,
        getEstablishmentById,
        establishments,
        getMyEstablishments,
        getAllEstablishments,
    };
};
