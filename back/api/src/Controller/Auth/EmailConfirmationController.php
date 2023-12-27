<?php

namespace App\Controller\Auth;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Serializer\SerializerInterface;
use App\Repository\UserRepository;
use App\Service\Email;

#[AsController]
class EmailConfirmationController extends AbstractController
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->email = new Email();
    }

    public function __invoke(string $token): Response
    {
        dd($token);
        if (!$token)
            return new Response(null, Response::HTTP_BAD_REQUEST);

        $user = $this->userRepository->findOneBy(['emailConfirmationToken' => $token]);

        if (!$user)
            return new Response(null, Response::HTTP_NOT_FOUND);

        $user->setEmailConfirmationToken(null);
        $user->setIsActive(true);
        $this->userRepository->save($user);
        $this->email->sendEmailIsConfirmed($user->getEmail(), $user->getFirstname());

        return new Response(null, Response::HTTP_OK);
    }
}
