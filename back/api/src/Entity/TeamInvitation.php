<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Controller\Provider\InviteTeamInvitationController;
use App\Controller\Provider\ReSendNotificationEmployeeController;
use App\Dto\InviteTeamInvitationDto;
use App\Repository\TeamInvitationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: TeamInvitationRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(
            controller: InviteTeamInvitationController::class,
            input: InviteTeamInvitationDto::class,
            name: 'invite_employee'
        ),
        new Get(
            security: 'is_granted("ROLE_ADMIN") or (object.getMember() == user) or (object.getEstablishment().getOwner() == user)',
            securityMessage: 'Access interdit.',
        ),
        new Patch(
            denormalizationContext: ['groups' => ['team_invitation:update']],
            security: "object.getMember() == user and object.getJoinRequestStatus() == 'Pending'",
            securityMessage: 'Error lors de la mise a jour de votre demande'
        ),
        new Delete(
            security: 'object.getEstablishment().getOwner() == user',
            securityMessage: 'Access interdit.'
        ),
        new Get(
            uriTemplate: '/team_invitations/{id}/resend_notification',
            controller: ReSendNotificationEmployeeController::class,
            security: 'object.getEstablishment().getOwner() == user',
            securityMessage: 'Access interdit.',
            name: 'resend_notification_to_employee'
        ),
    ]
)]
#[ORM\HasLifecycleCallbacks]
class TeamInvitation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'teamInvitations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $member = null;

    #[ORM\Column(length: 255)]
    #[Assert\Choice(choices: ['Pending', 'Approved', 'Rejected'], message: 'Invalid status')]
    #[Groups(["team_invitation:update", 'establishment:read','user:read'])]
    private ?string $joinRequestStatus = "Pending";

    #[ORM\ManyToOne(inversedBy: 'teamInvitations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Establishment $establishment = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

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

    public function getMember(): ?User
    {
        return $this->member;
    }

    public function setMember(?User $member): static
    {
        $this->member = $member;

        return $this;
    }

    public function getJoinRequestStatus(): ?string
    {
        return $this->joinRequestStatus;
    }

    public function setJoinRequestStatus(string $JoinRequestStatus): static
    {
        $this->joinRequestStatus = $JoinRequestStatus;

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
