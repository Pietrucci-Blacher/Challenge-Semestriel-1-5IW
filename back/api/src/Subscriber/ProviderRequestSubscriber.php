<?php

namespace App\Subscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\ProviderRequest;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use App\Service\Email;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\SecurityBundle\Security;

final class ProviderRequestSubscriber implements EventSubscriberInterface
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
        $currentData = $request->attributes->get("data");

        if ($resourceClass !== ProviderRequest::class) return;

        if ($statusCode === 200 && $method === "PATCH") {
            $previousData = $request->attributes->get("previous_data");
            $previousStatus = $previousData->getStatus();
            $currentStatus = $currentData->getStatus();

            if ($previousStatus === "pending" && $currentStatus != $previousStatus) {
                $user = $currentData->getCreatedBy();
                if ($currentStatus === "approved") {
                    $user->setRoles(["ROLE_PROVIDER"]);
                    $this->userRepository->save($user);
                    $this->email->sendProviderAcceptedEmail($user->getEmail(), $user->getFirstname());
                } else if ($currentStatus === "rejected") {
                    $this->email->sendProviderRejectedEmail($user->getEmail(), $user->getFirstname());
                }
            }
        }

        if ($statusCode === 201 && $method === "POST") {
            $content = json_decode($response->getContent(), false);
            $user = $content->createdBy;
            /* $requestId = $content->id; */
            /* $admins = $this->userRepository->findByRole("ROLE_ADMIN"); */

            /* $this->email->sendRequestProviderEmail($admins, $user->name, $requestId); */
            $this->email->sendProviderConfimationEmail($user->email, $user->firstname);
        }
    }
}
