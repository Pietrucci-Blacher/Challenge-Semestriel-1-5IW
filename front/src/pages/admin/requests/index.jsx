import useRequestsProvider from '@/hooks/useRequestsProvider';
import { useEffect } from 'react';
import { Button as FlowbiteButton, Table } from 'flowbite-react';
import Link from 'next/link';
import Spinner from '@/components/Spinner';

export default function Index() {
    const { requests, getListOfRequests } = useRequestsProvider();

    useEffect(() => {
        getListOfRequests();
    }, [getListOfRequests]);

    if (!requests) {
        return <Spinner />;
    }

    return (
        <>
            <h2>Liste des demandes en cours</h2>
            <Table>
                <Table.Head>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Date de creation</Table.HeadCell>
                    <Table.HeadCell>Voir</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {requests.map((request) => (
                        <Table.Row key={request.id}>
                            <Table.Cell>{request.status}</Table.Cell>
                            <Table.Cell>{request.createdAt}</Table.Cell>
                            <Table.Cell>
                                <FlowbiteButton
                                    as={Link}
                                    href={`requests/${request.id}`}
                                >
                                    Voir en detail
                                </FlowbiteButton>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    );
}
