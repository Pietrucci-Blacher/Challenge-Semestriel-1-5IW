<?php

namespace App\Subscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\ProviderRequest;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class ProviderRequestSubscriber implements EventSubscriberInterface
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
        if ($resourceClass !== ProviderRequest::class) return;
        if ($statusCode === 200 && $method === "PATCH"){
            /**
             * @var $currentData ProviderRequest
             */
            $currentData = $request->attributes->get("data");
            /**
             * @var $previousData ProviderRequest
             */
            $previousData = $request->attributes->get("previous_data");
            $previousStatus = $previousData->getStatus();
            $currentStatus = $currentData->getStatus();
            if ($previousStatus === "pending" && $currentStatus != $previousStatus){
                // TODO: Faire l'envoie de mail pour informer le client que ça demande a été refusé ou accepté
                if ($currentStatus === "approved") {
                    $user = $currentData->getCreatedBy();
                    $user->setRoles(["ROLE_PROVIDER"]);
                    $this->entityManager->persist($user);
                    $this->entityManager->flush();
                }
            }
        }
        if ($statusCode === 201 && $method === "POST"){
            // TODO: Faire l'envoie de mail vers l'admin pour lui informer que une demande est dispo
        }
    }

}
