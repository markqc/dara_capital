import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useRef } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { SiteLogo } from '@/components/site/logo';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useHeroEntrance } from '@/hooks/use-gsap';
import { useArt } from '@/lib/artwork';
import { useSite } from '@/lib/site';
import { store } from '@/routes/login';

type Props = {
    status?: string;
};

export default function Login({ status }: Props) {
    const scope = useRef<HTMLDivElement>(null);
    const { url } = useSite();
    const artwork = useArt()('globe-market-chart');

    useHeroEntrance(scope);

    return (
        <div
            ref={scope}
            className="grid min-h-dvh grid-cols-1 bg-canvas text-ivory lg:grid-cols-[54fr_46fr]"
        >
            <Head title="Sign in" />

            {/* Artwork panel */}
            <div className="relative hidden overflow-hidden bg-black lg:block">
                {artwork && (
                    <img
                        src={artwork.src}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-contain"
                    />
                )}
                <div data-hero className="absolute top-10 left-10">
                    <SiteLogo />
                </div>
            </div>

            {/* Form panel */}
            <div className="flex flex-col lg:border-l lg:border-line">
                <div className="mx-auto flex w-full max-w-sm items-center justify-between px-6 pt-8 sm:px-0 lg:pt-12">
                    <span className="lg:hidden">
                        <SiteLogo />
                    </span>
                    <Link
                        href={url('')}
                        data-hero
                        className="inline-flex items-center gap-2 rounded text-sm text-fog transition-colors outline-none hover:text-ivory focus-visible:ring-2 focus-visible:ring-crimson"
                    >
                        <ArrowLeft className="size-4" aria-hidden="true" />
                        Back to website
                    </Link>
                </div>

                <div className="flex flex-1 items-center px-6 pt-10 pb-16 sm:px-0">
                    <div className="mx-auto w-full max-w-sm">
                        <h1
                            data-hero
                            className="font-display text-5xl text-ivory"
                        >
                            Sign in
                        </h1>

                        {status && (
                            <p className="mt-4 text-sm text-positive">
                                {status}
                            </p>
                        )}

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="mt-10 flex flex-col gap-7"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div data-hero className="grid gap-2">
                                        <Label
                                            htmlFor="email"
                                            className="text-sm font-semibold text-ivory"
                                        >
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            autoComplete="email"
                                            placeholder="you@example.com"
                                            className="h-11 rounded border-line bg-surface px-4 text-ivory placeholder:text-fog/70"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div data-hero className="grid gap-2">
                                        <Label
                                            htmlFor="password"
                                            className="text-sm font-semibold text-ivory"
                                        >
                                            Password
                                        </Label>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            required
                                            autoComplete="current-password"
                                            placeholder="Enter your password"
                                            className="h-11 rounded border-line bg-surface px-4 text-ivory placeholder:text-fog/70"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div
                                        data-hero
                                        className="flex items-center space-x-3"
                                    >
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                        />
                                        <Label
                                            htmlFor="remember"
                                            className="text-sm text-fog"
                                        >
                                            Remember me
                                        </Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        data-hero
                                        className="h-11 w-full rounded bg-crimson-deep font-semibold text-ivory hover:bg-crimson"
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && <Spinner />}
                                        Sign in
                                    </Button>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
