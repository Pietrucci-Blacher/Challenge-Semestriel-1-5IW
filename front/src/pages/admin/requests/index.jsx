import useRequestsProvider from '@/hooks/useRequestsProvider';
import { useEffect, useState } from 'react';
import { Button as FlowbiteButton, Table } from 'flowbite-react';
import Link from 'next/link';
import Spinner from '@/components/Spinner';

export default function Index() {
    const { requests, getListOfRequests } = useRequestsProvider();
    const [filterStatus, setFilterStatus] = useState('all');
    const [uniqueStatuses, setUniqueStatuses] = useState(['all']);

    useEffect(() => {
        getListOfRequests();
    }, [getListOfRequests]);

    useEffect(() => {
        if (requests) {
            const statusSet = new Set(
                requests.map((request) => request.status),
            );
            const sortedStatuses = Array.from(statusSet).sort();
            setUniqueStatuses(['all', ...sortedStatuses]);
        }
    }, [requests]);

    if (!requests) {
        return <Spinner />;
    }

    const filteredRequests =
        filterStatus === 'all'
            ? requests
            : requests.filter((request) => request.status === filterStatus);

    return (
        <>
            <div className="flex justify-between items-center mb-4 mt-4">
                <h2 className="text-xl font-semibold">
                    Liste des demandes en cours
                </h2>
                <div className="flex items-center">
                    <label
                        htmlFor="statusFilter"
                        className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                        Filtrer par statut :
                    </label>
                    <select
                        id="statusFilter"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        {uniqueStatuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <Table>
                <Table.Head>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Date de creation</Table.HeadCell>
                    <Table.HeadCell>Voir</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {filteredRequests.map((request) => (
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
