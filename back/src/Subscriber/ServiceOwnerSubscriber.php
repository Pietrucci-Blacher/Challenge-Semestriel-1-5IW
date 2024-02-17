<?php

namespace src\Subscriber;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\Security\Core\Security;
use src\Entity\Service;
use Doctrine\Bundle\DoctrineBundle\EventSubscriber\EventSubscriberInterface;


class ServiceOwnerSubscriber implements EventSubscriberInterface
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function getSubscribedEvents(): array
    {
        return [
            Events::prePersist,
            Events::preUpdate,
        ];
    }

    public function prePersist(LifecycleEventArgs $args): void
    {
        $this->checkOwnership($args);
    }

    public function preUpdate(LifecycleEventArgs $args): void
    {
        $this->checkOwnership($args);
    }

    private function checkOwnership(LifecycleEventArgs $args): void
    {
        $entity = $args->getObject();

        if (!$entity instanceof Service) {
            return;
        }

        $currentUser = $this->security->getUser();
        $establishmentOwner = $entity->getEstablishment()->getOwner();

        if ($currentUser !== $establishmentOwner) {
            throw new \LogicException('Seul le propriétaire de l\'établissement peut créer ou mettre à jour le service.');
        }
    }
}
