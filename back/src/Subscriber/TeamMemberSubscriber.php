<?php

namespace src\Subscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Subscriber\TeamMember;
use src\Entity\TeamInvitation;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class TeamMemberSubscriber implements EventSubscriberInterface
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::RESPONSE => ['onRequestEvent', EventPriorities::POST_WRITE],
        ];
    }

    public function onRequestEvent(ResponseEvent $event)
    {
        $request = $event->getRequest();
        $method = $request->getMethod();
        $response = $event->getResponse();
        $statusCode = $response->getStatusCode();
        $resourceClass = $request->attributes->get("_api_resource_class");
        if ($resourceClass !== TeamInvitation::class) return;
        if ($statusCode === 200 && $method === "PATCH"){
            /**
             * @var $currentData TeamMember
             */
            $currentData = $request->attributes->get("data");
            $currentStatus = $currentData->getJoinRequestStatus();
            if ($currentStatus === "Approved"){
                $user = $currentData->getMember();
                $user->setRoles(["ROLE_TEACHER"]);
                $this->entityManager->persist($user);
                $this->entityManager->flush();
            }
        }
    }

}
