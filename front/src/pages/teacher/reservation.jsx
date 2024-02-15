import { useAuthContext } from '@/providers/AuthProvider';
import { useEffect, useState } from 'react';
import { useSchedule } from '@/hooks/useSchedule';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';

export default function Reservation() {
    const { user } = useAuthContext();
    const [points, setPoints] = useState([]);
    const { schedules, getTeacherSchedules } = useSchedule();
    useEffect(() => {
        const teacherId = user?.id;
        if (teacherId) {
            getTeacherSchedules(teacherId);
        }
    }, [user, getTeacherSchedules]);

    const getPoint = (schedule) => {
        if (!schedule) return;
        if (schedule.hasOwnProperty('reservation')) {
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
            point['color'] = '#c0bdda';
            return point;
        }
        return {};
    };
    useEffect(() => {
        const points = [];
        schedules?.forEach((element) => {
            points.push(getPoint(element));
        });
        setPoints(points);
    }, [schedules]);

    return (
        <>
            <Breadcrumb aria-label="Default breadcrumb example">
                <Breadcrumb.Item href="#" icon={HiHome}>
                    Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/teacher/reservation/">
                    Reservation
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="mt-4">
                <div className="my-8">
                    <div className="flex items-center">
                        <h2 className="mr-2">
                            Cette Page affiche le planning de mes prestations
                        </h2>
                    </div>
                </div>
            </div>

            <FullCalendar
                events={points}
                locale={'fr'}
                initialView="timeGridWeek"
                slotMinTime="08:00:00"
                slotMaxTime="19:00:00"
                allDaySlot={false}
                nowIndicator={true}
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'resourceTimelineWook, dayGridMonth,timeGridWeek',
                }}
            />
        </>
    );
}
