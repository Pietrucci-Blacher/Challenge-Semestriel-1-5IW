<?php

namespace App\Controller\Auth;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\SecurityBundle\Security;
/* use Symfony\Component\HttpKernel\Attribute\AsController; */

/* #[AsController] */
class ActivateController extends AbstractController
{
    private SerializerInterface $serializer;
    private Security $security;

    public function __construct(SerializerInterface $serializer, Security $security) {
        $this->serializer = $serializer;
        $this->security = $security;
    }

    public function __invoke(Request $request): Response
    {
        $activationCode = $request->query->get('activationCode');

        var_dump($activationCode);

        if ($activationCode === null)
            throw new HttpException(400, 'Missing activation code');

        $test = [
            /* 'code' => $activationCode */
            'test' => 'test'
        ];

        $data = $this->serializer->serialize($test, 'json');

        return new Response($data, Response::HTTP_OK, ['Content-Type' => 'application/json']);
    }
}
