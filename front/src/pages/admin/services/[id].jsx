import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button as FlowbiteButton } from "flowbite-react";
import Link from "next/link";
import GenericButton from "@/components/GenericButton";
import {useService} from "@/hooks/useService";

export default function ShowService() {
    const router = useRouter();
    const { id } = router.query;
    const { service, getService, deleteService } = useService();

    useEffect(() => {
        getService(id);
    }, [id]);

    const handleDelete = async (event) => {
        try {
            await deleteService(id);
            router.push("/admin/services");
        } catch (error) {
            createToastMessage("error", "Une erreur est survenue");
        }
    };

    const renderService = service ? (
        <div>
            <h1>{service.title}</h1>
            <p>Description: {service.description}</p>
            <p>Prix: {service.city}</p>
            <p>
                Propriétaire: {service.author.firstname}{" "}
                {service.author.lastname}
            </p>
        </div>
    ) : (
        "Chargement..."
    );

    return (
        <>
            <div>{renderService}</div>
            <GenericButton onClick={handleDelete} label="Supprimer" />
            <FlowbiteButton
                className="my-2"
                as={Link}
                href={`/admin/services/update/${id}`}
            >
                Modifier
            </FlowbiteButton>
            <FlowbiteButton
                className="my-2"
                as={Link}
                href="/admin/services"
            >
                Retour
            </FlowbiteButton>
        </>
    );
}
