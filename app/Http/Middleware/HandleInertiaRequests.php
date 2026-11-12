<?php

namespace App\Http\Middleware;

use App\Support\Content;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Route param wins: share() can run before SetLocale for this request.
        $locale = $request->route('locale') ?? app()->getLocale();

        if (! in_array($locale, config('dara.locales'), true)) {
            $locale = config('dara.default_locale');
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'locale' => $locale,
            'locales' => config('dara.locales'),
            'shared' => Content::page('shared', $locale),
            'flash' => [
                'success' => $request->session()->get('success'),
            ],
            // Uploaded replacements for the provisional artwork registry.
            'artworkOverrides' => \App\Models\Artwork::whereNotNull('path')
                ->get()
                ->mapWithKeys(fn ($a) => [$a->key => ['src' => $a->url(), 'alt' => $a->alt ?? '']]),
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
