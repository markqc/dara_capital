import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Section } from '@/components/site/ui';
import { useArt } from '@/lib/artwork';
import { useSite } from '@/lib/site';

interface PostDetail {
    slug: string;
    category: string;
    artwork: string | null;
    published_at: string | null;
    title: string | null;
    excerpt: string | null;
    body: string | null;
    category_label: string | null;
}

export default function Insight({
    post,
    backLabel,
}: {
    post: PostDetail;
    backLabel: string;
}) {
    const { url } = useSite();
    const art = useArt();
    const image = art(post.artwork);

    return (
        <article>
            <Head title={post.title ?? ''} />

            <Section className="py-16 lg:py-20">
                <div className="mx-auto max-w-3xl">
                    <Link
                        href={url('insights')}
                        className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-fog uppercase transition-colors hover:text-ivory focus-visible:outline-2 focus-visible:outline-crimson"
                    >
                        <ArrowLeft className="size-3.5" aria-hidden />
                        {backLabel}
                    </Link>

                    {post.category_label && (
                        <p className="mt-8 text-xs font-bold tracking-[0.25em] text-crimson uppercase">
                            {post.category_label}
                        </p>
                    )}
                    <h1 className="mt-4 font-display text-4xl leading-[1.15] text-ivory md:text-5xl">
                        {post.title}
                    </h1>
                    {post.published_at && (
                        <p className="mt-4 text-sm text-fog">
                            <time dateTime={post.published_at}>
                                {post.published_at}
                            </time>
                        </p>
                    )}

                    {image && (
                        <img
                            src={image.src}
                            alt={image.alt}
                            width={1024}
                            height={683}
                            className="mt-10 aspect-[3/2] w-full object-cover"
                        />
                    )}

                    {post.body && (
                        <div className="mt-10 space-y-5 text-base leading-relaxed whitespace-pre-line text-fog">
                            {post.body}
                        </div>
                    )}
                </div>
            </Section>
        </article>
    );
}
