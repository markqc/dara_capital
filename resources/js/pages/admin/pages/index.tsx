import { Head, Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import Heading from '@/components/heading';

interface PageRow {
    key: string;
    locales: string[];
    updated_at: string | null;
}

const PAGE_NAMES: Record<string, string> = {
    shared: 'Shared (nav & footer)',
    home: 'Home',
    about: 'About',
    services: 'Services',
    intelligence: 'Intelligence',
    insights: 'Insights',
    contact: 'Contact',
};

export default function PagesIndex({
    pages,
    locales,
}: {
    pages: PageRow[];
    locales: string[];
}) {
    const ordered = Object.keys(PAGE_NAMES)
        .map((key) => pages.find((p) => p.key === key))
        .filter((p): p is PageRow => !!p);

    return (
        <>
            <Head title="Pages" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <Heading
                    title="Page content"
                    description="Edit copy per page and language. Untranslated fields fall back to English."
                />

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-sidebar-border/70 dark:border-sidebar-border">
                                <th className="px-4 py-3 font-medium">Page</th>
                                {locales.map((l) => (
                                    <th
                                        key={l}
                                        className="px-4 py-3 font-medium uppercase"
                                    >
                                        {l}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {ordered.map((page) => (
                                <tr
                                    key={page.key}
                                    className="border-b border-sidebar-border/70 last:border-0 dark:border-sidebar-border"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {PAGE_NAMES[page.key] ?? page.key}
                                    </td>
                                    {locales.map((l) => (
                                        <td key={l} className="px-4 py-3">
                                            <Link
                                                href={`/console/pages/${page.key}/${l}`}
                                                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                                            >
                                                <Pencil className="size-3.5" />
                                                Edit
                                                {!page.locales.includes(l) && (
                                                    <span className="ml-1 rounded bg-muted px-1.5 py-0.5 text-[0.65rem]">
                                                        fallback
                                                    </span>
                                                )}
                                            </Link>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

PagesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/console' },
        { title: 'Pages', href: '/console/pages' },
    ],
};
