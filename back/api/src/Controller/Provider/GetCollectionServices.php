<?php

namespace App\Controller\Provider;

use App\Repository\ServiceRepository;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\EstablishmentRepository;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Response;

#[AsController]
class GetCollectionServices extends AbstractController {
    private ServiceRepository $serviceRepository;
    private Security $security;
    private SerializerInterface $serializer;

    public function __construct(
        ServiceRepository $serviceRepository,
        Security $security,
        SerializerInterface $serializer
    ) {
        $this->serviceRepository = $serviceRepository;
        $this->security = $security;
        $this->serializer = $serializer;
    }

    public function __invoke(): Response {
        $user = $this->security->getUser();

        if (!$user) {
            return new Response(null, Response::HTTP_FORBIDDEN);
        }

        $services = $this->serviceRepository->findBy([
            'author' => $user->getId()
        ]);

        $data = $this->serializer->serialize($services, 'json', ['groups' => ['service:read']]);

        return new Response($data, Response::HTTP_OK, [
            'Content-Type' => 'application/json'
        ]);
    }
}
