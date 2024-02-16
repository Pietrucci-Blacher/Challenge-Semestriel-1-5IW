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
use App\Repository\ProviderRequestRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;


#[ORM\Entity(repositoryClass: ProviderRequestRepository::class)]
#[Vich\Uploadable]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Post(
            inputFormats: ['multipart' => ['multipart/form-data']],
            normalizationContext: ['groups' => ['provider_request:read']],
            denormalizationContext: ['groups' => ['provider_request:create']]
        ),
        new Patch(
            normalizationContext: ['groups' => ['provider_request:read']],
            denormalizationContext: ['groups' => ['provider_request:update']],
            security: 'is_granted("ROLE_ADMIN")'
        ),
        new Get(
            security: 'is_granted("ROLE_ADMIN") or object.getCreatedBy() == user)',
            securityMessage: 'Vous ne pouvez voir votre propre profil.'
        ),
        new GetCollection(
            security: 'is_granted("ROLE_ADMIN")',
        ),
    ],
    normalizationContext: ['groups' => ['provider_request:read']]
)]
class ProviderRequest
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["provider_request:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["provider_request:read", "provider_request:update"])]
    #[Assert\Choice(choices: ['pending', 'approved', 'rejected'], message: 'Invalid status')]
    private ?string $status = 'pending';

    #[ORM\Column(length: 255)]
    #[Groups(["provider_request:read", "provider_request:create"])]
    private ?string $kbis = null;

    #[UserField('createdBy')]
    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[Groups(["provider_request:read", "provider_request:create"])]
    private ?User $createdBy = null;

    #[ApiProperty(openapiContext: [
        'type' => 'string',
        'format' => 'binary'
    ])]
    #[Vich\UploadableField(mapping: "media_object", fileNameProperty: "filePath")]
    #[Assert\NotNull(message: "Le fichier est obligatoire.", groups: ['provider_request:create'])]
    #[Assert\File(
        mimeTypes: ['application/pdf'],
        groups: ['provider_request:create']
    )]
    #[Groups(["provider_request:create"])]
    public ?File $file = null;



    #[ORM\Column(nullable: true)]
    #[Groups(["provider_request:read"])]
    public ?string $filePath = null;

    #[ORM\Column]
    #[Groups('provider_request:read')]
    private ?\DateTimeImmutable $createdAt;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Groups('provider_request:read')]
    private ?\DateTimeImmutable $updatedAt;

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

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
    public function onPrePersist(): void
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    #[ORM\PreUpdate]
    public function onPreUpdate(PreUpdateEventArgs $event): void
    {
        $this->updatedAt = new \DateTimeImmutable();
    }
}
