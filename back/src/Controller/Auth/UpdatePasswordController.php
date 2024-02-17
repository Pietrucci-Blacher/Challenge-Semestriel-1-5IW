<?php


namespace src\Controller\Auth;

use src\Dto\UpdatePasswordRequestDto;
use src\Repository\ResetPasswordRepository;
use src\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


#[AsController]
class UpdatePasswordController extends AbstractController
{
    private ResetPasswordRepository $resetPasswordRepository;
    private UserRepository $userRepository;
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(ResetPasswordRepository $resetPasswordRepository, UserRepository $userRepository, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher)
    {
        $this->resetPasswordRepository = $resetPasswordRepository;
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }

    public function __invoke(Request $request, string $token, UpdatePasswordRequestDto $updatePasswordRequest): Response
    {
        $newPassword = $updatePasswordRequest->newPassword;
        $resetPassword = $this->resetPasswordRepository->findOneBy(['token' => $token]);
        if (!$resetPassword) {
            throw new HttpException(Response::HTTP_NOT_FOUND, 'Token not found.');
        }

        if ($resetPassword->getExpiresAt() < new \DateTimeImmutable('now')) {
            throw new HttpException(Response::HTTP_GONE, 'Token expired.');
        }
        $user = $this->userRepository->findOneByEmail($resetPassword->getEmail());

        if (!$user) {
            throw new HttpException(Response::HTTP_NOT_FOUND, 'User not found.');
        }


        $user->setIsActive(true);
        $user->setPassword($this->passwordHasher->hashPassword($user, $newPassword));
        $this->entityManager->persist($user);


        $resetTokens = $this->resetPasswordRepository->findBy(['email' => $user->getEmail()]);
        foreach ($resetTokens as $token) {
            $this->entityManager->remove($token);
        }

        $this->entityManager->flush();
        return new Response('Password updated successfully.', Response::HTTP_OK);
    }
}
