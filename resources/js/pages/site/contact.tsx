import { Head, useForm, usePage } from '@inertiajs/react';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { useRef } from 'react';
import { Eyebrow, Section } from '@/components/site/ui';
import { useHeroEntrance } from '@/hooks/use-gsap';
import { useSite } from '@/lib/site';

interface ContactContent {
    hero?: {
        eyebrow?: string;
        heading?: string;
        body?: string;
    };
    details?: {
        email?: string;
        phone?: string;
        office?: string;
    };
    form?: {
        title?: string;
        name_label?: string;
        name_placeholder?: string;
        email_label?: string;
        email_placeholder?: string;
        company_label?: string;
        company_placeholder?: string;
        industry_label?: string;
        funding_label?: string;
        message_label?: string;
        message_placeholder?: string;
        submit?: string;
    };
    success?: string;
}

const FIELD_LABELS: Record<string, string> = {
    technology: 'Technology',
    fintech: 'Fintech',
    healthcare: 'Healthcare',
    energy: 'Energy',
    'real-estate': 'Real Estate',
    consumer: 'Consumer',
    industrial: 'Industrial',
    other: 'Other',
    'under-1m': 'Under $1M',
    '1m-5m': '$1M – $5M',
    '5m-25m': '$5M – $25M',
    '25m-100m': '$25M – $100M',
    'over-100m': 'Over $100M',
    undisclosed: 'Prefer not to say',
};

const inputClass =
    'w-full border border-line bg-canvas px-4 py-3 text-sm text-ivory placeholder:text-fog/60 focus:border-crimson focus:outline-none';
const labelClass = 'mb-2 block text-xs text-fog';
const errorClass = 'mt-1.5 text-xs text-crimson';

export default function Contact({
    content,
    industries,
    fundingRanges,
}: {
    content: ContactContent;
    industries: string[];
    fundingRanges: string[];
}) {
    const { url } = useSite();
    const { errors, flash } = usePage().props as {
        errors: Record<string, string>;
        flash?: { success?: boolean };
    };
    const success = !!flash?.success;
    const scope = useRef<HTMLDivElement>(null);
    useHeroEntrance(scope);

    const hero = content.hero ?? {};
    const details = content.details ?? {};
    const form = content.form ?? {};

    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        company: '',
        industry: '',
        funding_range: '',
        message: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(url('contact'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const contactItems = [
        { icon: Mail, label: 'Email', value: details.email },
        { icon: Phone, label: 'Phone', value: details.phone },
        { icon: MapPin, label: 'Office', value: details.office },
    ].filter((item) => item.value);

    return (
        <div ref={scope}>
            <Head title={hero.heading} />

            <Section className="py-16 lg:py-24">
                <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
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
                                className="mt-6 max-w-md text-base leading-relaxed text-fog"
                            >
                                {hero.body}
                            </p>
                        )}

                        <ul className="mt-12 space-y-6">
                            {contactItems.map((item) => (
                                <li
                                    key={item.label}
                                    data-hero
                                    className="flex gap-4"
                                >
                                    <span
                                        aria-hidden
                                        className="flex size-10 shrink-0 items-center justify-center border border-line text-crimson"
                                    >
                                        <item.icon className="size-4" />
                                    </span>
                                    <div>
                                        <p className="text-xs font-bold tracking-wider text-fog uppercase">
                                            {item.label}
                                        </p>
                                        <p className="mt-1 text-sm whitespace-pre-line text-ivory">
                                            {item.value}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Consultation form */}
                    <div
                        data-hero
                        className="border border-line bg-surface p-8"
                    >
                        <h2 className="font-display text-2xl text-ivory">
                            {form.title}
                        </h2>

                        {success && (
                            <p
                                role="status"
                                className="mt-4 border border-positive/40 bg-positive/10 px-4 py-3 text-sm text-positive"
                            >
                                {content.success}
                            </p>
                        )}

                        <form
                            onSubmit={submit}
                            className="mt-6 space-y-5"
                            noValidate
                        >
                            <div>
                                <label htmlFor="name" className={labelClass}>
                                    {form.name_label}
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    placeholder={form.name_placeholder}
                                    aria-invalid={!!errors.name}
                                    aria-describedby={
                                        errors.name ? 'name-error' : undefined
                                    }
                                    required
                                    className={inputClass}
                                />
                                {errors.name && (
                                    <p id="name-error" className={errorClass}>
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className={labelClass}>
                                    {form.email_label}
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    placeholder={form.email_placeholder}
                                    aria-invalid={!!errors.email}
                                    aria-describedby={
                                        errors.email ? 'email-error' : undefined
                                    }
                                    required
                                    className={inputClass}
                                />
                                {errors.email && (
                                    <p id="email-error" className={errorClass}>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="company"
                                        className={labelClass}
                                    >
                                        {form.company_label}
                                    </label>
                                    <input
                                        id="company"
                                        type="text"
                                        value={data.company}
                                        onChange={(e) =>
                                            setData('company', e.target.value)
                                        }
                                        placeholder={form.company_placeholder}
                                        aria-invalid={!!errors.company}
                                        className={inputClass}
                                    />
                                    {errors.company && (
                                        <p className={errorClass}>
                                            {errors.company}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="industry"
                                        className={labelClass}
                                    >
                                        {form.industry_label}
                                    </label>
                                    <select
                                        id="industry"
                                        value={data.industry}
                                        onChange={(e) =>
                                            setData('industry', e.target.value)
                                        }
                                        aria-invalid={!!errors.industry}
                                        className={inputClass}
                                    >
                                        <option value="">
                                            Select industry
                                        </option>
                                        {industries.map((key) => (
                                            <option key={key} value={key}>
                                                {FIELD_LABELS[key] ?? key}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.industry && (
                                        <p className={errorClass}>
                                            {errors.industry}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="funding_range"
                                    className={labelClass}
                                >
                                    {form.funding_label}
                                </label>
                                <select
                                    id="funding_range"
                                    value={data.funding_range}
                                    onChange={(e) =>
                                        setData('funding_range', e.target.value)
                                    }
                                    aria-invalid={!!errors.funding_range}
                                    className={inputClass}
                                >
                                    <option value="">Select range</option>
                                    {fundingRanges.map((key) => (
                                        <option key={key} value={key}>
                                            {FIELD_LABELS[key] ?? key}
                                        </option>
                                    ))}
                                </select>
                                {errors.funding_range && (
                                    <p className={errorClass}>
                                        {errors.funding_range}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="message" className={labelClass}>
                                    {form.message_label}
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={data.message}
                                    onChange={(e) =>
                                        setData('message', e.target.value)
                                    }
                                    placeholder={form.message_placeholder}
                                    aria-invalid={!!errors.message}
                                    aria-describedby={
                                        errors.message
                                            ? 'message-error'
                                            : undefined
                                    }
                                    required
                                    className={inputClass}
                                />
                                {errors.message && (
                                    <p
                                        id="message-error"
                                        className={errorClass}
                                    >
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 bg-crimson-deep px-6 py-3 text-xs font-bold tracking-wider text-ivory uppercase transition-colors hover:bg-crimson focus-visible:outline-2 focus-visible:outline-ivory disabled:opacity-50"
                            >
                                {form.submit}
                                <ArrowRight className="size-4" aria-hidden />
                            </button>
                        </form>
                    </div>
                </div>
            </Section>
        </div>
    );
}
