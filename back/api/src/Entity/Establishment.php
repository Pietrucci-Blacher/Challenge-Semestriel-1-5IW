<?php

namespace App\Entity;

use App\Repository\EstablishmentRepository;
use App\Attributes\UserField;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use App\Controller\Provider\GetCollectionEstablishment;
use ApiPlatform\OpenApi\Model;

#[ORM\Entity(repositoryClass: EstablishmentRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/establishments/me',
            controller: GetCollectionEstablishment::class,
            openapi: new Model\Operation(
                responses: [
                    '200' => [
                        'description' => 'Retrieves the establishments of the current provider.',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    'type' => 'array',
                                    'items' => [
                                        '$ref' => '#/components/schemas/Establishment',
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
                summary: 'Retrieves the establishments of the current provider.',
            ),
            security: 'is_granted("ROLE_PROVIDER")',
            securityMessage: 'Il faut être un prestataire pour accéder à ses établissements.',
        ),
        new Get(
            normalizationContext: ['groups' => ['establishment:read']],
            security: 'is_granted("ROLE_ADMIN") or (is_granted("ROLE_PROVIDER") and object.getOwner() == user)',
            securityMessage: 'Vous ne pouvez accéder qu\'à vos établissements.',
        ),
        new GetCollection(
            normalizationContext: ['groups' => ['establishment:read']],
            security: 'is_granted("ROLE_ADMIN")',
        ),
        new Post(
            security: 'is_granted("ROLE_PROVIDER")',
        ),
        new Put(
            security: 'is_granted("ROLE_ADMIN") or (is_granted("ROLE_PROVIDER") and object.getOwner() == user)',
            securityMessage: 'Vous ne pouvez modifier que vos établissements.',
        ),
        new Patch(
            security: 'is_granted("ROLE_ADMIN") or (is_granted("ROLE_PROVIDER") and object.getOwner() == user)',
            securityMessage: 'Vous ne pouvez modifier que vos établissements.',
        ),
        new Delete(
            security: 'is_granted("ROLE_ADMIN") or (is_granted("ROLE_PROVIDER") and object.getOwner() == user)',
            securityMessage: 'Vous ne pouvez supprimer que vos établissements.',
        )
    ]
)]
class Establishment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('establishment:read')]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'establishments')]
    #[UserField('owner')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['establishment:read', 'establishment:write'])]
    private ?User $owner = null;

    #[ORM\Column]
    #[Groups(['establishment:read', 'establishment:write'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['establishment:read', 'establishment:write'])]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column(length: 50)]
    #[Groups(['establishment:read', 'establishment:write',  'user:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['establishment:read', 'establishment:write'])]
    private ?string $street = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['establishment:read', 'establishment:write'])]
    private ?string $city = null;

    #[ORM\Column(length: 5, nullable: true)]
    #[Groups(['establishment:read', 'establishment:write'])]
    private ?string $zipCode = null;

    #[ORM\OneToMany(mappedBy: 'establishment', targetEntity: TeamMember::class, orphanRemoval: true)]
    #[Groups(['establishment:read'])]
    private Collection $teamMembers;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->teamMembers = new ArrayCollection();
    }

    #[ORM\PrePersist]
    public function onPrePersist(): void {
        $this->createdAt = new \DateTimeImmutable();
    }

    #[ORM\PreUpdate]
    public function onPreUpdate(PreUpdateEventArgs $event): void {
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): static
    {
        $this->owner = $owner;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getStreet(): ?string
    {
        return $this->street;
    }

    public function setStreet(?string $street): static
    {
        $this->street = $street;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getZipCode(): ?string
    {
        return $this->zipCode;
    }

    public function setZipCode(?string $zipCode): static
    {
        $this->zipCode = $zipCode;

        return $this;
    }

    /**
     * @return Collection<int, TeamMember>
     */
    public function getTeamMembers(): Collection
    {
        return $this->teamMembers;
    }

    public function addTeamMember(TeamMember $teamMember): static
    {
        if (!$this->teamMembers->contains($teamMember)) {
            $this->teamMembers->add($teamMember);
            $teamMember->setEstablishment($this);
        }

        return $this;
    }

    public function removeTeamMember(TeamMember $teamMember): static
    {
        if ($this->teamMembers->removeElement($teamMember)) {
            // set the owning side to null (unless already changed)
            if ($teamMember->getEstablishment() === $this) {
                $teamMember->setEstablishment(null);
            }
        }

        return $this;
    }
}
