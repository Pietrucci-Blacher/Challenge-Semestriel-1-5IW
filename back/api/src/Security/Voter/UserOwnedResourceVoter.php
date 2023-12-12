<?php

namespace App\Security\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class UserOwnedResourceVoter extends Voter
{
    public const VIEW_MY_RESOURCES = 'VIEW_MY_RESOURCES';

    protected function supports(string $attribute, mixed $subject): bool
    {
        return $attribute == self::VIEW_MY_RESOURCES;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();
        if (!$user instanceof UserInterface) {
            return false;
        }
        dd($subject);
        switch ($attribute) {
            case self::VIEW_MY_RESOURCES:
                if($user->getId() == $subject->attributes->get("userId")){
                    return true;
                }
                break;
        }

        return false;
    }
}
