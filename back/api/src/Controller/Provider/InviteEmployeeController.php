<?php

namespace App\Controller\Provider;

use App\Dto\InviteEmployeeDto;
use App\Entity\Employee;
use App\Entity\User;
use App\Repository\EstablishmentRepository;
use App\Repository\EmployeeRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class InviteEmployeeController extends AbstractController
{
    private EstablishmentRepository $establishmentRepository;
    private UserRepository $userRepository;
    private EntityManagerInterface $entityManager;
    private Security $security;
    private AuthorizationCheckerInterface $authorizationChecker;
    private EmployeeRepository $employeeRepository;

    public function __construct(AuthorizationCheckerInterface $authorizationChecker, Security $security, EstablishmentRepository $establishmentRepository, UserRepository $userRepository, EntityManagerInterface $entityManager, EmployeeRepository $employeeRepository)
    {
        $this->establishmentRepository = $establishmentRepository;
        $this->employeeRepository = $employeeRepository;
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
        $this->security = $security;
        $this->authorizationChecker = $authorizationChecker;
    }

    public function __invoke(InviteEmployeeDto $inviteEmployeeDto)
    {
        /** @var User $owner */
        $owner = $this->getUser();

        if (!$owner) {
            return new Response(null, Response::HTTP_FORBIDDEN);
        }

        $email = $inviteEmployeeDto->email;
        $user = $this->userRepository->findOneByEmail($email);
        if (!$user) {
            throw new \Exception("Utilisateur non trouvé, verifier s'il est bien inscrit");
        }
        $establishmentUri = $inviteEmployeeDto->establishment;
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

        $existingEmployee = $this->employeeRepository->findOneByUserAndEstablishment($user->getId(), $establishment->getId());
        if ($existingEmployee) {
            throw new \Exception("Cet utilisateur est déjà membre de l'établissement.");
        }
        $employee = new Employee();
        $employee->setEstablishment($establishment);
        $employee->setEmployee($user);

        $this->entityManager->persist($employee);
        $this->entityManager->flush();
        // TODO:
        // Envoyer un mail à l'utilisateur pour lui informer
        return $employee;
    }
}
