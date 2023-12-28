<?php

namespace App\Entity;

use ApiPlatform\Metadata\Link;
use App\Attributes\UserField;
use App\Controller\Schedules\GetSchedulesByUserAndEstablishment;
use App\Repository\ScheduleRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

#[ApiResource(
    operations: [
        new GetCollection(),
        new GetCollection(
            uriTemplate: '/users/{userId}/schedules',
            uriVariables: [
                'userId' => new Link(toProperty: 'assignedTo', fromClass: Schedule::class),
            ],
        ),
        new GetCollection(
            uriTemplate: '/establishments/{establishmentId}/schedules',
            uriVariables: [
                'establishmentId' => new Link(toProperty: 'establishment', fromClass: Establishment::class),
            ],
            normalizationContext: ['groups' => ['schedule:read']],
        ),
        new GetCollection(
            uriTemplate: '/establishments/{establishmentId}/users/{userId}/schedules',
            controller: GetSchedulesByUserAndEstablishment::class,
            normalizationContext: ['groups' => ['schedule:read']]
        ),
        new Post(
            security: 'is_granted("ROLE_TEACHER")',
            securityMessage: 'Access interdit.',
        ),
        new Get(),
        new Delete(),
        new Patch(),
    ],
    mercure: true,
)]
#[ORM\Entity(repositoryClass: ScheduleRepository::class)]
class Schedule
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['schedule:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['schedule:read'])]
    private ?string $reason = "Not provided";

    #[ORM\ManyToOne(inversedBy: 'schedules')]
    #[UserField('assignedTo')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['schedule:read'])]
    private ?User $assignedTo = null;

    #[ORM\ManyToOne(inversedBy: 'schedules')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['schedule:read'])]
    private ?Establishment $establishment = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['schedule:read'])]
    private ?\DateTimeInterface $startTime = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['schedule:read'])]
    private ?\DateTimeInterface $endTime = null;

    #[ORM\OneToOne(mappedBy: 'schedule', cascade: ['persist', 'remove'])]
    #[Groups(['schedule:read'])]
    private ?Reservation $reservation = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReason(): ?string
    {
        return $this->reason;
    }

    public function setReason(string $reason): static
    {
        if ($reason == ""){
            $reason = "Not provided";
        }
        $this->reason = $reason;
        return $this;
    }

    public function getAssignedTo(): ?User
    {
        return $this->assignedTo;
    }

    public function setAssignedTo(?User $assignedTo): static
    {
        $this->assignedTo = $assignedTo;

        return $this;
    }

    public function getStartTime(): ?\DateTimeInterface
    {
        return $this->startTime;
    }

    public function setStartTime(\DateTimeInterface $startTime): static
    {
        $this->startTime = $startTime;

        return $this;
    }

    public function getEndTime(): ?\DateTimeInterface
    {
        return $this->endTime;
    }

    public function setEndTime(\DateTimeInterface $endTime): static
    {
        $this->endTime = $endTime;

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

    public function getReservation(): ?Reservation
    {
        return $this->reservation;
    }

    public function setReservation(Reservation $reservation): static
    {
        // set the owning side of the relation if necessary
        if ($reservation->getSchedule() !== $this) {
            $reservation->setSchedule($this);
        }

        $this->reservation = $reservation;

        return $this;
    }

    #[Assert\Callback]
    public function validate(ExecutionContextInterface $context): void
    {
        $startTime = $this->startTime;
        $endTime = $this->endTime;
        $currentDate = new \DateTime();
        if ($startTime <= $currentDate) {
            $context->buildViolation('Le startTime doit être dans le futur ' )
                ->atPath('startTime')
                ->addViolation();
        }

        if ($startTime >= $endTime) {
            $context->buildViolation('Le startTime doit être antérieur au endTime')
                ->atPath('startTime')
                ->addViolation();
        }
    }
}
