// app/[lang]/@rightStatic/(_PUBLIC)/(_HOME)/home/(_server)/(_servercomponents)/starter-server-consumer.tsx

import type { SupportedLanguage } from '@/config/translations/translations.config';
import type { FractalTranslations } from '../../(_shared)/(_types)/fractal-types';

type PageData = {
  fractalName: string;
  fractalDescription: string;
  hint: string;
};

type StarterServerConsumerProps = {
  translations: FractalTranslations;
  lang?: SupportedLanguage;
  currentPath?: string;
  pageData?: PageData;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export function StarterServerConsumer({
  translations,
  lang,
  currentPath,
  pageData,
  searchParams,
}: StarterServerConsumerProps) {
  console.log('HOME StarterServerConsumer', {
    lang,
    currentPath,
    greeting: translations.greeting,
    pageData,
    searchParams,
  });

  const hasSearch = searchParams && Object.keys(searchParams).length > 0;

  return (
    <section className="flex flex-col items-center justify-center gap-3 w-full">
      <h2 className="text-lg font-semibold text-gray-900">
        {pageData?.fractalName ?? 'Route Fractal'}
      </h2>
      <p className="text-sm text-gray-800 max-w-xl">
        {pageData?.fractalDescription ??
          'This is a minimal server container that renders translations and page data.'}
      </p>
      <p className="text-xs text-gray-700 max-w-xl">
        {pageData?.hint ??
          'Tip: change the language in the URL to see the multilingual implementation.'}
      </p>
      <p className="my-2 text-sm text-gray-900">
        {translations.greeting}
      </p>

      <div className="mt-4 w-full max-w-xl text-left text-xs text-gray-900">
        <p className="font-semibold">Server searchParams snapshot:</p>
        <div className="mt-1 rounded-md bg-gray-200 px-3 py-2 overflow-x-auto">
          {hasSearch ? (
            <pre className="text-[11px] leading-snug">
              {JSON.stringify(searchParams, null, 2)}
            </pre>
          ) : (
            <p className="text-[11px] italic text-gray-700">
              No search params received on the server.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
