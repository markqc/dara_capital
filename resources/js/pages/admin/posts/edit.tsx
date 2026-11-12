import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { artwork } from '@/lib/artwork';

interface PostData {
    id: number;
    slug: string;
    category: string;
    artwork: string | null;
    published_at: string | null;
    sort_order: number;
    is_published: boolean;
}

type Translation = {
    title: string;
    excerpt: string;
    body: string;
    category_label: string;
};

export default function PostEdit({
    post,
    translations,
    locales,
    defaultLocale,
    categories,
    artworkKeys,
    errors,
    flash,
}: {
    post: PostData | null;
    translations: Record<string, Translation>;
    locales: string[];
    defaultLocale: string;
    categories: string[];
    artworkKeys: string[];
    errors: Record<string, string>;
    flash?: { success?: boolean };
}) {
    const [tab, setTab] = useState(defaultLocale);

    const form = useForm({
        slug: post?.slug ?? '',
        category: post?.category ?? categories[0],
        artwork: post?.artwork ?? '',
        published_at: post?.published_at ?? '',
        sort_order: post?.sort_order ?? 0,
        is_published: post?.is_published ?? true,
        translations: Object.fromEntries(
            locales.map((l) => [
                l,
                translations[l] ?? {
                    title: '',
                    excerpt: '',
                    body: '',
                    category_label: '',
                },
            ]),
        ) as Record<string, Translation>,
    });

    const setT = (locale: string, field: keyof Translation, value: string) =>
        form.setData('translations', {
            ...form.data.translations,
            [locale]: { ...form.data.translations[locale], [field]: value },
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (post) {
            form.put(`/console/posts/${post.id}`, { preserveScroll: true });
        } else {
            form.post('/console/posts');
        }
    };

    const inputClass =
        'border-input bg-transparent ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none';
    const t = form.data.translations[tab];
    const err = (field: string) => errors[`translations.${tab}.${field}`];

    return (
        <>
            <Head title={post ? `Edit ${post.slug}` : 'New post'} />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <Heading
                    title={post ? `Edit: ${post.slug}` : 'New insight post'}
                    description="English fields are required; other languages fall back to English when empty"
                />

                {flash?.success && (
                    <p
                        role="status"
                        className="rounded-md border border-green-600/40 bg-green-600/10 px-4 py-2.5 text-sm text-green-600 dark:text-green-400"
                    >
                        Saved.
                    </p>
                )}

                <form onSubmit={submit} className="max-w-3xl space-y-8">
                    <div className="grid gap-4 rounded-xl border border-sidebar-border/70 p-4 sm:grid-cols-2 dark:border-sidebar-border">
                        <div>
                            <Label htmlFor="slug" className="mb-1.5 text-xs">
                                Slug
                            </Label>
                            <Input
                                id="slug"
                                value={form.data.slug}
                                onChange={(e) =>
                                    form.setData('slug', e.target.value)
                                }
                                placeholder="my-article-slug"
                            />
                            <InputError message={errors.slug} />
                        </div>
                        <div>
                            <Label
                                htmlFor="category"
                                className="mb-1.5 text-xs"
                            >
                                Category
                            </Label>
                            <select
                                id="category"
                                value={form.data.category}
                                onChange={(e) =>
                                    form.setData('category', e.target.value)
                                }
                                className={`${inputClass} h-9`}
                            >
                                {categories.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.category} />
                        </div>
                        <div>
                            <Label htmlFor="artwork" className="mb-1.5 text-xs">
                                Artwork
                            </Label>
                            <select
                                id="artwork"
                                value={form.data.artwork}
                                onChange={(e) =>
                                    form.setData('artwork', e.target.value)
                                }
                                className={`${inputClass} h-9`}
                            >
                                <option value="">— none —</option>
                                {artworkKeys.map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                            {form.data.artwork &&
                                artwork[form.data.artwork] && (
                                    <img
                                        src={artwork[form.data.artwork].src}
                                        alt=""
                                        className="mt-2 h-20 rounded object-cover"
                                    />
                                )}
                        </div>
                        <div>
                            <Label
                                htmlFor="published_at"
                                className="mb-1.5 text-xs"
                            >
                                Publish date
                            </Label>
                            <Input
                                id="published_at"
                                type="date"
                                value={form.data.published_at}
                                onChange={(e) =>
                                    form.setData('published_at', e.target.value)
                                }
                            />
                            <InputError message={errors.published_at} />
                        </div>
                        <div>
                            <Label
                                htmlFor="sort_order"
                                className="mb-1.5 text-xs"
                            >
                                Sort order
                            </Label>
                            <Input
                                id="sort_order"
                                type="number"
                                min={0}
                                value={form.data.sort_order}
                                onChange={(e) =>
                                    form.setData(
                                        'sort_order',
                                        Number(e.target.value),
                                    )
                                }
                            />
                        </div>
                        <div className="flex items-end gap-2 pb-1">
                            <Checkbox
                                id="is_published"
                                checked={form.data.is_published}
                                onCheckedChange={(v) =>
                                    form.setData('is_published', v === true)
                                }
                            />
                            <Label htmlFor="is_published" className="text-sm">
                                Published
                            </Label>
                        </div>
                    </div>

                    <div>
                        <div className="flex gap-2">
                            {locales.map((l) => (
                                <button
                                    key={l}
                                    type="button"
                                    onClick={() => setTab(l)}
                                    className={`rounded-md border px-3 py-1.5 text-xs font-medium uppercase ${
                                        l === tab
                                            ? 'border-foreground'
                                            : 'border-sidebar-border text-muted-foreground'
                                    }`}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>

                        <div className="mt-4 space-y-4 rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                            <div>
                                <Label
                                    htmlFor={`title-${tab}`}
                                    className="mb-1.5 text-xs"
                                >
                                    Title
                                    {tab === defaultLocale ? ' (required)' : ''}
                                </Label>
                                <Input
                                    id={`title-${tab}`}
                                    value={t.title ?? ''}
                                    onChange={(e) =>
                                        setT(tab, 'title', e.target.value)
                                    }
                                />
                                <InputError message={err('title')} />
                            </div>
                            <div>
                                <Label
                                    htmlFor={`excerpt-${tab}`}
                                    className="mb-1.5 text-xs"
                                >
                                    Excerpt
                                </Label>
                                <textarea
                                    id={`excerpt-${tab}`}
                                    rows={2}
                                    value={t.excerpt ?? ''}
                                    onChange={(e) =>
                                        setT(tab, 'excerpt', e.target.value)
                                    }
                                    className={inputClass}
                                />
                                <InputError message={err('excerpt')} />
                            </div>
                            <div>
                                <Label
                                    htmlFor={`body-${tab}`}
                                    className="mb-1.5 text-xs"
                                >
                                    Body
                                </Label>
                                <textarea
                                    id={`body-${tab}`}
                                    rows={8}
                                    value={t.body ?? ''}
                                    onChange={(e) =>
                                        setT(tab, 'body', e.target.value)
                                    }
                                    className={inputClass}
                                />
                                <InputError message={err('body')} />
                            </div>
                            <div>
                                <Label
                                    htmlFor={`catlabel-${tab}`}
                                    className="mb-1.5 text-xs"
                                >
                                    Category label shown on the card
                                </Label>
                                <Input
                                    id={`catlabel-${tab}`}
                                    value={t.category_label ?? ''}
                                    onChange={(e) =>
                                        setT(
                                            tab,
                                            'category_label',
                                            e.target.value,
                                        )
                                    }
                                />
                                <InputError message={err('category_label')} />
                            </div>
                        </div>
                    </div>

                    <Button type="submit" disabled={form.processing}>
                        {post ? 'Save changes' : 'Create post'}
                    </Button>
                </form>
            </div>
        </>
    );
}

PostEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/console' },
        { title: 'Insights', href: '/console/posts' },
        { title: 'Edit', href: '#' },
    ],
};
