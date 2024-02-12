import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useAuthContext } from '@/providers/AuthProvider';
import { useSchedule } from '@/hooks/useSchedule';

export default function TeacherCalendar({ establishmentId }) {
    console.log("establishmentId", establishmentId)
    const { user } = useAuthContext();
    const {
        schedules,
        getSchedulesByTeacherAndEstablishment,
        addSchedule,
        updateSchedule,
        deleteSchedule,
    } = useSchedule();
    const [openModal, setOpenModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [currentSchedule, setCurrentSchedule] = useState(null);
    const [points, setPoints] = useState([]);
    const [establishment, setEstablishment] = useState(null);
    const [teacherId, setTeacherId] = useState(null);
    const [newSchedule, setNewSchedule] = useState({
        title: '',
        start: '',
        allDay: false,
        id: 0,
    });

    const getPoint = (schedule) => {
        if (!schedule) return;
        const point = {
            id: '',
            title: '',
            start: '',
            end: '',
            color: '',
        };
        point['id'] = schedule['id'];
        point['title'] = schedule['reason'];
        let start = new Date(schedule['startTime']);
        start.setHours(start.getHours() - 1);
        point['start'] = start.toISOString();
        let end = new Date(schedule['endTime']);
        end.setHours(end.getHours() - 1);
        point['end'] = end.toISOString();
        if (schedule['reservation']) {
            point['color'] = '#c0bdda';
        }
        return point;
    };

    useEffect(() => {
        const teacherId = user?.id;
        if (teacherId && establishmentId) {
            setTeacherId(teacherId);
            setEstablishment(establishmentId);
            getSchedulesByTeacherAndEstablishment({ establishmentId, teacherId  });
        }
    }, [user, establishmentId]);

    useEffect(() => {
        const points = [];
        schedules?.forEach((element) => {
            points.push(getPoint(element));
        });
        setPoints(points);
    }, [schedules]);

    const convertDateToString = (dateTime) => {
        if (!dateTime) return;
        let date = new Date(dateTime);
        return date.toLocaleString();
    };

    function handleEventClick(schedule) {
        const currentSchedule = {
            id: schedule.event.id,
            title: schedule.event.title,
            start: schedule.event.startStr,
            end: schedule.event.endStr,
            ...schedule.event,
        };
        setCurrentSchedule(currentSchedule);
        setOpenModal(true);
    }

    const handleAddReason = (e) => {
        setNewSchedule({
            ...newSchedule,
            title: e.target.value,
        });
    };

    function handleUpdateReasonInput(title) {
        const value = title.target.value;
        setCurrentSchedule({ ...currentSchedule, title: value });
    }

    const handleCreateSchedule = useCallback(
        async (e) => {
            e.preventDefault();
            const scheduleToCreate = { ...newSchedule, establishment };
            await addSchedule(scheduleToCreate);
            getSchedulesByTeacherAndEstablishment({ establishmentId, teacherId  });
            setNewSchedule({
                title: '',
                start: '',
                allDay: false,
                establishment: establishment,
                id: 0,
            });
            setShowCreateModal(false);
        },
        [establishment, newSchedule],
    );

    function handleSelect(scheduleToCreate) {
        const newSchedule = {
            title: '',
            start: scheduleToCreate.startStr,
            end: scheduleToCreate.endStr,
            allDay: scheduleToCreate.allDay,
        };
        setNewSchedule(newSchedule);
        setShowCreateModal(true);
    }

    async function handleUpdateScheduleTime(schedule) {
        const id = schedule.event.id;
        const currentSchedule = {
            startTime: schedule.event.startStr,
            endTime: schedule.event.endStr,
        };
        await updateSchedule(id, currentSchedule);
    }

    async function handleUpdateScheduleReason() {
        const newReason = currentSchedule.title;
        const id = currentSchedule.id;
        await updateSchedule(id, { reason: newReason });
        setOpenModal(false);
        setCurrentSchedule(null);
    }

    async function handleDeleteSchedule() {
        const id = currentSchedule.id;
        await deleteSchedule(id);
        setOpenModal(false);
        setCurrentSchedule(null);
    }

    return (
        <>
            {establishmentId && (
                <>
                    <FullCalendar
                        events={points}
                        locale={'fr'}
                        initialView="timeGridWeek"
                        slotMinTime="08:00:00"
                        slotMaxTime="19:00:00"
                        allDaySlot={false}
                        nowIndicator={true}
                        editable={true}
                        droppable={true}
                        selectable={true}
                        selectMirror={true}
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
                        eventClick={handleEventClick}
                        select={handleSelect}
                        eventDrop={handleUpdateScheduleTime}
                        eventResize={handleUpdateScheduleTime}
                    />

                    {currentSchedule && (
                        <Modal
                            dismissible
                            show={openModal}
                            onClose={() => setOpenModal(false)}
                        >
                            <Modal.Header>
                                Gerer le creneau {currentSchedule?.title}{' '}
                            </Modal.Header>
                            <Modal.Body>
                                <div className="space-y-6">
                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        Vous pouvez soit mettre à jour votre
                                        crenaux ou le supprimer{' '}
                                        {currentSchedule?.startStr}
                                    </p>
                                    <div>
                                        <div className="flex flex-row justify-between">
                                            <div className="w-1/2 mr-1">
                                                <div className="mb-2 block">
                                                    <Label
                                                        value={`Date debut : ${convertDateToString(
                                                            currentSchedule?.start,
                                                        )}`}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-1/2 ml-1">
                                                <div className="mb-2 block">
                                                    <Label
                                                        value={`Date fin : ${convertDateToString(
                                                            currentSchedule?.end,
                                                        )}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <div className="mb-2 block">
                                                <Label
                                                    htmlFor="title"
                                                    value="Title"
                                                />
                                            </div>
                                            <TextInput
                                                id="title"
                                                type="text"
                                                placeholder="Titre du creneau"
                                                required
                                                value={currentSchedule?.title}
                                                onChange={
                                                    handleUpdateReasonInput
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={handleUpdateScheduleReason}>
                                    Mettre à jour
                                </Button>
                                <Button
                                    color="gray"
                                    onClick={handleDeleteSchedule}
                                >
                                    Supprimer
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    )}

                    <Modal
                        dismissible
                        show={showCreateModal}
                        onClose={() => setShowCreateModal(false)}
                    >
                        <Modal.Header>Crer un schedule</Modal.Header>
                        <Modal.Body>
                            <div className="space-y-6">
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Vous etes sur le point de créer un nouveau
                                </p>
                                <div>
                                    <div className="flex flex-row justify-between">
                                        <div className="w-1/2 mr-1">
                                            <div className="mb-2 block">
                                                <Label
                                                    value={`Date debut : ${convertDateToString(
                                                        newSchedule?.start,
                                                    )}`}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2 ml-1">
                                            <div className="mb-2 block">
                                                <Label
                                                    value={`Date fin : ${convertDateToString(
                                                        newSchedule?.end,
                                                    )}`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="mb-2 block">
                                            <Label
                                                htmlFor="reason"
                                                value="Raison"
                                            />
                                        </div>
                                        <TextInput
                                            id="reason"
                                            type="text"
                                            placeholder="Raison de ce creneau"
                                            required
                                            value={newSchedule.title}
                                            onChange={handleAddReason}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={handleCreateSchedule}>
                                Creer
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => setShowCreateModal(false)}
                            >
                                Annuler
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </>
    );
}
