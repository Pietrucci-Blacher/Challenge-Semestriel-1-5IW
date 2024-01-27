<?php


namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Yaml\Yaml;

#[AsController]
class TranslationController extends AbstractController
{
    public function getTranslations($language): JsonResponse
    {
        $path = "../config/translations/translations_$language.yaml";
        print_r($path);
        if (!file_exists($path)) {
            return new JsonResponse(['error' => 'Language file not found'], 404);
        }

        $translations = Yaml::parse(file_get_contents($path));
        return new JsonResponse($translations);
    }
}
