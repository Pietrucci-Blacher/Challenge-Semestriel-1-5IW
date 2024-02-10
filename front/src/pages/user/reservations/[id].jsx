import { useRouter } from 'next/router';
import { useReservation } from '@/hooks/useReservation';
import { useEffect, useState } from 'react';
import { useSchedule } from '@/hooks/useSchedule';
import ScheduleSelector from '@/components/ScheduleSelector';
import { Button, Label, Modal, Textarea } from 'flowbite-react';

export default function Id() {
    const router = useRouter();
    const {
        reservation,
        fetchReservation,
        createReservation,
        moveReservation,
        deleteReservation,
        fetchUserReservations,
    } = useReservation();
    const { schedules, getTeacherSchedules } = useSchedule();
    const [selectedSchedule, setSelectedSchedule] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
    const [specialRequest, setSpecialRequest] = useState('');
    useEffect(() => {
        const { id } = router.query;
        if (!id) return;
        fetchReservation(id);
    }, [router, fetchReservation]);

    useEffect(() => {
        const teacherId = reservation?.teacher?.id;
        if (!teacherId) return;
        getTeacherSchedules(teacherId);
    }, [reservation, getTeacherSchedules]);

    const handleSelectSchedule = (schedule) => {
        setSelectedSchedule(schedule);
    };

    const handleMoveAppointment = async () => {
        const { startTime, endTime } = selectedSchedule;
        const payload = {
            startTime: startTime,
            endTime: endTime,
            reservationId: reservation?.id,
        };
        await moveReservation(payload);
        await getTeacherSchedules(reservation?.teacher?.id);
        setIsMoveModalOpen(false);
        setSelectedSchedule({});
    };

    const handleCancelMoveAppointment = () => {
        setIsCancelModalOpen(true);
    };

    const handleNewAppointment = async () => {
        const { startTime, endTime } = selectedSchedule;
        const payload = {
            startTime: startTime,
            endTime: endTime,
            establishment_id: reservation?.establishment?.id,
            service_id: reservation?.service?.id,
            teacher_id: reservation?.teacher?.id,
        };
        specialRequest.length > 0
            ? (payload['specialRequest'] = specialRequest)
            : payload;
        setOpenModal(false);
        await createReservation(payload);
        await getTeacherSchedules(reservation?.teacher?.id);
        setSpecialRequest('');
        setSelectedSchedule({});
        setIsAppointmentModalOpen(false);
    };

    const handleCancelNewAppointment = () => {
        setIsAppointmentModalOpen(false);
        setSelectedSchedule({});
        setSpecialRequest('');
    };

    const handleCancelAppointment = async () => {
        setIsCancelModalOpen(false);
        await deleteReservation(reservation?.id);
        await fetchUserReservations(reservation?.customer?.id);
        router.push('/reservations');
    };
    return (
        <>
            <h2>Reservation</h2>
            <br />
            <div>
                <div>
                    Etablissement : {reservation?.establishment?.name} <br />
                    Service : {reservation?.service?.title} <br />
                    Price : {reservation?.service?.price} €<br />
                    Durée : {reservation?.service?.duration} <br />
                </div>
                <br />
                <div>
                    Start date : {reservation?.startTime} <br />
                    End date : {reservation?.endTime}
                </div>
                <br />
                <div>
                    Teacher : {reservation?.teacher?.firstname}{' '}
                    {reservation?.teacher?.lastname}
                </div>
            </div>
            <br />
            <div>
                <Button onClick={() => setIsCancelModalOpen(true)}>
                    Annuler le rdv
                </Button>
                <Button onClick={() => setIsMoveModalOpen(true)}>
                    Deplacer le rdv
                </Button>
                <Button onClick={() => setIsAppointmentModalOpen(true)}>
                    Reprendre la meme reservation
                </Button>
            </div>

            <Modal
                show={isCancelModalOpen}
                onClose={() => setIsCancelModalOpen(false)}
            >
                <Modal.Header>Annuler la reservation</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        Vous &#39;etes sur d&#39;annuler la r&eacute;servation
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleCancelAppointment}>Confirmer</Button>
                    <Button
                        color="gray"
                        onClick={() => setIsCancelModalOpen(false)}
                    >
                        Annuler
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={isMoveModalOpen}
                onClose={() => setIsMoveModalOpen(false)}
                size="6xl"
            >
                <Modal.Header>Deplacer la reservation</Modal.Header>
                <Modal.Body>
                    <h2 className="text-2xl font-semibold mb-6">
                        Choissisez un crenau qui vous convient
                    </h2>
                    <div className="space-y-6">
                        {schedules !== null && (
                            <ScheduleSelector
                                range={reservation?.service?.duration}
                                unavailableSlots={schedules}
                                onSelectSchedule={handleSelectSchedule}
                            />
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleMoveAppointment}>Confirmer</Button>
                    <Button color="gray" onClick={handleCancelMoveAppointment}>
                        Annuler
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={isMoveModalOpen}
                onClose={() => setIsMoveModalOpen(false)}
                size="6xl"
            >
                <Modal.Header>Deplacer la reservation</Modal.Header>
                <Modal.Body>
                    <h2 className="text-2xl font-semibold mb-6">
                        Choissisez un crenau qui vous convient
                    </h2>
                    <div className="space-y-6">
                        {schedules !== null && (
                            <ScheduleSelector
                                range={reservation?.service?.duration}
                                unavailableSlots={schedules}
                                onSelectSchedule={handleSelectSchedule}
                            />
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleMoveAppointment}>Confirmer</Button>
                    <Button color="gray" onClick={handleCancelMoveAppointment}>
                        Annuler
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={isAppointmentModalOpen}
                onClose={() => setIsAppointmentModalOpen(false)}
                size="6xl"
            >
                <Modal.Header>Reprendre la reservation</Modal.Header>
                <Modal.Body>
                    <div className="my-8 w-fit ">
                        {schedules !== null && (
                            <>
                                <h2 className="text-2xl font-semibold mb-6">
                                    Choissisez un crenau qui vous convient
                                </h2>
                                <ScheduleSelector
                                    range={reservation?.service?.duration}
                                    unavailableSlots={schedules}
                                    onSelectSchedule={handleSelectSchedule}
                                />
                            </>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleNewAppointment}>Confirmer</Button>
                    <Button color="gray" onClick={handleCancelNewAppointment}>
                        Annuler
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
