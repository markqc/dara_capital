import { Head } from "@inertiajs/react";
import {
    ArrowRight,
    BarChart3,
    Building2,
    Crosshair,
    Eye,
    Globe2,
    Handshake,
    Landmark,
    Target,
} from "lucide-react";
import { useRef, useState } from "react";
import { CtaLink, Eyebrow, IconBadge, Section } from "@/components/site/ui";
import { useHeroEntrance, useScrollReveals } from "@/hooks/use-gsap";
import { useArt } from "@/lib/artwork";
import { type TextCard, useSite } from "@/lib/site";

interface ServicesContent {
    hero?: {
        eyebrow?: string;
        heading?: string;
        body?: string;
        art?: string;
    };
    services?: TextCard[];
    cta?: {
        heading?: string;
        body?: string;
        button?: string;
    };
}

const SERVICE_ICONS = [
    BarChart3,
    Crosshair,
    Handshake,
    Landmark,
    Target,
    Eye,
    Globe2,
    Building2,
];

export default function Services({
    content,
    labels,
}: {
    content: ServicesContent;
    labels: { more: string; less: string };
}) {
    const { url } = useSite();
    const scope = useRef<HTMLDivElement>(null);
    useHeroEntrance(scope);
    useScrollReveals(scope);

    const hero = content.hero ?? {};
    const art = useArt();
    const artwork = art(hero.art);
    const cta = content.cta ?? {};
    const services = content.services ?? [];

    const [expanded, setExpanded] = useState<number | null>(null);

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

            {/* Service cards */}
            <Section>
                <ul
                    data-reveal-group
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {services.map((service, i) => {
                        const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
                        const isOpen = expanded === i;
                        const panelId = `service-details-${i}`;

                        return (
                            <li
                                key={i}
                                className="flex flex-col border border-line bg-surface p-6"
                            >
                                <IconBadge>
                                    <Icon />
                                </IconBadge>
                                <h2 className="mt-4 text-lg font-semibold text-ivory">
                                    {service.title}
                                </h2>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-fog">
                                    {service.body}
                                </p>
                                {service.details && (
                                    <>
                                        <div
                                            id={panelId}
                                            hidden={!isOpen}
                                            className="mt-3 border-t border-line pt-3 text-sm leading-relaxed text-fog"
                                        >
                                            {service.details}
                                        </div>
                                        <button
                                            type="button"
                                            aria-expanded={isOpen}
                                            aria-controls={panelId}
                                            onClick={() =>
                                                setExpanded(isOpen ? null : i)
                                            }
                                            className="mt-4 inline-flex items-center gap-2 self-start text-xs font-bold tracking-wider text-crimson uppercase transition-colors hover:text-ivory focus-visible:outline-2 focus-visible:outline-crimson"
                                        >
                                            {isOpen ? labels.less : labels.more}
                                            <ArrowRight
                                                className={`size-3.5 transition-transform ${isOpen ? "rotate-90" : ""}`}
                                                aria-hidden
                                            />
                                        </button>
                                    </>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </Section>

            {/* Consultation callout */}
            <Section className="py-16">
                <div
                    data-reveal-group
                    className="flex flex-col items-start justify-between gap-6 border border-line bg-surface p-8 lg:flex-row lg:items-center"
                >
                    <div className="flex items-start gap-4">
                        <IconBadge>
                            <Target />
                        </IconBadge>
                        <div>
                            {cta.heading && (
                                <h2 className="font-display text-2xl text-ivory">
                                    {cta.heading}
                                </h2>
                            )}
                            {cta.body && (
                                <p className="mt-1 text-sm text-fog">
                                    {cta.body}
                                </p>
                            )}
                        </div>
                    </div>
                    {cta.button && (
                        <CtaLink href={url("contact")} className="shrink-0">
                            {cta.button}
                        </CtaLink>
                    )}
                </div>
            </Section>
        </div>
    );
}
