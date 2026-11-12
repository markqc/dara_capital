<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_application_redirects_root_to_the_default_locale()
    {
        $response = $this->get(route('home'));

        $response->assertRedirect('/en');
    }
}
