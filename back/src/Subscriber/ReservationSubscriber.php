<?php

namespace src\Subscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use Doctrine\ORM\EntityManagerInterface;
use src\Entity\Reservation;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class ReservationSubscriber implements EventSubscriberInterface
{
    private EntityManagerInterface $entityManager;

    public function __construct(
        EntityManagerInterface $entityManager,
    ) {
        $this->entityManager = $entityManager;
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
    }
}
