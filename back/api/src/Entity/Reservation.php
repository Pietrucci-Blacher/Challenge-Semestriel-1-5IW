<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Tests\Fixtures\Metadata\Get;
use App\Attributes\UserField;
use App\Controller\Reservation\CreateReservation;
use App\Dto\CreateReservationDto;
use App\Repository\ReservationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Context\ExecutionContextInterface;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new GetCollection(
            uriTemplate: '/users/{userId}/reservations',
            uriVariables: [
                'userId' => new Link(toProperty: 'customer', fromClass: Reservation::class),
            ],
        ),
        new GetCollection(
            uriTemplate: '/teachers/{userId}/reservations',
            uriVariables: [
                'userId' => new Link(toProperty: 'teacher', fromClass: Reservation::class),
            ],
        ),
        new GetCollection(
            uriTemplate: '/services/{serviceId}/reservations',
            uriVariables: [
                'serviceId' => new Link(toProperty: 'service', fromClass: Reservation::class),
            ],
        ),
        new GetCollection(
            uriTemplate: '/establishments/{establishmentId}/reservations',
            uriVariables: [
                'establishmentId' => new Link(toProperty: 'establishment', fromClass: Reservation::class),
            ],
        ),
        new Get(
            security: "object.getCustomer() == user or object.getTeacher() == user or object.getEstablishment().getOwner() == user",
            securityMessage: 'Acces denied'
        ),
        new Post(
            controller: CreateReservation::class,
            input: CreateReservationDto::class,
            name: 'add_reservation',
        ),
        new Patch(
            security: "object.getCustomer() == user",
        ),
        new Delete()
    ],
    normalizationContext: ['groups' => ['reservation:read']]

)]
#[UniqueEntity(
    fields: ['teacher', 'startTime', 'endTime'],
    message: 'Une réservation pour ce professeur à ces dates existe déjà.'
)]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['reservation:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['reservation:read'])]
    private ?User $customer = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['reservation:read'])]
    private ?Establishment $establishment = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['reservation:read'])]
    private ?Service $service = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['reservation:read'])]
    private ?\DateTimeInterface $startTime = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['reservation:read'])]
    private ?\DateTimeInterface $endTime = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['reservation:read'])]
    private ?string $specialRequests = null;

    #[ORM\ManyToOne(inversedBy: 'teacherReservations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['reservation:read'])]
    private ?User $teacher = null;

    #[ORM\OneToOne(inversedBy: 'reservation', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Schedule $schedule = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCustomer(): ?User
    {
        return $this->customer;
    }

    public function setCustomer(?User $customer): static
    {
        $this->customer = $customer;

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

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): static
    {
        $this->service = $service;

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

    public function getSpecialRequests(): ?string
    {
        return $this->specialRequests;
    }

    public function setSpecialRequests(?string $specialRequests): static
    {
        $this->specialRequests = $specialRequests;

        return $this;
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

    public function getSchedule(): ?Schedule
    {
        return $this->schedule;
    }

    public function setSchedule(Schedule $schedule): static
    {
        $this->schedule = $schedule;

        return $this;
    }

    #[Assert\Callback]
    public function validate(ExecutionContextInterface $context): void
    {
        $startTime = $this->startTime;
        $endTime = $this->endTime;
        $currentDate = new \DateTime();
        if ($startTime <= $currentDate) {
            $context->buildViolation('Le startTime doit être dans le futur ')
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
