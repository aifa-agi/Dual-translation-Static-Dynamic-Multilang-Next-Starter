// components/no-script-banner/(_shared)/(_translations)/get-no-script-banner-translation.ts

import type { SupportedLanguage } from '@/config/translations/translations.config';
import type {
  AllNoScriptBannerTranslationKeys,
  NoScriptBannerTranslations,
} from '../(_types)/no-script-banner-translations.types';
import rawTranslations from './no-script-banner-translations.json';

type TranslationData = {
  [cuid: string]: {
    key: AllNoScriptBannerTranslationKeys;
    translations: {
      [lang: string]: string;
    };
  };
};

const data = rawTranslations as TranslationData;

/**
 * Server-side helper: загружает переводы баннера для заданного языка.
 */
export async function getNoScriptBannerTranslation(
  lang: SupportedLanguage,
): Promise<NoScriptBannerTranslations> {
  const result: Partial<NoScriptBannerTranslations> = {};

  for (const cuid in data) {
    const entry = data[cuid];
    const key = entry.key;

    const value =
      entry.translations[lang] ??
      entry.translations['en'] ??
      key;

    result[key] = value;
  }

  return result as NoScriptBannerTranslations;
}

/**
 * Client-side hook: безопасный доступ к переводу по ключу.
 */
export function useNoScriptBannerTranslation(
  translations: NoScriptBannerTranslations,
) {
  return (key: AllNoScriptBannerTranslationKeys): string => {
    return translations[key] ?? key;
  };
}
