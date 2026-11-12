import { Head, Link, useForm } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';

interface PostRow {
    id: number;
    slug: string;
    category: string;
    title: string | null;
    published_at: string | null;
    is_published: boolean;
}

export default function PostsIndex({ posts }: { posts: PostRow[] }) {
    const deleteForm = useForm({});

    return (
        <>
            <Head title="Insights" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between gap-4">
                    <Heading
                        title="Insights posts"
                        description="Manage articles shown on the public Insights page"
                    />
                    <Button asChild>
                        <Link href="/console/posts/create">
                            <Plus className="size-4" /> New post
                        </Link>
                    </Button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-sidebar-border/70 dark:border-sidebar-border">
                                <th className="px-4 py-3 font-medium">Title</th>
                                <th className="px-4 py-3 font-medium">
                                    Category
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Published
                                </th>
                                <th className="px-4 py-3 font-medium">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-right font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr
                                    key={post.id}
                                    className="border-b border-sidebar-border/70 last:border-0 dark:border-sidebar-border"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {post.title ?? post.slug}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {post.category}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {post.published_at ?? '—'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`rounded px-2 py-0.5 text-xs ${
                                                post.is_published
                                                    ? 'bg-green-600/10 text-green-600 dark:text-green-400'
                                                    : 'bg-muted text-muted-foreground'
                                            }`}
                                        >
                                            {post.is_published
                                                ? 'Published'
                                                : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                asChild
                                            >
                                                <Link
                                                    href={`/console/posts/${post.id}/edit`}
                                                    aria-label={`Edit ${post.title}`}
                                                >
                                                    <Pencil className="size-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                aria-label={`Delete ${post.title}`}
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            `Delete "${post.title ?? post.slug}"?`,
                                                        )
                                                    ) {
                                                        deleteForm.delete(
                                                            `/console/posts/${post.id}`,
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

PostsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/console' },
        { title: 'Insights', href: '/console/posts' },
    ],
};
