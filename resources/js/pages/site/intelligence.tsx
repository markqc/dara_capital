import { Head } from '@inertiajs/react';
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    Crosshair,
    Eye,
    LineChart,
} from 'lucide-react';
import { useRef } from 'react';
import {
    RiskDonut,
    type RiskSegment,
    Sparkline,
} from '@/components/site/charts';
import { Eyebrow, IconBadge, Section } from '@/components/site/ui';
import { useHeroEntrance, useScrollReveals } from '@/hooks/use-gsap';

interface DashboardMetric {
    label: string;
    value: string;
    status: string;
    spark?: string;
}

interface Opportunity {
    company: string;
    industry: string;
    score: string;
    grade: string;
    status: string;
}

interface IntelligenceContent {
    hero?: {
        eyebrow?: string;
        heading?: string;
        body?: string;
        cta?: string;
    };
    features?: string[];
    dashboard?: {
        title?: string;
        metrics?: DashboardMetric[];
        risk_title?: string;
        risk?: RiskSegment[];
        opportunities_title?: string;
        opportunities?: Opportunity[];
    };
    benefits?: string[];
}

const BENEFIT_ICONS = [LineChart, Building2, Crosshair, Eye];

export default function Intelligence({
    content,
}: {
    content: IntelligenceContent;
}) {
    const scope = useRef<HTMLDivElement>(null);
    useHeroEntrance(scope);
    useScrollReveals(scope);

    const hero = content.hero ?? {};
    const dashboard = content.dashboard ?? {};
    const metrics = dashboard.metrics ?? [];
    const risk = dashboard.risk ?? [];
    const opportunities = dashboard.opportunities ?? [];

    return (
        <div ref={scope}>
            <Head title={hero.heading} />

            <Section className="py-16 lg:py-24">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.3fr]">
                    {/* Intro */}
                    <div>
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
                                className="mt-6 text-base leading-relaxed text-fog"
                            >
                                {hero.body}
                            </p>
                        )}
                        <ul className="mt-8 space-y-3">
                            {(content.features ?? []).map((feature, i) => (
                                <li
                                    key={i}
                                    data-hero
                                    className="flex items-center gap-3 text-sm text-ivory"
                                >
                                    <CheckCircle2
                                        className="size-4 text-crimson"
                                        aria-hidden
                                    />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        {hero.cta && (
                            <div data-hero className="mt-8">
                                {/* No live platform URL was supplied, so the
                                    CTA scrolls to the dashboard preview. */}
                                <a
                                    href="#dashboard-preview"
                                    className="inline-flex items-center gap-2 bg-crimson-deep px-6 py-3 text-xs font-bold tracking-wider text-ivory uppercase transition-colors hover:bg-crimson focus-visible:outline-2 focus-visible:outline-ivory"
                                >
                                    {hero.cta}
                                    <ArrowRight
                                        className="size-4"
                                        aria-hidden
                                    />
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Dashboard mock — demo data, see README */}
                    <div
                        id="dashboard-preview"
                        data-hero
                        className="scroll-mt-24 border border-line bg-surface p-5"
                    >
                        {dashboard.title && (
                            <p className="text-[0.65rem] font-bold tracking-[0.25em] text-fog uppercase">
                                {dashboard.title}
                            </p>
                        )}

                        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {metrics.map((metric, i) => {
                                const spark = (metric.spark ?? '')
                                    .split(',')
                                    .map((n) => Number(n.trim()))
                                    .filter((n) => !Number.isNaN(n));
                                return (
                                    <div
                                        key={i}
                                        className="border border-line bg-canvas p-3"
                                    >
                                        <p className="text-[0.6rem] text-fog">
                                            {metric.label}
                                        </p>
                                        <p className="mt-1 font-display text-xl text-ivory">
                                            {metric.value}
                                        </p>
                                        <div className="mt-1 flex items-end justify-between gap-2">
                                            <p className="text-[0.6rem] leading-tight text-positive">
                                                {metric.status}
                                            </p>
                                            {spark.length > 1 && (
                                                <Sparkline
                                                    points={spark}
                                                    label={`${metric.label} trend`}
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            {risk.length > 0 && (
                                <div className="border border-line bg-canvas p-3">
                                    <p className="text-[0.6rem] text-fog">
                                        {dashboard.risk_title}
                                    </p>
                                    <div className="mt-2">
                                        <RiskDonut segments={risk} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {opportunities.length > 0 && (
                            <div className="mt-4 border border-line bg-canvas p-3">
                                <p className="text-[0.65rem] font-bold tracking-wider text-ivory">
                                    {dashboard.opportunities_title}
                                </p>
                                <div className="mt-3 overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b border-line text-fog">
                                                <th
                                                    scope="col"
                                                    className="py-1.5 pr-3 font-medium"
                                                >
                                                    Company
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="py-1.5 pr-3 font-medium"
                                                >
                                                    Industry
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="py-1.5 pr-3 font-medium"
                                                >
                                                    Score
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="py-1.5 pr-3 font-medium"
                                                >
                                                    Investment Grade
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="py-1.5 font-medium"
                                                >
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {opportunities.map((opp, i) => (
                                                <tr
                                                    key={i}
                                                    className="border-b border-line/50 last:border-0"
                                                >
                                                    <td className="py-2 pr-3 text-ivory">
                                                        {opp.company}
                                                    </td>
                                                    <td className="py-2 pr-3 text-fog">
                                                        {opp.industry}
                                                    </td>
                                                    <td className="py-2 pr-3 text-ivory">
                                                        {opp.score}
                                                    </td>
                                                    <td className="py-2 pr-3 text-ivory">
                                                        {opp.grade}
                                                    </td>
                                                    <td className="py-2 text-positive">
                                                        {opp.status}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Section>

            {/* Benefits strip */}
            <Section className="border-t border-line py-10">
                <ul
                    data-reveal-group
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {(content.benefits ?? []).map((benefit, i) => {
                        const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
                        return (
                            <li
                                key={i}
                                className="flex items-center gap-3 text-sm text-ivory"
                            >
                                <IconBadge>
                                    <Icon />
                                </IconBadge>
                                {benefit}
                            </li>
                        );
                    })}
                </ul>
            </Section>
        </div>
    );
}
