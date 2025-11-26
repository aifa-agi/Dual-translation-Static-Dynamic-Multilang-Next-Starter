// app/[lang]/@rightStatic/(_PUBLIC)/(_HOME)/(_shared)/(_translations)/get-fractal-translation.ts

import type { SupportedLanguage } from '@/config/translations/translations.config';
import type {
  AllFractalTranslationKeys,
  FractalTranslations,
} from '../(_types)/fractal-types';
import translationsData from './fractal-translation.json';

type TranslationData = {
  [cuid: string]: {
    key: AllFractalTranslationKeys;
    translations: {
      [lang: string]: string;
    };
  };
};

/**
 * Load HOME fractal translations for a given language.
 * Fallback order: requested language -> English -> key name.
 */
export async function getFractalTranslation(
  lang: SupportedLanguage,
): Promise<FractalTranslations> {
  const data = translationsData as TranslationData;

  const translations: Partial<FractalTranslations> = {};

  for (const cuidKey in data) {
    const entry = data[cuidKey];
    const translationKey = entry.key;
    const translatedValue =
      entry.translations[lang] ?? entry.translations.en ?? translationKey;

    translations[translationKey] = translatedValue;
  }

  return translations as FractalTranslations;
}
