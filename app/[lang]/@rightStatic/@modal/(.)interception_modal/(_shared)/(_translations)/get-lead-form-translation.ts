// app/[lang]/@rightStatic/(...)interception_modal/lead-form/(_shared)/(_translations)/get-lead-form-translation.ts

/**
 * Lead Form Translation Helper
 * 
 * UPDATED: Added support for validation error message translations
 * - Loads all translation keys (UI + validation errors)
 * - Returns typed translation object
 * - Handles fallback to English
 */

import type { 
  SupportedLanguage 
} from "@/config/translations/translations.config";
import type { 
  LeadFormTranslations,
  AllTranslationKeys 
} from "../(_types)/lead-form-types";

// Import translation JSON with CUID keys
import translationsData from "./lead-form-translation.json";

/**
 * Type for the translation JSON structure
 */
type TranslationData = {
  [cuidKey: string]: {
    key: AllTranslationKeys;
    translations: {
      [lang: string]: string;
    };
  };
};

/**
 * Get translations for lead form by language
 * 
 * @param lang - Language code (e.g., 'en', 'ru', 'es')
 * @returns Typed translation object with all required keys
 */
export async function getLeadFormTranslation(
  lang: SupportedLanguage
): Promise<LeadFormTranslations> {
  const data = translationsData as TranslationData;
  
  // Build translations object from CUID keys
  const translations: Partial<LeadFormTranslations> = {};
  
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
  
  return translations as LeadFormTranslations;
}

/**
 * Client-side translation hook (for use in client components)
 * Returns a function to get translation by key
 */
export function useLeadFormTranslation(
  translations: LeadFormTranslations
): (key: AllTranslationKeys) => string {
  return (key: AllTranslationKeys) => {
    return translations[key] || key;
  };
}

/**
 * NEW: Get translation function for server-side validation
 * Used in Zod schema and server actions
 * 
 * @param translations - Full translations object
 * @returns Translation function for use in validation
 */
export function getValidationTranslationFunction(
  translations: LeadFormTranslations
): (key: string) => string {
  return (key: string) => {
    return translations[key as AllTranslationKeys] || key;
  };
}
