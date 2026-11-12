import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { SiteLogo } from '@/components/site/logo';
import { useSite } from '@/lib/site';

export function SiteFooter() {
    const { shared, url } = useSite();
    const footer = shared.footer ?? {};

    const columns = [
        {
            title: footer.company_title,
            links: (footer.company_links ?? []).map((label, i) => ({
                label,
                href: i === 0 ? url('about') : url('about'),
            })),
        },
        {
            title: footer.services_title,
            links: (footer.services_links ?? []).map((label) => ({
                label,
                href: url('services'),
            })),
        },
        {
            title: footer.resources_title,
            links: (footer.resources_links ?? []).map((label) => ({
                label,
                href: url('insights'),
            })),
        },
    ];

    return (
        <footer className="border-t border-line bg-canvas">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_repeat(4,1fr)]">
                <div>
                    <SiteLogo />
                    {footer.tagline && (
                        <p className="mt-4 text-sm text-fog">
                            {footer.tagline}
                        </p>
                    )}
                    <div className="mt-5 flex gap-3">
                        {[Linkedin, Twitter, Instagram, Facebook].map(
                            (Icon, i) => (
                                <span
                                    key={i}
                                    className="flex size-7 items-center justify-center rounded-full border border-line text-fog"
                                    aria-hidden
                                >
                                    <Icon className="size-3" />
                                </span>
                            ),
                        )}
                    </div>
                </div>

                {columns.map((col) => (
                    <nav key={col.title} aria-label={col.title}>
                        <h3 className="text-xs font-bold tracking-[0.2em] text-ivory uppercase">
                            {col.title}
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                            {col.links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-fog transition-colors hover:text-ivory focus-visible:outline-2 focus-visible:outline-crimson"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}

                <div>
                    <h3 className="text-xs font-bold tracking-[0.2em] text-ivory uppercase">
                        {footer.contact_title}
                    </h3>
                    <ul className="mt-4 space-y-2.5 text-sm text-fog">
                        {footer.email && <li>{footer.email}</li>}
                        {footer.phone && <li>{footer.phone}</li>}
                        {footer.office && (
                            <li className="whitespace-pre-line">
                                {footer.office}
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <div className="border-t border-line">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-fog sm:flex-row">
                    <p>{footer.copyright}</p>
                    <ul className="flex gap-6">
                        {(footer.legal ?? []).map((label) => (
                            <li key={label}>
                                <span className="cursor-default transition-colors hover:text-ivory">
                                    {label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
