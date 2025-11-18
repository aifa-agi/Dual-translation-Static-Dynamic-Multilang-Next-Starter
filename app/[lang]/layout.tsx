// app/[lang]/layout.tsx

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  type SupportedLanguage,
  getLanguageLabel,
} from '@/config/translations.config';
import { appConfig } from '@/config/app-config';
import { OnlineStatusProvider } from '@/providers/online-status-provider';

// ============================================================================
// STATIC PARAMS GENERATION
// ============================================================================

/**
 * Generate static params for all supported languages
 * This enables static generation for each language route
 */
export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

// ============================================================================
// METADATA GENERATION
// ============================================================================

/**
 * Generate metadata for each language route
 * Uses Next.js 15.5+ automatic typing - no manual type needed
 */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;

  // Validate language parameter
  if (!SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
    return {};
  }

  const languageLabel = getLanguageLabel(lang as SupportedLanguage);

  // Build language alternates for hreflang SEO
  const languages: Record<string, string> = {};
  SUPPORTED_LANGUAGES.forEach((supportedLang) => {
    languages[supportedLang] = `${appConfig.url}/${supportedLang}`;
  });
  languages['x-default'] = `${appConfig.url}/${DEFAULT_LANGUAGE}`;

  return {
    title: {
      default: `${appConfig.name} | ${languageLabel}`,
      template: `%s | ${appConfig.name}`,
    },
    description: appConfig.description,
    alternates: {
      canonical: `${appConfig.url}/${lang}`,
      languages,
    },
    openGraph: {
      locale: lang === 'en' ? 'en_US' : lang === 'ru' ? 'ru_RU' : `${lang}_${lang.toUpperCase()}`,
    },
  };
}

// ============================================================================
// LAYOUT COMPONENT - Using Next.js 15.5+ LayoutProps helper
// ============================================================================

/**
 * Language Layout with Parallel Routes
 * 
 * Structure:
 * - @left: Left sidebar (hidden on mobile, visible on desktop)
 * - @rightStatic: Main static content area
 * - @rightDynamic: Dynamic overlays (modals, intercepted routes)
 * 
 * Next.js 15.5+ automatically types all parallel route slots and params
 * No manual typing needed - LayoutProps is globally available
 */
export default async function LanguageLayout(
  props: LayoutProps<'/[lang]'>
) {
  // Destructure all props: params + parallel route slots
  const { params, left, rightStatic, rightDynamic , modal} = props;
  
  // Await params (required in Next.js 15+)
  const { lang } = await params;

  // Validate language parameter - return 404 if invalid
  if (!SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
    notFound();
  }

  return (
    <>
      <div className="h-full flex" data-lang={lang}>
        {/* ===================================================================
            LEFT COLUMN - Sidebar
            - Hidden on mobile (hidden md:flex)
            - Responsive width: 0 on md, 50% on lg, 35% on xl
            - Contains navigation, filters, or auxiliary content
            =================================================================== */}
        <div className="hidden md:flex md:w-0 lg:w-[50%] xl:w-[35%] border-r border-border">
          <OnlineStatusProvider>
            <div className="h-full w-full overflow-hidden">
              {left}
            </div>
          </OnlineStatusProvider>
        </div>

        {/* ===================================================================
            RIGHT COLUMN - Main Content Area
            - Full width on mobile, responsive width on desktop
            - Contains static content + dynamic overlays
            =================================================================== */}
        <div className="w-full md:w-full lg:w-[50%] xl:w-[65%] relative">
          
          {/* STATIC CONTENT - Main scrollable area */}
          <main className="absolute inset-0 overflow-y-auto hide-scrollbar">
            {rightStatic}

            {modal}
          </main>

          {/* DYNAMIC CONTENT - Overlays (modals, intercepted routes) */}
          {rightDynamic}
        </div>
      </div>
    </>
  );
}
