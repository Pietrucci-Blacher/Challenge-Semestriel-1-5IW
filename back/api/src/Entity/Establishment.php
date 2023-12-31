<?php

namespace App\Entity;

use ApiPlatform\Metadata\Link;
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


#[ORM\Entity(repositoryClass: EstablishmentRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ['groups' => ['establishment:read']],
            security: 'is_granted("ROLE_ADMIN") or (is_granted("ROLE_PROVIDER") and object.getOwner() == user) or (is_granted("ROLE_USER"))',
            securityMessage: 'Vous ne pouvez accéder qu\'à vos établissements.',
        ),
        new GetCollection(
            normalizationContext: ['groups' => ['establishment:read']],
//            security: 'is_granted("ROLE_ADMIN")',
        ),
        new GetCollection(
            uriTemplate: '/users/{userId}/establishments',
            uriVariables: [
                'userId' => new Link(toProperty: 'owner', fromClass: Establishment::class),
            ],
            security: " is_granted('ROLE_ADMIN') or is_granted('VIEW_MY_RESOURCES', request)"
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
    #[Groups(['establishment:read', 'team_invitation:read', 'service:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'establishments')]
    #[UserField('owner')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['establishment:read', 'establishment:write', 'service:read'])]
    private ?User $owner = null;

    #[ORM\Column]
    #[Groups(['establishment:read', 'establishment:write', 'service:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['establishment:read', 'establishment:write'])]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column(length: 50)]
    #[Groups(['establishment:read', 'establishment:write', 'user:read', 'team_invitation:read', 'service:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['establishment:read', 'establishment:write', 'team_invitation:read', 'service:read'])]
    private ?string $street = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['establishment:read', 'establishment:write', 'team_invitation:read', 'service:read'])]
    private ?string $city = null;

    #[ORM\Column(length: 5, nullable: true)]
    #[Groups(['establishment:read', 'establishment:write', 'team_invitation:read', 'service:read'])]
    private ?string $zipCode = null;


    #[ORM\OneToMany(mappedBy: 'establishment', targetEntity: TeamInvitation::class, orphanRemoval: true)]
    private Collection $teamInvitations;

    #[ORM\OneToMany(mappedBy: 'establishment', targetEntity: Schedule::class, orphanRemoval: true)]
    private Collection $schedules;

    #[ORM\OneToMany(mappedBy: 'establishment', targetEntity: Service::class, orphanRemoval: true)]
    private Collection $services;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $photoEstablishment = null;
  
    #[ORM\OneToMany(mappedBy: 'establishment', targetEntity: Reservation::class, orphanRemoval: true)]
    private Collection $reservations;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->teamInvitations = new ArrayCollection();
        $this->schedules = new ArrayCollection();
        $this->services = new ArrayCollection();
        $this->reservations = new ArrayCollection();
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
     * @return Collection<int, TeamInvitation>
     */
    public function getTeamInvitations(): Collection
    {
        return $this->teamInvitations;
    }

    public function addTeamInvitation(TeamInvitation $teamInvitation): static
    {
        if (!$this->teamInvitations->contains($teamInvitation)) {
            $this->teamInvitations->add($teamInvitation);
            $teamInvitation->setEstablishment($this);
        }

        return $this;
    }

    public function removeTeamInvitation(TeamInvitation $teamInvitation): static
    {
        if ($this->teamInvitations->removeElement($teamInvitation)) {
            // set the owning side to null (unless already changed)
            if ($teamInvitation->getEstablishment() === $this) {
                $teamInvitation->setEstablishment(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Schedule>
     */
    public function getSchedules(): Collection
    {
        return $this->schedules;
    }

    public function addSchedule(Schedule $schedule): static
    {
        if (!$this->schedules->contains($schedule)) {
            $this->schedules->add($schedule);
            $schedule->setEstablishment($this);
        }

        return $this;
    }

    public function removeSchedule(Schedule $schedule): static
    {
        if ($this->schedules->removeElement($schedule)) {
            // set the owning side to null (unless already changed)
            if ($schedule->getEstablishment() === $this) {
                $schedule->setEstablishment(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Service>
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function addService(Service $service): static
    {
        if (!$this->services->contains($service)) {
            $this->services->add($service);
            $service->setEstablishment($this);
        }

        return $this;
    }

    public function removeService(Service $service): static
    {
        if ($this->services->removeElement($service)) {
            // set the owning side to null (unless already changed)
            if ($service->getEstablishment() === $this) {
                $service->setEstablishment(null);
            }
        }

        return $this;
    }

    public function getPhotoEstablishment(): ?string
    {
        return $this->photoEstablishment;
    }

    public function setPhotoEstablishment(?string $photoEstablishment): static
    {
        $this->photoEstablishment = $photoEstablishment;

        return $this;
    }
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
            $reservation->setEstablishment($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): static
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getEstablishment() === $this) {
                $reservation->setEstablishment(null);
            }
        }

        return $this;
    }
}
