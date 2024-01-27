<?php

namespace App\Tests\Entity;

use App\Entity\User;
use App\State\UserPasswordHasher;
use PHPUnit\Framework\TestCase;

class UserApiTest extends TestCase
{
    private $user;

    protected function setUp(): void
    {
        $this->user = new User();
    }

    public function testGettersAndSetters(): void
    {
        $this->assertNull($this->user->getId());

        $this->user->setFirstname('John');
        $this->assertEquals('John', $this->user->getFirstname());

        // Add similar assertions for other properties and setters

        $this->user->setRoles(['ROLE_USER']);
        $this->assertEquals(['ROLE_USER'], $this->user->getRoles());

        // Add more assertions for other methods as needed
    }


    // Add more tests for specific business logic or custom methods as needed
}
