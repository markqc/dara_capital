<?php

namespace App\Content;

/**
 * Field schema for the fixed pages. The admin editor renders a form from
 * these definitions and the public site resolves the stored JSON with an
 * English fallback.
 *
 * Field types: text | textarea | richtext | list | group | image
 *  - list items need 'of'   => field type, plus optional 'fields' for groups
 *  - image values are artwork keys from resources/js/lib/artwork.ts
 */
class PageSchema
{
    public static function pages(): array
    {
        return ['shared', 'home', 'about', 'services', 'intelligence', 'insights', 'contact'];
    }

    public static function fields(string $page): array
    {
        return match ($page) {
            'shared' => [
                ['key' => 'nav', 'type' => 'list', 'of' => 'text', 'label' => 'Navigation labels (Home · About · Services · Intelligence · Insights · Contact)', 'count' => 6],
                ['key' => 'cta', 'type' => 'text', 'label' => 'Header consultation button'],
                ['key' => 'footer.tagline', 'type' => 'text', 'label' => 'Footer tagline'],
                ['key' => 'footer.company_title', 'type' => 'text', 'label' => 'Footer column: Company title'],
                ['key' => 'footer.company_links', 'type' => 'list', 'of' => 'text', 'label' => 'Footer Company links', 'count' => 4],
                ['key' => 'footer.services_title', 'type' => 'text', 'label' => 'Footer column: Services title'],
                ['key' => 'footer.services_links', 'type' => 'list', 'of' => 'text', 'label' => 'Footer Services links', 'count' => 4],
                ['key' => 'footer.resources_title', 'type' => 'text', 'label' => 'Footer column: Resources title'],
                ['key' => 'footer.resources_links', 'type' => 'list', 'of' => 'text', 'label' => 'Footer Resources links', 'count' => 4],
                ['key' => 'footer.contact_title', 'type' => 'text', 'label' => 'Footer column: Contact title'],
                ['key' => 'footer.email', 'type' => 'text', 'label' => 'Footer contact email'],
                ['key' => 'footer.phone', 'type' => 'text', 'label' => 'Footer contact phone'],
                ['key' => 'footer.office', 'type' => 'textarea', 'label' => 'Footer office address'],
                ['key' => 'footer.copyright', 'type' => 'text', 'label' => 'Copyright line'],
                ['key' => 'footer.legal', 'type' => 'list', 'of' => 'text', 'label' => 'Legal links', 'count' => 2],
            ],
            'home' => [
                ['key' => 'hero.eyebrow', 'type' => 'text', 'label' => 'Hero eyebrow'],
                ['key' => 'hero.lines', 'type' => 'list', 'of' => 'text', 'label' => 'Hero heading lines (last line renders crimson)', 'count' => 3],
                ['key' => 'hero.body', 'type' => 'textarea', 'label' => 'Hero body copy'],
                ['key' => 'hero.primary_cta', 'type' => 'text', 'label' => 'Primary CTA label'],
                ['key' => 'hero.secondary_cta', 'type' => 'text', 'label' => 'Secondary CTA label'],
                ['key' => 'hero.art', 'type' => 'image', 'label' => 'Hero artwork'],
                ['key' => 'hero.trust_title', 'type' => 'text', 'label' => 'Trust strip title'],
                ['key' => 'hero.features', 'type' => 'list', 'of' => 'text', 'label' => 'Trust features', 'count' => 5],
                ['key' => 'metrics', 'type' => 'list', 'of' => 'group', 'label' => 'Metrics', 'count' => 4, 'fields' => [
                    ['key' => 'value', 'type' => 'text', 'label' => 'Value'],
                    ['key' => 'label', 'type' => 'text', 'label' => 'Label'],
                ]],
            ],
            'about' => [
                ['key' => 'hero.eyebrow', 'type' => 'text', 'label' => 'Hero eyebrow'],
                ['key' => 'hero.heading', 'type' => 'textarea', 'label' => 'Hero heading'],
                ['key' => 'hero.body', 'type' => 'textarea', 'label' => 'Hero body copy'],
                ['key' => 'hero.art', 'type' => 'image', 'label' => 'Hero artwork'],
                ['key' => 'values', 'type' => 'list', 'of' => 'group', 'label' => 'Mission / Vision / Purpose / Philosophy', 'count' => 4, 'fields' => [
                    ['key' => 'title', 'type' => 'text', 'label' => 'Title'],
                    ['key' => 'body', 'type' => 'textarea', 'label' => 'Body'],
                ]],
                ['key' => 'metrics', 'type' => 'list', 'of' => 'group', 'label' => 'Metrics', 'count' => 4, 'fields' => [
                    ['key' => 'value', 'type' => 'text', 'label' => 'Value'],
                    ['key' => 'label', 'type' => 'text', 'label' => 'Label'],
                ]],
                ['key' => 'quote', 'type' => 'textarea', 'label' => 'Closing quote'],
            ],
            'services' => [
                ['key' => 'hero.eyebrow', 'type' => 'text', 'label' => 'Hero eyebrow'],
                ['key' => 'hero.heading', 'type' => 'textarea', 'label' => 'Hero heading'],
                ['key' => 'hero.body', 'type' => 'textarea', 'label' => 'Hero body copy'],
                ['key' => 'hero.art', 'type' => 'image', 'label' => 'Hero artwork'],
                ['key' => 'services', 'type' => 'list', 'of' => 'group', 'label' => 'Service cards', 'count' => 8, 'fields' => [
                    ['key' => 'title', 'type' => 'text', 'label' => 'Title'],
                    ['key' => 'body', 'type' => 'textarea', 'label' => 'Summary'],
                    ['key' => 'details', 'type' => 'textarea', 'label' => 'Details (Learn More)'],
                ]],
                ['key' => 'cta.heading', 'type' => 'text', 'label' => 'Callout heading'],
                ['key' => 'cta.body', 'type' => 'textarea', 'label' => 'Callout body'],
                ['key' => 'cta.button', 'type' => 'text', 'label' => 'Callout button label'],
            ],
            'intelligence' => [
                ['key' => 'hero.eyebrow', 'type' => 'text', 'label' => 'Hero eyebrow'],
                ['key' => 'hero.heading', 'type' => 'textarea', 'label' => 'Hero heading'],
                ['key' => 'hero.body', 'type' => 'textarea', 'label' => 'Hero body copy'],
                ['key' => 'hero.cta', 'type' => 'text', 'label' => 'CTA label'],
                ['key' => 'features', 'type' => 'list', 'of' => 'text', 'label' => 'Feature checklist', 'count' => 5],
                ['key' => 'dashboard.title', 'type' => 'text', 'label' => 'Dashboard title'],
                ['key' => 'dashboard.metrics', 'type' => 'list', 'of' => 'group', 'label' => 'Dashboard metric cards', 'count' => 5, 'fields' => [
                    ['key' => 'label', 'type' => 'text', 'label' => 'Label'],
                    ['key' => 'value', 'type' => 'text', 'label' => 'Value'],
                    ['key' => 'status', 'type' => 'text', 'label' => 'Status'],
                    ['key' => 'spark', 'type' => 'text', 'label' => 'Sparkline points (comma-separated numbers)'],
                ]],
                ['key' => 'dashboard.risk_title', 'type' => 'text', 'label' => 'Risk chart title'],
                ['key' => 'dashboard.risk', 'type' => 'list', 'of' => 'group', 'label' => 'Risk distribution', 'count' => 3, 'fields' => [
                    ['key' => 'label', 'type' => 'text', 'label' => 'Label'],
                    ['key' => 'percent', 'type' => 'text', 'label' => 'Percent'],
                ]],
                ['key' => 'dashboard.opportunities_title', 'type' => 'text', 'label' => 'Opportunities table title'],
                ['key' => 'dashboard.opportunities', 'type' => 'list', 'of' => 'group', 'label' => 'Recent opportunities', 'count' => 4, 'fields' => [
                    ['key' => 'company', 'type' => 'text', 'label' => 'Company'],
                    ['key' => 'industry', 'type' => 'text', 'label' => 'Industry'],
                    ['key' => 'score', 'type' => 'text', 'label' => 'Score'],
                    ['key' => 'grade', 'type' => 'text', 'label' => 'Investment grade'],
                    ['key' => 'status', 'type' => 'text', 'label' => 'Status'],
                ]],
                ['key' => 'benefits', 'type' => 'list', 'of' => 'text', 'label' => 'Benefits strip', 'count' => 4],
            ],
            'insights' => [
                ['key' => 'hero.eyebrow', 'type' => 'text', 'label' => 'Hero eyebrow'],
                ['key' => 'hero.heading', 'type' => 'textarea', 'label' => 'Hero heading'],
                ['key' => 'hero.body', 'type' => 'textarea', 'label' => 'Hero body copy'],
                ['key' => 'hero.art', 'type' => 'image', 'label' => 'Hero artwork'],
                ['key' => 'categories', 'type' => 'list', 'of' => 'group', 'label' => 'Category labels', 'count' => 5, 'fields' => [
                    ['key' => 'key', 'type' => 'text', 'label' => 'Key'],
                    ['key' => 'label', 'type' => 'text', 'label' => 'Label'],
                ]],
                ['key' => 'cta', 'type' => 'text', 'label' => 'View All CTA label'],
                ['key' => 'read_more', 'type' => 'text', 'label' => 'Read More label'],
            ],
            'contact' => [
                ['key' => 'hero.eyebrow', 'type' => 'text', 'label' => 'Hero eyebrow'],
                ['key' => 'hero.heading', 'type' => 'textarea', 'label' => 'Hero heading'],
                ['key' => 'hero.body', 'type' => 'textarea', 'label' => 'Hero body copy'],
                ['key' => 'details.email', 'type' => 'text', 'label' => 'Contact email'],
                ['key' => 'details.phone', 'type' => 'text', 'label' => 'Contact phone'],
                ['key' => 'details.office', 'type' => 'textarea', 'label' => 'Office address'],
                ['key' => 'form.title', 'type' => 'text', 'label' => 'Form title'],
                ['key' => 'form.name_label', 'type' => 'text', 'label' => 'Name label'],
                ['key' => 'form.name_placeholder', 'type' => 'text', 'label' => 'Name placeholder'],
                ['key' => 'form.email_label', 'type' => 'text', 'label' => 'Email label'],
                ['key' => 'form.email_placeholder', 'type' => 'text', 'label' => 'Email placeholder'],
                ['key' => 'form.company_label', 'type' => 'text', 'label' => 'Company label'],
                ['key' => 'form.company_placeholder', 'type' => 'text', 'label' => 'Company placeholder'],
                ['key' => 'form.industry_label', 'type' => 'text', 'label' => 'Industry label'],
                ['key' => 'form.funding_label', 'type' => 'text', 'label' => 'Funding label'],
                ['key' => 'form.message_label', 'type' => 'text', 'label' => 'Message label'],
                ['key' => 'form.message_placeholder', 'type' => 'text', 'label' => 'Message placeholder'],
                ['key' => 'form.submit', 'type' => 'text', 'label' => 'Submit button label'],
                ['key' => 'success', 'type' => 'text', 'label' => 'Submission success message'],
            ],
            default => [],
        };
    }
}
