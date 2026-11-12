import { Head } from "@inertiajs/react";
import { Calendar, Crosshair, Eye, Globe2 } from "lucide-react";
import { useRef } from "react";
import { Eyebrow, IconBadge, Section } from "@/components/site/ui";
import { useHeroEntrance, useScrollReveals } from "@/hooks/use-gsap";
import { useArt } from "@/lib/artwork";
import type { Metric, TextCard } from "@/lib/site";

interface AboutContent {
    hero?: {
        eyebrow?: string;
        heading?: string;
        body?: string;
        art?: string;
    };
    values?: TextCard[];
    metrics?: Metric[];
    quote?: string;
}

const VALUE_ICONS = [Crosshair, Eye, Globe2, Calendar];

export default function About({ content }: { content: AboutContent }) {
    const scope = useRef<HTMLDivElement>(null);
    useHeroEntrance(scope);
    useScrollReveals(scope);

    const hero = content.hero ?? {};
    const art = useArt();
    const artwork = art(hero.art);
    const flourish = art("line-waves");

    return (
        <div ref={scope}>
            <Head title={hero.heading} />

            {/* Split intro */}
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
                            height={443}
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

            {/* Mission / Vision / Purpose / Philosophy */}
            <Section>
                <ul
                    data-reveal-group
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {(content.values ?? []).map((card, i) => {
                        const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
                        return (
                            <li
                                key={i}
                                className="border border-line bg-surface p-6"
                            >
                                <IconBadge>
                                    <Icon />
                                </IconBadge>
                                <h2 className="mt-4 text-lg font-semibold text-ivory">
                                    {card.title}
                                </h2>
                                <p className="mt-2 text-sm leading-relaxed text-fog">
                                    {card.body}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </Section>

            {/* Metrics */}
            <Section className="py-16">
                <dl
                    data-reveal-group
                    className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
                >
                    {(content.metrics ?? []).map((metric, i) => (
                        <div
                            key={i}
                            className="bg-canvas px-8 py-8 text-center"
                        >
                            <dd className="font-display text-4xl text-crimson lg:text-5xl">
                                {metric.value}
                            </dd>
                            <dt className="mt-2 text-sm text-fog">
                                {metric.label}
                            </dt>
                        </div>
                    ))}
                </dl>
            </Section>

            {/* Closing quote */}
            {content.quote && (
                <Section className="relative overflow-hidden pb-24">
                    <div data-reveal-group>
                        {flourish && (
                            <img
                                aria-hidden
                                src={flourish.src}
                                alt=""
                                width={1024}
                                height={238}
                                className="absolute inset-x-0 bottom-0 h-32 w-full object-cover object-bottom md:h-40"
                            />
                        )}
                    </div>
                    <figure
                        data-reveal-group
                        className="py-10 pb-24 text-center"
                    >
                        <blockquote className="relative mx-auto max-w-3xl font-display text-3xl leading-snug whitespace-pre-line text-ivory italic md:text-4xl">
                            <span aria-hidden className="text-crimson">
                                “
                            </span>
                            {content.quote}
                            <span aria-hidden className="text-crimson">
                                ”
                            </span>
                        </blockquote>
                    </figure>
                </Section>
            )}
        </div>
    );
}
