<?php

use App\Models\Page;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

beforeEach(fn () => $this->seed());

function admin(): User
{
    return User::where('is_admin', true)->firstOrFail();
}

test('guests are redirected to login from admin routes', function () {
    $this->get('/console')->assertRedirect();
    $this->get('/console/pages')->assertRedirect();
    $this->get('/console/leads')->assertRedirect();
});

test('non-admin users get 403 on admin routes', function () {
    $user = User::factory()->create(['is_admin' => false]);
    $this->actingAs($user)->get('/console')->assertForbidden();
    $this->actingAs($user)->get('/console/pages')->assertForbidden();
    $this->actingAs($user)->get('/console/leads')->assertForbidden();
});

test('admin can reach the dashboard, pages, posts and inbox', function () {
    $this->actingAs(admin())
        ->get('/console')->assertOk();
    $this->actingAs(admin())
        ->get('/console/pages')->assertOk();
    $this->actingAs(admin())
        ->get('/console/posts')->assertOk();
    $this->actingAs(admin())
        ->get('/console/leads')->assertOk();
});

test('open registration is disabled', function () {
    $this->get('/register')->assertNotFound();
});

test('editing one locale does not touch the other', function () {
    $this->actingAs(admin())->put('/console/pages/home/es', [
        'fields' => [
            'hero.eyebrow' => 'Estrategia. Capital. Inteligencia.',
            'hero.lines.0' => 'Capital.',
            'hero.lines.1' => 'Inteligencia.',
            'hero.lines.2' => 'Oportunidad.',
        ],
    ])->assertRedirect()->assertSessionHasNoErrors();

    $en = Page::where('key', 'home')->first()->translations->firstWhere('locale', 'en')->data;
    $es = Page::where('key', 'home')->first()->translations->firstWhere('locale', 'es')->data;

    expect($en['hero']['eyebrow'])->toBe('Intelligence. Strategy. Capital.');
    expect($es['hero']['eyebrow'])->toBe('Estrategia. Capital. Inteligencia.');
});

test('unexpected field paths are ignored on save', function () {
    $this->actingAs(admin())->put('/console/pages/home/en', [
        'fields' => [
            'hero.eyebrow' => 'Injected fine',
            '__proto__.hack' => 'nope',
            'not_a_field' => 'nope',
        ],
    ])->assertSessionHasNoErrors();

    $data = Page::where('key', 'home')->first()->translations->firstWhere('locale', 'en')->data;
    expect($data['hero']['eyebrow'])->toBe('Injected fine');
    expect($data)->not->toHaveKey('__proto__');
    expect($data)->not->toHaveKey('not_a_field');
});

test('admin can create, update and delete a post', function () {
    $user = admin();

    $this->actingAs($user)->post('/console/posts', [
        'slug' => 'test-article',
        'category' => 'news',
        'artwork' => 'world-map',
        'published_at' => '2024-06-01',
        'is_published' => true,
        'translations' => [
            'en' => ['title' => 'Test Article', 'excerpt' => 'Excerpt', 'body' => 'Body'],
            'es' => ['title' => 'Artículo de Prueba'],
        ],
    ])->assertSessionHasNoErrors();

    $post = Post::where('slug', 'test-article')->first();
    expect($post)->not->toBeNull();
    expect($post->translations->firstWhere('locale', 'es')->title)->toBe('Artículo de Prueba');

    $this->actingAs($user)->put("/console/posts/{$post->id}", [
        'slug' => 'test-article',
        'category' => 'news',
        'is_published' => false,
        'translations' => ['en' => ['title' => 'Renamed'], 'es' => []],
    ])->assertSessionHasNoErrors();

    expect($post->fresh()->is_published)->toBeFalse();

    $this->actingAs($user)->delete("/console/posts/{$post->id}")
        ->assertRedirect();
    expect(Post::where('slug', 'test-article')->exists())->toBeFalse();
});

test('artwork upload validates file type and stores on the public disk', function () {
    Storage::fake('public');
    $user = admin();

    $this->actingAs($user)->post('/console/artwork/globe-market-chart', [
        'alt' => 'Custom globe',
        'image' => \Illuminate\Http\UploadedFile::fake()->create('doc.pdf', 10, 'application/pdf'),
    ])->assertSessionHasErrors('image');

    $this->actingAs($user)->post('/console/artwork/globe-market-chart', [
        'alt' => 'Custom globe',
        'image' => \Illuminate\Http\UploadedFile::fake()->image('globe.png', 800, 600),
    ])->assertSessionHasNoErrors();

    $artwork = \App\Models\Artwork::where('key', 'globe-market-chart')->first();
    expect($artwork->alt)->toBe('Custom globe');
    Storage::disk('public')->assertExists($artwork->path);
});

test('artwork routes reject non-admins', function () {
    $user = User::factory()->create(['is_admin' => false]);
    $this->actingAs($user)->get('/console/artwork')->assertForbidden();
});

test('english title is required for a post', function () {
    $this->actingAs(admin())->post('/console/posts', [
        'slug' => 'missing-title',
        'category' => 'news',
        'translations' => ['en' => [], 'es' => []],
    ])->assertSessionHasErrors();
    expect(Post::where('slug', 'missing-title')->exists())->toBeFalse();
});
