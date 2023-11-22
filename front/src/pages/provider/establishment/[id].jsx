import { useRouter } from "next/router";
import { useEstablishment } from "@/hooks/useEstablishment";
import { useEffect } from "react";
import { Button as FlowbiteButton } from "flowbite-react";
import Link from "next/link";
import GenericButton from "@/components/GenericButton";
import { deleteEstablishment } from "@/services/establishmentService";
import { useToast } from "@/hooks/useToast";

export default function ShowEstablishment() {
    const router = useRouter();
    const { id } = router.query;
    const { establishment, getEstablishmentById } = useEstablishment();

    useEffect(() => {
        getEstablishmentById(id);
    }, [id]);

    const handleDelete = async (event) => {
        try {
            await deleteEstablishment(id);
            router.push("/provider/establishment");
        } catch (error) {
            createToastMessage("error", "Une erreur est survenue");
        }
    };

    const renderEstablishment = establishment ? (
        <div>
            <h1>{establishment.name}</h1>
            <p>{establishment.street}</p>
            <p>{establishment.city}</p>
            <p>{establishment.zipCode}</p>
        </div>
    ) : (
        "Chargement..."
    );

    return (
        <>
            <div>{renderEstablishment}</div>
            <GenericButton onClick={handleDelete} label="Supprimer" />
            <FlowbiteButton
                as={Link}
                href={`/provider/establishment/update/${id}`}
            >
                Modifier
            </FlowbiteButton>
            <FlowbiteButton as={Link} href="/provider/establishment">
                Retour
            </FlowbiteButton>
        </>
    );
}
