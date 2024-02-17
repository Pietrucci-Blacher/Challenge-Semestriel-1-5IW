<?php

namespace App\Controller\Provider;

use App\Dto\InviteTeamInvitationDto;
use App\Entity\TeamInvitation;
use App\Entity\User;
use App\Repository\EstablishmentRepository;
use App\Repository\TeamInvitationRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use App\Service\Email;

class InviteTeamInvitationController extends AbstractController
{
    private EstablishmentRepository $establishmentRepository;
    private UserRepository $userRepository;
    private EntityManagerInterface $entityManager;
    private Security $security;
    private AuthorizationCheckerInterface $authorizationChecker;
    private TeamInvitationRepository $teamInvitationRepository;
    private Email $email;

    public function __construct(
        AuthorizationCheckerInterface $authorizationChecker,
        Security $security,
        EstablishmentRepository $establishmentRepository,
        UserRepository $userRepository,
        EntityManagerInterface $entityManager,
        TeamInvitationRepository $teamInvitationRepository
    ) {
        $this->establishmentRepository = $establishmentRepository;
        $this->teamInvitationRepository = $teamInvitationRepository;
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
        $this->security = $security;
        $this->authorizationChecker = $authorizationChecker;
        $this->email = new Email();
    }

    public function __invoke(InviteTeamInvitationDto $inviteTeamInvitationDto)
    {
        /** @var User $owner */
        $owner = $this->getUser();

        if (!$owner) {
            return new Response(null, Response::HTTP_FORBIDDEN);
        }

        $email = $inviteTeamInvitationDto->email;
        $user = $this->userRepository->findOneByEmail($email);
        if (!$user) {
            throw new \Exception("Utilisateur non trouvé, verifier s'il est bien inscrit");
        }
        $establishmentUri = $inviteTeamInvitationDto->establishment;
        $establishmentId = basename($establishmentUri);
        $establishment = $this->establishmentRepository->find($establishmentId);

        if (!$establishment) {
            throw new \Exception("Établissement non trouvé");
        }
        if ($owner->getEmail() === $user->getEmail()) {
            throw new \Exception("Action impossible");
        }

        if($establishment->getOwner()->getId() != $owner->getId()) {
            throw new \Exception("Seuls les propriétaires peuvent ajouter des membres à l\'établissement.");
        }

        $existingTeamInvitation = $this->teamInvitationRepository->findOneByUserAndEstablishment($user->getId(), $establishment->getId());
        if ($existingTeamInvitation) {
            throw new \Exception("Cet utilisateur est déjà membre de l'établissement.");
        }
        $teamInvitation = new TeamInvitation();
        $teamInvitation->setEstablishment($establishment);
        $teamInvitation->setMember($user);

        $this->entityManager->persist($teamInvitation);
        $this->entityManager->flush();

        $this->email->sendTeamInvitation($email, $user->getFirstname());
        return $teamInvitation;
    }
}
