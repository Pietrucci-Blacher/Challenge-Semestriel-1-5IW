import { useState, useEffect } from 'react';
import { Button as FlowbiteButton, Table } from 'flowbite-react';
import { useAuthContext } from '@/providers/AuthProvider';
import { useSchedule } from '@/hooks/useSchedule';
import { useRouter } from 'next/router';

export default function DataSchedule() {
    const { user } = useAuthContext();
    const { schedule, getScheduleById, updateSchedule } = useSchedule();
    const router = useRouter();

    // États locaux pour stocker les valeurs modifiées
    const [reason, setReason] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [establishment, setEstablishment] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        // Récupérez l'ID de l'URL
        const { id } = router.query;

        // Appelez la fonction pour récupérer le schedule par ID
        if (id) {
            getScheduleById(id);
        }
    }, [router.query.id, getScheduleById]);

    useEffect(() => {
        // Mettez à jour les états locaux lorsque le schedule change
        if (schedule) {
            setReason(schedule.reason);
            setAssignedTo(schedule.assignedTo);
            setEstablishment(schedule.establishment);
            setStartTime(schedule.startTime);
            setEndTime(schedule.endTime);
        }
    }, [schedule]);

    // Fonction générique pour mettre à jour les états locaux
    const handleInputChange = (field, value) => {
        switch (field) {
            case 'reason':
                setReason(value);
                break;
            case 'assignedTo':
                setAssignedTo(value);
                break;
            case 'establishment':
                setEstablishment(value);
                break;
            case 'startTime':
                setStartTime(value);
                break;
            case 'endTime':
                setEndTime(value);
                break;
            default:
                break;
        }
    };

    const handleUpdateSchedule = async () => {
        // Construisez le payload avec les valeurs modifiées
        const updatedSchedule = {
            reason,
            assignedTo,
            establishment,
            startTime: new Date(startTime).toISOString(),
            endTime: new Date(endTime).toISOString(),
        };

        // Appelez la fonction pour mettre à jour le schedule
        try {
            // Appelez la fonction pour mettre à jour le schedule
            await updateSchedule(schedule.id, updatedSchedule);
    
            // Redirection après la mise à jour réussie
            const establishmentId = establishment.split('/').pop();

            // Redirection après la mise à jour réussie
            router.push(`/admin/establishment/${establishmentId}`);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du schedule :', error);
            // Gérez l'erreur ici si nécessaire
        }    };

        const formatDate = (dateTimeString) => {
            const date = new Date(dateTimeString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
        
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        };

    return (
        <>
            {schedule ? (
                <div className="flex max-w-md flex-col gap-4">
                    <h1>Details du Schedule (ID {schedule.id}):</h1>
                    <label>Reason:</label>
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => handleInputChange('reason', e.target.value)}
                    />
                    <br />
                    <label>Assigned To:</label>
                    <input
                        type="text"
                        value={assignedTo}
                        onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                    />
                    <br />
                    <label>Establishment:</label>
                    <input
                        type="text"
                        value={establishment}
                        onChange={(e) => handleInputChange('establishment', e.target.value)}
                    />
                    <br />
                    <label>Start Time:</label>
                    <input
                        type="datetime-local"
                        value={formatDate(startTime)}
                        onChange={(e) => handleInputChange('startTime', e.target.value)}
                    />
                    <br />
                    <label>End Time:</label>
                    <input
                        type="datetime-local"
                        value={formatDate(endTime)}
                        onChange={(e) => handleInputChange('endTime', e.target.value)}
                    />
                    <br />
                    <button onClick={handleUpdateSchedule}>Mettre à jour</button>
                </div>
            ) : (
                <p>Chargement en cours...</p>
            )}
        </>
    );
}
