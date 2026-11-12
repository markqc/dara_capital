<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Supported public locales
    |--------------------------------------------------------------------------
    |
    | English is the default and the source of truth for seeded content. Any
    | additional locale is served from its own URL prefix (/es/...) and falls
    | back to English field-by-field where a translation is missing.
    |
    | NOTE: the 'es' content shipped with the demo is SAMPLE translation,
    | pending confirmation by the client (see README / handoff notes).
    |
    */

    'locales' => ['en', 'es'],

    'default_locale' => 'en',

    /*
    |--------------------------------------------------------------------------
    | Insight categories
    |--------------------------------------------------------------------------
    */

    'insight_categories' => [
        'market-reports',
        'investment-strategy',
        'industry-analysis',
        'news',
    ],

    /*
    |--------------------------------------------------------------------------
    | Consultation form options
    |--------------------------------------------------------------------------
    */

    'industries' => [
        'technology',
        'fintech',
        'healthcare',
        'energy',
        'real-estate',
        'consumer',
        'industrial',
        'other',
    ],

    'funding_ranges' => [
        'under-1m',
        '1m-5m',
        '5m-25m',
        '25m-100m',
        'over-100m',
        'undisclosed',
    ],

];
