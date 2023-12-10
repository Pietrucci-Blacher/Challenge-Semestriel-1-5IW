<?php

namespace App\Controller\Provider;



use App\Entity\Employee;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class ReSendNotificationEmployeeController  extends AbstractController
{
    public function __invoke(Employee $employee): Response
    {
        $employeeEmail = $employee->getEmployee()->getEmail();

        // TODO:
        // Envoyer un mail à l'utilisateur pour lui informer
        return new Response(null, Response::HTTP_OK);
    }
}
