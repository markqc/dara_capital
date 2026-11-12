import { Head, useForm } from '@inertiajs/react';
import { RotateCcw } from 'lucide-react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { artwork } from '@/lib/artwork';

interface ArtworkItem {
    key: string;
    usage: string;
    path: string | null;
    url: string | null;
    alt: string | null;
    overridden: boolean;
}

function ArtworkCard({ item }: { item: ArtworkItem }) {
    const form = useForm<{ image: File | null; alt: string }>({
        image: null,
        alt: item.alt ?? artwork[item.key]?.alt ?? '',
    });
    const revert = useForm({});

    const preview = item.url ?? artwork[item.key]?.src;

    return (
        <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="font-medium">{item.key}</p>
                    <p className="text-xs text-muted-foreground">
                        {item.usage}
                    </p>
                </div>
                {item.overridden && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                            revert.delete(`/console/artwork/${item.key}`)
                        }
                        title="Revert to bundled artwork"
                    >
                        <RotateCcw className="size-3.5" /> Revert
                    </Button>
                )}
            </div>

            {preview && (
                <img
                    src={preview}
                    alt={form.data.alt}
                    className="mt-3 aspect-[3/2] w-full rounded-md object-cover"
                />
            )}

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(`/console/artwork/${item.key}`, {
                        forceFormData: true,
                        preserveScroll: true,
                    });
                }}
                className="mt-3 space-y-3"
            >
                <div>
                    <Label
                        htmlFor={`image-${item.key}`}
                        className="mb-1.5 text-xs"
                    >
                        Replace image (jpg, png, webp — max 4 MB)
                    </Label>
                    <Input
                        id={`image-${item.key}`}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) =>
                            form.setData('image', e.target.files?.[0] ?? null)
                        }
                    />
                    <InputError message={form.errors.image} />
                </div>
                <div>
                    <Label
                        htmlFor={`alt-${item.key}`}
                        className="mb-1.5 text-xs"
                    >
                        Alt text
                    </Label>
                    <Input
                        id={`alt-${item.key}`}
                        value={form.data.alt}
                        onChange={(e) => form.setData('alt', e.target.value)}
                    />
                    <InputError message={form.errors.alt} />
                </div>
                <Button type="submit" size="sm" disabled={form.processing}>
                    Save
                </Button>
            </form>
        </div>
    );
}

export default function ArtworkIndex({ items }: { items: ArtworkItem[] }) {
    return (
        <>
            <Head title="Artwork" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <Heading
                    title="Artwork"
                    description="Replace the provisional generated artwork with final client assets and manage alt text"
                />
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {items.map((item) => (
                        <ArtworkCard key={item.key} item={item} />
                    ))}
                </div>
            </div>
        </>
    );
}

ArtworkIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/console' },
        { title: 'Artwork', href: '/console/artwork' },
    ],
};
