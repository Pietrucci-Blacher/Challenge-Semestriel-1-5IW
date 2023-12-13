import * as service from "@/services/establishmentService";
import {useCallback, useState} from "react";

export const useEstablishment = () => {
    const [establishment, setEstablishment] = useState(null);
    const [establishments, setEstablishments] = useState(null);
    const [establishmentId , setEstablishmentId] = useState(null)
    const [userId , setUserId] = useState(null)

    const getEstablishmentById = useCallback(async (id) => {
        const response = await service.getEstablishmentById(id);
        setEstablishment(response);
        setEstablishmentId(id)
    }, [establishmentId])

    const getMyEstablishments = useCallback(async (userId) => {
        setEstablishments(null);
        const response = await service.getMyEstablishments(userId);
        const establishments = response["hydra:member"]
        setEstablishments(establishments);
        setUserId(userId);
    }, [userId])

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
