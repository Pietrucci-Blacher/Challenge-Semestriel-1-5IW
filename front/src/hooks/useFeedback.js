import * as service from '@/services/feedbackService';
import { useCallback, useState } from 'react';

export const useFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [detailed, setNote] = useState(0);

    const getFeedbacksFromEstablishmentId = useCallback(async (id) => {
        const response = await service.getFeedbacksFromEstablishmentId(id);
        setFeedbacks(response);
    }, []);

    const getEstablishmentNote = useCallback(async (id) => {
        const response = await service.getEstablishmentNote(id);
        setNote(response);
    }, []);

    const getFeedbacksFromServiceId = useCallback(async (id) => {
        const response = await service.getFeedbacksFromServiceId(id);
        setFeedbacks(response);
    }, []);

    const getServiceNote = useCallback(async (id) => {
        const response = await service.getServiceNote(id);
        setNote(response);
    }, []);

    return {
        feedbacks,
        detailed,
        getFeedbacksFromEstablishmentId,
        getEstablishmentNote,
        getFeedbacksFromServiceId,
        getServiceNote,
    };
};
