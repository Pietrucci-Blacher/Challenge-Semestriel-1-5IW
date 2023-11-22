import * as service from "@/services/establishmentService";
import { useState } from "react";

export const useEstablishment = () => {
    const [establishment, setEstablishment] = useState(null);
    const [establishments, setEstablishments] = useState(null);

    const getEstablishmentById = async (id) => {
        const response = await service.getEstablishmentById(id);
        setEstablishment(response);
    };

    const getMyEstablishments = async () => {
        const response = await service.getMyEstablishments();
        setEstablishments(response);
    };

    return {
        establishment,
        getEstablishmentById,
        establishments,
        getMyEstablishments,
    };
};
