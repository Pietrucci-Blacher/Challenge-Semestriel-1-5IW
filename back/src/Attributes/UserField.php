<?php

namespace App\Attributes;

#[\Attribute]
class UserField
{
    public function __construct(public string $fieldName)
    {
    }
}
