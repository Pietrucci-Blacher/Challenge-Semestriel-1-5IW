<?php

namespace App\Controller\Auth;

use App\Dto\AskResetPasswordDto;
use App\Entity\ResetPassword;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;


#[AsController]
class AskResetPasswordController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserRepository $userRepository;

    public function __construct(EntityManagerInterface $entityManager, UserRepository $userRepository)
    {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
    }

    public function __invoke(AskResetPasswordDto $askResetPassword): Response
    {

        $email = $askResetPassword->email;

        if (!isset($email)) {
            throw new BadRequestHttpException('Email is required');
        }

        // Vérifier si l'utilisateur existe
        $user = $this->userRepository->findOneByEmail($email);

        if (!$user) {
            return new Response(Response::HTTP_OK);
        }


        $resetPassword = new ResetPassword();
        $resetPassword->setEmail($email);
        $resetPassword->setToken(bin2hex(random_bytes(20))); // Générer un token sécurisé
        $resetPassword->setExpiresAt(); // Expiration dans 1 heure

        $this->entityManager->persist($resetPassword);
        $this->entityManager->flush();

        return new Response($resetPassword->getToken(), Response::HTTP_OK);
        // TODO:
        // Envoyer un email à l'utilisateur avec un lien pour réinitialiser son mot de passe
        // return new Response(null, Response::HTTP_OK);
    }
}
