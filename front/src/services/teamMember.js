import httpClient from "./httpClient";

const BASE_URL = "team_members";
const addMemberToTeamService = async (payload) => {
  const { email, establishment } = payload;
  return await httpClient.post(`${BASE_URL}`, { email, establishment });
};

const reInviteMemberToTeamService = async (payload) => {
  const { teamMemberId } = payload;
  return await httpClient.post(`${BASE_URL}/resend_notification`, {
    teamMemberId,
  });
};

const acceptInviteService = async ({ id, status }) => {
  return await httpClient.patch(`${BASE_URL}/${id}`, { status });
};

const declineInviteService = async ({ id, status }) => {
  return await httpClient.patch(`${BASE_URL}/${id}`, { status });
};

const removeMemberFromTeamService = async ({ id }) => {
  return await httpClient.delete(`${BASE_URL}/${id}`);
};

export {
  addMemberToTeamService,
  reInviteMemberToTeamService,
  acceptInviteService,
  declineInviteService,
  removeMemberFromTeamService,
};
