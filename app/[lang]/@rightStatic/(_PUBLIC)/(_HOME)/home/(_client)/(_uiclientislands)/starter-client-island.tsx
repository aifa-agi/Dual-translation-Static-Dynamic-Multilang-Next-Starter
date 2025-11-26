// app/[lang]/@rightStatic/(_PUBLIC)/(_HOME)/home/(_client)/(_uiclientislands)/starter-client-island.tsx

'use client';

import type { SupportedLanguage } from '@/config/translations/translations.config';
import type { FractalTranslations } from '../../(_shared)/(_types)/fractal-types';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type PageData = {
  fractalName: string;
  fractalDescription: string;
  hint: string;
};

type StarterClientIslandProps = {
  translations: FractalTranslations;
  lang?: SupportedLanguage;
  currentPath?: string;
  pageData?: PageData;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export function StarterClientIsland({
  translations,
  lang,
  currentPath,
  pageData,
  searchParams,
}: StarterClientIslandProps) {
  const title = pageData?.fractalName ?? 'Home Route Fractal (Client)';
  const description =
    pageData?.fractalDescription ??
    'This is a minimal client island demonstrating i18n and routing context.';
  const hint =
    pageData?.hint ??
    'Tip: change the language in the URL to see the multilingual implementation.';

  const hasSearch = searchParams && Object.keys(searchParams).length > 0;

  return (
    <section className="flex flex-col items-center justify-center gap-3 w-full">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-800 max-w-xl">
        {description}
      </p>
      <p className="text-xs text-gray-700 max-w-xl">
        {hint}
      </p>

      <Button
        type="button"
        onClick={() => {
          toast.info('This is a UI client island in the minimal rightStatic routing fractal.', {
            description: `Client tooltip — lang: ${lang}, path: ${currentPath}, search: ${JSON.stringify(
              searchParams ?? {},
            )}`,
            duration: 4000,
          });
        }}
        className="p-4 bg-green-500 w-full max-w-md mt-2"
      >
        Click me
      </Button>

      <p className="my-2 text-sm text-gray-900">
        {translations.greeting}
      </p>

      <div className="mt-4 w-full max-w-xl text-left text-xs text-gray-900">
        <p className="font-semibold">Client searchParams snapshot (from server props):</p>
        <div className="mt-1 rounded-md bg-gray-200 px-3 py-2 overflow-x-auto">
          {hasSearch ? (
            <pre className="text-[11px] leading-snug">
              {JSON.stringify(searchParams, null, 2)}
            </pre>
          ) : (
            <p className="text-[11px] italic text-gray-700">
              No search params were passed down from the server.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
