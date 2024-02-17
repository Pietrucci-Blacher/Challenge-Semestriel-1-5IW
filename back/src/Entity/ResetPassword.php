<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Dto\AskResetPasswordDto;
use App\Dto\UpdatePasswordRequestDto;
use App\Repository\ResetPasswordRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use App\Controller\Auth\AskResetPasswordController;
use App\Controller\Auth\UpdatePasswordController;
use App\Controller\Auth\ValidateResetPasswordController;


#[ORM\Entity(repositoryClass: ResetPasswordRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/auth/reset-password/ask',
            controller: AskResetPasswordController::class,
            input: AskResetPasswordDto::class,
            read: false,
            write: false,
            name: 'ask_reset_password'
        ),
        new Get(
            uriTemplate: '/auth/reset-password/validate/{token}',
            controller: ValidateResetPasswordController::class,
            read: false,
            write: false,
            name: 'validate_reset_password'
        ),
        new Post(
            uriTemplate: '/auth/reset-password/reset/{token}',
            controller: UpdatePasswordController::class,
            input: UpdatePasswordRequestDto::class,
            read: false,
            write: false,
            name: 'reset_password',
        )
    ]
)]
class ResetPassword
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $token = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $expiresAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(string $token): static
    {
        $this->token = $token;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getExpiresAt(): ?\DateTimeImmutable
    {
        return $this->expiresAt;
    }

    public function setExpiresAt(): static
    {
        $this->expiresAt = new \DateTimeImmutable('+2 hour');

        return $this;
    }
}
