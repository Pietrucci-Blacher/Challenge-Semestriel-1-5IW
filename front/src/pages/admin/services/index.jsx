import { useEffect } from 'react';
import { Table } from 'flowbite-react';
import { useService } from '@/hooks/useService';
export default function ListAllServices() {
    const { services, getAllServices } = useService();

    useEffect(() => {
        getAllServices();
    }, [getAllServices]);

    const renderServices = services
        ? services.map((service) => (
              <Table.Row key={service.id}>
                  <Table.Cell>{service.title}</Table.Cell>
                  <Table.Cell>{service.description}</Table.Cell>
                  <Table.Cell>{service.price}</Table.Cell>
                  <Table.Cell>
                      {service.author.firstname} {service.author.lastname}
                  </Table.Cell>
                  <Table.Cell>
                      <a
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                          href={`/admin/services/${service.id}`}
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
                <Table.HeadCell>Titre</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Prix</Table.HeadCell>
                <Table.HeadCell>Auteur</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>{renderServices}</Table.Body>
        </Table>
    );
}
