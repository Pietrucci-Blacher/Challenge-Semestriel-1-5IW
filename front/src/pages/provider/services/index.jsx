import { useService } from "@/hooks/useService";
import { useEffect } from "react";
import { Button as FlowbiteButton, Table } from "flowbite-react";
import Link from "next/link";

export default function ListServices() {
    const { services, getAllMyServices } = useService();

    useEffect(() => {
        getAllMyServices();
    }, []);

    const renderServices = services
        ? services.map((service) => (
            <Table.Row key={service.id}>
                <Table.Cell>{service.title}</Table.Cell>
                <Table.Cell>{service.description}</Table.Cell>
                <Table.Cell>{service.body}</Table.Cell>
                <Table.Cell>{service.price}</Table.Cell>
                <Table.Cell>{service.establishment_id}</Table.Cell>
                <Table.Cell>
                    {service.author.firstname} {service.author.lastname}
                </Table.Cell>
                <Table.Cell>
                    <a
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        href={`/provider/services/${service.id}`}
                    >
                        Voir
                    </a>
                </Table.Cell>
            </Table.Row>
        ))
        : "Chargement en cours";

    return (
        <>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Titre</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Body</Table.HeadCell>
                    <Table.HeadCell>Prix</Table.HeadCell>
                    <Table.HeadCell>Etablissement</Table.HeadCell>
                    <Table.HeadCell>Auteur</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body>{renderServices}</Table.Body>
            </Table>
            <FlowbiteButton
                className="my-2"
                as={Link}
                href="/provider/services/create"
            >
                Créer un service
            </FlowbiteButton>
        </>
    );
}
