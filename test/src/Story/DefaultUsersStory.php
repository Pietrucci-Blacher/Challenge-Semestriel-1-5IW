<?php

namespace App\Story;

use Zenstruck\Foundry\Story;
use App\Factory\UserFactory;

final class DefaultUsersStory extends Story
{
    public function build(): void
    {
        UserFactory::createMany(10);
    }
}
