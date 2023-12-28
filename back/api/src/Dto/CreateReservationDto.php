<?php

namespace App\Dto;

class CreateReservationDto
{
    public $establishment_id;
    public $teacher_id;
    public $service_id;
    public $startTime;
    public $endTime;
    public $specialRequests = null;

}
