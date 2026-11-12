<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Support\Content;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InsightsController extends Controller
{
    public function index(Request $request, string $locale): Response
    {
        $category = $request->query('category');
        $categories = config('dara.insight_categories');

        if ($category !== null && ! in_array($category, $categories, true)) {
            $category = null;
        }

        $default = config('dara.default_locale');

        $posts = Post::query()
            ->where('is_published', true)
            ->when($category, fn ($q) => $q->where('category', $category))
            ->orderBy('sort_order')
            ->with(['translations' => fn ($q) => $q->whereIn('locale', [$locale, $default])])
            ->get()
            ->map(function (Post $post) use ($locale, $default) {
                $t = $post->translations->firstWhere('locale', $locale)
                    ?? $post->translations->firstWhere('locale', $default);

                return [
                    'slug' => $post->slug,
                    'category' => $post->category,
                    'artwork' => $post->artwork,
                    'published_at' => $post->published_at?->toDateString(),
                    'title' => $t?->title,
                    'excerpt' => $t?->excerpt,
                    'category_label' => $t?->category_label,
                ];
            });

        return Inertia::render('site/insights', [
            'content' => Content::page('insights', $locale),
            'posts' => $posts,
            'activeCategory' => $category,
            'emptyLabel' => __('site.insights.empty'),
        ]);
    }

    public function show(string $locale, string $slug): Response
    {
        $default = config('dara.default_locale');

        $post = Post::where('slug', $slug)
            ->where('is_published', true)
            ->with(['translations' => fn ($q) => $q->whereIn('locale', [$locale, $default])])
            ->firstOrFail();

        $t = $post->translations->firstWhere('locale', $locale)
            ?? $post->translations->firstWhere('locale', $default);

        return Inertia::render('site/insight', [
            'content' => Content::page('insights', $locale),
            'backLabel' => __('site.insights.back'),
            'post' => [
                'slug' => $post->slug,
                'category' => $post->category,
                'artwork' => $post->artwork,
                'published_at' => $post->published_at?->toDateString(),
                'title' => $t?->title,
                'excerpt' => $t?->excerpt,
                'body' => $t?->body ?: $t?->excerpt,
                'category_label' => $t?->category_label,
            ],
        ]);
    }
}
