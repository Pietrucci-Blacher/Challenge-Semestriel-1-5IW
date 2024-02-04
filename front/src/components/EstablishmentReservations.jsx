import {useReservation} from "@/hooks/useReservation";
import {useEffect} from "react";

export default function EstablishmentReservations({establishmentId}) {
    const {reservations, fetchEstablishmentReservations} = useReservation()
    useEffect(() => {
        if (!establishmentId) return
        fetchEstablishmentReservations(establishmentId)
    }, [establishmentId, fetchEstablishmentReservations]);
    console.log("ok", establishmentId)
    return (
        <>
            <h2>
                establishment {establishmentId}
            </h2>
        </>
    )
}