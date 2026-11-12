<?php

namespace Database\Seeders;

/**
 * English seed content transcribed from "Website Copy.docx" and the
 * six-screen mockup. Unverified claims (metrics, contact details) are
 * carried over from the reference and flagged in the handoff notes.
 */
class EnContent
{
    public static function pages(): array
    {
        return [
            'shared' => [
                'nav' => ['Home', 'About', 'Services', 'Intelligence', 'Insights', 'Contact'],
                'cta' => 'Book Consultation',
                'footer' => [
                    'tagline' => 'Intelligence. Strategy. Capital.',
                    'company_title' => 'Company',
                    'company_links' => ['About Us', 'Our Team', 'Careers', 'Partnerships'],
                    'services_title' => 'Services',
                    'services_links' => ['Capital Advisory', 'Investment Intelligence', 'Investor Advisory', 'Corporate Finance'],
                    'resources_title' => 'Resources',
                    'resources_links' => ['Insights', 'Reports', 'News', 'Events'],
                    'contact_title' => 'Contact',
                    'email' => 'info@daracapital.com',
                    'phone' => '+1 (234) 567-8900',
                    'office' => "123 Capital Way, Suite 100\nNew York, NY 10001, USA",
                    'copyright' => '© 2024 DARA Capital. All rights reserved.',
                    'legal' => ['Privacy Policy', 'Terms of Use'],
                ],
            ],
            'home' => [
                'hero' => [
                    'eyebrow' => 'Intelligence. Strategy. Capital.',
                    'lines' => ['Capital.', 'Intelligence.', 'Opportunity.'],
                    'body' => 'DARA Capital helps founders, investors, and institutions make smarter capital decisions through advisory expertise and investment intelligence.',
                    'primary_cta' => 'Schedule Consultation',
                    'secondary_cta' => 'Explore Services',
                    'art' => 'globe-market-chart',
                    'trust_title' => 'Trusted by ambitious founders and leading investors',
                    'features' => ['Strategic Advisory', 'Global Investor Network', 'AI-Powered Intelligence', 'Proven Execution', 'Aligned for Impact'],
                ],
                'metrics' => [
                    ['value' => '150+', 'label' => 'Deals Advised'],
                    ['value' => '$2B+', 'label' => 'Capital Raised'],
                    ['value' => '500+', 'label' => 'Investors Globally'],
                    ['value' => '25+', 'label' => 'Industries Served'],
                ],
            ],
            'about' => [
                'hero' => [
                    'eyebrow' => 'About Us',
                    'heading' => 'Building the Future of Capital Intelligence',
                    'body' => 'DARA Capital is a next-generation capital advisory and investment intelligence firm. We combine deep market expertise, global networks, and AI-driven analytics to help businesses and investors identify opportunities, manage risk, and create lasting value.',
                    'art' => 'reception-lobby',
                ],
                'values' => [
                    ['title' => 'Our Mission', 'body' => 'To empower smarter capital allocation through advisory expertise and AI-driven intelligence.'],
                    ['title' => 'Our Vision', 'body' => 'To become the world’s most trusted intelligence platform for capital allocation.'],
                    ['title' => 'Our Purpose', 'body' => 'To connect capital with opportunity and drive meaningful impact.'],
                    ['title' => 'Our Philosophy', 'body' => 'A company of the people, by the people, for the people will rise.'],
                ],
                'metrics' => [
                    ['value' => '10+', 'label' => 'Years of Combined Experience'],
                    ['value' => '$2B+', 'label' => 'Capital Raised'],
                    ['value' => '500+', 'label' => 'Investors Network'],
                    ['value' => '100+', 'label' => 'Companies Advised'],
                ],
                'quote' => "We don’t just move capital.\nWe improve how it moves.",
            ],
            'services' => [
                'hero' => [
                    'eyebrow' => 'Our Services',
                    'heading' => 'Comprehensive Solutions for Capital Success',
                    'body' => 'We provide end-to-end advisory and intelligence solutions designed to help you raise capital, invest smarter, and grow sustainably.',
                    'art' => 'red-architectural-facade',
                ],
                'services' => [
                    ['title' => 'Capital Advisory', 'body' => 'End-to-end fundraising solutions from strategy to closing.', 'details' => 'We support the full fundraising lifecycle: positioning, materials, investor targeting, process management, and negotiation through close.'],
                    ['title' => 'Investment Intelligence', 'body' => 'AI-powered due diligence and investment analytics for smarter decisions.', 'details' => 'DARA Intelligence™ screens opportunities with AI-driven analytics, risk scoring, and market signals so decisions rest on evidence, not instinct.'],
                    ['title' => 'Investor Advisory', 'body' => 'Helping investors identify, evaluate, and invest in high-potential opportunities.', 'details' => 'For angels, funds, and family offices: curated deal flow, independent evaluation, and portfolio guidance across sectors and stages.'],
                    ['title' => 'Corporate Finance', 'body' => 'Strategic financial advisory for growth, transformation, and value creation.', 'details' => 'Capital structure, financing strategy, and financial planning that align resources with long-term value creation.'],
                    ['title' => 'M&A Advisory', 'body' => 'Guiding mergers, acquisitions, and partnerships for long-term value.', 'details' => 'Buy-side and sell-side support from target screening and valuation through diligence, negotiation, and integration planning.'],
                    ['title' => 'Restructuring', 'body' => 'Financial restructuring solutions to unlock value and improve performance.', 'details' => 'Balance-sheet and operational restructuring that stabilizes the business and creates a path back to growth.'],
                    ['title' => 'Valuation Advisory', 'body' => 'Accurate business valuation for fundraising, transactions, and strategic decisions.', 'details' => 'Independent, defensible valuations built for investors, boards, and transaction counterparties.'],
                    ['title' => 'Strategic Consulting', 'body' => 'Strategic guidance to optimize operations and accelerate growth.', 'details' => 'Market entry, operating model design, and growth strategy engagements tailored to where your business needs to go next.'],
                ],
                'cta' => [
                    'heading' => 'Tailored Solutions. Proven Results.',
                    'body' => 'Every engagement is customized to meet your unique goals and deliver measurable impact.',
                    'button' => 'Schedule Consultation',
                ],
            ],
            'intelligence' => [
                'hero' => [
                    'eyebrow' => 'DARA Intelligence™',
                    'heading' => 'Intelligence Behind Every Decision',
                    'body' => 'Our proprietary AI engine analyzes thousands of data points to deliver accurate risk assessments, market insights, and investment recommendations.',
                    'cta' => 'Explore Platform',
                ],
                'features' => ['AI Risk Engine', 'Due Diligence Automation', 'Investment Scoring', 'Fraud Detection', 'Real-time Market Insights'],
                'dashboard' => [
                    'title' => 'DARA Intelligence Dashboard',
                    'metrics' => [
                        ['label' => 'Overall Opportunity Score', 'value' => '78 /100', 'status' => 'High Potential', 'spark' => '42,48,45,55,60,58,66,72,78'],
                        ['label' => 'Investment Grade', 'value' => 'A−', 'status' => 'Strong', 'spark' => '50,52,55,53,58,60,62,65,70'],
                        ['label' => 'Risk Score', 'value' => 'Low Risk', 'status' => '69%', 'spark' => '70,66,68,62,60,58,55,52,50'],
                        ['label' => 'Industry Outlook', 'value' => 'Positive', 'status' => '+12.5% · Growth Forecast', 'spark' => '40,44,50,48,55,60,63,68,75'],
                        ['label' => 'Market Opportunity', 'value' => '8.6 /10', 'status' => 'Very High', 'spark' => '55,58,54,62,66,70,74,78,86'],
                    ],
                    'risk_title' => 'Risk Distribution',
                    'risk' => [
                        ['label' => 'Low', 'percent' => '40'],
                        ['label' => 'Medium', 'percent' => '30'],
                        ['label' => 'High', 'percent' => '30'],
                    ],
                    'opportunities_title' => 'Recent Opportunities',
                    'opportunities' => [
                        ['company' => 'FintechPay', 'industry' => 'Fintech', 'score' => '86', 'grade' => 'A', 'status' => 'Under Review'],
                        ['company' => 'HealthBridge', 'industry' => 'Healthcare', 'score' => '74', 'grade' => 'A−', 'status' => 'Due Diligence'],
                        ['company' => 'AgriSmart', 'industry' => 'Agritech', 'score' => '68', 'grade' => 'B+', 'status' => 'Initial Review'],
                        ['company' => 'NeuroLeap', 'industry' => 'AI / SaaS', 'score' => '92', 'grade' => 'A', 'status' => 'Under Review'],
                    ],
                ],
                'benefits' => ['Data-Driven Decisions', 'Actionable Insights', 'Reduce Risk', 'Increase Confidence'],
            ],
            'insights' => [
                'hero' => [
                    'eyebrow' => 'Insights',
                    'heading' => 'Market Insights. Smarter Decisions.',
                    'body' => 'Stay ahead with our latest research, market intelligence, and investment insights.',
                    'art' => 'earth-hemisphere',
                ],
                'categories' => [
                    ['key' => 'all', 'label' => 'All Insights'],
                    ['key' => 'market-reports', 'label' => 'Market Reports'],
                    ['key' => 'investment-strategy', 'label' => 'Investment Strategy'],
                    ['key' => 'industry-analysis', 'label' => 'Industry Analysis'],
                    ['key' => 'news', 'label' => 'News'],
                ],
                'cta' => 'View All Insights',
                'read_more' => 'Read More',
            ],
            'contact' => [
                'hero' => [
                    'eyebrow' => 'Contact Us',
                    'heading' => 'Let’s Build the Future of Capital Together',
                    'body' => 'Whether you are a founder seeking capital, an investor exploring opportunities, or a partner looking to collaborate, we would love to hear from you.',
                ],
                'details' => [
                    'email' => 'info@daracapital.com',
                    'phone' => '+1 (234) 567-8900',
                    'office' => "123 Capital Way, Suite 100\nNew York, NY 10001, USA",
                ],
                'form' => [
                    'title' => 'Schedule a Consultation',
                    'name_label' => 'Full Name',
                    'name_placeholder' => 'Enter your full name',
                    'email_label' => 'Email Address',
                    'email_placeholder' => 'Enter your email',
                    'company_label' => 'Company',
                    'company_placeholder' => 'Enter your company name',
                    'industry_label' => 'Industry',
                    'funding_label' => 'Funding Requirement',
                    'message_label' => 'Tell us about your needs',
                    'message_placeholder' => 'Your message',
                    'submit' => 'Send Message',
                ],
                'success' => 'Thank you. Your consultation request has been received — we will be in touch shortly.',
            ],
        ];
    }

