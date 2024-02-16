<?php

namespace App\Subscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Reservation;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use App\Service\Email;
use Symfony\Bundle\SecurityBundle\Security;

class ReservationSubscriber implements EventSubscriberInterface
{
    private EntityManagerInterface $entityManager;
    private Email $email;
    private Security $security;

    public function __construct(
        EntityManagerInterface $entityManager,
        Security $security
    ) {
        $this->entityManager = $entityManager;
        $this->email = new Email();
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::RESPONSE => ['onReservationUpdate', EventPriorities::PRE_WRITE],
        ];
    }

    public function onReservationUpdate(ResponseEvent $event)
    {
        $request = $event->getRequest();
        $method = $request->getMethod();
        $response = $event->getResponse();
        $statusCode = $response->getStatusCode();
        $resourceClass = $request->attributes->get("_api_resource_class");

        if ($resourceClass !== Reservation::class) return;

        if ($statusCode === 200 && $method === "PATCH") {
            /** @var Reservation $currentData */
            $currentData = $request->attributes->get("data");
            $schedule = $currentData->getSchedule();
            $schedule->setStartTime($currentData->getStartTime());
            $schedule->setEndTime($currentData->getEndTime());
            $this->entityManager->persist($schedule);
            $this->entityManager->flush();
        }

        if ($statusCode === 200 && $method === "POST") {
            $user = $this->security->getUser();
            $name = $user->getFirstname();
            $email = $user->getEmail();
            $this->email->sendReservationEmail($email, $name);
        }
    }
}
