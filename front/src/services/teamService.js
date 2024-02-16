import httpClient from './httpClient';

const BASE_URL = 'team_invitations';
const addMemberToTeamService = async (payload) => {
    const { email, establishment } = payload;
    return await httpClient.post(`${BASE_URL}`, { email, establishment });
};

const reInviteMemberToTeamService = async (memberId) => {
    return await httpClient.get(`${BASE_URL}/${memberId}/resend_notification`);
};

const acceptInviteService = async ({ id, joinRequestStatus }) => {
    return await httpClient.patch(`${BASE_URL}/${id}`, { joinRequestStatus });
};

const declineInviteService = async ({ id, joinRequestStatus }) => {
    return await httpClient.patch(`${BASE_URL}/${id}`, { joinRequestStatus });
};

const removeMemberFromTeamService = async (id) => {
    return await httpClient.delete(`${BASE_URL}/${id}`);
};

const getEstablishmentTeamInvitationService = async (userId, status) => {
    const response = await httpClient.get(
        `establishments/${userId}/team_invitations/`,
    );
    return response['hydra:member'] ?? [];
};

const getUserInvitationService = async (userId) => {
    const response = await httpClient.get(`users/${userId}/${BASE_URL}`);
    return response['hydra:member'] ?? [];
};

const getCountTeamMembersByStatusService = async (status) => {
    const response = await httpClient.get(`/s?joinRequestStatus=${status}`);
    return response['hydra:totalItems'] ?? 0;
};

export {
    addMemberToTeamService,
    reInviteMemberToTeamService,
    acceptInviteService,
    declineInviteService,
    removeMemberFromTeamService,
    getEstablishmentTeamInvitationService,
    getUserInvitationService,
};
