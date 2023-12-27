import { useService } from '@/hooks/useService';
import { useEffect } from 'react';
import { Button as FlowbiteButton, Table } from 'flowbite-react';
import Link from 'next/link';
import { useAuthContext } from '@/providers/AuthProvider';
import { useEstablishment } from '@/hooks/useEstablishment';

export default function ListServices() {
    const { user } = useAuthContext();
    const { servicesPerEstablishment, getGetServicesPerEstablishment } =
        useService();
    const { establishments, getMyEstablishments } = useEstablishment();

    useEffect(() => {
        const { id } = user;
        if (!id) return;
        getMyEstablishments(id);
    }, [user, getMyEstablishments]);

    useEffect(() => {
        if (!establishments) return;
        const establishmentIds = establishments.map(
            (establishment) => establishment.id,
        );
        getGetServicesPerEstablishment(establishmentIds);
    }, [establishments, getGetServicesPerEstablishment]);

    const renderServices = servicesPerEstablishment
        ? servicesPerEstablishment.flat().map((service) => (
              <Table.Row key={service.id}>
                  <Table.Cell>{service.title}</Table.Cell>
                  <Table.Cell>{service.description}</Table.Cell>
                  <Table.Cell>{service.price}</Table.Cell>
                  <Table.Cell>{service.establishment_id}</Table.Cell>
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
        : 'Chargement en cours';

    return (
        <>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Titre</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Prix</Table.HeadCell>
                    <Table.HeadCell>Etablissement</Table.HeadCell>
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
