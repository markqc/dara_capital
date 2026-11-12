import { usePage } from '@inertiajs/react';

export type Metric = { value: string; label: string };
export type TextCard = { title: string; body: string; details?: string };
export type Category = { key: string; label: string };

export interface SharedContent {
    nav?: string[];
    cta?: string;
    footer?: {
        tagline?: string;
        company_title?: string;
        company_links?: string[];
        services_title?: string;
        services_links?: string[];
        resources_title?: string;
        resources_links?: string[];
        contact_title?: string;
        email?: string;
        phone?: string;
        office?: string;
        copyright?: string;
        legal?: string[];
    };
}

/**
 * Public-route paths in mockup order. Labels come from CMS content;
 * paths stay fixed so links remain stable across locales.
 */
export const NAV_PATHS = [
    '',
    'about',
    'services',
    'intelligence',
    'insights',
    'contact',
] as const;

export function useSite() {
    const { locale, locales, shared } = usePage().props as {
        locale: string;
        locales: string[];
        shared: SharedContent;
    };

    const url = (path: string = '') => `/${locale}${path ? `/${path}` : ''}`;

    return { locale, locales, shared, url };
}

export function localizedUrl(locale: string, path: string = '') {
    return `/${locale}${path ? `/${path}` : ''}`;
}
