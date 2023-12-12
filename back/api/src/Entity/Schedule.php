<?php

namespace App\Entity;

use ApiPlatform\Metadata\Link;
use App\Attributes\UserField;
//use App\Controller\Teacher\AddSchedule;
//use App\Controller\Teacher\GetMySchedules;
//use App\Controller\Teacher\GetScheduleByEmployee;
use App\Dto\Teacher\AddScheduleDto;
use App\Repository\ScheduleRepository;
use DateTime;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

#[ApiResource(
    operations: [
        new GetCollection(),
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
#[ApiResource(
    uriTemplate: '/users/{userId}/schedules',
    operations: [ new GetCollection() ],
    uriVariables: [
        'userId' => new Link(toProperty: 'assignedTo', fromClass: Schedule::class),
    ],
    security: " is_granted('ROLE_PROVIDER') or is_granted('VIEW_MY_RESOURCES', request)"
)]
#[ORM\Entity(repositoryClass: ScheduleRepository::class)]
class Schedule
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $reason = "Not provided";

    #[ORM\ManyToOne(inversedBy: 'schedules')]
    #[UserField('assignedTo')]
    private ?User $assignedTo = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $startTime = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $endTime = null;

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
