<?php

namespace src\Controller\Auth;

use src\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Serializer\SerializerInterface;


#[AsController]
class MeController  extends AbstractController
{
    private SerializerInterface $serializer;
    private Security $security;

    public function __construct(Security $security, SerializerInterface $serializer)
    {
        $this->security = $security;
        $this->serializer = $serializer;
    }


    public function __invoke(): Response
    {
        /** @var User $user */
        $user = $this->getUser();

        if (!$user) {
            return new Response(null, Response::HTTP_FORBIDDEN);
        }
        $data = $this->serializer->serialize($user, 'json', ['groups' => ['auth:me']]);

        return new Response($data, Response::HTTP_OK, ['Content-Type' => 'application/json']);
    }
}
