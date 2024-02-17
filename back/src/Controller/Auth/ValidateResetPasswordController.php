<?php

namespace src\Controller\Auth;


use src\Repository\ResetPasswordRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\HttpException;


#[AsController]
class ValidateResetPasswordController extends AbstractController
{
    private ResetPasswordRepository $resetPasswordRepository;

    public function __construct(ResetPasswordRepository $resetPasswordRepository)
    {
        $this->resetPasswordRepository = $resetPasswordRepository;
    }

    public function __invoke(string $token): Response
    {
        $resetPassword = $this->resetPasswordRepository->findOneBy(['token' => $token]);

        if (!$resetPassword) {
            throw new HttpException(Response::HTTP_NOT_FOUND, 'Token not found.');
        }

        if ($resetPassword->getExpiresAt() < new \DateTimeImmutable('now')) {
            throw new HttpException(Response::HTTP_GONE, 'Token expired.');
        }

        return new Response(null, Response::HTTP_OK);
    }
}
