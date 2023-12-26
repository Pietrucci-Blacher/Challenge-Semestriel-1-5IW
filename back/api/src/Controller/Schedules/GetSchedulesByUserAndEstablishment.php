<?php

namespace App\Controller\Schedules;

use App\Repository\ScheduleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GetSchedulesByUserAndEstablishment extends AbstractController
{
    public function __construct(protected ScheduleRepository $scheduleRepository)
    {
    }

    public function __invoke(int $establishmentId, int $userId): array
    {
        return $this->scheduleRepository->findBy([
            "teacher"=>$userId,
            "establishment"=>$establishmentId
        ]);
    }
}
