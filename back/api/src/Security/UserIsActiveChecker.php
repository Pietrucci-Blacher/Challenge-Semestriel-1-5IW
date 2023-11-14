<?php

namespace App\Security;

use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;

class UserIsActiveChecker implements UserCheckerInterface
{
    public function checkPreAuth(UserInterface $user)
    {
        if (!$user->getIsActive()) {
//            throw new CustomUserMessageAuthenticationException('Your account is not active.');
        }
    }

    public function checkPostAuth(UserInterface $user)
    {

    }
}
