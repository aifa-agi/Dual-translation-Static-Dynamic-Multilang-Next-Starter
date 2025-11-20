//app/[lang]/@rightStatic/(_INTERCEPTION_MODAL)/thank-you/(_shared)/(_translations)/get-thank-you-translation.ts

import type { SupportedLanguage } from "@/config/translations/translations.config";
import type { 
  ThankYouTranslations,
  AllThankYouTranslationKeys 
} from "../(_types)/thank-you-types";

// Import translation JSON with CUID keys
import translationsData from "./thank-you-translation.json";

/**
 * Type for the translation JSON structure
 */
type TranslationData = {
  [cuidKey: string]: {
    key: AllThankYouTranslationKeys;
    translations: {
      [lang: string]: string;
    };
  };
};

/**
 * Get translations for Thank You page by language
 * 
 * @param lang - Language code (e.g., 'en', 'ru', 'es')
 * @returns Typed translation object with all required keys
 */
export async function getThankYouTranslation(
  lang: SupportedLanguage
): Promise<ThankYouTranslations> {
  const data = translationsData as TranslationData;
  
  // Build translations object from CUID keys
  const translations: Partial<ThankYouTranslations> = {};
  
  for (const cuidKey in data) {
    const entry = data[cuidKey];
    const translationKey = entry.key;
    
    // Get translation for current language, fallback to English
    const translatedValue = 
      entry.translations[lang] || 
      entry.translations["en"] || 
      translationKey;
    
    translations[translationKey] = translatedValue;
  }
  
  return translations as ThankYouTranslations;
}

/**
 * Client-side translation hook (for use in client components)
 * Returns a function to get translation by key
 */
export function useThankYouTranslation(
  translations: ThankYouTranslations
): (key: AllThankYouTranslationKeys) => string {
  return (key: AllThankYouTranslationKeys) => {
    return translations[key] || key;
  };
}
