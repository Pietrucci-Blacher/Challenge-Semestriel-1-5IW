import useRequestsProvider from "@/hooks/useRequestsProvider";
import { useEffect } from "react";
import {Button as FlowbiteButton} from "flowbite-react";
import Link from "next/link";

export default function Index() {
    const { requests, getListOfRequests } = useRequestsProvider();

    useEffect(() => {
        getListOfRequests();
    }, [getListOfRequests]);

    return (
        <>
            <h2>Liste des demandes en cours</h2>
            <table>
                <thead>
                <tr>
                    <th>Status</th>
                    <th>Date de creation</th>
                    <th>Voir</th>
                </tr>
                </thead>
                <tbody>
                {requests.map((request) => (
                    <tr key={request.id}>
                        <td>{request.status}</td>
                        <td>{request.createdAt}</td>
                        <td><FlowbiteButton as={Link} href={`requests/${request.id}`}>
                            Voir en detail
                        </FlowbiteButton></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}
