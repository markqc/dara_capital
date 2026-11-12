<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Support\Content;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function home(string $locale): Response
    {
        return Inertia::render('site/home', [
            'content' => Content::page('home', $locale),
        ]);
    }

    public function about(string $locale): Response
    {
        return Inertia::render('site/about', [
            'content' => Content::page('about', $locale),
        ]);
    }

    public function services(string $locale): Response
    {
        return Inertia::render('site/services', [
            'content' => Content::page('services', $locale),
            'labels' => [
                'more' => __('site.services.learn_more'),
                'less' => __('site.services.show_less'),
            ],
        ]);
    }

    public function intelligence(string $locale): Response
    {
        return Inertia::render('site/intelligence', [
            'content' => Content::page('intelligence', $locale),
        ]);
    }

    public function contact(string $locale): Response
    {
        return Inertia::render('site/contact', [
            'content' => Content::page('contact', $locale),
            'industries' => config('dara.industries'),
            'fundingRanges' => config('dara.funding_ranges'),
        ]);
    }
}
