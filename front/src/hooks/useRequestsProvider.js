import {
  applyToBeProviderService,
  getListOfRequestsService,
  getRequestService,
  updateRequestService,
} from "@/services/requestsToBeProvider";
import { useState } from "react";

export default function useRequestsProvider() {
  const [requests, setRequests] = useState([]);
  const [request, setRequest] = useState();
  const applyToBeProvider = async (payload) => {
    await applyToBeProviderService(payload);
  };

  const getListOfRequests = async () => {
    const response = await getListOfRequestsService();
    setRequests(response["hydra:member"]);
  };

  const getRequest = async (payload) => {
    const response = await getRequestService(payload);
    setRequest(response);
  };

  const approveRequest = async (payload) => {
    Object.assign(payload, { status: "approved" });
    await updateRequestService(payload);
  };

  const declineRequest = async (payload) => {
    Object.assign(payload, { status: "rejected" });
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
  };
}
