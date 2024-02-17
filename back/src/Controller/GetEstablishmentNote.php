<?php

namespace src\Controller;

use src\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Serializer\SerializerInterface;
use src\Repository\FeedbackRepository;

#[AsController]
class GetEstablishmentNote extends AbstractController
{
    private FeedbackRepository $feedbackRepository;
    private SerializerInterface $serializer;

    public function __construct(
        FeedbackRepository $feedbackRepository,
        SerializerInterface $serializer)
    {
        $this->feedbackRepository = $feedbackRepository;
        $this->serializer = $serializer;
    }

    public function __invoke(string $id): Response
    {
        if (!$id)
            return new Response(null, Response::HTTP_BAD_REQUEST);

        $feedbacks = $this->feedbackRepository->findByEstablishmentId($id);

        if (!$feedbacks)
            return new Response(null, Response::HTTP_NOT_FOUND);

        $detailedNote = [ 'note' => 0 ];

        foreach ($feedbacks as $feedback) {
            $detailedNote['note'] += $feedback->getNote();
            $details = $feedback->getDetailedNote();

            foreach ($details as $key => $value) {
                if (!isset($detailedNote[$key]))
                    $detailedNote[$key] = 0;
                $detailedNote[$key] += $value;
            }
        }

        foreach ($detailedNote as $key => $value)
            $detailedNote[$key] = round($value / count($feedbacks), 2);

        $data = $this->serializer->serialize($detailedNote, 'json');

        return new Response($data, Response::HTTP_OK, ['Content-Type' => 'application/json']);
    }
}
