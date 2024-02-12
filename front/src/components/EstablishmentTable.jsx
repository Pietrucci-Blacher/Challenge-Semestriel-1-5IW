// EstablishmentTablePagination.jsx
import { useEffect, useState } from 'react';
import { Pagination, Table } from 'flowbite-react'; // Importez le composant de pagination et de tableau
import Link from 'next/link';
import Spinner from '@/components/Spinner'; // Importez le composant Spinner

export default function EstablishmentTablePagination({ establishments }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Nombre d'établissements par page

    useEffect(() => {
        setCurrentPage(1); // Réinitialiser la page actuelle lorsque les établissements changent
    }, [establishments]);

    if (!establishments) {
        return <Spinner />; // Afficher le Spinner tant que les établissements sont en cours de chargement
    }

    // Index du premier et du dernier établissement sur la page actuelle
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Établissements à afficher sur la page actuelle
    const currentEstablishments = establishments.slice(indexOfFirstItem, indexOfLastItem);

    // Nombre total de pages
    const totalPages = Math.ceil(establishments.length / itemsPerPage);

    // Fonction pour changer de page
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderEstablishments = currentEstablishments.map((establishment) => (
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
                <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" href={`/establishment/${establishment.id}`}>
                    Voir
                </Link>
            </Table.Cell>
        </Table.Row>
    ));

    return (
        <div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Nom</Table.HeadCell>
                    <Table.HeadCell>Rue</Table.HeadCell>
                    <Table.HeadCell>Ville</Table.HeadCell>
                    <Table.HeadCell>Code postal</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                    <Table.HeadCell>Détail</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y divide-gray-700">
                    {renderEstablishments}
                </Table.Body>
            </Table>
            <Pagination
                className='pb-2'
                layout="navigation"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                showIcons
            />
        </div>
    );
}
