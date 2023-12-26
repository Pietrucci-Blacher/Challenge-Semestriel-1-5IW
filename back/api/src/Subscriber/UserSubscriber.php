<?php

namespace App\Subscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use App\Service\Email;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\SecurityBundle\Security;

final class UserSubscriber implements EventSubscriberInterface
{
    private Email $email;
    private EntityManagerInterface $entityManager;
    private UserRepository $userRepository;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserRepository $userRepository,
    ) {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->email = new Email();
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

        if ($resourceClass !== User::class) return;

        if ($statusCode === 201 && $method === "POST") {
            $user = json_decode($response->getContent(), false);
            $this->email->sendWelcomeEmail($user->email, $user->firstname);
        }
    }
}