    public static function posts(): array
    {
        return [
            [
                'slug' => 'global-investment-outlook-2024',
                'category' => 'market-reports',
                'artwork' => 'city-skyline',
                'published_at' => '2024-05-10',
                'title' => 'Global Investment Outlook 2024',
                'category_label' => 'Market Report',
                'excerpt' => 'Key trends shaping global capital markets in 2024.',
                'body' => "Key trends shaping global capital markets in 2024.\n\nFull article copy is pending from the client. This demo view renders the published excerpt while the body remains editable in the CMS.",
            ],
            [
                'slug' => 'ai-in-due-diligence',
                'category' => 'investment-strategy',
                'artwork' => 'ai-brain',
                'published_at' => '2024-04-28',
                'title' => 'AI in Due Diligence: Transforming Investment Decisions',
                'category_label' => 'Investment Strategy',
                'excerpt' => 'How AI is improving due diligence accuracy and efficiency.',
                'body' => "How AI is improving due diligence accuracy and efficiency.\n\nFull article copy is pending from the client. This demo view renders the published excerpt while the body remains editable in the CMS.",
            ],
            [
                'slug' => 'fintech-funding-report-q1-2024',
                'category' => 'industry-analysis',
                'artwork' => 'fintech-network',
                'published_at' => '2024-04-15',
                'title' => 'Fintech Funding Report Q1 2024',
                'category_label' => 'Industry Analysis',
                'excerpt' => 'An overview of fintech funding trends and top deals.',
                'body' => "An overview of fintech funding trends and top deals.\n\nFull article copy is pending from the client. This demo view renders the published excerpt while the body remains editable in the CMS.",
            ],
            [
                'slug' => 'emerging-markets-capital-flows',
                'category' => 'news',
                'artwork' => 'world-map',
                'published_at' => '2024-04-05',
                'title' => 'Emerging Markets Capital Flows',
                'category_label' => 'Market Insights',
                'excerpt' => 'Where capital is moving and why it matters.',
                'body' => "Where capital is moving and why it matters.\n\nFull article copy is pending from the client. This demo view renders the published excerpt while the body remains editable in the CMS.",
            ],
        ];
    }
}
