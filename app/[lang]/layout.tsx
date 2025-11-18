// app/[lang]/layout.tsx

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  type SupportedLanguage,
  getLanguageLabel,
} from '@/config/translations.config';
import { appConfig } from '@/config/app-config';
import { OnlineStatusProvider } from '@/providers/online-status-provider';


type MetadataProps = {
  params: Promise<{ lang: string }>;
};

/**
 * Type для LanguageLayout - params + параллельные слоты
 */
type LayoutProps = {
  params: Promise<{ lang: string }>;
  left: ReactNode;
  rightStatic: ReactNode;
  rightDynamic: ReactNode;
};

// ============================================================================
// STATIC PARAMS
// ============================================================================

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

// ============================================================================
// METADATA - использует MetadataProps
// ============================================================================

export async function generateMetadata({ 
  params 
}: MetadataProps): Promise<Metadata> {
  const { lang } = await params;

  // Validate language
  if (!SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
    return {};
  }

  const languageLabel = getLanguageLabel(lang as SupportedLanguage);

  // Build language alternates for hreflang
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
// LAYOUT COMPONENT - использует LayoutProps
// ============================================================================

export default async function LanguageLayout({
  params,
  left,
  rightStatic,
  rightDynamic,
}: LayoutProps) {
  const { lang } = await params;

  // Validate language parameter
  if (!SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
    notFound();
  }

  return (
    <>
      <div className="h-full flex" data-lang={lang}>
        {/* LEFT COLUMN */}
        <div className="hidden md:flex md:w-0 lg:w-[50%] xl:w-[35%] border-r border-border">
          <OnlineStatusProvider>
            <div className="h-full w-full overflow-hidden">
              {left}
            </div>
          </OnlineStatusProvider>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full md:w-full lg:w-[50%] xl:w-[65%] relative">
          {/* STATIC CONTENT */}
          <main className="absolute inset-0 overflow-y-auto hide-scrollbar">
            {rightStatic}
          </main>

          {/* DYNAMIC CONTENT OVERLAY */}
          {rightDynamic}
        </div>
      </div>
    </>
  );
}
