<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
//use App\Service\Email;
use Exception;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
final class UserPasswordHasher implements ProcessorInterface
{
    public function __construct(private readonly ProcessorInterface $processor, private readonly UserPasswordHasherInterface $passwordHasher)
    {
    }

    /**
     * @throws Exception
     */
    public function process($data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        if (!$data->getPassword()) {
            return $this->processor->process($data, $operation, $uriVariables, $context);
        }
        $hashedPassword = $this->passwordHasher->hashPassword(
            $data,
            $data->getPassword()
        );
        $data->setPassword($hashedPassword);
        $data->eraseCredentials();


//        $email = new Email();
//        $email->sendEmail("maxime.pietrucci@gmail.com", $data->getEmail(), 'Welcome to Resend', 'Welcome to Resend');
        return $this->processor->process($data, $operation, $uriVariables, $context);
    }
}
