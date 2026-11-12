import { Head, Link, router, useForm } from '@inertiajs/react';
import { Download, Trash2 } from 'lucide-react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Lead {
    id: number;
    name: string;
    email: string;
    company: string | null;
    industry: string | null;
    funding_range: string | null;
    status: string;
    message: string;
    created_at: string;
}

interface Paginated<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
}

const STATUS_STYLES: Record<string, string> = {
    new: 'border-transparent bg-blue-600 text-white',
    contacted: 'border-transparent bg-amber-500 text-white',
    qualified: 'border-transparent bg-green-600 text-white',
    archived: '',
};

export default function LeadsIndex({
    leads,
    statuses,
    filter,
}: {
    leads: Paginated<Lead>;
    statuses: string[];
    filter: string | null;
}) {
    const deleteForm = useForm({});

    const setStatus = (lead: Lead, status: string) => {
        router.patch(
            `/console/leads/${lead.id}`,
            { status },
            { preserveScroll: true },
        );
    };

    return (
        <>
            <Head title="Lead inbox" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-start justify-between gap-4">
                    <Heading
                        title="Lead inbox"
                        description="Consultation requests submitted through the public contact form"
                    />
                    <Button variant="outline" asChild>
                        <a href="/console/leads/export">
                            <Download className="size-4" />
                            Export CSV
                        </a>
                    </Button>
                </div>

                <nav
                    className="flex flex-wrap gap-2"
                    aria-label="Filter by status"
                >
                    <Button
                        variant={filter === null ? 'default' : 'ghost'}
                        size="sm"
                        asChild
                    >
                        <Link href="/console/leads" preserveScroll>
                            All
                        </Link>
                    </Button>
                    {statuses.map((status) => (
                        <Button
                            key={status}
                            variant={filter === status ? 'default' : 'ghost'}
                            size="sm"
                            asChild
                        >
                            <Link
                                href={`/console/leads?status=${status}`}
                                preserveScroll
                            >
                                {status}
                            </Link>
                        </Button>
                    ))}
                </nav>

                {leads.data.length === 0 ? (
                    <p className="rounded-xl border border-sidebar-border/70 p-8 text-center text-sm text-muted-foreground dark:border-sidebar-border">
                        No leads yet.
                    </p>
                ) : (
                    <ul className="space-y-4">
                        {leads.data.map((lead) => (
                            <li
                                key={lead.id}
                                className="rounded-xl border border-sidebar-border/70 p-5 dark:border-sidebar-border"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium">
                                                {lead.name}
                                            </p>
                                            <Badge
                                                className={cn(
                                                    'capitalize',
                                                    STATUS_STYLES[lead.status],
                                                )}
                                                variant="outline"
                                            >
                                                {lead.status}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {lead.email}
                                            {lead.company
                                                ? ` · ${lead.company}`
                                                : ''}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <label
                                            className="sr-only"
                                            htmlFor={`status-${lead.id}`}
                                        >
                                            Status
                                        </label>
                                        <select
                                            id={`status-${lead.id}`}
                                            value={lead.status}
                                            onChange={(e) =>
                                                setStatus(lead, e.target.value)
                                            }
                                            className="rounded-md border border-input bg-background px-2 py-1 text-xs capitalize"
                                        >
                                            {statuses.map((status) => (
                                                <option
                                                    key={status}
                                                    value={status}
                                                >
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                        <time className="text-xs text-muted-foreground">
                                            {new Date(
                                                lead.created_at,
                                            ).toLocaleString()}
                                        </time>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            aria-label={`Delete lead from ${lead.name}`}
                                            onClick={() => {
                                                if (
                                                    confirm(
                                                        `Delete lead from ${lead.name}?`,
                                                    )
                                                ) {
                                                    deleteForm.delete(
                                                        `/console/leads/${lead.id}`,
                                                        {
                                                            preserveScroll: true,
                                                        },
                                                    );
                                                }
                                            }}
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </div>
                                <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                                    {lead.industry && (
                                        <div className="flex gap-1">
                                            <dt className="font-medium">
                                                Industry:
                                            </dt>
                                            <dd>{lead.industry}</dd>
                                        </div>
                                    )}
                                    {lead.funding_range && (
                                        <div className="flex gap-1">
                                            <dt className="font-medium">
                                                Funding:
                                            </dt>
                                            <dd>{lead.funding_range}</dd>
                                        </div>
                                    )}
                                </dl>
                                <p className="mt-3 text-sm whitespace-pre-line">
                                    {lead.message}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}

                {leads.links.length > 3 && (
                    <nav className="flex gap-1" aria-label="Pagination">
                        {leads.links.map((link, i) =>
                            link.url ? (
                                <Button
                                    key={i}
                                    variant={link.active ? 'default' : 'ghost'}
                                    size="sm"
                                    asChild
                                >
                                    <Link
                                        href={link.url}
                                        preserveScroll
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                </Button>
                            ) : (
                                <Button
                                    key={i}
                                    variant="ghost"
                                    size="sm"
                                    disabled
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ),
                        )}
                    </nav>
                )}
            </div>
        </>
    );
}

LeadsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/console' },
        { title: 'Lead inbox', href: '/console/leads' },
    ],
};
