import {useAuthContext} from "@/providers/AuthProvider";
import {useEffect} from "react";
import {useReservation} from "@/hooks/useReservation";
import {Table} from "flowbite-react";

export default function Reservations() {
    const {user} = useAuthContext()
    const {reservations, fetchUserReservations} = useReservation()

    useEffect(() => {
        const {id} = user
        if (!id) return
        fetchUserReservations(id)
    }, [user]);

    const formatDate = (dateString) =>{
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', options);
    }

    return (
        <>
            <h2>Mes reservations</h2>
            <div className="overflow-x-auto">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Etablissement</Table.HeadCell>
                        <Table.HeadCell>Service</Table.HeadCell>
                        <Table.HeadCell>Professeur</Table.HeadCell>
                        <Table.HeadCell>Price</Table.HeadCell>
                        <Table.HeadCell>Date de prestation</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Voir</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {reservations.length > 0 ? reservations.map((reservation) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={reservation.id}>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {reservation.establishment.name}
                                    </Table.Cell>
                                    <Table.Cell>{reservation.service.title}</Table.Cell>
                                    <Table.Cell>{reservation.teacher.firstname} {reservation.teacher.lastname}</Table.Cell>
                                    <Table.Cell>{reservation.service.price} €</Table.Cell>
                                    <Table.Cell>{formatDate(reservation.startTime)}</Table.Cell>
                                    <Table.Cell>
                                        <a href={`reservations/${reservation.id}`}
                                           className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Voir
                                        </a>
                                    </Table.Cell>
                                </Table.Row>
                            ))

                            : <>
                                <Table.Row>
                                    Pas de reservation
                                </Table.Row>
                            </>
                        }

                    </Table.Body>
                </Table>
            </div>
        </>
    )
}