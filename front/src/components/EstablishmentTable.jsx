import { useEffect, useState } from 'react';
import { Pagination, Table, Button } from 'flowbite-react'; // Importez le composant Button
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import Input from '@/components/Input';
import { useAuthContext } from '@/providers/AuthProvider';


export default function EstablishmentTablePagination({ establishments, baseUrl }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('name');
    const { user } = useAuthContext();

    useEffect(() => {
        setCurrentPage(1);
    }, [establishments]);

    if (!establishments) {
        return <Spinner />;
    }

    const filteredEstablishments = establishments.filter(establishment =>
        establishment[filterType].toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEstablishments = filteredEstablishments.slice(
        indexOfFirstItem,
        indexOfLastItem,
    );

    const totalPages = Math.ceil(filteredEstablishments.length / itemsPerPage);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleFilterTypeChange = (type) => {
        setFilterType(type);
        setCurrentPage(1);
    };

    const renderEstablishments = currentEstablishments.map((establishment) => (
        <Table.Row key={establishment.id}>
            <Table.Cell>{establishment.name}</Table.Cell>
            <Table.Cell>{establishment.street}</Table.Cell>
            <Table.Cell>{establishment.city}</Table.Cell>
            <Table.Cell>{establishment.zipCode}</Table.Cell>
            <Table.Cell>
                {establishment.owner.firstname} {establishment.owner.lastname}
            </Table.Cell>
            <Table.Cell>
            <Link
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href={
                    user.roles[0] === 'ROLE_USER' ? `establishment/${establishment.id}` :
                    user.roles[0] === 'ROLE_PROVIDER' ? `establishment/${establishment.id}` :
                    user.roles[0] === 'ROLE_ADMIN' ? `establishment/${establishment.id}` :
                    '#'
                }
            >
                Voir
            </Link>
            </Table.Cell>
        </Table.Row>
    ));

    return (
        <div>
            <div className="mb-4 flex">
                <Input
                    type="text"
                    placeholder="Rechercher un établissement"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="mr-2"
                />
                {/* Utilisez un menu déroulant simple pour regrouper les boutons de filtre */}
                <select label="Filtrer par" className="mr-2" value={filterType} onChange={(e) => handleFilterTypeChange(e.target.value)}>
                    <option value="name">Nom</option>
                    <option value="street">Rue</option>
                    <option value="city">Ville</option>
                    <option value="zipCode">Code postal</option>
                    {/* Ajoutez d'autres types de filtres si nécessaire */}
                </select>
            </div>
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
                className="pb-2"
                layout="navigation"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                showIcons
            />
        </div>
    );
}
