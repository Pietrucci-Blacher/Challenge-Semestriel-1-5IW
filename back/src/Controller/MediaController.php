<?php

namespace src\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Annotation\Route;


class MediaController extends AbstractController
{
    public function serveMedia(string $filename): Response
    {
        $mediaPath = $this->getParameter('kernel.project_dir') . '/public/media';
        $filePath = realpath($mediaPath . '/' . $filename);

        // Security check to prevent path traversal attacks
        if (!$filePath || !str_starts_with($filePath, $mediaPath)) {
            throw $this->createNotFoundException('The file does not exist or access denied.');
        }

        if (!file_exists($filePath)) {
            return $this->createNotFoundException('The file does not exist.');
        }

        $response = new BinaryFileResponse($filePath);
        $response->setContentDisposition(
            ResponseHeaderBag::DISPOSITION_INLINE,
            $filename
        );

        return $response;
    }
}