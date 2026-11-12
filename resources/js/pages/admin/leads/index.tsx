import { Head, Link, useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';

interface Lead {
    id: number;
    name: string;
    email: string;
    company: string | null;
    industry: string | null;
    funding_range: string | null;
    message: string;
    created_at: string;
}

interface Paginated<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
}

export default function LeadsIndex({ leads }: { leads: Paginated<Lead> }) {
    const deleteForm = useForm({});

    return (
        <>
            <Head title="Lead inbox" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <Heading
                    title="Lead inbox"
                    description="Consultation requests submitted through the public contact form"
                />

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
                                        <p className="font-medium">
                                            {lead.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {lead.email}
                                            {lead.company
                                                ? ` · ${lead.company}`
                                                : ''}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
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
