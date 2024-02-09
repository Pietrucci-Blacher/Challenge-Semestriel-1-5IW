'use client';
import { useRouter } from 'next/router';
import { useService } from '@/hooks/useService';
import { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Carousel,
    Label,
    Modal,
    Select,
    Textarea,
} from 'flowbite-react';
import Image from 'next/image';
import { useTeam } from '@/hooks/useTeam';
import { useSchedule } from '@/hooks/useSchedule';
import ScheduleSelector from '@/components/ScheduleSelector';
import { useReservation } from '@/hooks/useReservation';
import { convertDataToHtml } from '@/utils/utils';

export default function Id() {
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [specialRequest, setSpecialRequest] = useState('');

    const { service, getService } = useService();
    const { establishmentTeam, getEstablishmentTeam } = useTeam();
    const { schedules, getTeacherSchedules } = useSchedule();
    const { createReservation } = useReservation();

    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (!id) return;
        getService(id);
    }, [id, router, getService]);

    useEffect(() => {
        if (!service) return;
        const { establishment } = service;
        const establishmentId = establishment?.id;
        getEstablishmentTeam(establishmentId);
    }, [service, getEstablishmentTeam]);

    const handleSelectTeacher = (e) => {
        const idEmployee = e.target.value;
        setSelectedTeacher(idEmployee);
        if (!idEmployee) return;
        getTeacherSchedules(idEmployee);
    };
    const handleSelectSchedule = (schedule) => {
        setSelectedSchedule(schedule);
    };

    const handleReserve = () => {
        const { startTime, endTime } = selectedSchedule;
        if (!startTime && !endTime) {
            // TODOS:
            // utilise le toast pour retourner un probl
        }
        setOpenModal(true);
    };

    const handleConfirmReservation = async () => {
        const { startTime, endTime } = selectedSchedule;
        const payload = {
            startTime: startTime,
            endTime: endTime,
            establishment_id: service?.establishment?.id,
            service_id: service?.id,
            teacher_id: selectedTeacher,
        };
        specialRequest.length > 0
            ? (payload['specialRequest'] = specialRequest)
            : payload;
        setOpenModal(false);
        await createReservation(payload);
        await getTeacherSchedules(selectedTeacher);
        setSpecialRequest('');
        setSelectedSchedule({});
    };

    const getTeacherInfo = (userId) => {
        const teacher = establishmentTeam.find(
            (team) => +team.member.id === +userId,
        );
        return `${teacher?.member?.firstname} ${teacher?.member?.lastname}`;
    };

    const renderBody = service?.body?.blocks ? (
        <p className="font-normal text-gray-700 dark:text-gray-400 break-words my-3 editor-html-no-bg">
            {convertDataToHtml(service?.body?.blocks)}
        </p>
    ) : (
        <></>
    );

    return (
        <>
            <div className="container">
                <div className="lg:grid grid-cols-3 gap-4">
                    <Card className="col-span-2 mb-4">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words">
                            {service?.title}
                        </h2>
                        <p className="font-normal text-gray-700 dark:text-gray-400 break-words">
                            {service?.description}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400 break-words">
                            {renderBody}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400 break-words">
                            Duration: {service?.duration} min
                        </p>
                        <p className="font-bold tracking-tight text-gray-900 dark:text-white break-words">
                            {service?.price} €
                        </p>
                    </Card>
                    <img
                        className="w-full object-cover rounded-lg col-span-1"
                        src={`https://localhost/media/${service?.imagePath}`}
                        alt="..."
                    />
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white break-words mb-4">
                        Establishment Info :
                    </h2>
                    <div className=" grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <p className="font-normal text-gray-700 dark:text-gray-400 break-words">
                                Name : {service?.establishment?.name}
                            </p>
                        </div>
                        <div className="col-span-1">
                            <p className="font-normal text-gray-700 dark:text-gray-400 break-words">
                                Date de creation :{' '}
                                {service?.establishment?.createdAt}
                            </p>
                        </div>
                        <div className="col-span-1">
                            <p className="font-normal text-gray-700 dark:text-gray-400 break-words">
                                Adresse : {service?.establishment?.street}{' '}
                                {service?.establishment?.city}{' '}
                                {service?.establishment?.zipCode}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white break-words mb-4">
                        Notre Equipe :
                    </h2>
                    <div className="flow-root">
                        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 divide-y divide-gray-200 dark:divide-gray-700 sm:divide-y-0">
                            {establishmentTeam?.map((team) => (
                                <li className="py-3 sm:py-4" key={team?.id}>
                                    <div className="flex items-center space-x-4">
                                        <div className="shrink-0">
                                            <Image
                                                alt="Neil image"
                                                height="32"
                                                src="https://flowbite.com/docs/images/logo.svg"
                                                width="32"
                                                className="rounded-full"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                                {team?.member.firstname}{' '}
                                                {team?.member.lastname}
                                            </p>
                                            <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                                {team?.member.email}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words mb-4">
                        Reserver notre service:
                    </h2>

                    <div>
                        <div className="max-w-md">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="teachers"
                                    value="Selectionner un professeur"
                                />
                            </div>
                            <Select
                                id="teachers"
                                required
                                onChange={handleSelectTeacher}
                            >
                                <option></option>
                                {establishmentTeam?.map((team) => (
                                    <option
                                        key={team.id}
                                        value={team?.member?.id}
                                    >
                                        {team?.member?.firstname}{' '}
                                        {team?.member?.lastname}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="my-8 w-fit ">
                            {selectedTeacher && schedules !== null && (
                                <>
                                    <h2 className="text-2xl font-semibold mb-6">
                                        Choissisez un crenau qui vous convient
                                    </h2>
                                    <ScheduleSelector
                                        range={service.duration}
                                        unavailableSlots={schedules}
                                        onSelectSchedule={handleSelectSchedule}
                                    />
                                    <div className="flex justify-center">
                                        <Button
                                            className="mt-8"
                                            size="lg"
                                            onClick={handleReserve}
                                        >
                                            Reserver
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words mb-4">
                        Reviews :
                    </h2>
                    <p>TBD</p>
                </div>
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Reservation</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <div className="">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor=""
                                    value={`Vous sur le point de reserver un crenau de ${service?.duration} minutes`}
                                    className="text-xl"
                                />
                            </div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor=""
                                    value="Information de la reservation:"
                                />
                            </div>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Date : {selectedSchedule?.date}</li>
                                <li>Heure : {selectedSchedule?.time}</li>
                                <li>
                                    Professeur :{' '}
                                    {getTeacherInfo(selectedTeacher)}
                                </li>
                            </ul>
                        </div>
                        <div className="max-w-md">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="request"
                                    value="Votre message"
                                />
                            </div>
                            <Textarea
                                id="request"
                                placeholder="Laissez une remarque au professeur"
                                rows={4}
                                value={specialRequest}
                                onChange={(e) =>
                                    setSpecialRequest(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleConfirmReservation}>
                        Confirmer
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Annuler
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
