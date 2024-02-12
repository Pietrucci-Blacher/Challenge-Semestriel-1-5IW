import { useEstablishment } from '@/hooks/useEstablishment';
import { useEffect, useState } from 'react';
import { Button as FlowbiteButton, Table } from 'flowbite-react';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import MapComponent from '@/components/Map';


export default function ListAllEstablishment() {
    const { establishments, getAllEstablishments } = useEstablishment();
    const [nombreElements, setNombreElements] = useState(3);

    useEffect(() => {
        getAllEstablishments();
    }, [getAllEstablishments]);

    if (!establishments) {
        return <Spinner />;
    }

    const renderEstablishments = establishments
        ? establishments.slice(0, nombreElements).map((establishment) => (
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
                        href={`/establishment/${establishment.id}`}
                    >
                        Voir
                    </a>
                </Table.Cell>
            </Table.Row>
        ))
        : 'Chargement en cours';

    return (
        <div>

        <Table hoverable>
            <Table.Head>
                <Table.HeadCell>Nom</Table.HeadCell>
                <Table.HeadCell>Rue</Table.HeadCell>
                <Table.HeadCell>Ville</Table.HeadCell>
                <Table.HeadCell>Code postal</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-gray-700">
                {renderEstablishments}
            </Table.Body>
        </Table>
        {nombreElements < establishments.length && (
                <FlowbiteButton onClick={() => setNombreElements(nombreElements + 3)}>
                    Afficher plus
                </FlowbiteButton>
            )}
            <MapComponent></MapComponent>

        </div>
        
        
    );
}
