<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Controller\Provider\InviteTeamMemberController;
use App\Controller\Provider\ReSendNotificationMemberController;
use App\Dto\InviteTeamMemberDto;
use App\Dto\ReSendNotificationMemberDto;
use App\Repository\TeamMemberRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: TeamMemberRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/team_members/resend_notification',
            controller: ReSendNotificationMemberController::class,
            input: ReSendNotificationMemberDto::class,
            name: 'resend_notification'
        ),
        new Post(
            controller: InviteTeamMemberController::class,
            input: InviteTeamMemberDto::class,
            name: 'invite_team_member'
        ),
        new Get(
            security: 'is_granted("ROLE_ADMIN") or (object.getMember() == user) or (object.getEstablishment().getOwner() == user)',
            securityMessage: 'Access interdit.',
        ),
        new Patch(
            denormalizationContext: ['groups' => ['team_member:update']],
            security: "object.getMember() == user and object.getStatus() == 'Pending'",
            securityMessage: 'Error lors de la mise a jour de votre demande'
        ),
        new Delete(
            security: 'object.getEstablishment().getOwner() == user',
            securityMessage: 'Access interdit.'
        )
    ]
)]
class TeamMember
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['establishment:read', 'user:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'teamMembers')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['establishment:read', 'user:read'])]
    private ?Establishment $establishment = null;

    #[ORM\ManyToOne(inversedBy: 'teamMembers')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['establishment:read', 'user:read'])]
    private ?User $member = null;

    #[ORM\Column(length: 255)]
    #[Groups(["team_member:update", 'establishment:read','user:read'])]
    #[Assert\Choice(choices: ['Pending', 'Approved', 'Declined'], message: 'Invalid status')]
    private ?string $status = 'Pending';

    public function getId(): ?int
    {
        return $this->id;
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

    public function getMember(): ?User
    {
        return $this->member;
    }

    public function setMember(?User $member): static
    {
        $this->member = $member;

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
}
