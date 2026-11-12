# DARA Capital

Marketing website and content console for **DARA Capital** — a dark,
luxury-finance brand. The public site presents the firm's advisory
services, investment intelligence platform, and insights; an
authenticated console lets an editor manage page copy, translations,
artwork, articles, and consultation leads without touching code.

## Features

- Six public screens: Home, About, Services, Intelligence, Insights
  (with article detail and category filters), and Contact
- Localized URLs (`/en`, `/es`) with field-level English fallback
- Editor console at `/console`: page content, Insights posts, artwork
  uploads with alt text, and a lead inbox for form submissions
- CSRF-protected, rate-limited contact form with server-side validation
- GSAP hero entrances and card reveals that honor
  `prefers-reduced-motion`

## Technology

| Layer    | Stack                                                    |
| -------- | -------------------------------------------------------- |
| Backend  | Laravel 13, PHP 8.3, Fortify auth, Inertia, Wayfinder    |
| Frontend | React 19, TypeScript, Tailwind CSS 4, Vite               |
| Motion   | GSAP + `@gsap/react`                                     |
| Database | MySQL (SQLite works for a zero-setup demo)               |
| Testing  | Pest 4                                                   |

## Requirements

- PHP 8.3+, Composer 2
- Node 22+ (24.11+ recommended)
- MySQL 8+

## Getting started

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
```

Create the database, then configure `DB_*` in `.env`:

```bash
php artisan migrate
php artisan db:seed
php artisan storage:link   # serves editor-uploaded artwork
```

Editor access is configured through the `DARA_EDITOR_*` variables in
`.env` before seeding — see `.env.example`. Public registration is
disabled.

## Development

```bash
composer run dev      # artisan serve + queue + vite dev (concurrently)
# or individually:
php artisan serve
npm run dev
```

- Site: `http://localhost:8000` → redirects to `/en`
- Editor console: `/console` (sign-in at `/console/login`)

## Useful commands

| Task                     | Command                                      |
| ------------------------ | -------------------------------------------- |
| Tests                    | `php artisan test`                           |
| Production build         | `npm run build`                              |
| Lint + format            | `npm run check` / `npm run check:fix`        |
| Typecheck                | `npm run types:check`                        |
| PHP style                | `vendor/bin/pint`                            |
| Regenerate route helpers | `php artisan wayfinder:generate --with-form` |

## Architecture notes

### Content & locales

- Fixed pages store JSON content in `pages` + `page_translations`
  (`key` / `locale` / `data`). Field shapes are defined in
  `app/Content/PageSchema.php` — the editor renders its forms from that
  schema and the server validates submitted paths against it.
- `App\Support\Content::page($key, $locale)` merges the requested
  locale over English field-by-field, so partial translations always
  render complete pages.
- Insights posts are a real model (`posts` + `post_translations`) with
  category, ordering, publish date, and publish state.

### Artwork

- Artwork lives in `resources/assets/artwork/` and is registered by
  key in `resources/js/lib/artwork.ts`; templates never hardcode asset
  paths.
- Editors can replace any key and edit its alt text under
  `/console/artwork` (uploads validate type/size and store on the
  `public` disk).

### Dashboard demo data

The Intelligence dashboard (metric cards, sparklines, risk donut,
opportunities table) renders sample data editable under
`/console/pages/intelligence`. There is no live platform behind
"Explore Platform" — it anchors to the on-page preview.

## Reference material

`reference/` holds the brief, the high-resolution mockup, the asset
inventory, and the transcribed copy — kept outside the public web
root.

## Handoff notes / unverified items

- **Metrics are unverified claims** copied from the mockup (150+
  deals, $2B+ raised, etc.) — confirm or adjust in the console.
- **Contact details are placeholders** (`+1 (234) 567-8900`,
  `123 Capital Way…`).
- **Spanish content is a sample translation** pending confirmation.
  Pages without `es` content demonstrate the English fallback.
- Mail delivery and external CRM sync for leads are intentionally out
  of scope (leads are reviewed in the built-in inbox).

## Author

Developed by **Mark Oliver Caneda**.
