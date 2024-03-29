<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Controller\Provider\InviteTeamInvitationController;
use App\Controller\Provider\ReSendNotificationEmployeeController;
use App\Dto\InviteTeamInvitationDto;
use App\Entity\Establishment;
use App\Repository\TeamInvitationRepository;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\User;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Controller\Provider\CountTeamInvitation;

#[ORM\Entity(repositoryClass: TeamInvitationRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new GetCollection(
            uriTemplate: '/establishments/{establishmentId}/team_invitations',
            uriVariables: [
                'establishmentId' => new Link(toProperty: 'establishment', fromClass: Establishment::class),
            ],
            normalizationContext: ['groups' => ['team_invitation:read']]
        ),
        new GetCollection(
            uriTemplate: '/users/{userId}/team_invitations',
            uriVariables: [
                'userId' => new Link(toProperty: 'member', fromClass: User::class),
            ],
            normalizationContext: ['groups' => ['team_invitation:read']],
            security: " is_granted('ROLE_ADMIN') or is_granted('VIEW_MY_RESOURCES', request)"
        ),
        new Get(
            uriTemplate: '/users/{userId}/team_invitations/{status}/count',
            controller: CountTeamInvitation::class,
            read: false,
        ),
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
    #[Groups(['establishment:read', 'team_invitation:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'teamInvitations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['establishment:read', 'team_invitation:read'])]
    private ?User $member = null;

    #[ORM\Column(length: 255)]
    #[Assert\Choice(choices: ['Pending', 'Approved', 'Rejected'], message: 'Invalid status')]
    #[Groups(["team_invitation:update", 'establishment:read', 'user:read', 'team_invitation:read', 'schedule:read'])]
    private ?string $joinRequestStatus = "Pending";

    #[ORM\ManyToOne(inversedBy: 'teamInvitations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['establishment:read', 'team_invitation:read'])]
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
