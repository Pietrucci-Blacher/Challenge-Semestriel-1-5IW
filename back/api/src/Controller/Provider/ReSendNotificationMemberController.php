<?php

namespace App\Controller\Provider;

use App\Dto\ReSendNotificationMemberDto;
use App\Entity\TeamMember;
use App\Entity\User;
use App\Repository\TeamMemberRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class ReSendNotificationMemberController extends AbstractController
{
    private TeamMemberRepository $teamMemberRepository;

    public function __construct(TeamMemberRepository $teamMemberRepository)
    {
        $this->teamMemberRepository = $teamMemberRepository;
    }
    public function __invoke(ReSendNotificationMemberDto $reSendNotificationMemberDto)
    {
        /** @var User $user */
        $user = $this->getUser();

        if (!$user) {
            return new Response(null, Response::HTTP_FORBIDDEN);
        }

        $teamMemberId = $reSendNotificationMemberDto->teamMemberId;
        if (!$teamMemberId) {
            throw new \Exception("Body incorrect");
        }
        /** @var TeamMember $existingTeamMember */
        $existingTeamMember = $this->teamMemberRepository->findOneBy(["id"=>$teamMemberId]);
        if (!$existingTeamMember) {
            return new Response("Error pendant la recuperation des informations", Response::HTTP_FORBIDDEN);
        }
        if($existingTeamMember->getEstablishment()->getOwner()->getId() !== $user->getId()){
            return new Response("Seuls les propriétaires peuvent reinviter leurs membres", Response::HTTP_FORBIDDEN);
        }
        $memberEmail = $existingTeamMember->getMember()->getEmail();

        // TODO:
        // Envoyer un mail à l'utilisateur pour lui informer
        return new Response(null, Response::HTTP_OK);
    }
}
