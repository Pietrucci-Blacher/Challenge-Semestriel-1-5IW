<?php

namespace App\Entity;

use App\Repository\FeedbackRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: FeedbackRepository::class)]
#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ['groups' => ['feedback:read']],
        ),
        new GetCollection(
            normalizationContext: ['groups' => ['feedback:read']],
        ),
        new Post(
            normalizationContext: ['groups' => ['feedback:read']],
            denormalizationContext: ['groups' => ['feedback:write']],
        ),
        new Patch(
            normalizationContext: ['groups' => ['feedback:read']],
            denormalizationContext: ['groups' => ['feedback:write']],
            security: 'is_granted("ROLE_ADMIN")',
        ),
        new Delete(
            security: 'is_granted("ROLE_ADMIN") or object.getReviewer() == user',
        ),
    ]
)]
class Feedback
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['feedback:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'feedback')]
    #[Groups(['feedback:read', 'feedback:write'])]
    private ?User $reviewer = null;

    #[ORM\ManyToOne(inversedBy: 'feedback')]
    #[Groups(['feedback:read', 'feedback:write'])]
    private ?Service $service = null;

    #[ORM\ManyToOne(inversedBy: 'feedback')]
    #[Groups(['feedback:read', 'feedback:write'])]
    private ?Establishment $establishment = null;

    #[ORM\Column]
    #[Groups(['feedback:read', 'feedback:write'])]
    private ?float $note = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['feedback:read', 'feedback:write'])]
    private ?string $comment = null;

    #[ORM\Column]
    #[Groups(['feedback:read', 'feedback:write'])]
    private array $detailedNote = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReviewer(): ?User
    {
        return $this->reviewer;
    }

    public function setReviewer(?User $reviewer): static
    {
        $this->reviewer = $reviewer;

        return $this;
    }

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): static
    {
        $this->service = $service;

        return $this;
    }

    public function getEstablishment(): ?Establishment
    {
        return $this->establishment;
    }

    public function setEstablishment(?Establishment $establishment): static
    {
        $this->establishment = $establishment;

        return $this;
    }

    public function getNote(): ?float
    {
        return $this->note;
    }

    public function setNote(float $note): static
    {
        $this->note = $note;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): static
    {
        $this->comment = $comment;

        return $this;
    }

    public function getDetailedNote(): array
    {
        return $this->detailedNote;
    }

    public function setDetailedNote(array $detailedNote): static
    {
        $this->detailedNote = $detailedNote;

        return $this;
    }
}
