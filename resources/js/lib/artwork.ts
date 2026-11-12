import { usePage } from '@inertiajs/react';
import aiBrain from '../../assets/artwork/ai-brain.png';
import citySkyline from '../../assets/artwork/city-skyline.png';
import earthHemisphere from '../../assets/artwork/earth-hemisphere.png';
import fintechNetwork from '../../assets/artwork/fintech-network.png';
import globeMarketChart from '../../assets/artwork/globe-market-chart.png';
import receptionLobby from '../../assets/artwork/reception-lobby.png';
import redArchitecturalFacade from '../../assets/artwork/red-architectural-facade.png';
import worldMap from '../../assets/artwork/world-map.png';

/**
 * Central artwork registry. Templates reference artwork by key so the
 * final client-approved images can replace the provisional generated
 * artwork in one place.
 */
export const artwork: Record<string, { src: string; alt: string }> = {
    'ai-brain': { src: aiBrain, alt: 'Red glowing AI brain hologram' },
    'city-skyline': { src: citySkyline, alt: 'Modern city skyline at dusk' },
    'earth-hemisphere': {
        src: earthHemisphere,
        alt: 'Earth hemisphere with red illuminated networks',
    },
    'fintech-network': {
        src: fintechNetwork,
        alt: 'Blue fintech network illustration',
    },
    'globe-market-chart': {
        src: globeMarketChart,
        alt: 'Red wireframe globe over financial market charts',
    },
    'reception-lobby': {
        src: receptionLobby,
        alt: 'DARA Capital reception lobby with red accent lighting',
    },
    'red-architectural-facade': {
        src: redArchitecturalFacade,
        alt: 'Curved dark architecture with red facade lighting',
    },
    'world-map': {
        src: worldMap,
        alt: 'Crimson world map with network lights',
    },
};

export function art(
    key: string | null | undefined,
): { src: string; alt: string } | null {
    if (!key) {
        return null;
    }

    return artwork[key] ?? null;
}

/**
 * Artwork resolver honoring editor uploads. Uploaded replacements (shared
 * as the `artworkOverrides` prop) take precedence over the bundled registry.
 */
export function useArt() {
    const { artworkOverrides } = usePage().props as {
        artworkOverrides?: Record<string, { src: string; alt: string }>;
    };

    return (key: string | null | undefined) => {
        if (!key) {
            return null;
        }

        const override = artworkOverrides?.[key];
        if (override) {
            return {
                src: override.src,
                alt: override.alt || artwork[key]?.alt || '',
            };
        }

        return artwork[key] ?? null;
    };
}
