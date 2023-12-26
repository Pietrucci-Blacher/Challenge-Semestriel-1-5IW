import {
    acceptInviteService,
    addMemberToTeamService,
    declineInviteService, getEstablishmentTeamInvitationService, getUserInvitationService,
    reInviteMemberToTeamService,
    removeMemberFromTeamService,
} from "@/services/teamService";
import {useCallback, useState} from "react";

export const useTeam = () => {
    const [userId, setUserId] = useState(null);
    const [establishmentId, setEstablishmentId] = useState(null);
    const [establishmentTeam, setEstablishmentTeam] = useState([]);
    const [workplaces, setWorkplaces] = useState([]);

    const addMemberToTeam = async (payload) => {
        return await addMemberToTeamService(payload)
    }

    const reInviteMemberToTeam = async (memberId) => {
        return await reInviteMemberToTeamService(memberId)
    }

    const acceptInvite = async (payload) => {
        payload = {...payload, status: "Approved"}
        await acceptInviteService(payload)
    }

    const declineInvite = async (payload) => {
        payload = {...payload, status: "Declined"}
        await declineInviteService(payload)
    }

    const removeMemberFromTeam = async (payload) => {
        return await removeMemberFromTeamService(payload)
    }

    const getEstablishmentTeam = useCallback(async (establishmentId) => {
        const data = await getEstablishmentTeamInvitationService(establishmentId)
        setEstablishmentTeam(data)
        setEstablishmentId(establishmentId)
    }, [])

    const getWorkplaces = useCallback(async (userId) => {
        const data = await getUserInvitationService(userId)
        const establishmentUser = data["hydra:member"]
        const approvedInvitations = establishmentUser.filter((invitation)=>invitation.joinRequestStatus === "Approved")
        setWorkplaces(approvedInvitations)
        setUserId(userId)
    }, [])

    return {
        establishmentTeam,
        workplaces,
        addMemberToTeam,
        reInviteMemberToTeam,
        acceptInvite,
        declineInvite,
        removeMemberFromTeam,
        getEstablishmentTeam,
        getWorkplaces
    }
}
