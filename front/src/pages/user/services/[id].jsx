'use client';
import { useRouter } from 'next/router';
import { useService } from '@/hooks/useService';
import { useEffect, useState, memo } from 'react';
import {
    Button,
    Card,
    Carousel,
    Label,
    Modal,
    Select,
    Textarea,
} from 'flowbite-react';
import {
    HiStar,
    HiSpeakerphone,
    HiOutlineUpload,
    HiOutlineHeart,
    HiViewGrid,
    HiBadgeCheck,
    HiKey,
    HiOutlineArrowRight,
    HiArrowDown,
} from 'react-icons/hi';
import Image from 'next/image';
import { useTeam } from '@/hooks/useTeam';
import { useSchedule } from '@/hooks/useSchedule';
import ScheduleSelector from '@/components/ScheduleSelector';
import { useReservation } from '@/hooks/useReservation';
import { convertDataToHtml } from '@/utils/utils';
import { createFeedback } from '@/services/feedbackService';
import Feedback from '@/components/Feedback';
import { useFeedback } from '@/hooks/useFeedback';
import ModalComponent from '@/components/Modal';
import { useAuthContext } from '@/providers/AuthProvider';
import { Rating } from '@/components/Rating';
import dayjs from 'dayjs';

export default function Id() {
    const { user } = useAuthContext();
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [specialRequest, setSpecialRequest] = useState('');
    const {
        feedbacks,
        detailed,
        getFeedbacksFromEstablishmentId,
        getEstablishmentNote,
        getFeedbacksFromServiceId,
        getServiceNote,
    } = useFeedback();

    const { service, getService } = useService();
    const { establishmentTeam, getEstablishmentTeam } = useTeam();
    const { schedules, getTeacherSchedules } = useSchedule();
    const { createReservation } = useReservation();

    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (!id) return;
        getService(id);
        getFeedbacksFromServiceId(id);
        getServiceNote(id);
    }, [id, router, getService, getFeedbacksFromServiceId, getServiceNote]);

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
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const handleSelectSchedule = (schedule) => {
        setSelectedSchedule(schedule);

        const formattedDate = dayjs(schedule.startTime).format('DD/MM/YYYY');
        setSelectedDate(formattedDate);

        const startTime = dayjs(schedule.startTime).subtract(1, 'hour').format('HH:mm');        
        setSelectedTime(startTime);
    };

    const handleReserve = () => {
        const { startTime, endTime } = selectedSchedule;
        if (!startTime && !endTime) {
            // TODOS:
            // utilise le toast pour retourner un probl
        }
        setOpenModal(true);
    };

    const Review = ({ name, date, imageSrc, content, note }) => (
        <li className="mb-[40px] pr-16">
            <div className="mb-4">
                {/*<Image
                    className="float-left mr-3 rounded-[100%]"
                    src={imageSrc}
                    width={40}
                    height={40}
                    alt={`Profile of ${name}`}
                />*/}
                <p className="block font-semibold text-base">
                    {name}
                    <span className="ml-2">
                        <HiStar className="inline-block mr-1" />
                        {note}
                    </span>
                </p>
                <p className="text-[#717171] text-sm">{date}</p>
            </div>
            <p className="p-0">{content}</p>
        </li>
    );

    const renderFeedback = feedbacks
        ? feedbacks?.map((feedback) => (
              <Review
                  key={feedback.id}
                  name={`${feedback.reviewer.firstname} ${feedback.reviewer.lastname}`}
                  date={feedback.createdAt}
                  imageSrc="https://a0.muscache.com/im/pictures/user/48bfe386-b947-443d-a7d8-9ba16dd87c1f.jpg?im_w=240"
                  content={feedback.comment}
                  note={feedback.note}
              />
          ))
        : 'No feedbacks';

    const ReviewsList = memo(() => (
        <ul className="grid grid-cols-2 gap-8">{renderFeedback}</ul>
    ));

    ReviewsList.displayName = 'ReviewsList';

    const RatingList = memo(() => (
        <ul className="w-full flex justify-between">
            <ul className="w-2/5 block mr-[10%]">
                {Rating('Qualité du cours', detailed)}
                {Rating('Pédagogie', detailed)}
            </ul>
            <ul className="w-2/5 block mr-[10%]">
                {Rating('Rapport Qualité Prix', detailed)}
                {Rating('Communication', detailed)}
            </ul>
        </ul>
    ));

    RatingList.displayName = 'RatingList';

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

    const onClose = async (value) => {
        setModalProps((prev) => ({ ...prev, isOpen: false }));

        await createFeedback({
            reviewer: `users/${user?.id}`,
            service: `services/${id}`,
            note: value.resultJson.average,
            comment: value.comment,
            detailedNote: value.resultJson.service,
        });

        getFeedbacksFromServiceId(id);
        getServiceNote(id);
    };

    let modalContent;
    let modalSize;
    const [modalProps, setModalProps] = useState({
        isOpen: false,
        size: '5xl',
        text: null,
        showButtons: true,
        showCloseButton: true,
        onClose: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
        onConfirm: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
        onCancel: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
    });

    const setMore = (content) => {
        switch (content) {
            case 'feedback':
                modalSize = '4xl';
                modalContent = (
                    <div>
                        <h1 className="text-2xl">
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Avis sur l'établissement
                            {service?.title}
                        </h1>
                        <br />
                        <p>Nous aimerions entendre votre avis !</p>
                        <br />
                        <Feedback
                            showFeedback="service"
                            onCloseModal={onClose}
                        />
                    </div>
                );
                break;
            default:
                modalContent = null;
        }
        setModalProps((prev) => ({
            ...prev,
            isOpen: true,
            text: modalContent,
            size: modalSize,
            showButtons: false,
        }));
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

    const hours_service = Math.floor(service?.duration / 60);
    const minutes_service = service?.duration % 60;


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
                            Durées: {hours_service}h{minutes_service}
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
                        Info sur l'Établissement :
                    </h2>
                    <div className=" grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <p className="font-normal text-gray-700 dark:text-gray-400 break-words">
                                Nom : {service?.establishment?.name}
                            </p>
                        </div>
                        <div className="col-span-1">
                        <p className="font-normal text-gray-700 dark:text-gray-400 break-words">
                            Date de creation :{' '}
                            {new Date(service?.establishment?.createdAt).toLocaleString('fr-FR')}
                        </p>
                        </div>
                        <div className="col-span-1">
                            <p className="font-normal text-gray-700 dark:text-gray-400 break-words">
                                Adresse : {service?.establishment?.street}{' '},
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
                    <p>
                        <div className="mb-8 w-full">
                            <h1 className="flex items-center font-semibold text-2xl mb-4">
                                <HiStar className="mr-2" />
                                {detailed.note} · {feedbacks.length} reviews
                            </h1>
                            <RatingList />
                        </div>
                        <ReviewsList />
                        {/*<button
                            className="py-3 px-8 text-base border border-solid border-black rounded-lg font-semibold transition duration-150 ease-in-out transform active:scale-90 hover:bg-[#f7f7f7] mt-8"
                            onClick={() => setMore('feedback')}
                        >
                            Ajouter un avis
                        </button>*/}
                    </p>
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
                                    value={`Vous êtes sur le point de reserver un crénaux de ${hours_service}h${minutes_service}`}
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
                                <li>Date : {selectedDate}</li>
                                <li>Heure : {selectedTime}</li>
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
            <ModalComponent modalProps={modalProps}>
                {modalProps.text}
            </ModalComponent>
        </>
    );
}
