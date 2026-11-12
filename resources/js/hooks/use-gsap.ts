import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const reducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Short hero entrance: elements tagged [data-hero] inside the scope fade up.
 * Skipped entirely when the user prefers reduced motion - the static
 * layout is the default render, so nothing is ever hidden.
 */
export function useHeroEntrance(scope: RefObject<HTMLElement | null>) {
    useGSAP(
        () => {
            if (reducedMotion()) {
                return;
            }

            gsap.from('[data-hero]', {
                y: 24,
                autoAlpha: 0,
                duration: 0.7,
                ease: 'power2.out',
                stagger: 0.12,
            });
        },
        { scope },
    );
}

/**
 * Modest scroll reveal for card groups: children of [data-reveal-group]
 * fade up once when the group enters the viewport.
 */
export function useScrollReveals(scope: RefObject<HTMLElement | null>) {
    useGSAP(
        () => {
            if (reducedMotion()) {
                return;
            }

            gsap.utils
                .toArray<HTMLElement>('[data-reveal-group]')
                .forEach((group) => {
                    gsap.from(group.children, {
                        y: 20,
                        autoAlpha: 0,
                        duration: 0.5,
                        ease: 'power2.out',
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: group,
                            start: 'top 85%',
                            once: true,
                        },
                    });
                });
        },
        { scope },
    );
}
