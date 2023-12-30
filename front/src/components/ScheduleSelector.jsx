import { useState } from 'react';

const ScheduleSelector = ({ onSelectSchedule, range, unavailableSlots }) => {
    const [weekOffset, setWeekOffset] = useState(0);
    const [selectedTime, setSelectedTime] = useState({
        date: null,
        time: null,
    });

    const timeSlots = [];
    let totalMinutes = 8 * 60;
    const endMinutes = 19 * 60;

    while (totalMinutes < endMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        const formattedHour = hours.toString().padStart(2, '0');
        const formattedMinute = minutes.toString().padStart(2, '0');
        timeSlots.push(`${formattedHour}:${formattedMinute}`);

        totalMinutes += range;
    }

    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    const getWeekDays = (offset = 0) => {
        const today = new Date();
        let startOfWeek = addDays(today, 1);
        startOfWeek = addDays(startOfWeek, offset * 7);
        const weekDays = [];
        for (let i = 0; i < 7; i++) {
            const day = addDays(startOfWeek, i);
            weekDays.push(day.toISOString().split('T')[0]);
        }
        return weekDays;
    };

    const weekDays = getWeekDays(weekOffset);

    const handleTimeSlotClick = (day, timeSlot) => {
        const selectedDate = weekDays[day];
        const selectedTimeSlot = timeSlot;
        let value;
        if (
            selectedDate === selectedTime?.date &&
            selectedTimeSlot === selectedTime?.time
        ) {
            value = { date: null, time: null };
        } else {
            value = { date: selectedDate, time: selectedTimeSlot };
        }
        setSelectedTime(value);
        onSelectSchedule(value);
    };

    const goToNextWeek = () => {
        setWeekOffset(weekOffset + 1);
    };

    const goToPreviousWeek = () => {
        if (weekOffset > 0) {
            setWeekOffset(weekOffset - 1);
        }
    };

    const isUnavailable = (day, slot) => {
        const dayString = weekDays[day];
        const dateTimeStringStart = `${dayString}T${slot}:00+00:00`;
        const slotStartTime = new Date(dateTimeStringStart);
        const slotEndTime = new Date(slotStartTime.getTime() + range * 60000);

        return unavailableSlots.some(({ startTime, endTime }) => {
            const start = new Date(startTime);
            const end = new Date(endTime);
            return slotStartTime < end && slotEndTime > start;
        });
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        });
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return (
        <div className="flex flex-row">
            <div className="flex justify-center items-center mx-4">
                <button
                    onClick={goToPreviousWeek}
                    className={`px-4 py-2 rounded-md hover:bg-gray-300 ${
                        weekOffset === 0
                            ? 'bg-gray-100 cursor-not-allowed'
                            : 'bg-gray-200'
                    }`}
                    disabled={weekOffset === 0}
                >
                    {/* Replace with an appropriate icon */}
                    &lt;
                </button>
            </div>
            <div className="grid grid-cols-7 gap-4 time-container">
                {weekDays.map((day, index) => (
                    <div key={day} className="flex flex-col items-center w-32">
                        <div className="text-center mb-4">
                            <div className="text-md font-medium">
                                {formatDate(day).split(' ')[0]}
                            </div>
                            <div className="text-sm">
                                {formatDate(day).split(' ').slice(1).join(' ')}
                            </div>
                        </div>

                        <div
                            className="time-slots-container relative overflow-y-auto"
                            style={{
                                height: '30vh',
                                overflowY: 'auto',
                                position: 'relative',
                            }}
                        >
                            {timeSlots.map((slot) => (
                                <button
                                    key={slot}
                                    className={`mb-2 px-4 py-2 rounded-md text-sm font-medium w-full ${
                                        isUnavailable(index, slot)
                                            ? 'bg-red-200 text-white'
                                            : selectedTime.date ===
                                                    weekDays[index] &&
                                                selectedTime.time === slot
                                              ? 'bg-blue-500 text-white'
                                              : 'bg-gray-300'
                                    }`}
                                    onClick={() =>
                                        handleTimeSlotClick(index, slot)
                                    }
                                    disabled={isUnavailable(index, slot)}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center mx-4">
                <button
                    onClick={goToNextWeek}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                    {/* Replace with an appropriate icon */}
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default ScheduleSelector;
