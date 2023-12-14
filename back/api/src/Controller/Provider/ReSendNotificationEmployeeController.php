<?php

namespace App\Controller\Provider;



use App\Entity\TeamInvitation;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class ReSendNotificationEmployeeController  extends AbstractController
{
    public function __invoke(TeamInvitation $teamInvitation): Response
    {
        $employeeEmail = $teamInvitation->getMember()->getEmail();

        // TODO:
        // Envoyer un mail à l'utilisateur pour lui informer
        return new Response(null, Response::HTTP_OK);
    }
}
