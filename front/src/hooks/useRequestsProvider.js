import {
    applyToBeProviderService,
    getListOfRequestsService,
    getRequestService, getUserRequestService,
    updateRequestService,
} from '@/services/requestsToBeProvider';
import {useCallback, useState} from 'react';

export default function useRequestsProvider() {
    const [requests, setRequests] = useState([]);
    const [request, setRequest] = useState(null);
    const applyToBeProvider = async (payload) => {
        await applyToBeProviderService(payload);
    };

    const getUserRequest = useCallback(async (userId) => {
        const response = await getUserRequestService(userId);
        setRequest(response);

    }, []);

    const getListOfRequests = useCallback(async () => {
        const response = await getListOfRequestsService();
        setRequests(response['hydra:member']);
    }, []);

    const getRequest = useCallback(async (payload) => {
        const response = await getRequestService(payload);
        setRequest(response);
    }, []);

    const approveRequest = async (payload) => {
        Object.assign(payload, {status: 'approved'});
        await updateRequestService(payload);
    };

    const declineRequest = async (payload) => {
        Object.assign(payload, {status: 'rejected'});
        await updateRequestService(payload);
    };

    return {
        request,
        requests,
        applyToBeProvider,
        getListOfRequests,
        getRequest,
        approveRequest,
        declineRequest,
        getUserRequest
    };
}
