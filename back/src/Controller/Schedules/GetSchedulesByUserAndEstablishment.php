<?php

namespace src\Controller\Schedules;

use src\Repository\ScheduleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GetSchedulesByUserAndEstablishment extends AbstractController
{
    public function __construct(protected ScheduleRepository $scheduleRepository)
    {
    }

    public function __invoke(int $establishmentId, int $userId): array
    {
        return $this->scheduleRepository->findBy([
            "assignedTo"=>$userId,
            "establishment"=>$establishmentId
        ]);
    }
}
