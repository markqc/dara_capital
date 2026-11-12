import { Link, usePage } from "@inertiajs/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { LocaleSwitcher } from "@/components/site/locale-switcher";
import { SiteLogo } from "@/components/site/logo";
import { NAV_PATHS, useSite } from "@/lib/site";

export function SiteHeader() {
    const { shared, url } = useSite();
    const { url: currentUrl } = usePage();
    const [open, setOpen] = useState(false);

    const labels = shared.nav ?? [];
    const currentPath = currentUrl.split("?")[0];

    const nav = NAV_PATHS.map((path, i) => ({
        label: labels[i] ?? path,
        href: url(path),
        active:
            currentPath === url(path) ||
            (path === "" && currentPath === url("")),
    }));

    return (
        <header className="relative z-40 border-b border-line/60 bg-canvas/90 backdrop-blur">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-crimson focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
            >
                Skip to content
            </a>
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
                <SiteLogo />

                <nav aria-label="Primary" className="hidden lg:block">
                    <ul className="flex items-center gap-8">
                        {nav.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    aria-current={
                                        item.active ? "page" : undefined
                                    }
                                    className={`relative text-sm transition-colors focus-visible:outline-2 focus-visible:outline-crimson ${
                                        item.active
                                            ? "text-ivory after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-crimson"
                                            : "text-fog hover:text-ivory"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:block">
                        <LocaleSwitcher />
                    </div>
                    <Link
                        href={url("contact")}
                        className="hidden items-center gap-2 bg-crimson-deep px-5 py-2.5 text-xs font-bold tracking-wider text-ivory uppercase transition-colors hover:bg-crimson focus-visible:outline-2 focus-visible:outline-ivory md:inline-flex"
                    >
                        {shared.cta ?? "Book Consultation"}
                        <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                    <button
                        type="button"
                        className="inline-flex size-10 items-center justify-center text-ivory focus-visible:outline-2 focus-visible:outline-crimson lg:hidden"
                        aria-expanded={open}
                        aria-controls="mobile-nav"
                        aria-label="Toggle navigation menu"
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? (
                            <X className="size-5" aria-hidden />
                        ) : (
                            <Menu className="size-5" aria-hidden />
                        )}
                    </button>
                </div>
            </div>

            {open && (
                <nav
                    id="mobile-nav"
                    aria-label="Mobile"
                    className="border-t border-line bg-canvas lg:hidden"
                >
                    <ul className="space-y-1 px-6 py-4">
                        {nav.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    aria-current={
                                        item.active ? "page" : undefined
                                    }
                                    onClick={() => setOpen(false)}
                                    className={`block py-2.5 text-base ${
                                        item.active
                                            ? "text-crimson"
                                            : "text-ivory hover:text-crimson"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li className="pt-3">
                            <Link
                                href={url("contact")}
                                onClick={() => setOpen(false)}
                                className="inline-flex items-center gap-2 bg-crimson-deep px-5 py-2.5 text-xs font-bold tracking-wider text-ivory uppercase"
                            >
                                {shared.cta ?? "Book Consultation"}
                                <ArrowRight className="size-3.5" aria-hidden />
                            </Link>
                        </li>
                        <li className="pt-3">
                            <LocaleSwitcher />
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}
