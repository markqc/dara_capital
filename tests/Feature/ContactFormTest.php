<?php

use App\Models\Lead;
use Illuminate\Support\Facades\RateLimiter;

beforeEach(fn () => $this->seed());

test('valid submission stores a lead and flashes success', function () {
    $response = $this->post('/en/contact', [
        'name' => 'Ada Founder',
        'email' => 'ada@example.com',
        'company' => 'AdaCo',
        'industry' => 'technology',
        'funding_range' => '1m-5m',
        'message' => 'Looking for Series A advisory.',
    ]);

    $response->assertRedirect()->assertSessionHasNoErrors();
    expect(Lead::count())->toBe(1);
    expect(Lead::first()->email)->toBe('ada@example.com');
});

test('invalid submission creates no record and preserves errors', function () {
    $response = $this->post('/en/contact', [
        'name' => '',
        'email' => 'not-an-email',
        'message' => '',
    ]);

    $response->assertRedirect()->assertSessionHasErrors(['name', 'email', 'message']);
    expect(Lead::count())->toBe(0);
});

test('submissions are rate limited', function () {
    RateLimiter::hit('lead:127.0.0.1', 300);
    RateLimiter::hit('lead:127.0.0.1', 300);
    RateLimiter::hit('lead:127.0.0.1', 300);
    RateLimiter::hit('lead:127.0.0.1', 300);
    RateLimiter::hit('lead:127.0.0.1', 300);

    $response = $this->post('/en/contact', [
        'name' => 'Spammy',
        'email' => 'spam@example.com',
        'message' => 'Sixth attempt.',
    ]);

    $response->assertSessionHasErrors('message');
    expect(Lead::count())->toBe(0);
});
