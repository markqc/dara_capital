import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import type { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Eyebrow({ children }: PropsWithChildren) {
    return (
        <p className="text-xs font-bold tracking-[0.3em] text-crimson uppercase">
            {children}
        </p>
    );
}

export function DisplayHeading({
    children,
    className,
}: PropsWithChildren<{ className?: string }>) {
    return (
        <h1
            className={cn(
                'font-display text-4xl leading-[1.15] text-ivory md:text-5xl lg:text-6xl',
                className,
            )}
        >
            {children}
        </h1>
    );
}

export function CtaLink({
    href,
    children,
    variant = 'primary',
    className,
}: PropsWithChildren<{
    href: string;
    variant?: 'primary' | 'secondary';
    className?: string;
}>) {
    return (
        <Link
            href={href}
            className={cn(
                'inline-flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-wider uppercase transition-colors focus-visible:outline-2 focus-visible:outline-ivory',
                variant === 'primary'
                    ? 'bg-crimson-deep text-ivory hover:bg-crimson'
                    : 'border border-line text-ivory hover:border-crimson hover:text-crimson',
                className,
            )}
        >
            {children}
            <ArrowRight className="size-4" aria-hidden />
        </Link>
    );
}

export function Section({
    children,
    className,
    labelledBy,
}: PropsWithChildren<{ className?: string; labelledBy?: string }>) {
    return (
        <section aria-labelledby={labelledBy} className={cn('px-6', className)}>
            <div className="mx-auto max-w-7xl">{children}</div>
        </section>
    );
}

export function IconBadge({ children }: { children: ReactNode }) {
    return (
        <span
            aria-hidden
            className="flex size-11 shrink-0 items-center justify-center text-crimson [&>svg]:size-6"
        >
            {children}
        </span>
    );
}
