import { Link } from '@inertiajs/react';
import logo from '../../../assets/logo.png';
import { useSite } from '@/lib/site';

export function SiteLogo() {
    const { url } = useSite();

    return (
        <Link
            href={url('')}
            className="group inline-flex outline-none focus-visible:ring-2 focus-visible:ring-crimson"
            aria-label="DARA Capital home"
        >
            <img src={logo} alt="DARA Capital" className="h-10 w-auto" />
        </Link>
    );
}
