import { Link, usePage } from '@inertiajs/react';
import { Globe } from 'lucide-react';
import { localizedUrl, useSite } from '@/lib/site';

const LOCALE_NAMES: Record<string, string> = { en: 'EN', es: 'ES' };

/**
 * Locale switch that preserves the current path (and query string, so an
 * active Insights category filter carries over).
 */
export function LocaleSwitcher() {
    const { locale, locales } = useSite();
    const { url: currentUrl } = usePage();

    if (locales.length < 2) {
        return null;
    }

    const path = currentUrl.replace(new RegExp(`^/${locale}`), '');

    return (
        <div
            className="flex items-center gap-1"
            role="group"
            aria-label="Language"
        >
            <Globe className="size-3.5 text-fog" aria-hidden />
            {locales.map((l) =>
                l === locale ? (
                    <span
                        key={l}
                        className="px-1 text-xs font-bold tracking-wider text-crimson"
                        aria-current="true"
                    >
                        {LOCALE_NAMES[l] ?? l.toUpperCase()}
                    </span>
                ) : (
                    <Link
                        key={l}
                        href={localizedUrl(l, path)}
                        className="px-1 text-xs font-bold tracking-wider text-fog transition-colors hover:text-ivory focus-visible:outline-2 focus-visible:outline-crimson"
                        hrefLang={l}
                    >
                        {LOCALE_NAMES[l] ?? l.toUpperCase()}
                    </Link>
                ),
            )}
        </div>
    );
}
