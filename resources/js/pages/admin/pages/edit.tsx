import { Head, Link, useForm } from '@inertiajs/react';
import { Check } from 'lucide-react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { artwork } from '@/lib/artwork';

interface SchemaField {
    key: string;
    type: 'text' | 'textarea' | 'image' | 'list';
    label: string;
    count?: number;
    of?: 'text' | 'group';
    fields?: { key: string; type: string; label: string }[];
}

type Json = Record<string, unknown>;

function get(obj: unknown, path: string): string {
    const value = path.split('.').reduce<unknown>((acc, part) => {
        if (acc && typeof acc === 'object') {
            return (acc as Json)[part];
        }
        return undefined;
    }, obj);

    return typeof value === 'string' ? value : '';
}

function flatPaths(schema: SchemaField[]): string[] {
    const paths: string[] = [];

    for (const field of schema) {
        if (field.type === 'list') {
            const count = field.count ?? 0;
            if (field.of === 'group') {
                for (let i = 0; i < count; i++) {
                    for (const sub of field.fields ?? []) {
                        paths.push(`${field.key}.${i}.${sub.key}`);
                    }
                }
            } else {
                for (let i = 0; i < count; i++) {
                    paths.push(`${field.key}.${i}`);
                }
            }
        } else {
            paths.push(field.key);
        }
    }

    return paths;
}

function FieldInput({
    name,
    type,
    value,
    onChange,
}: {
    name: string;
    type: string;
    value: string;
    onChange: (v: string) => void;
}) {
    if (type === 'textarea') {
        return (
            <textarea
                name={name}
                rows={3}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            />
        );
    }

    if (type === 'image') {
        return (
            <select
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
                <option value="">— none —</option>
                {Object.keys(artwork).map((key) => (
                    <option key={key} value={key}>
                        {key}
                    </option>
                ))}
            </select>
        );
    }

    return (
        <Input
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

export default function PageEdit({
    pageKey,
    locale,
    locales,
    defaultLocale,
    schema,
    reference,
    data,
    errors,
    flash,
}: {
    pageKey: string;
    locale: string;
    locales: string[];
    defaultLocale: string;
    schema: SchemaField[];
    reference: Json;
    data: Json;
    errors: Record<string, string>;
    flash?: { success?: boolean };
}) {
    const paths = flatPaths(schema);
    const initial = Object.fromEntries(
        paths.map((p) => [p, get(data, p)]),
    ) as Record<string, string>;

    const form = useForm<{ fields: Record<string, string> }>({
        fields: initial,
    });

    const setField = (path: string, value: string) =>
        form.setData('fields', { ...form.data.fields, [path]: value });

    const renderLeaf = (path: string, type: string, label: string) => (
        <div key={path}>
            <Label htmlFor={path} className="mb-1.5 text-xs">
                {label}
            </Label>
            <FieldInput
                name={path}
                type={type}
                value={form.data.fields[path] ?? ''}
                onChange={(v) => setField(path, v)}
            />
            {locale !== defaultLocale && (
                <p className="mt-1 text-xs text-muted-foreground">
                    EN: {get(reference, path) || '—'}
                </p>
            )}
            <InputError message={errors[`fields.${path}`]} />
        </div>
    );

    return (
        <>
            <Head title={`Edit ${pageKey} (${locale.toUpperCase()})`} />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title={`Edit: ${pageKey}`}
                        description={`Editing ${locale.toUpperCase()} content. Leave a field empty to fall back to English.`}
                    />
                    <div className="flex gap-2">
                        {locales.map((l) => (
                            <Link
                                key={l}
                                href={`/console/pages/${pageKey}/${l}`}
                                className={`rounded-md border px-3 py-1.5 text-xs font-medium uppercase ${
                                    l === locale
                                        ? 'border-foreground'
                                        : 'border-sidebar-border text-muted-foreground'
                                }`}
                            >
                                {l}
                            </Link>
                        ))}
                    </div>
                </div>

                {flash?.success && (
                    <p
                        role="status"
                        className="flex items-center gap-2 rounded-md border border-green-600/40 bg-green-600/10 px-4 py-2.5 text-sm text-green-600 dark:text-green-400"
                    >
                        <Check className="size-4" /> Saved.
                    </p>
                )}

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.put(`/console/pages/${pageKey}/${locale}`, {
                            preserveScroll: true,
                        });
                    }}
                    className="max-w-3xl space-y-8"
                >
                    {schema.map((field) => {
                        if (field.type === 'list' && field.of === 'group') {
                            return (
                                <fieldset
                                    key={field.key}
                                    className="space-y-4 rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border"
                                >
                                    <legend className="px-1 text-sm font-medium">
                                        {field.label}
                                    </legend>
                                    {Array.from({
                                        length: field.count ?? 0,
                                    }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="space-y-3 rounded-lg border border-sidebar-border/50 p-4 dark:border-sidebar-border"
                                        >
                                            <p className="text-xs font-medium text-muted-foreground">
                                                Item {i + 1}
                                            </p>
                                            {(field.fields ?? []).map((sub) =>
                                                renderLeaf(
                                                    `${field.key}.${i}.${sub.key}`,
                                                    sub.type,
                                                    sub.label,
                                                ),
                                            )}
                                        </div>
                                    ))}
                                </fieldset>
                            );
                        }

                        if (field.type === 'list') {
                            return (
                                <fieldset
                                    key={field.key}
                                    className="space-y-3 rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border"
                                >
                                    <legend className="px-1 text-sm font-medium">
                                        {field.label}
                                    </legend>
                                    {Array.from({
                                        length: field.count ?? 0,
                                    }).map((_, i) => (
                                        <div key={i}>
                                            <FieldInput
                                                name={`${field.key}.${i}`}
                                                type="text"
                                                value={
                                                    form.data.fields[
                                                        `${field.key}.${i}`
                                                    ] ?? ''
                                                }
                                                onChange={(v) =>
                                                    setField(
                                                        `${field.key}.${i}`,
                                                        v,
                                                    )
                                                }
                                            />
                                            {locale !== defaultLocale && (
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    EN:{' '}
                                                    {get(
                                                        reference,
                                                        `${field.key}.${i}`,
                                                    ) || '—'}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </fieldset>
                            );
                        }

                        return renderLeaf(field.key, field.type, field.label);
                    })}

                    <Button type="submit" disabled={form.processing}>
                        Save changes
                    </Button>
                </form>
            </div>
        </>
    );
}

PageEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/console' },
        { title: 'Pages', href: '/console/pages' },
        { title: 'Edit', href: '#' },
    ],
};
