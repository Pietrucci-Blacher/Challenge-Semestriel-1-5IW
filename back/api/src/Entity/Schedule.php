<?php

namespace App\Entity;

use App\Repository\ScheduleRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ScheduleRepository::class)]
class Schedule
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'schedules')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $scheduler = null;

    #[ORM\OneToOne(inversedBy: 'schedule', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?AvailableSlot $slot = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getScheduler(): ?User
    {
        return $this->scheduler;
    }

    public function setScheduler(?User $scheduler): static
    {
        $this->scheduler = $scheduler;

        return $this;
    }

    public function getSlot(): ?AvailableSlot
    {
        return $this->slot;
    }

    public function setSlot(AvailableSlot $slot): static
    {
        $this->slot = $slot;

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
}