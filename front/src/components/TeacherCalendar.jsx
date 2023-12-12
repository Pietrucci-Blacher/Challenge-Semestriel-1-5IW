import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from "@headlessui/react";
import {CheckIcon, ExclamationTriangleIcon} from "@heroicons/react/20/solid";
import {Button, Label, Modal, TextInput} from "flowbite-react";
import {useAuthContext} from "@/providers/AuthProvider";
import {useEmployeeSchedule} from "@/hooks/useEmployeeSchedule";

export default function TeacherCalendar() {
    const {user} = useAuthContext();
    const {
        schedule,
        userSchedules,
        getUserSchedules,
        addSchedule,
        updateSchedule,
        deleteSchedule,
    } = useEmployeeSchedule()
    const [openModal, setOpenModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [currentSchedule, setCurrentSchedule] = useState(null)
    const [newSchedule, setNewSchedule] = useState({
        title: '',
        start: '',
        allDay: false,
        id: 0,
    })

    useEffect(() => {
        if  (user?.id){
            getUserSchedules(user?.id)
        }
    }, [user,getUserSchedules]);

    const convertDateToString = (dateTime) => {
        if (!dateTime) return
        let date = new Date(dateTime);
        return date.toLocaleString()
    }

    function handleEventClick(schedule) {
        const currentSchedule = {
            id: schedule.event.id,
            title: schedule.event.title,
            ...schedule.event
        }
        setCurrentSchedule(currentSchedule)
        setOpenModal(true)
    }

    const handleAddReason = (e) => {
        setNewSchedule({
            ...newSchedule,
            title: e.target.value
        })
    }

    function handleUpdateReasonInput(title) {
        const value = title.target.value
        setCurrentSchedule({...currentSchedule, title: value})
    }

    async function handleCreateSchedule(e) {
        e.preventDefault()
        await addSchedule(newSchedule)
        setNewSchedule({
            title: '',
            start: '',
            allDay: false,
            id: 0
        })
        setShowCreateModal(false)
    }

    function handleSelect(scheduleToCreate) {
        const newSchedule = {
            title: '',
            start: scheduleToCreate.startStr,
            end: scheduleToCreate.endStr,
            allDay: scheduleToCreate.allDay
        };
        setNewSchedule(newSchedule);
        setShowCreateModal(true);
    }

    async function handleUpdateScheduleTime(schedule) {
        const id = schedule.event.id
        const currentSchedule = {
            startTime:schedule.event.startStr,
            endTime:schedule.event.endStr,
        }
        await updateSchedule(id, currentSchedule)
    }

    async function handleUpdateScheduleReason() {
        const newReason = currentSchedule.title
        const id = currentSchedule.id
        await updateSchedule(id, {reason: newReason})
        setOpenModal(false)
        setCurrentSchedule(null)
    }

    async function handleDeleteSchedule() {
        const id = currentSchedule.id
        await deleteSchedule(id)
        setOpenModal(false)
        setCurrentSchedule(null)
    }

    return (
        <>

            <FullCalendar
                events={userSchedules}
                locale={"fr"}
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
                    timeGridPlugin
                ]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'resourceTimelineWook, dayGridMonth,timeGridWeek'
                }}
                eventClick={handleEventClick}
                select={handleSelect}
                eventDrop={handleUpdateScheduleTime}
                eventResize={handleUpdateScheduleTime}
            />

            {currentSchedule && <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Gerer le creneau {currentSchedule?.title} </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Vous pouvez soit mettre à jour votre crenaux ou le supprimer {currentSchedule?.startStr}
                        </p>
                        <div>

                            <div className="flex flex-row justify-between">
                                <div className="w-1/2 mr-1">
                                    <div className="mb-2 block">
                                        <Label value={`Date debut : ${convertDateToString(newSchedule?.start)}`}/>
                                    </div>
                                </div>
                                <div className="w-1/2 ml-1">
                                    <div className="mb-2 block">
                                        <Label value={`Date fin : ${convertDateToString(newSchedule?.end)}`}/>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="mb-2 block">
                                    <Label htmlFor="title" value="Title"/>
                                </div>
                                <TextInput id="title" type="text" placeholder="Titre du creneau" required
                                           value={currentSchedule?.title}
                                           onChange={(handleUpdateReasonInput)}/>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleUpdateScheduleReason}>Mettre à jour</Button>
                    <Button color="gray" onClick={handleDeleteSchedule}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>}


            <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)}>
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
                                        <Label value={`Date debut : ${convertDateToString(newSchedule?.start)}`}/>
                                    </div>
                                </div>
                                <div className="w-1/2 ml-1">
                                    <div className="mb-2 block">
                                        <Label value={`Date fin : ${convertDateToString(newSchedule?.end)}`}/>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="mb-2 block">
                                    <Label htmlFor="reason" value="Raison"/>
                                </div>
                                <TextInput id="reason" type="text" placeholder="Raison de ce creneau" required
                                           value={newSchedule.title} onChange={handleAddReason}/>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCreateSchedule}>Creer</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Annuler
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}