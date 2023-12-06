<?php

namespace App\Serializer;

use ReflectionClass;
use ReflectionException;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use App\Attributes\UserField;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class InjectUserInfoDenormalizer implements DenormalizerInterface
{

    public function __construct(
        protected Security $security,
        protected ObjectNormalizer $normalizer
    ) {}

    /**
     * @throws ReflectionException
     */
    public function denormalize($data, $type, $format = null, array $context = [])
    {
        $isUpdateOperation = isset($context['object_to_populate']);
        $object = $this->normalizer->denormalize($data, $type, $format, $context);
        if (!$isUpdateOperation){
            $user = $this->security->getUser();
            $reflectionClass = new ReflectionClass($type);
            foreach ($reflectionClass->getProperties() as $property) {
                if (!empty($property->getAttributes(UserField::class)) && $user) {
                    $property->setAccessible(true);
                    $property->setValue($object, $user);
                }
            }
        }
        return $object;
    }


    /**
     * @throws ReflectionException
     */
    public function supportsDenormalization($data, $type, $format = null): bool
    {
        $reflectionClass = new ReflectionClass($type);
        foreach ($reflectionClass->getProperties() as $property) {
            if (!empty($property->getAttributes(UserField::class))) {
                return true;
            }
        }
        return false;
    }

}
