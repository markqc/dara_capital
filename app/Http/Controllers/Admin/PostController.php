<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        $default = config('dara.default_locale');

        $posts = Post::with(['translations' => fn ($q) => $q->where('locale', $default)])
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Post $post) => [
                'id' => $post->id,
                'slug' => $post->slug,
                'category' => $post->category,
                'title' => $post->translations->first()?->title,
                'published_at' => $post->published_at?->toDateString(),
                'is_published' => $post->is_published,
            ]);

        return Inertia::render('admin/posts/index', [
            'posts' => $posts,
            'categories' => config('dara.insight_categories'),
        ]);
    }

    public function create(): Response
    {
        return $this->form(new Post);
    }

    public function store(Request $request): RedirectResponse
    {
        $post = new Post;

        return $this->persist($request, $post);
    }

    public function edit(Post $post): Response
    {
        return $this->form($post->load('translations'));
    }

    public function update(Request $request, Post $post): RedirectResponse
    {
        return $this->persist($request, $post);
    }

    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();

        return back()->with('success', true);
    }

    private function form(Post $post): Response
    {
        $locales = config('dara.locales');
        $default = config('dara.default_locale');

        $translations = [];
        foreach ($locales as $locale) {
            $t = $post->translations->firstWhere('locale', $locale);
            $translations[$locale] = [
                'title' => $t?->title,
                'excerpt' => $t?->excerpt,
                'body' => $t?->body,
                'category_label' => $t?->category_label,
            ];
        }

        return Inertia::render('admin/posts/edit', [
            'post' => $post->exists ? [
                'id' => $post->id,
                'slug' => $post->slug,
                'category' => $post->category,
                'artwork' => $post->artwork,
                'published_at' => $post->published_at?->toDateString(),
                'sort_order' => $post->sort_order,
                'is_published' => $post->is_published,
            ] : null,
            'translations' => $translations,
            'locales' => $locales,
            'defaultLocale' => $default,
            'categories' => config('dara.insight_categories'),
            'artworkKeys' => $this->artworkKeys(),
        ]);
    }

    private function persist(Request $request, Post $post): RedirectResponse
    {
        $validated = $request->validate([
            'slug' => [
                'required', 'string', 'max:255', 'alpha_dash',
                Rule::unique('posts', 'slug')->ignore($post->id),
            ],
            'category' => ['required', Rule::in(config('dara.insight_categories'))],
            'artwork' => ['nullable', 'string', 'max:255'],
            'published_at' => ['nullable', 'date'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_published' => ['boolean'],
            'translations' => ['required', 'array'],
            'translations.*.title' => ['nullable', 'string', 'max:255'],
            'translations.*.excerpt' => ['nullable', 'string', 'max:2000'],
            'translations.*.body' => ['nullable', 'string', 'max:20000'],
            'translations.*.category_label' => ['nullable', 'string', 'max:255'],
        ]);

        if (empty($validated['translations'][config('dara.default_locale')]['title'])) {
            return back()->withErrors([
                'translations.'.config('dara.default_locale').'.title' => __('validation.required', ['attribute' => 'English title']),
            ]);
        }

        $post->fill([
            'slug' => $validated['slug'] ?: Str::slug($validated['translations'][config('dara.default_locale')]['title']),
            'category' => $validated['category'],
            'artwork' => $validated['artwork'] ?? null,
            'published_at' => $validated['published_at'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_published' => $validated['is_published'] ?? false,
        ])->save();

        foreach (config('dara.locales') as $locale) {
            $t = $validated['translations'][$locale] ?? [];
            $post->translations()->updateOrCreate(
                ['locale' => $locale],
                [
                    'title' => $t['title'] ?: '',
                    'excerpt' => $t['excerpt'] ?? null,
                    'body' => $t['body'] ?? null,
                    'category_label' => $t['category_label'] ?? null,
                ],
            );
        }

        return back()->with('success', true);
    }

    private function artworkKeys(): array
    {
        return [
            'city-skyline', 'ai-brain', 'fintech-network', 'world-map',
            'globe-market-chart', 'reception-lobby', 'red-architectural-facade', 'earth-hemisphere',
        ];
    }
}
