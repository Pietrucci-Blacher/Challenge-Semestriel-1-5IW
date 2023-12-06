<?php

namespace App\Entity;

use ApiPlatform\Metadata\Put;
use App\Attributes\UserField;
use App\Controller\Provider\GetCollectionServices;
use App\Repository\ServiceRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\OpenApi\Model;

#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/services/me',
            controller: GetCollectionServices::class,
            openapi: new Model\Operation(
                responses: [
                    '200' => [
                        'description' => 'Retrieves the services of the current provider.',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'array',
                                    'items' => [
                                        '$ref' => '#/components/schemas/Service',
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
                summary: 'Retrieves the services of the current provider.',
            ),
            security: 'is_granted("ROLE_PROVIDER")',
            securityMessage: 'Il faut être un prestataire pour accéder à ses établissements.',
        ),
        new GetCollection(
            normalizationContext: ['groups' => ['service:read']],
            security: 'is_granted("ROLE_ADMIN")',
        ),
        new Post(
            security: 'is_granted("ROLE_PROVIDER")',
        ),
        new Get(
            normalizationContext: ['groups' => ['service:read']],
            security: 'is_granted("ROLE_ADMIN") or (is_granted("ROLE_PROVIDER") and object.getAuthor() == user)',
            securityMessage: 'Vous ne pouvez accéder qu\'à vos établissements.',
        ),
        new Put(
            security: 'is_granted("ROLE_ADMIN") or (is_granted("ROLE_PROVIDER") and object.getAuthor() == user)',
            securityMessage: 'Vous ne pouvez modifier que vos services.',
        ),
        new Patch(
            security: 'is_granted("ROLE_ADMIN") or (is_granted("ROLE_PROVIDER") and object.getAuthor() == user)',
            securityMessage: 'Vous ne pouvez modifier que vos services.',
        ),
        new Delete(
            security: 'is_granted("ROLE_ADMIN") or (is_granted("ROLE_PROVIDER") and object.getAuthor() == user)',
            securityMessage: 'Vous ne pouvez supprimer que vos services.',
        )
    ],
    mercure: true,
)]
#[ORM\Entity(repositoryClass: ServiceRepository::class)]
class Service
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['service:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Groups(['service:read', 'service:write'])]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['service:read', 'service:write'])]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'services')]
    #[ORM\JoinColumn(nullable: false)]
    #[UserField('author')]
    #[Groups(['service:read', 'service:write'])]
    private ?User $author = null;

    #[ORM\Column]
    private ?DateTimeImmutable $createdAt;

    #[ORM\Column]
    private ?DateTimeImmutable $updatedAt;

    #[ORM\Column]
    #[Groups(['service:read', 'service:write'])]
    private ?float $price = null;

    #[ORM\OneToMany(mappedBy: 'service', targetEntity: Payment::class)]
    private Collection $payments;

    #[ORM\OneToMany(mappedBy: 'service', targetEntity: Comment::class)]
    private Collection $comments;

    #[ORM\OneToMany(mappedBy: 'service', targetEntity: AvailableSlot::class)]
    private Collection $availableSlots;

    #[ORM\ManyToOne(cascade: ['persist'], inversedBy: 'services')]
    #[Groups(['service:read', 'service:write'])]
    private ?Establishment $establishment = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['service:read', 'service:write'])]
    private ?string $body = null;

    public function __construct()
    {
        $this->payments = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->availableSlots = new ArrayCollection();
        $this->createdAt = new DateTimeImmutable();
        $this->updatedAt = new DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): static
    {
        $this->author = $author;

        return $this;
    }

    public function getCreatedAt(): ?DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return Collection<int, Payment>
     */
    public function getPayments(): Collection
    {
        return $this->payments;
    }

    public function addPayment(Payment $payment): static
    {
        if (!$this->payments->contains($payment)) {
            $this->payments->add($payment);
            $payment->setService($this);
        }

        return $this;
    }

    public function removePayment(Payment $payment): static
    {
        // set the owning side to null (unless already changed)
        if ($this->payments->removeElement($payment) && $payment->getService() === $this) {
            $payment->setService(null);
        }

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): static
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setService($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): static
    {
        // set the owning side to null (unless already changed)
        if ($this->comments->removeElement($comment) && $comment->getService() === $this) {
            $comment->setService(null);
        }

        return $this;
    }

    /**
     * @return Collection<int, AvailableSlot>
     */
    public function getAvailableSlots(): Collection
    {
        return $this->availableSlots;
    }

    public function addAvailableSlot(AvailableSlot $availableSlot): static
    {
        if (!$this->availableSlots->contains($availableSlot)) {
            $this->availableSlots->add($availableSlot);
            $availableSlot->setService($this);
        }

        return $this;
    }

    public function removeAvailableSlot(AvailableSlot $availableSlot): static
    {
        // set the owning side to null (unless already changed)
        if ($this->availableSlots->removeElement($availableSlot) && $availableSlot->getService() === $this) {
            $availableSlot->setService(null);
        }

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

    public function getBody(): ?string
    {
        return $this->body;
    }

    public function setBody(string $body): static
    {
        $this->body = $body;

        return $this;
    }
}
