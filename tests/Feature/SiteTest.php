<?php

use App\Models\Lead;
use App\Models\Page;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\RateLimiter;

beforeEach(fn () => $this->seed());

test('root redirects to the english home', function () {
    $this->get('/')->assertRedirect('/en');
});

test('all six public routes render in english', function () {
    foreach (['', 'about', 'services', 'intelligence', 'insights', 'contact'] as $path) {
        $url = '/en'.($path ? "/{$path}" : '');
        $this->get($url)->assertOk();
    }
});

test('all six public routes render in the second locale', function () {
    foreach (['', 'about', 'services', 'intelligence', 'insights', 'contact'] as $path) {
        $url = '/es'.($path ? "/{$path}" : '');
        $this->get($url)->assertOk();
    }
});

test('unsupported locale returns 404', function () {
    $this->get('/fr')->assertNotFound();
});

test('untranslated fields fall back to english', function () {
    // services has no es translation seeded: heading must be English
    $response = $this->get('/es/services');
    $response->assertOk();
    expect($response->viewData('page')['props']['content']['hero']['heading'])
        ->toBe('Comprehensive Solutions for Capital Success');
});

test('translated fields render in spanish', function () {
    $response = $this->get('/es');
    $props = $response->viewData('page')['props'];
    expect($props['locale'])->toBe('es');
    expect($props['shared']['nav'][0])->toBe('Inicio');
    expect($props['content']['hero']['lines'][1])->toBe('Inteligencia.');
});

test('insights filter accepts only valid categories', function () {
    $this->get('/en/insights?category=market-reports')->assertOk();
    $this->get('/en/insights?category=bogus')->assertOk()
        ->assertViewHas('page', fn ($page) => $page['props']['activeCategory'] === null);
});

test('insight detail renders and unknown slug 404s', function () {
    $this->get('/en/insights/global-investment-outlook-2024')->assertOk();
    $this->get('/en/insights/does-not-exist')->assertNotFound();
});

test('unpublished post is hidden', function () {
    Post::where('slug', 'global-investment-outlook-2024')->update(['is_published' => false]);
    $this->get('/en/insights/global-investment-outlook-2024')->assertNotFound();
});
