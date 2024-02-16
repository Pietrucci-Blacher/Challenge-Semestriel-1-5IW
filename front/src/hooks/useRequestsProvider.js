import {
    applyToBeProviderService,
    getListOfRequestsService,
    getRequestService,
    getUserRequestService,
    updateRequestService,
} from '@/services/requestsToBeProvider';
import { useCallback, useState } from 'react';

export default function useRequestsProvider() {
    const [requests, setRequests] = useState([]);
    const [request, setRequest] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const applyToBeProvider = async (payload) => {
        setIsLoading(true)
        await applyToBeProviderService(payload);
        setIsLoading(false)
    };

    const getUserRequest = useCallback(async (userId) => {
        setIsLoading(true)
        const response = await getUserRequestService(userId);
        setRequest(response);
        setIsLoading(false)
    }, []);

    const getListOfRequests = useCallback(async () => {
        setIsLoading(true)
        const response = await getListOfRequestsService();
        setRequests(response['hydra:member']);
        setIsLoading(false)
    }, []);

    const getRequest = useCallback(async (payload) => {
        setIsLoading(true)
        const response = await getRequestService(payload);
        setRequest(response);
        setIsLoading(false)
    }, []);

    const approveRequest = async (payload) => {
        setIsLoading(true)
        Object.assign(payload, { status: 'approved' });
        await updateRequestService(payload);
        setIsLoading(false)
    };

    const declineRequest = async (payload) => {
        setIsLoading(true)
        Object.assign(payload, { status: 'rejected' });
        await updateRequestService(payload);
        setIsLoading(false)
    };

    return {
        request,
        requests,
        isLoading ,
        applyToBeProvider,
        getListOfRequests,
        getRequest,
        approveRequest,
        declineRequest,
        getUserRequest,
    };
}
