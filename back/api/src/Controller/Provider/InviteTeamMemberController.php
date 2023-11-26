<?php

namespace App\Controller\Provider;

use App\Dto\InviteTeamMemberDto;
use App\Entity\TeamMember;
use App\Entity\User;
use App\Repository\EstablishmentRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;


class InviteTeamMemberController extends AbstractController
{
    private EstablishmentRepository $establishmentRepository;
    private UserRepository $userRepository;
    private EntityManagerInterface $entityManager;
    private Security $security;
    private AuthorizationCheckerInterface $authorizationChecker;

    public function __construct(AuthorizationCheckerInterface $authorizationChecker, Security $security, EstablishmentRepository $establishmentRepository, UserRepository $userRepository, EntityManagerInterface $entityManager)
    {
        $this->establishmentRepository = $establishmentRepository;
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
        $this->security = $security;
        $this->authorizationChecker = $authorizationChecker;

    }

    public function __invoke(InviteTeamMemberDto $inviteTeamMemberDto)
    {
        /** @var User $owner */
        $owner = $this->getUser();

        if (!$owner) {
            return new Response(null, Response::HTTP_FORBIDDEN);
        }

        $email = $inviteTeamMemberDto->email;
        $user = $this->userRepository->findOneByEmail($email);
        if (!$user) {
            throw new \Exception("Utilisateur non trouvé, verifier s'il est bien inscrit");
        }
        $establishmentUri = $inviteTeamMemberDto->establishment;
        $establishmentId = basename($establishmentUri);
        $establishment = $this->establishmentRepository->find($establishmentId);

        if (!$establishment) {
            throw new \Exception("Établissement non trouvé");
        }

        if($establishment->getOwner()->getId() != $owner->getId()) {
            throw new \Exception("Seuls les propriétaires peuvent ajouter des membres à l\'établissement.");
        }
        $teamMember = new TeamMember();
        $teamMember->setEstablishment($establishment);
        $teamMember->setMember($user);

        $this->entityManager->persist($teamMember);
        $this->entityManager->flush();
        // TODO:
        // Envoyer un mail à l'utilisateur pour lui informer
        return $teamMember;
    }
}
