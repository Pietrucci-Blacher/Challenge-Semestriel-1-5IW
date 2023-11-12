<?php

namespace App\Serializer;

use ReflectionClass;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Security\Core\Security;
use App\Attributes\UserField;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class InjectUserInfoDenormalizer implements DenormalizerInterface
{

    public function __construct(
        protected Security $security,
        protected ObjectNormalizer $normalizer
    ) {}

    public function denormalize($data, $type, $format = null, array $context = [])
    {
        $isUpdateOperation = isset($context['object_to_populate']);
        $object = $this->normalizer->denormalize($data, $type, $format, $context);
        if (!$isUpdateOperation){
            $user = $this->security->getUser();

            // Parcourir les propriétés de l'objet
            $reflectionClass = new ReflectionClass($type);
            foreach ($reflectionClass->getProperties() as $property) {
                $attributes = $property->getAttributes(UserField::class);

                // Si la propriété a l'attribut UserField et que l'utilisateur est présent
                if (!empty($attributes) && $user) {
                    $property->setAccessible(true);
                    $property->setValue($object, $user);
                }
            }
        }
        return $object;
    }


    public function supportsDenormalization($data, $type, $format = null): bool
    {
        return true;

    }
}
