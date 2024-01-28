<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Doctrine\Orm\Filter\RangeFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\ServiceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\OpenApi\Model;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Context;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;
use App\Controller\Provider\UpdateServiceController;

#[Vich\Uploadable]
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
            inputFormats: ['multipart' => ['multipart/form-data']],
            normalizationContext: ['groups' => ['service:read']],
            denormalizationContext: ['groups' => ['service:write']],
            security: 'is_granted("ROLE_PROVIDER")'
        ),
        new Get(
            normalizationContext: ['groups' => ['service:read']],
        ),
        new Post(
            uriTemplate: '/services/{id}/update',
            inputFormats: ['multipart' => ['multipart/form-data']],
            controller: UpdateServiceController::class,
            normalizationContext: ['groups' => ['service:read']],
            denormalizationContext: ['groups' => ['service:write']],
            security: 'is_granted("ROLE_ADMIN") or (is_granted("ROLE_PROVIDER") and object.getAuthor() == user)'
        ),
        new Delete(
            security: 'is_granted("ROLE_ADMIN") or (is_granted("ROLE_PROVIDER") and object.getAuthor() == user)',
            securityMessage: 'Vous ne pouvez supprimer que vos services.',
        ),
    ],
    normalizationContext: ['groups' => ['service:read']],
    denormalizationContext: ['groups' => ['service:write']],
    mercure: true,
)]
#[ApiFilter(SearchFilter::class, properties: ['title' => 'partial', 'description' => 'partial'])]
#[ApiFilter(RangeFilter::class, properties: ['price'])]
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

    #[ORM\Column]
    #[Groups(['service:read', 'service:write'])]
    #[Context(['disable_type_enforcement' => true])]
    private ?float $price = null;

    #[ORM\Column(type: 'json')]
    #[Groups(['service:read', 'service:write'])]
    private ?array $body = [];

    #[ORM\Column]
    #[Groups(['service:read', 'service:write'])]
    private ?int $duration = null;

    #[ORM\ManyToOne(inversedBy: 'services')]
    #[Groups(['service:read', 'service:write'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Establishment $establishment = null;

    #[ORM\OneToMany(mappedBy: 'service', targetEntity: Reservation::class, orphanRemoval: true)]
    private Collection $reservations;

    #[ApiProperty(openapiContext: [
        'type' => 'string',
        'format' => 'binary'
    ])]
    #[Vich\UploadableField(mapping: "media_object", fileNameProperty: "imagePath")]
    #[Assert\NotNull(groups: ['media_object_create'])]
    #[Groups(['service:write'])]
    public ?File $image = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['service:read'])]
    public ?string $imagePath = null;

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

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getBody(): ?array
    {
        return $this->body;
    }

    public function setBody(array $body): static
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

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): static
    {
        $this->duration = $duration;

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
}
