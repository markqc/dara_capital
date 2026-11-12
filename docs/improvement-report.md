# Improvement report — DARA Capital

Recommendations for follow-up work after the assignment scope. Each entry
covers the observed issue, user impact, proposed change, and priority.
Redesign ideas are listed here (not implemented) so the delivered screens
stay faithful to the reference.

## 1. Image weight on hero and card artwork

**Issue.** The provisional artwork is served as full-resolution PNGs
(~400–650 KB each). Only `width`/`height` and lazy-loading on cards are in
place.

**Impact.** Slower first paint on mobile connections, especially the two
above-the-fold hero images; the PNGs could be 5–10× smaller as WebP/AVIF.

**Change.** Convert artwork to WebP/AVIF with responsive `srcset`, add
explicit `sizes`, and generate the variants at upload time (e.g. via an
image-processing queue job) so editor-uploaded replacements get the same
treatment.

**Priority.** High.

## 2. Consultation path clarity on mobile

**Issue.** The header "Book Consultation" button is hidden below `md`, and
the primary mobile path to it is inside the collapsed menu. Page-level
CTAs reach `/contact`, but there is no persistent CTA on small screens.

**Impact.** On phones — likely a large share of the audience — the main
conversion action takes two taps instead of one.

**Change.** Show the CTA button in the mobile header (or a sticky bottom
bar on scroll) so the consultation path is always one tap away.

**Priority.** High.

## 3. Contact form: mail delivery & spam hardening

**Issue.** Leads persist to the inbox, but no notification mail is sent
and spam protection is limited to IP rate limiting.

**Impact.** Staff may miss new leads; a motivated script could still fill
the inbox despite throttling.

**Change.** Add a notification mail (or webhook to the client's CRM once
confirmed) and a honeypot field or Turnstile-style challenge on top of the
rate limiter.

**Priority.** High.

## 4. Server-side rendering / SEO metadata

**Issue.** Pages render client-side via Inertia without SSR; `<title>`
and meta description come from React on hydration only. No `og:`/`twitter:`
tags, no `hreflang` alternates between `/en` and `/es`.

**Impact.** Weaker SEO and social previews; crawlers without JS may see
an empty page. Locale alternates are needed for multilingual indexing.

**Change.** Enable Inertia SSR (`build:ssr`) or pre-render the six pages;
emit per-page meta descriptions and `hreflang` link tags in the blade
template.

**Priority.** Medium-High.

## 5. Contrast of muted copy

**Issue.** Secondary text uses `#A8A4A7` on `#050506` (~5.9:1 — passes AA
for normal text, but small placeholder text and table headers sit near the
threshold on the `#101012` card surface).

**Impact.** Reduced readability for low-vision users in dense areas like
the dashboard table and form placeholders.

**Change.** Bump muted copy for sub-14px text to a lighter gray (e.g.
`#C4C1C4`), keeping `#A8A4A7` for larger secondary copy.

**Priority.** Medium.

## 6. Insights card grid density on desktop

**Issue.** The mockup shows four cards per row; on wide screens the cards
become narrow and image-heavy with small text, while the list is capped
by seed data rather than pagination.

**Impact.** With more than ~8 posts the page grows long; card text is
cramped at 4-up on very wide screens.

**Change.** Paginate or load-more beyond 8 posts, and consider a 3-column
cap at ≥1440px. Keep 4-up to match the mockup until approved.

**Priority.** Medium.

## 7. Editor experience improvements

**Issue.** The CMS covers copy, posts, leads, and artwork, but lacks
preview links, publish scheduling, and revision history.

**Impact.** Editors cannot see changes before they go live and cannot
undo mistakes.

**Change.** Add a "view page" link per locale, draft/publish state for
page translations, and a simple `content_revisions` audit trail.

**Priority.** Medium.

## 8. Keyboard focus on the metrics and cards

**Issue.** Cards and metric tiles are non-interactive (correct), but the
crimson focus ring uses `outline` on a dark canvas and could be more
visible; the mobile menu doesn't trap focus while open.

**Impact.** Keyboard users get a workable but faint focus indicator;
focus can escape behind the open menu.

**Change.** Strengthen the focus ring (2px offset, higher-contrast color)
and trap/return focus in the mobile menu.

**Priority.** Medium.

## 9. Fonts

**Issue.** Baskerville is approximated with Libre Baskerville + a serif
fallback stack; Arial is a system font.

**Impact.** On platforms without Baskerville installed the heading voice
differs slightly from the original brand typography.

**Change.** Load the confirmed brand font files once supplied (the
`@theme` font tokens make this a one-line change).

**Priority.** Low (pending brand assets).

## 10. Long-translation stress

**Issue.** German/Spanish-style expansions (~30%) can push the fixed-width
hero heading and 4-up card grids.

**Impact.** Heading lines and card copy could wrap awkwardly or overflow
in longer locales.

**Change.** Verified at 390/768/1440px for the current sample; add
`text-wrap: balance` on display headings and clamp-based font sizes if
more locales are added.

**Priority.** Low.
