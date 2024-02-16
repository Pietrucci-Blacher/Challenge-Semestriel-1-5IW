<?php


namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class MediaController extends AbstractController
{
    public function serveMedia(string $filename): Response
    {
        $mediaPath = $this->getParameter('kernel.project_dir') . '/public/media';
        $filePath = realpath($mediaPath . '/' . $filename);

        if (!$filePath || !str_starts_with($filePath, $mediaPath)) {
            throw $this->createNotFoundException('The file does not exist or access denied.');
        }

        if (!file_exists($filePath)) {
            return $this->createNotFoundException('The file does not exist.');
        }

        $response = new BinaryFileResponse($filePath);
        $response->setContentDisposition(
            ResponseHeaderBag::DISPOSITION_INLINE, // Use DISPOSITION_ATTACHMENT to force download
            $filename
        );

        return $response;
    }
}
