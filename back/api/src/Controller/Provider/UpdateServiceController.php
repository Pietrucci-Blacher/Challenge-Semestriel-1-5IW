<?php

namespace App\Controller\Provider;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use App\Entity\Service;
use App\Repository\ServiceRepository;

#[AsController]
final class UpdateServiceController extends AbstractController
{
    private ServiceRepository $serviceRepository;

    public function __construct(ServiceRepository $serviceRepository)
    {
        $this->serviceRepository = $serviceRepository;
    }

    public function __invoke(Request $request, $id): Service
    {
        $uploadedFile = $request->files->get('image');

        if ($uploadedFile && !in_array($uploadedFile->getMimeType(), ['image/jpeg', 'image/png'])) {
            throw new BadRequestHttpException('The file must be a jpeg or a png');
        }

        return $request->attributes->get('data');
    }
}
