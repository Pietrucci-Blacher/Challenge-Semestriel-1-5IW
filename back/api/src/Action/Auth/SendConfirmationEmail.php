<?php

namespace App\Action\Auth;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use App\Repository\UserRepository;
use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use App\Event\UserCreatedEvent;
use Symfony\Component\EventDispatcher\Attribute\AsController;

#[AsController]
class SendConfirmationEmail extends AbstractController
{
    protected EventDispatcherInterface $eventDispatcher;
    protected UserRepository $userRepository;
    private SerializerInterface $serializer;

    public function __construct(
        EventDispatcherInterface $eventDispatcher,
        UserRepository $userRepository,
        SerializerInterface $serializer
    ) {
        $this->eventDispatcher = $eventDispatcher;
        $this->userRepository = $userRepository;
        $this->serializer = $serializer;
    }

    public function __invoke(User $user): ?string
    {
        $this->userRepository->save($user, true);
        $createdUser = $this
            ->userRepository
            ->findOneBy(['email' => $user->getEmail()]);

        $event = new UserCreatedEvent($createdUser->getId());
        $this->eventDispatcher->dispatch($event);

        $data = $this->serializer->serialize($createdUser, 'json');

        return new Response($data, Response::HTTP_OK, ['Content-Type' => 'application/json']);
    }
}
