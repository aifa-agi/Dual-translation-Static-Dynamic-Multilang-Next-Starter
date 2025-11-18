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

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

// ============================================================================
// METADATA GENERATION
// ============================================================================

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;

  if (!SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
    return {};
  }

  const languageLabel = getLanguageLabel(lang as SupportedLanguage);

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
// LAYOUT COMPONENT
// ============================================================================

/**
 * Language Layout with Parallel Routes
 * 
 * Top-level parallel routes:
 * - @left: Left sidebar (navigation, filters)
 * - @rightStatic: Main static content (includes nested @modal slot)
 * - @rightDynamic: Dynamic overlays
 * 
 * Note: Uses explicit inline typing instead of LayoutProps<>
 * to avoid including nested @modal slot at this level
 */
export default async function LanguageLayout({
  params,
  children,
  left,
  rightStatic,
  rightDynamic,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
  left: React.ReactNode;
  rightStatic: React.ReactNode;
  rightDynamic: React.ReactNode;
}) {
  const { lang } = await params;

  if (!SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
    notFound();
  }

  return (
    <>
      <div className="h-full flex" data-lang={lang}>
        {/* LEFT COLUMN - Sidebar */}
        <div className="hidden md:flex md:w-0 lg:w-[50%] xl:w-[35%] border-r border-border">
          <OnlineStatusProvider>
            <div className="h-full w-full overflow-hidden">
              {left}
            </div>
          </OnlineStatusProvider>
        </div>

        {/* RIGHT COLUMN - Main Content */}
        <div className="w-full md:w-full lg:w-[50%] xl:w-[65%] relative">
          {/* STATIC CONTENT - Main scrollable area */}
          <main className="absolute inset-0 overflow-y-auto hide-scrollbar">
            {rightStatic}
          </main>

          {/* DYNAMIC CONTENT - Overlays */}
          {rightDynamic}
        </div>
      </div>
    </>
  );
}
