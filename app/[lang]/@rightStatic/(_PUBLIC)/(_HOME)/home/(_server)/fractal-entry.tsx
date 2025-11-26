// app/[lang]/@rightStatic/(_PUBLIC)/(_HOME)/home/(_server)/fractal-entry.tsx

import type { SupportedLanguage } from '@/config/translations/translations.config';
import { getFractalTranslation } from '../(_shared)/(_translations)/get-fractal-translation';
import type { FractalTranslations } from '../(_shared)/(_types)/fractal-types';
import { StarterClientIsland } from '../(_client)/(_uiclientislands)/starter-client-island';
import { StarterServerConsumer } from './(_servercomponents)/starter-server-consumer';

type FractalEntryProps = {
  lang: SupportedLanguage;
  currentPath: string;
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function FractalEntry(props: FractalEntryProps) {
  const { lang, currentPath, searchParams } = props;

  console.log('[FractalEntry] incoming searchParams:', searchParams);
  console.log('[FractalEntry] currentPath:', currentPath);

  const translations: FractalTranslations = await getFractalTranslation(lang);

  const pageData = {
    fractalName: 'Home Route Fractal',
    fractalDescription: 'This is a minimal AIFA route fractal with server and client blocks.',
    hint: 'Tip: change the language in the URL to see the multilingual implementation.',
  };

  return (
    <div className="flex min-h-[60vh] flex-col gap-6 px-4 py-8 w-full bg-gray-500 relative">
      {/* Server consumer — demonstrates that server-side logic and translations are working */}
      <div className="relative flex-1 bg-gray-400 rounded-md p-6 flex flex-col items-center justify-center text-center">
        <StarterServerConsumer
          translations={translations}
          lang={lang}
          currentPath={currentPath}
          pageData={pageData}
          searchParams={searchParams}
        />
        <p className="absolute bottom-2 left-4 text-xs text-gray-900 font-semibold">
          Server container (React Server Component)
        </p>
      </div>

      {/* Client island — demonstrates that i18n and routing context reach the client */}
      <div className="relative flex-1 bg-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-center">
        <StarterClientIsland
          translations={translations}
          lang={lang}
          currentPath={currentPath}
          pageData={pageData}
          searchParams={searchParams}
        />
        <p className="absolute bottom-2 left-4 text-xs text-gray-900 font-semibold">
          Client island (use client)
        </p>
      </div>

      <p className="mt-4 text-xs text-gray-100 text-center">
        Minimal Route fractal: {currentPath}/(_server)/fractal-entry.tsx
      </p>
    </div>
  );
}
