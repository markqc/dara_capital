import { Head, Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Eyebrow, Section } from "@/components/site/ui";
import { useHeroEntrance, useScrollReveals } from "@/hooks/use-gsap";
import { useArt } from "@/lib/artwork";
import { type Category, useSite } from "@/lib/site";

interface InsightsContent {
    hero?: {
        eyebrow?: string;
        heading?: string;
        body?: string;
        art?: string;
    };
    categories?: Category[];
    cta?: string;
    read_more?: string;
}

interface PostCard {
    slug: string;
    category: string;
    artwork: string | null;
    published_at: string | null;
    title: string | null;
    excerpt: string | null;
    category_label: string | null;
}

export default function Insights({
    content,
    posts,
    activeCategory,
    emptyLabel,
}: {
    content: InsightsContent;
    posts: PostCard[];
    activeCategory: string | null;
    emptyLabel: string;
}) {
    const { url } = useSite();
    const scope = useRef<HTMLDivElement>(null);
    useHeroEntrance(scope);
    useScrollReveals(scope);

    const hero = content.hero ?? {};
    const art = useArt();
    const artwork = art(hero.art);
    const categories = content.categories ?? [];
    const isFiltered = activeCategory !== null;

    return (
        <div ref={scope}>
            <Head title={hero.heading} />

            <Section className="relative overflow-hidden py-16 lg:py-24">
                {artwork && (
                    <div
                        data-hero
                        aria-hidden="true"
                        className="absolute inset-0"
                    >
                        <img
                            src={artwork.src}
                            alt=""
                            width={887}
                            height={444}
                            className="h-full w-full object-cover"
                            fetchPriority="high"
                        />
                        <div className="absolute inset-0 bg-canvas/50" />
                        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/50 to-canvas/10" />
                    </div>
                )}

                <div className="relative z-10">
                    <div className="min-w-0 max-w-xl">
                        {hero.eyebrow && (
                            <div data-hero>
                                <Eyebrow>{hero.eyebrow}</Eyebrow>
                            </div>
                        )}
                        {hero.heading && (
                            <h1
                                data-hero
                                className="mt-5 font-display text-4xl leading-[1.15] text-ivory md:text-5xl"
                            >
                                {hero.heading}
                            </h1>
                        )}
                        {hero.body && (
                            <p
                                data-hero
                                className="mt-6 max-w-lg text-base leading-relaxed text-fog"
                            >
                                {hero.body}
                            </p>
                        )}
                    </div>
                </div>
            </Section>

            {/* Category filters — shareable URLs via ?category= */}
            <Section>
                <div
                    role="group"
                    aria-label="Filter insights by category"
                    className="flex flex-wrap gap-2"
                >
                    {categories.map((cat) => {
                        const isAll = cat.key === "all";
                        const active = isAll
                            ? !isFiltered
                            : activeCategory === cat.key;
                        const href = isAll
                            ? url("insights")
                            : `${url("insights")}?category=${cat.key}`;

                        return (
                            <Link
                                key={cat.key}
                                href={href}
                                preserveScroll
                                aria-pressed={active}
                                className={`px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors focus-visible:outline-2 focus-visible:outline-crimson ${
                                    active
                                        ? "bg-crimson-deep text-ivory"
                                        : "text-fog hover:text-ivory"
                                }`}
                            >
                                {cat.label}
                            </Link>
                        );
                    })}
                </div>
            </Section>

            {/* Article cards */}
            <Section className="pt-10">
                {posts.length === 0 ? (
                    <p className="border border-line bg-surface p-10 text-center text-fog">
                        {emptyLabel}
                    </p>
                ) : (
                    <ul
                        data-reveal-group
                        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {posts.map((post) => {
                            const image = art(post.artwork);
                            return (
                                <li
                                    key={post.slug}
                                    className="flex flex-col overflow-hidden border border-line bg-surface"
                                >
                                    {image && (
                                        <img
                                            src={image.src}
                                            alt=""
                                            width={640}
                                            height={420}
                                            loading="lazy"
                                            className="aspect-[3/2] w-full object-cover"
                                        />
                                    )}
                                    <div className="flex flex-1 flex-col p-5">
                                        {post.category_label && (
                                            <p className="text-[0.6rem] font-bold tracking-[0.2em] text-crimson uppercase">
                                                {post.category_label}
                                            </p>
                                        )}
                                        <h2 className="mt-2 text-base leading-snug font-semibold text-ivory">
                                            <Link
                                                href={url(
                                                    `insights/${post.slug}`,
                                                )}
                                                className="transition-colors hover:text-crimson focus-visible:outline-2 focus-visible:outline-crimson"
                                            >
                                                {post.title}
                                            </Link>
                                        </h2>
                                        {post.excerpt && (
                                            <p className="mt-2 flex-1 text-sm leading-relaxed text-fog">
                                                {post.excerpt}
                                            </p>
                                        )}
                                        {post.published_at && (
                                            <p className="mt-3 text-xs text-fog">
                                                <time
                                                    dateTime={post.published_at}
                                                >
                                                    {post.published_at}
                                                </time>
                                            </p>
                                        )}
                                        <Link
                                            href={url(`insights/${post.slug}`)}
                                            className="mt-4 inline-flex items-center gap-2 self-start text-xs font-bold tracking-wider text-crimson uppercase transition-colors hover:text-ivory focus-visible:outline-2 focus-visible:outline-crimson"
                                        >
                                            {content.read_more ?? "Read More"}
                                            <ArrowRight
                                                className="size-3.5"
                                                aria-hidden
                                            />
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}

                {content.cta && posts.length > 0 && (
                    <div className="mt-12 text-center">
                        <Link
                            href={url("insights")}
                            preserveScroll
                            className="inline-flex items-center gap-2 bg-crimson-deep px-6 py-3 text-xs font-bold tracking-wider text-ivory uppercase transition-colors hover:bg-crimson focus-visible:outline-2 focus-visible:outline-ivory"
                        >
                            {content.cta}
                            <ArrowRight className="size-4" aria-hidden />
                        </Link>
                    </div>
                )}
            </Section>

            <div className="pb-16" />
        </div>
    );
}
