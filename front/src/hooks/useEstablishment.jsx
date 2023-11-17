import { createEstablishment } from "@/services/establishmentService";
import { useAuthContext } from "@/providers/AuthProvider";

export const useEstablishment = () => {
    const { user } = useAuthContext();

    const create = ({ name, street, city, zipCode }) => {
        return createEstablishment({
            owner: `/users/${user.id}`,
            name,
            street,
            city,
            zipCode,
        });
    };

    return { create };
}
