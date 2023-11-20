import { useRouter } from "next/router";
import { useEstablishment } from "@/hooks/useEstablishment";
import { useEffect } from "react";

export default function ShowEstablishment() {
    const router = useRouter();
    const { id } = router.query;
    const { establishment, getEstablishment } = useEstablishment();

    useEffect(() => {
        getEstablishment(id);
    });

    return (
        <>
            {establishment ? (
                <div>
                    <h1>{establishment.name}</h1>
                    <p>{establishment.street}</p>
                    <p>{establishment.city}</p>
                    <p>{establishment.zipCode}</p>
                </div>
            ) : (
                "Chargement..."
            )}
        </>
    );
}
