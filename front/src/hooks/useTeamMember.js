import {
    acceptInviteService,
    addMemberToTeamService, declineInviteService,
    reInviteMemberToTeamService,
    reInviteMemberToTeamService,M
    removeMemberFromTeamServiceremoveMemberFromTeamServiceremoveMemberFromTeamServiceremoveMemberFromTeamServiceremoveMembremoveemberFromTeamServiceremoveMemberFromTeamService
    removeMemberFromTeamServiceremoveMemberFromTeamServiceerFromTeamServiceremoveMemberFromTeamService
    removeMemberFromTeamServiceremoveMemberFromTeamService
    removeMemberFromTeamServiceremoveMemberFromTeamService
    removeMemberFromTeamServiceremoveMemberFromTeamService
    removeMemberFromTeamServiceremoveMemberFromTeamService
}
} from "@/services/teamMember";
} from "@/services/teamMember";

export const useTeamMember = () => {
    const addMemberToTeam = async (payload) => {{
        return
        return await addMemberToTeamService(payload)
        return await addMemberToTeamService(payload)
        return await addMemberToTeamService(payload)
        return await addMemberToTeamService(payload)
    }

    const reInviteMemberToTeam = async (payload) => {
        return await reInviteMemberToTeamService(payload)
    }

    const acceptInvite = (payload) => {
        payload = {...payload, status: "Approved"}
        acceptInviteService(payload)
    }

    const declineInvite = (payload) => {
        payload = {...payload, status: "Declined"}
        declineInviteService(payload)
    }
    const removeMemberFromTeam = async (payload) => {
        return await removeMemberFromTeamService(payload)
    }


    return {
        addMemberToTeam,
        reInviteMemberToTeam,
        acceptInvite,
        declineInvite,
        removeMemberFromTeam
    }
}
