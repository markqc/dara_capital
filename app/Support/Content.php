<?php

namespace App\Support;

use App\Models\Page;

/**
 * Resolves editable page content from the database, falling back to the
 * default locale (English) field-by-field where a translation is missing
 * or left empty.
 */
class Content
{
    public static function page(string $key, string $locale): array
    {
        $page = Page::where('key', $key)->with('translations')->first();

        if (! $page) {
            return [];
        }

        $default = config('dara.default_locale');
        $base = $page->translations->firstWhere('locale', $default)?->data ?? [];

        if ($locale === $default) {
            return $base;
        }

        $override = $page->translations->firstWhere('locale', $locale)?->data ?? [];

        return self::merge($base, $override);
    }

    /**
     * Deep merge: non-empty override values win. Lists merge item-by-item so
     * a partially translated card still shows English for untranslated
     * fields; an entirely untranslated list falls back wholesale.
     */
    private static function merge(array $base, array $override): array
    {
        foreach ($override as $key => $value) {
            if (! self::filled($value)) {
                continue;
            }

            $existing = $base[$key] ?? null;

            if (is_array($value) && is_array($existing)) {
                $base[$key] = array_is_list($value) && array_is_list($existing)
                    ? self::mergeList($existing, $value)
                    : self::merge($existing, $value);
            } else {
                $base[$key] = $value;
            }
        }

        return $base;
    }

    private static function mergeList(array $base, array $override): array
    {
        foreach ($override as $i => $item) {
            $existing = $base[$i] ?? null;

            if (! self::filled($item)) {
                continue;
            }

            $base[$i] = is_array($item) && is_array($existing)
                ? self::merge($existing, $item)
                : $item;
        }

        return $base;
    }

    private static function filled(mixed $value): bool
    {
        return ! ($value === null || $value === '' || $value === []);
    }
}
