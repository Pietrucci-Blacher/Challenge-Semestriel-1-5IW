<?php

namespace App\Entity;

use App\Repository\AvailableSlotRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(),
        new Get(),
        new Delete(),
        new Patch(),
    ],
)]
#[ORM\Entity(repositoryClass: AvailableSlotRepository::class)]
#[ORM\HasLifecycleCallbacks]
class AvailableSlot
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['availableSlots:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'availableSlots')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['availableSlots:read', 'availableSlots:write'])]
    private ?Service $service = null;

    #[ORM\Column]
    /* #[ApiProperty(writable: false)] */
    #[Groups(['availableSlots:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    /* #[ApiProperty(writable: false)] */
    #[Groups(['availableSlots:read'])]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['availableSlots:read', 'availableSlots:write'])]
    private ?\DateTimeInterface $beginDate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['availableSlots:read', 'availableSlots:write'])]
    private ?\DateTimeInterface $endDate = null;

    #[ORM\OneToOne(mappedBy: 'slot', cascade: ['persist', 'remove'])]
    #[Groups(['availableSlots:read'])]
    private ?Schedule $schedule = null;

    #[ORM\ManyToOne(inversedBy: 'availableSlots')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['availableSlots:read', 'availableSlots:write'])]
    private ?Teacher $teacher = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
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

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): static
    {
        $this->service = $service;

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

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getBeginDate(): ?\DateTimeInterface
    {
        return $this->beginDate;
    }

    public function setBeginDate(\DateTimeInterface $beginDate): static
    {
        $this->beginDate = $beginDate;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTimeInterface $endDate): static
    {
        $this->endDate = $endDate;

        return $this;
    }

    public function getSchedule(): ?Schedule
    {
        return $this->schedule;
    }

    public function setSchedule(Schedule $schedule): static
    {
        // set the owning side of the relation if necessary
        if ($schedule->getSlot() !== $this) {
            $schedule->setSlot($this);
        }

        $this->schedule = $schedule;

        return $this;
    }

    public function getTeacher(): ?Teacher
    {
        return $this->teacher;
    }

    public function setTeacher(?Teacher $teacher): static
    {
        $this->teacher = $teacher;

        return $this;
    }
}
