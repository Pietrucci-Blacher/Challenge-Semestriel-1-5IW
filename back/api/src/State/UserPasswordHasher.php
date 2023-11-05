<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Service\Email;
use Exception;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\ActivationCode;
use App\Repository\ActivationCodeRepository;

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

        /* $activationRepository = new ActivationCodeRepository(); */
        $activationCode = new ActivationCode();
        $activationCode->setNewUser($data);
        $code = $activationCode->generateCode();
        /* $activationRepository->save($activationCode, true); */

        $content = "Welcome to Resend, please click on the link below to activate your account : <br><br> <a href='http://localhost:3000/activation/$code'>comfirm my account</a>";
        $email = new Email();
        $email->sendEmail("maxime.pietrucci@gmail.com", $data->getEmail(), 'Welcome to Resend', $content);

        return $this->processor->process($data, $operation, $uriVariables, $context);
    }
}
