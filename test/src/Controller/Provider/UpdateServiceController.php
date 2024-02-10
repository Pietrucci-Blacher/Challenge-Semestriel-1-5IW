<?php

namespace App\Controller\Provider;

use App\Entity\MediaObject;
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

        $service = $this->serviceRepository->find($id);
        if (!$service) {
            throw new BadRequestHttpException('Service not found');
        }

        if ($uploadedFile) {
            $service->file = $uploadedFile;
            $this->serviceRepository->save($service);
        }

        return $service;
    }
}
