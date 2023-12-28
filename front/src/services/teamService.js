import httpClient from "./httpClient";

const BASE_URL = "team_invitations"
const addMemberToTeamService = async (payload) => {
    const {email, establishment} = payload
    return await httpClient.post(`${BASE_URL}`, {email, establishment})
};

const reInviteMemberToTeamService = async (memberId) => {
    return await httpClient.get(`${BASE_URL}/${memberId}/resend_notification`)
};

const acceptInviteService = async ({id, status}) => {
    return await httpClient.patch(`${BASE_URL}/${id}`, {status})
};

const declineInviteService = async ({id, status}) => {
    return await httpClient.patch(`${BASE_URL}/${id}`, {status})
};

const removeMemberFromTeamService = async ({id}) => {
    return await httpClient.delete(`${BASE_URL}/${id}`)
};

const getEstablishmentTeamInvitationService = async (establishmentId) => {
    const response = await httpClient.get(`establishments/${establishmentId}/${BASE_URL}`)
    return response["hydra:member"] ?? [];
};

const getUserInvitationService = async (userId) => {
    return await httpClient.get(`users/${userId}/${BASE_URL}`)
};


export {
    addMemberToTeamService,
    reInviteMemberToTeamService,
    acceptInviteService,
    declineInviteService,
    removeMemberFromTeamService,
    getEstablishmentTeamInvitationService,
    getUserInvitationService
}