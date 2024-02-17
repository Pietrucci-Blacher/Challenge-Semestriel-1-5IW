<?php

namespace src\Story;

use Zenstruck\Foundry\Story;
use src\Factory\UserFactory;

final class DefaultUsersStory extends Story
{
    public function build(): void
    {
        UserFactory::createMany(10);
    }
}
