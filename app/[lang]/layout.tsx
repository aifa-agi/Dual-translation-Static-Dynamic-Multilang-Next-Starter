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

/**
 * Type for params Promise (Next.js 15 async params)
 */
type Params = Promise<{ lang: string }>;

/**
 * Generate static params for all supported languages
 * This tells Next.js to pre-render a page for each language at build time
 *
 * Called during: next build
 * Output: /en, /ru, /es, /de, /fr, /it (based on .env config)
 */
export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}


export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;

  // Validate language (for TypeScript - runtime validation is in layout below)
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


export default async function LanguageLayout({

  left,
  rightStatic,
  rightDynamic,
  params,
}: {
  left: ReactNode;
  rightStatic: ReactNode;
  rightDynamic: ReactNode;
  params: Params;
}) {
  const { lang } = await params;

  if (!SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
    notFound();
  }

  return (
    <>

      <div className="h-full flex" data-lang={lang}>

        <div className="hidden md:flex md:w-0 lg:w-[50%] xl:w-[35%] border-r border-border">
          <OnlineStatusProvider>
            <div className="h-full w-full overflow-hidden">
              {left}
            </div>
          </OnlineStatusProvider>
        </div>

        <div className="w-full md:w-full lg:w-[50%] xl:w-[65%] relative">

          <main className="absolute inset-0 overflow-y-auto hide-scrollbar">
            {rightStatic}
          </main>

          {rightDynamic}
        </div>
      </div>


    </>
  );
}
