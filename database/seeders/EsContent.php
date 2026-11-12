<?php

namespace Database\Seeders;

/**
 * SAMPLE Spanish translations used to demonstrate the second locale.
 * These are machine-grade drafts pending confirmation by the client —
 * see the handoff notes in docs/.
 *
 * Coverage is intentionally partial (shared, home, about) so the demo
 * also shows the English fallback on untranslated pages and fields.
 */
class EsContent
{
    public static function pages(): array
    {
        return [
            'shared' => [
                'nav' => ['Inicio', 'Nosotros', 'Servicios', 'Inteligencia', 'Perspectivas', 'Contacto'],
                'cta' => 'Reservar Consulta',
                'footer' => [
                    'tagline' => 'Inteligencia. Estrategia. Capital.',
                    'company_title' => 'Empresa',
                    'company_links' => ['Nosotros', 'Nuestro Equipo', 'Carreras', 'Alianzas'],
                    'services_title' => 'Servicios',
                    'services_links' => ['Asesoría de Capital', 'Inteligencia de Inversión', 'Asesoría al Inversionista', 'Finanzas Corporativas'],
                    'resources_title' => 'Recursos',
                    'resources_links' => ['Perspectivas', 'Informes', 'Noticias', 'Eventos'],
                    'contact_title' => 'Contacto',
                    'copyright' => '© 2024 DARA Capital. Todos los derechos reservados.',
                    'legal' => ['Política de Privacidad', 'Términos de Uso'],
                ],
            ],
            'home' => [
                'hero' => [
                    'eyebrow' => 'Inteligencia. Estrategia. Capital.',
                    'lines' => ['Capital.', 'Inteligencia.', 'Oportunidad.'],
                    'body' => 'DARA Capital ayuda a fundadores, inversionistas e instituciones a tomar decisiones de capital más inteligentes mediante experiencia en asesoría e inteligencia de inversión.',
                    'primary_cta' => 'Agendar Consulta',
                    'secondary_cta' => 'Explorar Servicios',
                    'trust_title' => 'Con la confianza de fundadores ambiciosos e inversionistas líderes',
                    'features' => ['Asesoría Estratégica', 'Red Global de Inversionistas', 'Inteligencia con IA', 'Ejecución Probada', 'Alineados al Impacto'],
                ],
                'metrics' => [
                    ['value' => '150+', 'label' => 'Operaciones Asesoradas'],
                    ['value' => '$2B+', 'label' => 'Capital Recaudado'],
                    ['value' => '500+', 'label' => 'Inversionistas Globales'],
                    ['value' => '25+', 'label' => 'Industrias Atendidas'],
                ],
            ],
            'about' => [
                'hero' => [
                    'eyebrow' => 'Nosotros',
                    'heading' => 'Construyendo el Futuro de la Inteligencia de Capital',
                    'body' => 'DARA Capital es una firma de nueva generación en asesoría de capital e inteligencia de inversión. Combinamos profunda experiencia de mercado, redes globales y analítica impulsada por IA para ayudar a empresas e inversionistas a identificar oportunidades, gestionar riesgos y crear valor duradero.',
                ],
                'values' => [
                    ['title' => 'Nuestra Misión', 'body' => 'Facilitar una asignación de capital más inteligente mediante experiencia en asesoría e inteligencia impulsada por IA.'],
                    ['title' => 'Nuestra Visión', 'body' => 'Convertirnos en la plataforma de inteligencia más confiable del mundo para la asignación de capital.'],
                    ['title' => 'Nuestro Propósito', 'body' => 'Conectar el capital con la oportunidad e impulsar un impacto significativo.'],
                    ['title' => 'Nuestra Filosofía', 'body' => 'Una empresa del pueblo, por el pueblo y para el pueblo, surgirá.'],
                ],
                'quote' => "No solo movemos capital.\nMejoramos la forma en que se mueve.",
            ],
            'insights' => [
                'categories' => [
                    ['key' => 'all', 'label' => 'Todas'],
                    ['key' => 'market-reports', 'label' => 'Informes de Mercado'],
                    ['key' => 'investment-strategy', 'label' => 'Estrategia de Inversión'],
                    ['key' => 'industry-analysis', 'label' => 'Análisis de Industria'],
                    ['key' => 'news', 'label' => 'Noticias'],
                ],
                'cta' => 'Ver Todas las Perspectivas',
                'read_more' => 'Leer Más',
            ],
        ];
    }

    public static function posts(): array
    {
        return [
            'global-investment-outlook-2024' => [
                'title' => 'Panorama Global de Inversión 2024',
                'excerpt' => 'Tendencias clave que marcan los mercados de capitales globales en 2024.',
                'body' => "Tendencias clave que marcan los mercados de capitales globales en 2024.\n\nEl texto completo del artículo está pendiente de confirmación por el cliente.",
                'category_label' => 'Informe de Mercado',
            ],
        ];
    }
}
