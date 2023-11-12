<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Attributes\UserField;
use App\Repository\ServiceProviderRequestRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ServiceProviderRequestRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            normalizationContext: ['groups' => ['service_provider_request:read']],
            denormalizationContext: ['groups' => ['service_provider_request:create']]
        ),
        new Put(
            normalizationContext: ['groups' => ['service_provider_request:read']],
            denormalizationContext: ['groups' => ['service_provider_request:update']]
        ),
        new Patch(
            normalizationContext: ['groups' => ['service_provider_request:read']],
            denormalizationContext: ['groups' => ['service_provider_request:update']]
        ),
        new Get(),
        new GetCollection()
    ]
)]
class ServiceProviderRequest
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["service_provider_request:read", "service_provider_request:update"])]
    private ?string $status = 'pending';

    #[ORM\Column(length: 255)]
    #[Groups(["service_provider_request:read", "service_provider_request:create"])]
    private ?string $kbis = null;

    #[UserField('createdBy')]
    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[Groups(["service_provider_request:read", "service_provider_request:create"])] // Inclus uniquement dans le groupe de création
    private ?User $createdBy = null;

    // ... (autres méthodes getter et setter)

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getKbis(): ?string
    {
        return $this->kbis;
    }

    public function setKbis(string $kbis): static
    {
        $this->kbis = $kbis;

        return $this;
    }

    public function getCreatedBy(): ?User
    {
        return $this->createdBy;
    }

    public function setCreatedBy(?User $createdBy): static
    {
        $this->createdBy = $createdBy;

        return $this;
    }
}
