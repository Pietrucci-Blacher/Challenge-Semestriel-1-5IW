import { getEstablishmentById } from "@/services/establishmentService";
import {useState} from "react";

export const useEstablishment = () => {
    const [establishment, setEstablishment] = useState(null);

    const getEstablishment = async (id) => {
        const response = await getEstablishmentById(id);
        setEstablishment(response);
    };

    return { establishment, getEstablishment };
};
