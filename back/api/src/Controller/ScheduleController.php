<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use App\Repository\ScheduleRepository;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ScheduleController extends AbstractController
{
    private SerializerInterface $serializer;
    private Security $security;
    private ScheduleRepository $scheduleRepository;

    public function __construct(
        Security $security,
        SerializerInterface $serializer,
        ScheduleRepository $scheduleRepository
    ) {
        $this->security = $security;
        $this->serializer = $serializer;
        $this->scheduleRepository = $scheduleRepository;
    }

    public function __invoke(Request $request): Response
    {
        $content = $request->getContent();

        if ($content['slot'] === null)
            throw new HttpException(400, 'Missing slot');

        $test = [
            'test' => 'test'
        ];

        $data = $this->serializer->serialize($test, 'json');

        return new Response($data, Response::HTTP_OK, ['Content-Type' => 'application/json']);
    }
}
