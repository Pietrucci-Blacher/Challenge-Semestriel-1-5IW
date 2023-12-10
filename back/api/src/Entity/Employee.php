<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Controller\Provider\InviteEmployeeController;
use App\Controller\Provider\ReSendNotificationEmployeeController;
use App\Dto\InviteEmployeeDto;
use App\Repository\EmployeeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: EmployeeRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(
            uriTemplate: '/employees/{id}/resend_notification',
            controller: ReSendNotificationEmployeeController::class,
            security: 'object.getEstablishment().getOwner() == user',
            securityMessage: 'Access interdit.',
            name: 'resend_notification_to_employee'
        ),
        new Post(
            controller: InviteEmployeeController::class,
            input: InviteEmployeeDto::class,
            name: 'invite_employee'
        ),
        new Get(
            security: 'is_granted("ROLE_ADMIN") or (object.getEmployee() == user) or (object.getEstablishment().getOwner() == user)',
            securityMessage: 'Access interdit.',
        ),
        new Patch(
            denormalizationContext: ['groups' => ['employee:update']],
            security: "object.getEmployee() == user and object.getStatus() == 'Pending'",
            securityMessage: 'Error lors de la mise a jour de votre demande'
        ),
        new Delete(
            security: 'object.getEstablishment().getOwner() == user',
            securityMessage: 'Access interdit.'
        )
    ]
)]
class Employee
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'employees')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $employee = null;

    #[ORM\ManyToOne(inversedBy: 'employees')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Establishment $establishment = null;

    #[ORM\Column(length: 255)]
    #[Assert\Choice(choices: ['Pending', 'Approved', 'Rejected'], message: 'Invalid status')]
    #[Groups(["employee:update", 'establishment:read','user:read'])]
    private ?string $status = "Pending";

    #[ORM\OneToMany(mappedBy: 'employee', targetEntity: Schedule::class)]
    private Collection $schedules;

    public function __construct()
    {
        $this->schedules = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmployee(): ?User
    {
        return $this->employee;
    }

    public function setEmployee(?User $employee): static
    {
        $this->employee = $employee;

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

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

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
            $schedule->setEmployee($this);
        }

        return $this;
    }

    public function removeSchedule(Schedule $schedule): static
    {
        if ($this->schedules->removeElement($schedule)) {
            // set the owning side to null (unless already changed)
            if ($schedule->getEmployee() === $this) {
                $schedule->setEmployee(null);
            }
        }

        return $this;
    }
}
