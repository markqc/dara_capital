/**
 * Lightweight, accessible chart primitives for the Intelligence dashboard
 * mock. Each renders an SVG with a text equivalent for screen readers.
 */

export function Sparkline({
    points,
    label,
    color = '#e3192a',
}: {
    points: number[];
    label: string;
    color?: string;
}) {
    const w = 96;
    const h = 28;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const span = max - min || 1;

    const coords = points.map((p, i) => {
        const x = (i / (points.length - 1 || 1)) * (w - 4) + 2;
        const y = h - 3 - ((p - min) / span) * (h - 6);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    return (
        <svg
            viewBox={`0 0 ${w} ${h}`}
            className="h-7 w-24"
            role="img"
            aria-label={label}
            preserveAspectRatio="none"
        >
            <polyline
                points={coords.join(' ')}
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </svg>
    );
}

export type RiskSegment = { label: string; percent: string };

const SEGMENT_COLORS = ['#328776', '#d98536', '#b7192b'];

export function RiskDonut({ segments }: { segments: RiskSegment[] }) {
    const size = 120;
    const stroke = 16;
    const r = (size - stroke) / 2;
    const cx = size / 2;
    const circumference = 2 * Math.PI * r;

    let offset = 0;
    const arcs = segments.map((seg, i) => {
        const pct = Math.min(100, Math.max(0, Number(seg.percent) || 0));
        const arc = {
            dash: `${(pct / 100) * circumference} ${circumference}`,
            offset: -(offset / 100) * circumference,
            color: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
            ...seg,
        };
        offset += pct;
        return arc;
    });

    const summary = segments.map((s) => `${s.label} ${s.percent}%`).join(', ');

    return (
        <div className="flex items-center gap-5">
            <svg
                viewBox={`0 0 ${size} ${size}`}
                className="size-28 -rotate-90"
                role="img"
                aria-label={`Risk distribution: ${summary}`}
            >
                <circle
                    cx={cx}
                    cy={cx}
                    r={r}
                    fill="none"
                    stroke="#242326"
                    strokeWidth={stroke}
                />
                {arcs.map((arc, i) => (
                    <circle
                        key={i}
                        cx={cx}
                        cy={cx}
                        r={r}
                        fill="none"
                        stroke={arc.color}
                        strokeWidth={stroke}
                        strokeDasharray={arc.dash}
                        strokeDashoffset={arc.offset}
                    />
                ))}
            </svg>
            <ul className="space-y-1.5 text-xs">
                {arcs.map((arc, i) => (
                    <li key={i} className="flex items-center gap-2 text-fog">
                        <span
                            aria-hidden
                            className="size-2 rounded-full"
                            style={{ backgroundColor: arc.color }}
                        />
                        {arc.label} {arc.percent}%
                    </li>
                ))}
            </ul>
        </div>
    );
}
