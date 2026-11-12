<?php

namespace App\Http\Controllers\Admin;

use App\Content\PageSchema;
use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class PageContentController extends Controller
{
    public function index(): Response
    {
        $pages = Page::with('translations')->orderBy('key')->get()->map(fn (Page $page) => [
            'key' => $page->key,
            'locales' => $page->translations->pluck('locale'),
            'updated_at' => $page->translations->max('updated_at'),
        ]);

        return Inertia::render('admin/pages/index', [
            'pages' => $pages,
            'locales' => config('dara.locales'),
        ]);
    }

    public function edit(string $key, string $locale): Response
    {
        abort_unless(in_array($locale, config('dara.locales'), true), 404);
        abort_unless(in_array($key, PageSchema::pages(), true), 404);

        $page = Page::where('key', $key)->with('translations')->firstOrFail();
        $default = config('dara.default_locale');

        return Inertia::render('admin/pages/edit', [
            'pageKey' => $key,
            'locale' => $locale,
            'locales' => config('dara.locales'),
            'defaultLocale' => $default,
            'schema' => PageSchema::fields($key),
            // English values shown as reference beneath each field.
            'reference' => $page->translations->firstWhere('locale', $default)?->data ?? [],
            'data' => $page->translations->firstWhere('locale', $locale)?->data ?? [],
        ]);
    }

    public function update(Request $request, string $key, string $locale): RedirectResponse
    {
        abort_unless(in_array($locale, config('dara.locales'), true), 404);
        abort_unless(in_array($key, PageSchema::pages(), true), 404);

        $validated = $request->validate([
            'fields' => ['required', 'array'],
            'fields.*' => ['nullable', 'string', 'max:20000'],
        ]);

        $data = [];
        foreach ($validated['fields'] as $path => $value) {
            // Guard against unexpected keys: only accept paths matching the schema.
            if (! $this->pathAllowed($key, $path)) {
                continue;
            }
            Arr::set($data, $path, $value === '' ? null : $value);
        }

        $data = $this->listsFromNumericKeys($data);

        $page = Page::firstOrCreate(['key' => $key]);
        $page->translations()->updateOrCreate(
            ['locale' => $locale],
            ['data' => $data],
        );

        return back()->with('success', true);
    }

    private function listsFromNumericKeys(array $data): array
    {
        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $data[$key] = $this->listsFromNumericKeys($value);
            }
        }

        return array_is_list($data) ? array_values($data) : $data;
    }

    private function pathAllowed(string $page, string $path): bool
    {
        foreach (PageSchema::fields($page) as $field) {
            if ($this->fieldAllows($field, $path)) {
                return true;
            }
        }

        return false;
    }

    private function fieldAllows(array $field, string $path): bool
    {
        $key = $field['key'];

        if ($field['type'] !== 'list') {
            return $path === $key;
        }

        if (preg_match('/^'.preg_quote($key, '/').'\.(\d+)$/', $path, $m)) {
            return isset($field['count']) ? (int) $m[1] < $field['count'] : true;
        }

        if (($field['of'] ?? null) === 'group'
            && preg_match('/^'.preg_quote($key, '/').'\.(\d+)\.(.+)$/', $path, $m)) {
            $indexOk = isset($field['count']) ? (int) $m[1] < $field['count'] : true;

            return $indexOk && in_array($m[2], array_column($field['fields'] ?? [], 'key'), true);
        }

        return false;
    }
}
