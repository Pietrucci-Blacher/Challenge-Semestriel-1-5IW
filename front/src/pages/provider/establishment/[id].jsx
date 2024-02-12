import { useRouter } from 'next/router';
import { useEstablishment } from '@/hooks/useEstablishment';
import { useFeedback } from '@/hooks/useFeedback';
import { useEffect, useState, memo } from 'react';
import {
    Breadcrumb,
    Button as FlowbiteButton,
    Select,
    Tabs,
    Table,
} from 'flowbite-react';
import Link from 'next/link';
import GenericButton from '@/components/GenericButton';
import { deleteEstablishment } from '@/services/establishmentService';
import { HiHome, HiUserCircle } from 'react-icons/hi';
import { useService } from '@/hooks/useService';
import { useTeam } from '@/hooks/useTeam';
import { TeamCard } from '@/components/TeamCard';
import { useSchedule } from '@/hooks/useSchedule';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MdDashboard } from 'react-icons/md';
import { convertDataToHtml } from '@/utils/utils';
import EstablishmentReservations from '@/components/EstablishmentReservations';
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
import { Rating } from '@/components/Rating';

export default function ShowEstablishment() {
    const router = useRouter();
    const { id } = router.query;
    const { establishment, getEstablishmentById } = useEstablishment();
    const { establishmentServices, getEstablishmentServices } = useService();
    const {
        establishmentTeam,
        getEstablishmentTeam,
        reInviteMemberToTeam,
        removeMemberFromTeam,
    } = useTeam();
    const {
        schedules,
        getEstablishmentSchedules,
        getSchedulesByTeacherAndEstablishment,
    } = useSchedule();
    const {
        feedbacks,
        detailed,
        getFeedbacksFromEstablishmentId,
        getEstablishmentNote,
    } = useFeedback();
    const [points, setPoints] = useState([]);

    const userColors = {};

    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const getPoint = (schedule) => {
        if (!schedule) return;
        const userId = schedule['assignedTo']['@id'];
        if (!userColors[userId]) {
            userColors[userId] = generateRandomColor();
        }

        let start = new Date(schedule['startTime']);
        start.setHours(start.getHours() - 1);
        let end = new Date(schedule['endTime']);
        end.setHours(end.getHours() - 1);

        const username = schedule.assignedTo.firstname;
        return {
            id: schedule['@id'],
            title: `${username} - ${schedule['reason']}`,
            start: start.toISOString(),
            end: end.toISOString(),
            color: userColors[userId],
        };
    };

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;
        getEstablishmentById(id);
        getEstablishmentServices(id);
        getEstablishmentTeam(id);
        getEstablishmentSchedules(id);
        getFeedbacksFromEstablishmentId(id);
        getEstablishmentNote(id);
    }, [
        getEstablishmentById,
        getEstablishmentServices,
        getEstablishmentTeam,
        getEstablishmentSchedules,
        getFeedbacksFromEstablishmentId,
        getEstablishmentNote,
        router,
    ]);

    useEffect(() => {
        const calendarPoints = schedules.map((schedule) => getPoint(schedule));
        setPoints(calendarPoints);
    }, [schedules]);

    const handleDelete = async (event) => {
        try {
            await deleteEstablishment(id);
            router.push('/provider/establishment');
        } catch (error) {
            createToastMessage('error', 'Une erreur est survenue');
        }
    };

    const handleSelectEmployee = async (event) => {
        const userId = event.target.value;
        if (!userId) getEstablishmentSchedules(id);
        else
            await getSchedulesByTeacherAndEstablishment({
                establishmentId: id,
                teacherId: userId,
            });
        }
    };

    const RatingList = memo(() => (
        <ul className="w-full flex justify-between">
            <ul className="w-2/5 block mr-[10%]">
                {Rating('Qualité des cours', detailed)}
                {Rating('Professionalisme', detailed)}
            </ul>
            <ul className="w-2/5 block mr-[10%]">
                {Rating('Rapport Qualité Prix', detailed)}
                {Rating('Communication', detailed)}
            </ul>
        </ul>
    ));

    RatingList.displayName = 'RatingList';

    const renderServices = establishmentServices
        ? establishmentServices.flat().map((service) => (
              <Table.Row key={service.id}>
                  <Table.Cell>{service.title}</Table.Cell>
                  <Table.Cell>{service.description}</Table.Cell>
                  <Table.Cell>{service.price}</Table.Cell>
                  <Table.Cell>
                      <a
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                          href={`/provider/services/${service.id}`}
                      >
                          Voir
                      </a>
                  </Table.Cell>
              </Table.Row>
          ))
        : 'Chargement en cours';

    return (
        <>
            <Breadcrumb aria-label="Default breadcrumb example">
                <Breadcrumb.Item href="#" icon={HiHome}>
                    Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/provider/establishment">
                    Etablissements
                </Breadcrumb.Item>
                <Breadcrumb.Item href="#">
                    {establishment?.name}
                </Breadcrumb.Item>
            </Breadcrumb>
            <Tabs aria-label="Default tabs" style="default">
                <Tabs.Item
                    title="Equipe"
                    icon={HiUserCircle}
                    className="h-screen"
                    active
                >
                    <div className="my-4 w-1/2">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Equipe pour {establishment?.name}:
                        </h1>
                        <TeamCard
                            members={establishmentTeam}
                            onReinviteMember={reInviteMemberToTeam}
                            onRemoveMember={removeMemberFromTeam}
                        />

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Planning de mon equipe:
                        </h1>
                        <Select required onChange={handleSelectEmployee}>
                            <option value=""></option>
                            {establishmentTeam.map((employee, index) => (
                                <option
                                    value={employee.member.id}
                                    key={employee.id}
                                >
                                    {employee.member.firstname}{' '}
                                    {employee.member.lastname}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <FullCalendar
                        events={points}
                        locale={'fr'}
                        initialView="timeGridWeek"
                        slotMinTime="08:00:00"
                        slotMaxTime="19:00:00"
                        allDaySlot={false}
                        nowIndicator={true}
                        plugins={[
                            dayGridPlugin,
                            interactionPlugin,
                            timeGridPlugin,
                        ]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'resourceTimelineWook, dayGridMonth,timeGridWeek',
                        }}
                    />
                </Tabs.Item>
                <Tabs.Item title="Etablissement Info" icon={MdDashboard}>
                    <div className="mt-4">
                        {establishment && (
                            <>
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {establishment.name}
                                    <HiStar className="inline-block mx-1" />
                                    {detailed.note}
                                </h1>
                                <RatingList />
                                <div className="mt-2">
                                    <p>Street: {establishment.street}</p>
                                    <p>City: {establishment.city}</p>
                                    <p>Zip Code: {establishment.zipCode}</p>
                                </div>
                            </>
                        )}
                    </div>
                    <GenericButton onClick={handleDelete} label="Supprimer" />
                    <FlowbiteButton
                        className="my-2"
                        as={Link}
                        href={`/provider/establishment/update/${id}`}
                    >
                        Modifier
                    </FlowbiteButton>
                    <FlowbiteButton
                        className="my-2"
                        as={Link}
                        href="/provider/establishment"
                    >
                        Retour
                    </FlowbiteButton>
                </Tabs.Item>
                <Tabs.Item title="Services" icon={HiUserCircle}>
                    <div className="mt-4">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Service pour {establishment?.name}
                        </h1>
                        <Table hoverable className="mt-2">
                            <Table.Head>
                                <Table.HeadCell>Titre</Table.HeadCell>
                                <Table.HeadCell>Description</Table.HeadCell>
                                <Table.HeadCell>Prix</Table.HeadCell>
                                <Table.HeadCell>Actions</Table.HeadCell>
                            </Table.Head>
                            <Table.Body>{renderServices}</Table.Body>
                        </Table>
                    </div>
                </Tabs.Item>
                <Tabs.Item title="Feedback" icon={HiOutlineHeart}>
                    <div className="mt-4">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Feedback pour {establishment?.name}:
                        </h1>
                        {feedbacks.length > 0 ? (
                            feedbacks.map((feedback, index) => (
                                <div className="mt-2" key={index}>
                                    <p>
                                        {`${feedback.reviewer.firstname} ${feedback.reviewer.lastname}`}
                                        <HiStar className="inline-block mx-1" />
                                        {feedback.note}
                                    </p>
                                    <p>
                                        {Object.keys(feedback.detailedNote).map(
                                            (key) =>
                                                Rating(
                                                    key,
                                                    feedback.detailedNote,
                                                ),
                                        )}
                                    </p>
                                    <p className="py-2">{feedback.comment}</p>
                                </div>
                            ))
                        ) : (
                            <div className="mt-2">
                                <p>Aucun feedback</p>
                            </div>
                        )}
                    </div>
                </Tabs.Item>
                <Tabs.Item title="Reservations" icon={HiUserCircle}>
                    <EstablishmentReservations establishmentId={id} />
                </Tabs.Item>
            </Tabs>
        </>
    );
}
