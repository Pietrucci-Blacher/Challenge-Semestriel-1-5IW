<?php

namespace App\Security;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use InvalidArgumentException;


class UserProvider implements UserProviderInterface
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function loadUserByIdentifier(string $identifier): UserInterface
    {
        // Chercher l'utilisateur par son identifiant (par exemple, email)
        $user = $this->userRepository->findOneBy(['email' => $identifier]);

        // Si l'utilisateur n'existe pas
        if (!$user) {
            throw new \Exception("L'utilisateur avec l'identifiant $identifier n'existe pas.");
        }

        // Si l'utilisateur existe mais n'est pas actif
        if (!$user->getIsActive()) {
            throw new CustomUserMessageAuthenticationException("Your account is not active.");
        }
        
        return $user;
    }

    public function refreshUser(UserInterface $user): UserInterface
    {
        if (!$user instanceof User) {
            throw new InvalidArgumentException(sprintf('Instances of "%s" are not supported.', get_class($user)));
        }

        // Recharger l'utilisateur depuis la base de données, si nécessaire
        $reloadedUser = $this->userRepository->findOneBy(['id' => $user->getId()]);

        if (!$reloadedUser) {
            throw new \Exception(sprintf('User with ID "%s" could not be reloaded.', $user->getId()));
        }

        return $reloadedUser;
    }

        public function supportsClass(string $class): bool
    {
        return User::class === $class;
    }
    }
