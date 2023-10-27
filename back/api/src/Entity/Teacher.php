<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\DBAL\Types\Types;
use App\Repository\TeacherRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;

#[ApiResource(
    mercure: true,
    operations: [
        new GetCollection(),
        new Post(),
        new Get(),
        new Delete(),
        new Patch(),
    ],
)]
#[ORM\Entity(repositoryClass: TeacherRepository::class)]
class Teacher
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'teachers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $teacher = null;

    #[ORM\ManyToOne(inversedBy: 'teachers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Service $service = null;

    #[ApiProperty(writable: false)]
    #[ORM\OneToMany(mappedBy: 'teacher', targetEntity: AvailableSlot::class)]
    private Collection $availableSlots;

    #[ORM\Column]
    #[ApiProperty(writable: false)]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    #[ApiProperty(writable: false)]
    private ?\DateTimeImmutable $updatedAt = null;

    public function __construct()
    {
        $this->availableSlots = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTeacher(): ?User
    {
        return $this->teacher;
    }

    public function setTeacher(?User $teacher): static
    {
        $this->teacher = $teacher;

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
            $availableSlot->setTeacher($this);
        }

        return $this;
    }

    public function removeAvailableSlot(AvailableSlot $availableSlot): static
    {
        if ($this->availableSlots->removeElement($availableSlot)) {
            // set the owning side to null (unless already changed)
            if ($availableSlot->getTeacher() === $this) {
                $availableSlot->setTeacher(null);
            }
        }

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
