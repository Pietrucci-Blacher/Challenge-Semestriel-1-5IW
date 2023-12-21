import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button as FlowbiteButton } from "flowbite-react";
import { useToast } from "@/hooks/useToast";
import Link from "next/link";
import GenericButton from "@/components/GenericButton";
import {useService} from "@/hooks/useService";
import {deleteServiceRequest} from "@/services/serviceService";
import { convertDataToHtml } from "@/utils/utils";

export default function ShowService() {
    const router = useRouter();
    const { id } = router.query;
    const { service, getService } = useService();
    const { createToastMessage } = useToast();

    useEffect(() => {
        getService(id);
    }, [id, getService]);

    const handleDelete = async (event) => {
        try {
            await deleteServiceRequest(id);
            await router.push("/provider/services");
        } catch (error) {
            createToastMessage("error", "Une erreur est survenue");
        }
    };

    const renderService = service ? (
        <>
        <div className="w-full mr-4 mb-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded mb-4">
                <h1 className="font-medium text-3xl">{service.title}</h1>
                <p>{service.description}</p>
                <p>{service.price} €</p>
            </div>
            <div className="editor-html">{convertDataToHtml(service.body.blocks)}</div>
        </div>
        <img className="w-[500px] rounded" src={`https://localhost/media/${service.imagePath}`} alt="image" />
        </>
    ) : "Chargement...";

    return (
        <>
            <div className="lg:flex justify-between">{renderService}</div>
            <GenericButton onClick={handleDelete} label="Supprimer" />
            <FlowbiteButton
                className="my-2"
                as={Link}
                href={`/provider/services/update/${id}`}
            >
                Modifier
            </FlowbiteButton>
            <FlowbiteButton
                className="my-2"
                as={Link}
                href="/provider/services"
            >
                Retour
            </FlowbiteButton>
        </>
    );
}
