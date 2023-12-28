import { useEstablishment } from '@/hooks/useEstablishment';
import { useEffect } from 'react';
import { Button as FlowbiteButton, Table } from 'flowbite-react';
import Link from 'next/link';

export default function ListAllEstablishment() {
    const { establishments, getAllEstablishments } = useEstablishment();

    useEffect(() => {
        getAllEstablishments();
    }, []);

    const renderEstablishments = establishments
        ? establishments.map((establishment) => (
              <Table.Row key={establishment.id}>
                  <Table.Cell>{establishment.name}</Table.Cell>
                  <Table.Cell>{establishment.street}</Table.Cell>
                  <Table.Cell>{establishment.city}</Table.Cell>
                  <Table.Cell>{establishment.zipCode}</Table.Cell>
                  <Table.Cell>
                      {establishment.owner.firstname}{' '}
                      {establishment.owner.lastname}
                  </Table.Cell>
                  <Table.Cell>
                      <a
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                          href={`/admin/establishment/${establishment.id}`}
                      >
                          Voir
                      </a>
                  </Table.Cell>
              </Table.Row>
          ))
        : 'Chargement en cours';

    return (
        <Table>
            <Table.Head>
                <Table.HeadCell>Nom</Table.HeadCell>
                <Table.HeadCell>Rue</Table.HeadCell>
                <Table.HeadCell>Ville</Table.HeadCell>
                <Table.HeadCell>Code postal</Table.HeadCell>
                <Table.HeadCell>Propriétaire</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>{renderEstablishments}</Table.Body>
        </Table>
    );
}
