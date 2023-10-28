<?php

namespace App\Controller\Auth;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;


#[AsController]
class MeController  extends AbstractController
{


    public function __invoke()
    {
        /** @var User $user */
        $user = $this->getUser();

        return $user;
    }
}
