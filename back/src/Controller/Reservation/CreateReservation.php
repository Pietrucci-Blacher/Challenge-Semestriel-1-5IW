<?php

namespace src\Controller\Reservation;

use src\Dto\CreateReservationDto;
use src\Entity\Reservation;
use src\Entity\Schedule;
use src\Repository\EstablishmentRepository;
use src\Repository\ReservationRepository;
use src\Repository\ScheduleRepository;
use src\Repository\ServiceRepository;
use src\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;

class CreateReservation extends AbstractController
{
    public function __construct(
        readonly Security                $security,
        readonly EstablishmentRepository $establishmentRepository,
        readonly ServiceRepository       $serviceRepository,
        readonly UserRepository          $userRepository,
        readonly ReservationRepository   $reservationRepository,
        readonly ScheduleRepository      $scheduleRepository,
        readonly EntityManagerInterface  $entityManager
    )
    {
    }

    public function __invoke(CreateReservationDto $createReservationDto)
    {
        $establishment = $this->establishmentRepository->findOneBy(["id" => $createReservationDto->establishment_id]);
        $service = $this->serviceRepository->findOneBy(["id" => $createReservationDto->service_id]);
        $teacher = $this->userRepository->findOneBy(["id" => $createReservationDto->teacher_id]);

        if (!$establishment || !$service || !$teacher) {
            // Return a 404 Not Found response with an error message
            return new Response(
                json_encode(['error' => 'Establishment, service, or teacher not found']),
                Response::HTTP_NOT_FOUND,
                ['Content-Type' => 'application/json']
            );
        }
        if (!in_array('ROLE_TEACHER', $teacher->getRoles())) {
            return new Response(
                json_encode(['error' => 'The selected user is not a teacher']),
                Response::HTTP_BAD_REQUEST,
                ['Content-Type' => 'application/json']
            );
        }


        $startTime = new \DateTime($createReservationDto->startTime);
        $endTime = new \DateTime($createReservationDto->endTime);

        $conflictingSchedules = $this->scheduleRepository->findSchedulesByTeacherAndTimeRange(
            $teacher->getId(),
            $startTime,
            $endTime
        );

        if (count($conflictingSchedules) > 0) {
            return new Response(
                json_encode(['error' => 'The teacher has a scheduling conflict']),
                Response::HTTP_CONFLICT,
                ['Content-Type' => 'application/json']
            );
        }

        $client = $this->security->getUser();

        $schedule = new Schedule();
        $schedule->setEstablishment($establishment)
            ->setStartTime($startTime)
            ->setEndTime($endTime)
            ->setAssignedTo($teacher)
            ->setReason("Prestation pour {$client->getUserIdentifier()}");

        $this->entityManager->persist($schedule);
        $this->entityManager->flush();

        $reservation = new Reservation();
        $reservation->setEstablishment($establishment)
            ->setService($service)
            ->setTeacher($teacher)
            ->setCustomer($this->security->getUser())
            ->setStartTime($startTime)
            ->setEndTime($endTime)
            ->setSpecialRequests($createReservationDto->specialRequests)
            ->setSchedule($schedule);

        $this->entityManager->persist($reservation);
        $this->entityManager->flush();

        return $reservation;
    }
}
