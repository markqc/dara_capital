import { Head, Link } from '@inertiajs/react';
import { FileText, Inbox, Newspaper } from 'lucide-react';
import Heading from '@/components/heading';

interface Lead {
    id: number;
    name: string;
    email: string;
    company: string | null;
    created_at: string;
}

export default function AdminDashboard({
    stats,
    recentLeads,
}: {
    stats: { pages: number; posts: number; leads: number };
    recentLeads: Lead[];
}) {
    const cards = [
        {
            title: 'Pages',
            value: stats.pages,
            href: '/console/pages',
            icon: FileText,
        },
        {
            title: 'Insights',
            value: stats.posts,
            href: '/console/posts',
            icon: Newspaper,
        },
        {
            title: 'Leads',
            value: stats.leads,
            href: '/console/leads',
            icon: Inbox,
        },
    ];

    return (
        <>
            <Head title="Editor dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <Heading
                    title="Editor dashboard"
                    description="Update site copy, manage Insights posts, and review consultation requests"
                />

                <div className="grid gap-4 sm:grid-cols-3">
                    {cards.map((card) => (
                        <Link
                            key={card.title}
                            href={card.href}
                            className="flex items-center gap-4 rounded-xl border border-sidebar-border/70 p-5 transition-colors hover:border-foreground/30 dark:border-sidebar-border"
                        >
                            <card.icon className="size-6 text-muted-foreground" />
                            <div>
                                <p className="text-2xl font-semibold">
                                    {card.value}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {card.title}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div>
                    <h2 className="mb-3 text-lg font-medium">Recent leads</h2>
                    {recentLeads.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            No consultation requests yet.
                        </p>
                    ) : (
                        <ul className="divide-y divide-sidebar-border/70 rounded-xl border border-sidebar-border/70 dark:divide-sidebar-border dark:border-sidebar-border">
                            {recentLeads.map((lead) => (
                                <li
                                    key={lead.id}
                                    className="flex items-center justify-between gap-4 p-4"
                                >
                                    <div>
                                        <p className="text-sm font-medium">
                                            {lead.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {lead.email}
                                            {lead.company
                                                ? ` · ${lead.company}`
                                                : ''}
                                        </p>
                                    </div>
                                    <time className="text-xs text-muted-foreground">
                                        {new Date(
                                            lead.created_at,
                                        ).toLocaleDateString()}
                                    </time>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: '/console' }],
};
