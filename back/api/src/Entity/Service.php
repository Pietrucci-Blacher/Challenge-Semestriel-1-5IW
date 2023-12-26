<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\Provider\GetCollectionServices;
use App\Repository\ServiceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\OpenApi\Model;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/establishments/{establishmentId}/services',
            uriVariables: [
                'establishmentId' => new Link(toProperty: 'establishment', fromClass: Establishment::class),
            ]
        ),
        new GetCollection(),
        new Post(
            security: 'is_granted("ROLE_PROVIDER")',
        ),
        new Get(
            normalizationContext: ['groups' => ['service:read']],
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
        ),

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

    #[ORM\Column(length: 255)]
    #[Groups(['service:read', 'service:write'])]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    #[Groups(['service:read', 'service:write'])]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    #[Groups(['service:read', 'service:write'])]
    private ?int $price = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['service:read', 'service:write'])]
    private ?string $body = null;

    #[ORM\Column]
    #[Groups(['service:read', 'service:write'])]
    private ?int $duration = null;

    #[Groups(['service:read', 'service:write'])]
    #[ORM\ManyToOne(inversedBy: 'services')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Establishment $establishment = null;

    #[ORM\OneToMany(mappedBy: 'service', targetEntity: Reservation::class, orphanRemoval: true)]
    private Collection $reservations;


    public function __construct()
    {
        $this->reservations = new ArrayCollection();
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

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): static
    {
        $this->price = $price;

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

    public function getEstablishment(): ?Establishment
    {
        return $this->establishment;
    }

    public function setEstablishment(?Establishment $establishment): static
    {
        $this->establishment = $establishment;

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): static
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations->add($reservation);
            $reservation->setService($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): static
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getService() === $this) {
                $reservation->setService(null);
            }
        }

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): static
    {
        $this->duration = $duration;

        return $this;
    }
}
