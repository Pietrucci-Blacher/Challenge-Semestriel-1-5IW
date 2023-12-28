<?php

namespace App\Entity;

use ApiPlatform\Metadata\Link;
use App\Repository\UserRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\State\UserPasswordHasher;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Controller\Auth\MeController;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ['groups' => ['user:read']],
            security: 'is_granted("ROLE_ADMIN") or (is_granted("ROLE_USER") and object == user)',
            securityMessage: 'Vous ne pouvez voir votre propre profil.'
        ),
        new GetCollection(
            uriTemplate: '/auth/me',
            controller: MeController::class,
            security: 'is_granted("IS_AUTHENTICATED_FULLY")',
            name: 'auth_me',
        ),
        new GetCollection(
            security: 'is_granted("ROLE_USER")',
        ),
        new Post(
            uriTemplate: '/auth/register',
            processor: UserPasswordHasher::class),
        new Put(
            security: 'is_granted("ROLE_USER") and object == user',
            securityMessage: 'Vous ne pouvez mettre à jour que votre propre profil.',
            processor: UserPasswordHasher::class
        ),
        new Patch(
            security: 'is_granted("ROLE_USER") and object == user',
            securityMessage: 'Vous ne pouvez mettre à jour que votre propre profil.',
            processor: UserPasswordHasher::class
        )
    ]
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read', 'auth:me','team_invitation:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['user:read', 'user:write', 'auth:me', 'provider_request:read', 'establishment:read', 'schedule:read', 'team_invitation:read'])]
    private ?string $firstname = null;

    #[ORM\Column(length: 50)]
    #[Groups(['user:read', 'user:write', 'auth:me', 'provider_request:read', 'establishment:read', 'schedule:read', 'team_invitation:read'])]
    private ?string $lastname = null;

    #[Assert\NotBlank]
    #[Assert\Email]
    #[ORM\Column(length: 100, unique: true)]
    #[Groups(['user:read', 'user:write', 'auth:me', 'provider_request:read', 'team_invitation:read'])]
    private ?string $email = null;

    #[ORM\Column(type: 'json')]
    #[Groups(['user:read', 'auth:me'])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[Assert\NotBlank(groups: ['user:create'])]
    #[Groups(['user:create', 'user:update'])]
    private ?string $plainPassword = null;

    #[ORM\Column]
    private ?bool $is_active = false;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    #[Groups('user:read')]
    private ?\DateTimeInterface $birthdate = null;

    #[ORM\Column]
    #[Groups('user:read')]
    private ?DateTimeImmutable $createdAt = null;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Groups('user:read')]
    private ?DateTimeImmutable $updatedAt = null;


    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Comment::class, orphanRemoval: true)]
//    #[Groups('user:read')]
    private Collection $comments;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Establishment::class, orphanRemoval: true)]
    private Collection $establishments;

    #[ORM\OneToMany(mappedBy: 'member', targetEntity: TeamInvitation::class, orphanRemoval: true)]
    private Collection $teamInvitations;

    #[ORM\OneToMany(mappedBy: 'assignedTo', targetEntity: Schedule::class, orphanRemoval: true)]
    private Collection $schedules;

    #[ORM\OneToMany(mappedBy: 'user_id', targetEntity: Feedback::class, orphanRemoval: true)]
    private Collection $feedback;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->createdAt = new DateTimeImmutable();
        $this->birthdate = new DateTimeImmutable();
        $this->establishments = new ArrayCollection();
        $this->teamInvitations = new ArrayCollection();
        $this->schedules = new ArrayCollection();
        $this->feedback = new ArrayCollection();
    }

    #[ORM\PrePersist]
    public function onPrePersist(): void {
        $this->createdAt = new DateTimeImmutable();
    }

    #[ORM\PreUpdate]
    public function onPreUpdate(PreUpdateEventArgs $event): void {
        $this->updatedAt = new DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }
    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    public function getBirthdate(): ?\DateTimeInterface
    {
        return $this->birthdate;
    }

    public function setBirthdate(?\DateTimeInterface $birthdate): static
    {
        $this->birthdate = $birthdate;

        return $this;
    }

    public function getCreatedAt(): ?DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): static
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setAuthor($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getAuthor() === $this) {
                $comment->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }


    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
         $this->plainPassword = null;
    }

    public function getIsActive(): ?bool
    {
        return $this->is_active;
    }

    public function setIsActive(bool $is_active): static
    {
        $this->is_active = $is_active;

        return $this;
    }

    /**
     * @return Collection<int, Establishment>
     */
    public function getEstablishments(): Collection
    {
        return $this->establishments;
    }

    public function addEstablishment(Establishment $establishment): static
    {
        if (!$this->establishments->contains($establishment)) {
            $this->establishments->add($establishment);
            $establishment->setOwner($this);
        }

        return $this;
    }

    public function removeEstablishment(Establishment $establishment): static
    {
        if ($this->establishments->removeElement($establishment)) {
            // set the owning side to null (unless already changed)
            if ($establishment->getOwner() === $this) {
                $establishment->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, TeamInvitation>
     */
    public function getTeamInvitations(): Collection
    {
        return $this->teamInvitations;
    }

    public function addTeamInvitation(TeamInvitation $teamInvitation): static
    {
        if (!$this->teamInvitations->contains($teamInvitation)) {
            $this->teamInvitations->add($teamInvitation);
            $teamInvitation->setMember($this);
        }

        return $this;
    }

    public function removeTeamInvitation(TeamInvitation $teamInvitation): static
    {
        if ($this->teamInvitations->removeElement($teamInvitation)) {
            // set the owning side to null (unless already changed)
            if ($teamInvitation->getMember() === $this) {
                $teamInvitation->setMember(null);
            }
        }

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
            $schedule->setAssigned($this);
        }

        return $this;
    }

    public function removeSchedule(Schedule $schedule): static
    {
        if ($this->schedules->removeElement($schedule)) {
            // set the owning side to null (unless already changed)
            if ($schedule->getAssigned() === $this) {
                $schedule->setAssigned(null);
            }
        }
        return $this;
    }

    /**
     * @return Collection<int, Feedback>
     */
    public function getFeedback(): Collection
    {
        return $this->feedback;
    }

    public function addFeedback(Feedback $feedback): static
    {
        if (!$this->feedback->contains($feedback)) {
            $this->feedback->add($feedback);
            $feedback->setUserId($this);
        }

        return $this;
    }

    public function removeFeedback(Feedback $feedback): static
    {
        if ($this->feedback->removeElement($feedback)) {
            // set the owning side to null (unless already changed)
            if ($feedback->getUserId() === $this) {
                $feedback->setUserId(null);
            }
        }

        return $this;
    }
}
