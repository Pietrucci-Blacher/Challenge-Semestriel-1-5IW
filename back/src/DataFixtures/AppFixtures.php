<?php

namespace src\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Story\DefaultUserStory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        DefaultUserStory::load();
    }
}
