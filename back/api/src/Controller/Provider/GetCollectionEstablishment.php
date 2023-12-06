<?php

namespace App\Controller\Provider;

use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\EstablishmentRepository;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Response;

#[AsController]
class GetCollectionEstablishment extends AbstractController {
    private EstablishmentRepository $establishmentRepository;

    public function __construct(
        EstablishmentRepository $establishmentRepository,
        Security $security,
        SerializerInterface $serializer
    ) {
        $this->establishmentRepository = $establishmentRepository;
        $this->security = $security;
        $this->serializer = $serializer;
    }

    public function __invoke(): Response {
        try {
            $user = $this->security->getUser();

            if (!$user) {
                return new Response(null, Response::HTTP_FORBIDDEN);
            }

            $establishments = $this->establishmentRepository->findBy(['owner' => $user->getId()]);
            $data = $this->serializer->serialize($establishments, 'json', ['groups' => ['establishment:read']]);

            return new Response($data, Response::HTTP_OK, ['Content-Type' => 'application/json']);
        } catch (\Exception $e) {
            // Vous pouvez logger l'exception ici ou renvoyer un message d'erreur personnalisé
            return new Response("Erreur lors de la récupération des établissements: " . $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
