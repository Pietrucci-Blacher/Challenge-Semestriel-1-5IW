<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Establishment;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Serializer\SerializerInterface;
use App\Repository\UserRepository;
use App\Repository\EstablishmentRepository;

#[AsController]
class CountTeamInvitation extends AbstractController
{
    private EstablishmentRepository $establishmentRepository;
    private UserRepository $userRepository;
    private SerializerInterface $serializer;

    public function __construct(
        EstablishmentRepository $establishmentRepository,
        UserRepository $userRepository,
        SerializerInterface $serializer
    ){
        $this->establishmentRepository = $establishmentRepository;
        $this->userRepository = $userRepository;
        $this->serializer = $serializer;
    }

    public function __invoke(string $userId, string $status): Response
    {
        if (!$userId || !$status)
            return new Response(null, Response::HTTP_BAD_REQUEST);

        $establishment = $this->establishmentRepository->findBy(['owner' => $userId]);
        $count = 0;

        foreach ($establishment as $estab) {
            $teamInvitations = $estab->getTeamInvitations();
            foreach ($teamInvitations as $teamInvitation) {
                if ($teamInvitation->getJoinRequestStatus() !== $status) continue;
                $count++;
            }
        }

        $data = $this->serializer->serialize([ 'count' => $count ], 'json');

        return new Response($data, Response::HTTP_OK, ['Content-Type' => 'application/json']);
    }
}
