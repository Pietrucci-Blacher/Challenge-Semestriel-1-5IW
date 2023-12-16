<?php

namespace App\Dto\Teacher;

use DateTimeImmutable;

class AddScheduleDto
{
    private  $startTime;
    private  $endTime;
    public  $reason = "Not provided";

    public function __construct( $startTime,  $endTime, $reason = "Not provided")
    {
        $this->startTime = $startTime;
        $this->endTime = $endTime;
        $this->reason = $reason;
    }


    public function getStartTime()
    {
        return new DateTimeImmutable($this->startTime);
    }

    public function getEndTime()
    {
        return new DateTimeImmutable($this->endTime);
    }




}
