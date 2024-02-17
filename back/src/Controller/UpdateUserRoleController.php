<?php

namespace src\Controller;

use src\Entity\User;
use src\Repository\EstablishmentRepository;
use src\Repository\ReservationRepository;
use src\Repository\ScheduleRepository;
use src\Repository\ServiceRepository;
use src\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class UpdateUserRoleController extends AbstractController
{
    public function __construct(
        readonly EntityManagerInterface  $entityManager
    )
    {
    }
    public function __invoke(Request $request, UserRepository $userRepository, TokenStorageInterface $tokenStorage): Response
    {
        $userId = $request->attributes->get('id');
        $data = json_decode($request->getContent(), true);
        $newRole = $data['roles'] ?? null;

        if (!$newRole || !is_array($newRole)) {
            return $this->json(['error' => 'Invalid roles provided'], Response::HTTP_BAD_REQUEST);
        }

        /** @var User|null $user */
        $user = $userRepository->find($userId);
        if (!$user) {
            return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $user->setRoles($newRole);
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->json(['success' => 'User role updated successfully']);
    }
}
