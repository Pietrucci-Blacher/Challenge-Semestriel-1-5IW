import { useEffect } from 'react';
import { Table } from 'flowbite-react';
import { useService } from '@/hooks/useService';
export default function ListAllServices() {
    const { services, getAllServices } = useService();

    useEffect(() => {
        getAllServices();
    }, []);

    if (!services) {
        return <div>Chargement en cours...</div>; // Show loading state outside of the table
    }

    const renderServices = services.map((service) => (
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
    ));

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
