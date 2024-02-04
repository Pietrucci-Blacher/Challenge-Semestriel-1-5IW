import { useRouter } from 'next/router';
import { useEstablishment } from '@/hooks/useEstablishment';
import { useEffect, useState } from 'react';
import {
    Breadcrumb,
    Button as FlowbiteButton,
    Select,
    Tabs,
} from 'flowbite-react';
import Link from 'next/link';
import GenericButton from '@/components/GenericButton';
import { deleteEstablishment } from '@/services/establishmentService';
import { useToast } from '@/hooks/useToast';



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
import { Table } from 'flowbite-react';




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
        getSchedulesByUserAndEstablishment,
        deleteSchedule
    } = useSchedule();
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
    }, [
        getEstablishmentById,
        getEstablishmentServices,
        getEstablishmentTeam,
        getEstablishmentSchedules,
        router,
    ]);

    useEffect(() => {
        const calendarPoints = schedules.map((schedule) => getPoint(schedule));
        setPoints(calendarPoints);
    }, [schedules]);


    const { createToastMessage } = useToast();

    useEffect(() => {
        getEstablishmentById(id);
    }, [id]);

    const handleDelete = async (event) => {
        try {
            await deleteEstablishment(id);
            router.push('/admin/establishment');
        } catch (error) {
            createToastMessage('error', 'Une erreur est survenue');
        }
    };
    

    const renderEstablishment = establishment ? (
        <div>
            <h1>{establishment.name}</h1>
            <p>Rue: {establishment.street}</p>
            <p>Ville: {establishment.city}</p>
            <p>Code postal: {establishment.zipCode}</p>
            <p>
                Propriétaire: {establishment.owner.firstname}{' '}
                {establishment.owner.lastname}
            </p>
        </div>
    ) : (
        'Chargement...'
    );

    const handleSelectEmployee = async (event) => {
        const userId = event.target.value;
        if (!userId) getEstablishmentSchedules(id);
        else
            getSchedulesByUserAndEstablishment({
                establishmentId: id,
                userId: userId,
            });
    };

    const formatDate = (dateTimeString) => {
        const options = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
        };
    
        const formattedDate = new Date(dateTimeString).toLocaleString('fr-FR', options);
        return formattedDate;
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [modifiedStartTime, setModifiedStartTime] = useState('');
    const [modifiedEndTime, setModifiedEndTime] = useState('');
    const [modifiedReason, setModifiedReason] = useState('');



    const handleOpenModal = (schedule) => {
        setSelectedSchedule(schedule);
        setModifiedStartTime(schedule?.startTime || ''); // Assurez-vous que schedule est défini
        setModifiedEndTime(schedule?.endTime || ''); // Assurez-vous que schedule est défini
        setModifiedReason(schedule?.reason ?? ''); // Assurez-vous que schedule est défini
        setIsModalOpen(true);
    };    
    
      const handleCloseModal = () => {
        setSelectedSchedule(null);
        setIsModalOpen(false);
      };
      const handleSaveChanges = () => {
        console.log('Nouvelle valeur de Start Time :', modifiedStartTime);
        console.log('Nouvelle valeur de End Time :', modifiedEndTime);
        console.log('Nouvelle valeur de Reason :', modifiedReason);
        setIsModalOpen(false);
    };


    return (
        <>
            <div>{renderEstablishment}</div>
            <GenericButton onClick={handleDelete} label="Supprimer" />
            <FlowbiteButton
                className="my-2"
                as={Link}
                href={`/admin/establishment/update/${id}`}
            >
                Modifier
            </FlowbiteButton>
            <FlowbiteButton
                className="my-2"
                as={Link}
                href="/admin/establishment"
            >
                Retour
            </FlowbiteButton>

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
                        <>
                            <TeamCard
                                members={establishmentTeam}
                                onReinviteMember={reInviteMemberToTeam}
                                onRemoveMember={removeMemberFromTeam}
                            />
                        </>

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
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Establishment info:
                        </h1>
                        <>
                            {establishment && (
                                <div className="mt-2">
                                    <p>Name: {establishment.name}</p>
                                    <p>Street: {establishment.street}</p>
                                    <p>City: {establishment.city}</p>
                                    <p>Zip Code: {establishment.zipCode}</p>
                                </div>
                            )}
                        </>
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
                            Service pour {establishment?.name}:
                        </h1>
                        <>
                            {establishmentServices.length > 0 ? (
                                establishmentServices.map((service, index) => (
                                    <div className="mt-2" key={index}>
                                        <p className="text-xl font-bold">
                                            Service {index + 1}
                                        </p>
                                        <p>Title: {service.title}</p>
                                        <p>Prix: {service.price}</p>
                                        <p className="editor-html">
                                            Body:{' '}
                                            {convertDataToHtml(
                                                service.body.blocks,
                                            )}
                                        </p>
                                        <p>
                                            Description: {service.description}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="mt-2">
                                    <p>Aucun service</p>
                                </div>
                            )}
                        </>
                    </div>
                </Tabs.Item>
                <Tabs.Item title="Schedule" icon={HiUserCircle}>
                    <div className="mt-4">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Tous les Schedules:
                        </h1>
                        {schedules.length > 0 ? (
                            <Table striped hoverable>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Reason</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedules.map((schedule) => (
                                        <tr key={schedule.id}>
                                            <td>{schedule.id}</td>
                                            <td>{formatDate(schedule.startTime)}</td>
                                            <td>{formatDate(schedule.endTime)}</td>
                                            <td>{schedule.reason}</td>
                                            <td>
                                                <Link href={`/admin/establishment/update/schedule/${schedule.id}`} passHref>
                                                    <p>Modifier</p>
                                                </Link>
                                            </td>
                                            <td>
                                                <button onClick={() => deleteSchedule(schedule.id)}>Supprimer</button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <div className="mt-2">
                                <p>Aucun schedule trouvé.</p>
                            </div>
                        )}
                    </div>
                </Tabs.Item>
            </Tabs>




        </>
    );
}
