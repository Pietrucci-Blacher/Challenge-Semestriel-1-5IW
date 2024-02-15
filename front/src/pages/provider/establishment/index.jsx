import { useContext, useEffect } from 'react';
import { Button as FlowbiteButton, Table } from 'flowbite-react';
import Link from 'next/link';
import { useAuthContext } from '@/providers/AuthProvider';
import {useEstablishment} from "@/hooks/useEstablishment";

export default function ListEstablishment() {
    const { user } = useAuthContext();
    const { establishments, getMyEstablishments } = useEstablishment();

    useEffect(() => {
        if (user?.id) {
            getMyEstablishments(user.id);
        }
    }, [user, getMyEstablishments]);

    let content;
    if (establishments === null) {
        // État de chargement
        content = (
            <Table.Row>
                <Table.Cell colSpan="5">Chargement en cours...</Table.Cell>
            </Table.Row>
        );
    } else if (establishments.length === 0) {
        // Aucun établissement trouvé
        content = (
            <Table.Row>
                <Table.Cell colSpan="5">Aucun établissement trouvé.</Table.Cell>
            </Table.Row>
        );
    } else {
        // Affichage des établissements
        content = establishments.map((establishment) => (
            <Table.Row key={establishment.id}>
                <Table.Cell>{establishment.name}</Table.Cell>
                <Table.Cell>{establishment.street}</Table.Cell>
                <Table.Cell>{establishment.city}</Table.Cell>
                <Table.Cell>{establishment.zipCode}</Table.Cell>
                <Table.Cell>
                    <Link href={`/provider/establishment/${establishment.id}`} passHref>
                        <a className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                            Voir
                        </a>
                    </Link>
                </Table.Cell>
            </Table.Row>
        ));
    }

    return (
        <>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Nom</Table.HeadCell>
                    <Table.HeadCell>Rue</Table.HeadCell>
                    <Table.HeadCell>Ville</Table.HeadCell>
                    <Table.HeadCell>Code postal</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body>{content}</Table.Body>
            </Table>
            <FlowbiteButton
                className="my-2"
                as={Link}
                href="/provider/establishment/create"
            >
                Créer un établissement
            </FlowbiteButton>
        </>
    );
}
