<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Attributes\UserField;
use App\Repository\ServiceProviderRequestRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[Vich\Uploadable]
#[ORM\HasLifecycleCallbacks]
#[ORM\Entity(repositoryClass: ServiceProviderRequestRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            inputFormats: ['multipart' => ['multipart/form-data']],
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
    #[Assert\Choice(choices: ['pending', 'approved', 'rejected'], message: 'Invalid status')]
    private ?string $status = 'pending';

    #[ORM\Column(length: 255)]
    #[Groups(["service_provider_request:read", "service_provider_request:create"])]
    private ?string $kbis = null;

    #[UserField('createdBy')]
    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[Groups(["service_provider_request:read", "service_provider_request:create"])]
    private ?User $createdBy = null;

    #[ApiProperty(openapiContext: [
        'type' => 'string',
        'format' => 'binary'
    ])]
    #[Vich\UploadableField(mapping: "media_object", fileNameProperty: "filePath")]
    #[Assert\NotNull(groups: ['media_object_create'])]
    #[Groups(["service_provider_request:create"])]
    public ?File $file = null;

    #[ORM\Column(nullable: true)]
    #[Groups(["service_provider_request:create"])]
    public ?string $filePath = null;

    #[ORM\Column]
    #[Groups('user:read')]
    private ?\DateTimeImmutable $createdAt;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Groups('user:read')]
    private ?\DateTimeImmutable $updatedAt;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

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

    #[ORM\PrePersist]
    public function onPrePersist(): void {
        $this->createdAt = new \DateTimeImmutable();
    }

    #[ORM\PreUpdate]
    public function onPreUpdate(PreUpdateEventArgs $event): void {
        $this->updatedAt = new \DateTimeImmutable();
    }
}
