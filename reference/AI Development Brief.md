# DARA Capital technical assignment

Build the DARA Capital website as a working Laravel application. Implement the six screens in the reference, give an authorized editor an interface for updating multilingual content, and submit a short report identifying possible improvements and why they matter. Implement the modules below in order. If prompted to work on a single module, complete and verify that module and identify its dependencies.

## 01 · Reference and project setup

- Read the repository instructions and inspect the existing stack first. For a fresh project, use Laravel with its official React starter kit, Inertia, Vite, and Tailwind CSS. TypeScript in the starter kit is fine. Use GSAP and `@gsap/react` for motion. Keep the public site and admin in one Laravel app. Reuse compatible dependencies and commit lockfiles. Use SQLite for a simple local demo unless the project already uses another database.
- Review the [original six-screen mockup](https://drive.google.com/file/d/1DG8oVbohh8NxDzR5POW8WVK5JK1KhcM_/view), then use the [local high-resolution recreation](DARA%20Capital%20-%20High%20Resolution.png) for convenience, [Website Copy.docx](Website%20Copy.docx) for transcribed copy, and the [asset inventory](Asset%20Inventory.md) for type, color, and artwork. When the references differ, follow the original mockup. Treat the reconstruction and transcription as working references, especially for small text and dashboard values.
- Use the generated artwork in [Artwork](Artwork/) while the original assets are pending. Keep asset references configurable so source images, fonts, logo, and icons can be swapped without rewriting templates. If a Figma or design file is provided, verify measurements, typography, and exports against it. Keep the project's reference artifacts outside the public web root. Render live text, controls, and charts with separate assets.
- Run the app locally and record the install, database, seed, and development commands in the README. Continue with provisional assets and languages while waiting for the final inputs.

## 02 · Shared public layout

- Set up routes for Home, About, Services, Intelligence, Insights, and Contact. Use shared header, navigation, mobile menu, consultation CTA, footer, buttons, cards, and section layout. Match each screen's visible sections and proportions. Follow the mockup's footer treatment and give visitors a consistent way to navigate.
- Create Tailwind theme tokens for the near-black backgrounds, charcoal cards, crimson accents, warm white text, and subdued secondary copy. Start with the inventory's Baskerville and Arial matches, then use confirmed source fonts if supplied. Match the desktop design before adapting it to tablet and mobile.
- Use semantic landmarks, a visible focus state, readable contrast, keyboard-accessible controls, meaningful alt text, and stable image dimensions. Keep decorative art out of the accessibility tree. Check for overflow at 390, 768, and 1440 CSS pixels.

## 03 · Content, localization, and editor

- Build an authenticated Laravel/Inertia admin that lets a nontechnical editor update page copy, shared navigation and footer text, CTAs, images and alt text, service cards, dashboard demo values, contact details, and Insights posts. A small CMS covers content editing. The lead inbox in Module 09 demonstrates basic CRM functionality.
- Store each fixed page under a stable key and give it locale-specific fields or records. Use predictable field definitions for repeated cards and metrics. Keep Insights in its own model with stable post identifiers, categories, translations, ordering, and publication state. Seed the English version from the provided copy and mark unverified claims or placeholder contact details in the handoff.
- Use Laravel translation files for interface and validation strings. Resolve editable copy from the database. Use English as the default and demonstrate a configurable second locale with clearly identified sample translations pending confirmation. Make the locale switch preserve the current page, category, or post where available. Define how missing translations fall back to English, and set the HTML language to match the rendered content. Keep public links and navigation locale-aware.
- Require Laravel authorization for editor routes and actions, validate changes on the server, and disable open admin signup. For asset uploads, validate file types and size and use managed storage. Keep sample admin credentials out of version control. Verify that saving an edit in one language updates the corresponding public page without changing the other language.

## 04 · Home

- Build the three-line hero, crimson globe and market artwork, both hero CTAs, trust features, and four metrics. Match the spacing and red emphasis of the reference.
- Route **Schedule Consultation** and the header CTA to the contact form. Route **Explore Services** to Services. Verify the artwork stays legible behind text and the metrics wrap cleanly on narrow screens.

## 05 · About

- Build the split intro with reception artwork, Mission/Vision/Purpose/Philosophy cards, four company metrics, and the closing quote over red streaks. Connect copy, metrics, and media to the editor. Check that longer translations fit without clipping.

## 06 · Services

- Build the heading and architectural artwork, eight service cards in their reference order, and the consultation callout. Retain the desktop grid and reduce the column count at smaller widths.
- Give every **Learn More** control a working destination. If separate service detail pages are outside the supplied design, use accessible expandable details within Services. Use approved detail copy where available and label any sample additions in the handoff.

## 07 · Intelligence

- Build the introductory copy, feature checklist, CTA, dashboard metric cards, sparklines, risk donut, opportunities table, and benefits strip. Implement the dashboard as accessible HTML and lightweight charts with text equivalents.
- Treat the metrics, opportunities, and charts as sample data. Keep the public page faithful to the reference and document the demo scope in the README. If no platform URL is supplied, link **Explore Platform** to the dashboard preview on the page.

## 08 · Insights

- Build the globe hero, category controls, four article cards, and **View All Insights** CTA. Use the mockup's card order, categories, dates, and excerpts where readable. Support keyboard navigation, shareable filter URLs, and an empty state.
- Make **Read More** open a shared article template and **View All Insights** clear the active filter and show the full published list. Seed excerpts from the reference. Where article body copy is missing, leave it editable and use the available excerpt on the demo detail view.

## 09 · Contact and lead inbox

- Match the contact details, consultation form, and footer. Use the reference's name, email, company, industry, funding range, and message fields. Validate on the server, preserve values after a validation failure, associate errors with their fields, and give clear submission feedback.
- Persist submissions in Laravel, protect the form with CSRF and rate limiting, and display leads only to authorized staff in a simple inbox. Treat actual mail delivery and external CRM integrations as optional pending confirmation. Verify that valid submissions appear in the inbox and invalid submissions create no record.

## 10 · GSAP motion

- Add motion after the static layouts match. Use short hero entrances and modest reveals on selected card groups. Use `useGSAP` with component-scoped refs and cleanup across Inertia navigation. Add ScrollTrigger only where it serves a specific reveal.
- Honor `prefers-reduced-motion` and keep the final static layout available immediately in that mode. Use transforms and opacity, avoid scroll hijacking, and keep links, navigation, and the form usable during animation.

## 11 · Verification and submission

- Compare desktop screenshots of all six routes to the mockup. Check mobile layouts, long translations, keyboard navigation, reduced motion, broken links, localized metadata, filter URLs, editor permissions, and contact form behavior.
- Run the project's tests and production build. Cover the six public routes, locale switching and fallback, editor authorization and save behavior, and contact validation and storage. Record the checks performed and any remaining gaps.
- Deliver the source code, setup README, demo seed data, and steps to access the editor and lead inbox. Include screenshots or a demo link if available. Note which reference assets were replaced with approved originals and which remain provisional. Avoid publishing client assets or a live demo without permission.
- Add `docs/improvement-report.md`. For each recommendation, describe the observed issue, the user impact, the proposed change, and its priority. Consider mobile layout, accessibility, image performance, and clarity of consultation paths. Keep optional redesign ideas in the report so the delivered screens still match the assignment.

## Official implementation references

- [Laravel React starter kit](https://laravel.com/starter-kits)
- [Laravel localization](https://laravel.com/docs/13.x/localization)
- [Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [GSAP with React](https://gsap.com/resources/React/)
