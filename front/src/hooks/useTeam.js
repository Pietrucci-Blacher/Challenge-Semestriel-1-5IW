import {
    acceptInviteService,
    addMemberToTeamService,
    declineInviteService,
    getEstablishmentTeamInvitationService,
    getUserInvitationService,
    reInviteMemberToTeamService,
    removeMemberFromTeamService,
} from '@/services/teamService';
import { useCallback, useState } from 'react';

export const useTeam = () => {
    const [userId, setUserId] = useState(null);
    const [establishmentId, setEstablishmentId] = useState(null);
    const [establishmentTeam, setEstablishmentTeam] = useState([]);
    const [workplaces, setWorkplaces] = useState([]);
    const [userPengingInvitation, setUserPengingInvitation] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);

    const addMemberToTeam = async (payload) => {
        return await addMemberToTeamService(payload);
    };

    const reInviteMemberToTeam = async (memberId) => {
        return await reInviteMemberToTeamService(memberId);
    };

    const acceptInvite = async (payload) => {
        payload = { ...payload, joinRequestStatus: 'Approved' };
        await acceptInviteService(payload);
    };

    const declineInvite = async (payload) => {
        payload = { ...payload, joinRequestStatus: 'Rejected' };
        await declineInviteService(payload);
    };

    const removeMemberFromTeam = async (id) => {
        return await removeMemberFromTeamService(id);
    };

    const getEstablishmentTeam = useCallback(async (establishmentId) => {
        const data =
            await getEstablishmentTeamInvitationService(establishmentId, 'Approved');
        setEstablishmentTeam(data);
        setEstablishmentId(establishmentId);
    }, []);

    const getWorkplaces = useCallback(async (userId) => {
        const data = await getUserInvitationService(userId);
        const approvedInvitations = data.filter(
            (invitation) => invitation.joinRequestStatus === 'Approved',
        );
        setWorkplaces(approvedInvitations);
        setUserId(userId);
    }, []);

    const getUserPendingInvitation = useCallback(async (userId) => {
        const data = await getUserInvitationService(userId);
        const pendingInvitation = data.filter(
            (invitation) => invitation.joinRequestStatus === 'Pending',
        );
        setUserPengingInvitation(pendingInvitation);
    }, []);

    const getCountTeamMembers = async (userId, status) => {
        const data = await getEstablishmentTeamInvitationService(
            userId,
            status,
        );
        setTeamMembers(data.length);
    };

    return {
        establishmentTeam,
        workplaces,
        userPengingInvitation,
        addMemberToTeam,
        reInviteMemberToTeam,
        acceptInvite,
        declineInvite,
        removeMemberFromTeam,
        getEstablishmentTeam,
        getWorkplaces,
        getUserPendingInvitation,
        teamMembers,
        getCountTeamMembers,
    };
};
