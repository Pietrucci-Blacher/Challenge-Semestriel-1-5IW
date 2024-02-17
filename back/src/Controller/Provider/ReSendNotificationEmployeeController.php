<?php

namespace App\Controller\Provider;



use App\Entity\TeamInvitation;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use App\Service\Email;

class ReSendNotificationEmployeeController  extends AbstractController
{
    private Email $email;

    public function __construct()
    {
        $this->email = new Email();
    }

    public function __invoke(TeamInvitation $teamInvitation): Response
    {
        $employeeEmail = $teamInvitation->getMember()->getEmail();
        $name = $teamInvitation->getMember()->getFirstName();
        $this->email->sendTeamInvitation($employeeEmail, $name);

        return new Response(null, Response::HTTP_OK);
    }
}
