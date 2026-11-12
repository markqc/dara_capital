import { Head } from "@inertiajs/react";
import { Building2, Crosshair, Globe2, Handshake, Target } from "lucide-react";
import { useRef } from "react";
import { CtaLink, Eyebrow, Section } from "@/components/site/ui";
import { useHeroEntrance, useScrollReveals } from "@/hooks/use-gsap";
import { useArt } from "@/lib/artwork";
import { type Metric, useSite } from "@/lib/site";

interface HomeContent {
    hero?: {
        eyebrow?: string;
        lines?: string[];
        body?: string;
        primary_cta?: string;
        secondary_cta?: string;
        art?: string;
        trust_title?: string;
        features?: string[];
    };
    metrics?: Metric[];
}

const FEATURE_ICONS = [Target, Building2, Crosshair, Globe2, Handshake];

export default function Home({ content }: { content: HomeContent }) {
    const { url } = useSite();
    const scope = useRef<HTMLDivElement>(null);
    useHeroEntrance(scope);
    useScrollReveals(scope);

    const hero = content.hero ?? {};
    const lines = hero.lines ?? [];
    const art = useArt();
    const artwork = art(hero.art);

    return (
        <div ref={scope}>
            <Head title={lines.join(" ")} />

            {/* Hero */}
            <Section className="relative overflow-hidden py-16 lg:py-24">
                {artwork && (
                    <div
                        data-hero
                        aria-hidden="true"
                        className="absolute inset-y-0 right-0 w-full lg:w-[60%]"
                    >
                        <img
                            src={artwork.src}
                            alt=""
                            width={887}
                            height={443}
                            className="h-full w-full object-cover"
                            fetchPriority="high"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/70 to-transparent" />
                    </div>
                )}

                <div className="relative z-10">
                    <div className="min-w-0 max-w-xl">
                        {hero.eyebrow && (
                            <div data-hero>
                                <Eyebrow>{hero.eyebrow}</Eyebrow>
                            </div>
                        )}
                        <h1
                            data-hero
                            className="mt-5 font-display text-5xl leading-[1.08] text-ivory md:text-6xl lg:text-7xl"
                        >
                            {lines.map((line, i) => (
                                <span
                                    key={i}
                                    className={`block ${
                                        i === lines.length - 1
                                            ? "text-crimson italic"
                                            : ""
                                    }`}
                                >
                                    {line}
                                </span>
                            ))}
                        </h1>
                        {hero.body && (
                            <p
                                data-hero
                                className="mt-6 max-w-md text-base leading-relaxed text-fog"
                            >
                                {hero.body}
                            </p>
                        )}
                        <div data-hero className="mt-8 flex flex-wrap gap-4">
                            {hero.primary_cta && (
                                <CtaLink href={url("contact")}>
                                    {hero.primary_cta}
                                </CtaLink>
                            )}
                            {hero.secondary_cta && (
                                <CtaLink
                                    href={url("services")}
                                    variant="secondary"
                                >
                                    {hero.secondary_cta}
                                </CtaLink>
                            )}
                        </div>
                    </div>
                </div>

                {/* Trust strip */}
                <div className="mt-14">
                    {hero.trust_title && (
                        <p className="text-sm text-fog">{hero.trust_title}</p>
                    )}
                    <ul
                        data-reveal-group
                        className="mt-5 flex flex-wrap gap-x-10 gap-y-4"
                    >
                        {(hero.features ?? []).map((feature, i) => {
                            const Icon =
                                FEATURE_ICONS[i % FEATURE_ICONS.length];
                            return (
                                <li
                                    key={i}
                                    className="flex items-center gap-2.5 text-sm text-ivory"
                                >
                                    <Icon
                                        className="size-4 text-crimson"
                                        aria-hidden
                                    />
                                    {feature}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Section>

            {/* Metrics bar */}
            <Section className="pb-20">
                <dl
                    data-reveal-group
                    className="grid grid-cols-1 divide-y divide-line border border-line bg-surface sm:grid-cols-2 sm:divide-x lg:grid-cols-4"
                >
                    {(content.metrics ?? []).map((metric, i) => (
                        <div key={i} className="px-8 py-8 text-center">
                            <dt className="order-2 mt-2 text-sm text-fog">
                                {metric.label}
                            </dt>
                            <dd className="font-display text-4xl text-crimson lg:text-5xl">
                                {metric.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </Section>
        </div>
    );
}
