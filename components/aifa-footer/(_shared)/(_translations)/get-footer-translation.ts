// components/aifa-footer/(_shared)/(_translations)/get-footer-translation.ts

import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  FooterTranslations,
  AllFooterTranslationKeys,
} from "../(_types)/footer-types";
import translationsData from "./footer-translation.json";

/**
 * Internal type for JSON structure with CUID keys
 */
type TranslationData = {
  [cuidKey: string]: {
    key: AllFooterTranslationKeys;
    translations: {
      [lang: string]: string;
    };
  };
};

/**
 * Get translations for Footer component by language
 * Server-side function for use in Server Components
 * 
 * @param lang - Language code (e.g., 'en', 'ru', 'es')
 * @returns Typed translation object with all required keys
 * 
 * @example
 * // In Server Component
 * const t = await getFooterTranslation('ru');
 * return <div>{t.allRightsReserved}</div>;
 */
export async function getFooterTranslation(
  lang: SupportedLanguage
): Promise<FooterTranslations> {
  const data = translationsData as TranslationData;
  const translations: Partial<FooterTranslations> = {};

  // Process each CUID entry
  for (const cuidKey in data) {
    const entry = data[cuidKey];
    const translationKey = entry.key;

    // Get translation for current language, fallback to English
    const translatedValue =
      entry.translations[lang] || entry.translations["en"];

    translations[translationKey] = translatedValue;
  }

  return translations as FooterTranslations;
}

/**
 * Client-side translation hook for use in Client Components
 * Returns a function to get translation by key
 * 
 * @param translations - Pre-fetched translations object from server
 * @returns Function to access translations by key
 * 
 * @example
 * // In Client Component (receives translations as prop)
 * 'use client';
 * export function ClientFooter({ translations }: { translations: FooterTranslations }) {
 *   const t = useFooterTranslation(translations);
 *   return <button>{t('allRightsReserved')}</button>;
 * }
 */
export function useFooterTranslation(translations: FooterTranslations) {
  return (key: AllFooterTranslationKeys): string => {
    return translations[key];
  };
}
