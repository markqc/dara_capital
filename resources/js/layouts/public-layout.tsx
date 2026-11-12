import type { PropsWithChildren } from 'react';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';

export default function PublicLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col bg-canvas font-body text-ivory antialiased">
            <SiteHeader />
            <main id="main-content" className="flex-1">
                {children}
            </main>
            <SiteFooter />
        </div>
    );
}
