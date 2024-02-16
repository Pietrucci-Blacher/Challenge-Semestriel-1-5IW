import { useEffect } from 'react';
import { Button as FlowbiteButton, Table } from 'flowbite-react';
import Link from 'next/link';
import { useAuthContext } from '@/providers/AuthProvider';
import { useEstablishment } from '@/hooks/useEstablishment';
import { useService } from '@/hooks/useService';

export default function ListServices() {
    const { user } = useAuthContext();
    const { servicesPerEstablishment, getGetServicesPerEstablishment } =
        useService();
    const { establishments, getMyEstablishments } = useEstablishment();

    useEffect(() => {
        if (user?.id) {
            getMyEstablishments(user.id);
        }
    }, [user, getMyEstablishments]);

    useEffect(() => {
        if (!establishments || establishments.length === 0) return;
        const establishmentIds = establishments.map(
            (establishment) => establishment.id,
        );
        getGetServicesPerEstablishment(establishmentIds);
    }, [establishments, getGetServicesPerEstablishment]);

    // Gérer le rendu conditionnel en fonction de l'état de `servicesPerEstablishment`
    let content;
    if (!servicesPerEstablishment) {
        content = (
            <Table.Row>
                <Table.Cell colSpan="5">Chargement en cours...</Table.Cell>
            </Table.Row>
        );
    } else if (servicesPerEstablishment.length === 0) {
        content = (
            <Table.Row>
                <Table.Cell colSpan="5">Aucun service trouvé.</Table.Cell>
            </Table.Row>
        );
    } else {
        content = servicesPerEstablishment.flat().map((service) => (
            <Table.Row key={service.id}>
                <Table.Cell>{service.title}</Table.Cell>
                <Table.Cell>{service.description}</Table.Cell>
                <Table.Cell>{service.price}</Table.Cell>
                <Table.Cell>{service.establishment_id}</Table.Cell>
                <Table.Cell>
                    <FlowbiteButton
                        as={Link}
                        href={`/provider/services/${service.id}`}
                    >
                        Voir
                    </FlowbiteButton>
                </Table.Cell>
            </Table.Row>
        ));
    }

    return (
        <>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Titre</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Prix</Table.HeadCell>
                    <Table.HeadCell>Établissement</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body>{content}</Table.Body>
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
