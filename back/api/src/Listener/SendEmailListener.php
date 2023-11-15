<?php

namespace App\Listener;

use App\Repository\UserRepository;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use App\Event\UserCreatedEvent;
use App\Service\Email;

#[AsEventListener]
final class SendEmailListener
{
    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function __invoke(UserCreatedEvent $event): void
    {
        $user = $this->userRepository->find($event->getUserId());

        $code = $user->generateCode();
        $this->userRepository->save($user);
        $content = "Welcome to Resend, please click on the link below to activate your account : <br><br> <a href='https://localhost/activate/$code'>comfirm my account</a>";

        $email = new Email();
        $email->sendEmail("maxime.pietrucci@gmail.com", $user->getEmail(), 'Welcome to Resend', $content);
    }
}
