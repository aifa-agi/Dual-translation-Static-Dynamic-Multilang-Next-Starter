//components/cookie-banner/(_shared)/(_translations)/get-cookie-consent-translation.ts

import { use } from 'react';
import type { 
  CookieConsentTranslations, 
  CookieConsentTranslationKeys,
  TranslationParams 
} from '../(_types)/cookie-consent-types';
import translationData from './cookie-consent-translation.json';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Translation map structure from JSON
 * Maps CUID identifiers to translation objects
 */
type TranslationMap = {
  [cuid: string]: {
    key: CookieConsentTranslationKeys;
    translations: {
      [lang: string]: string;
    };
  };
};

/**
 * Translation helper return type
 * Provides translation function and utilities
 */
export type CookieConsentTranslationHelper = {
  /** Get translation by key */
  t: (key: CookieConsentTranslationKeys) => string;
  /** Format translation with parameters (e.g., {site}, {brand}, {days}) */
  formatI18n: (template: string, params?: TranslationParams) => string;
  /** Current language code */
  lang: string;
  /** All translations for current language */
  translations: CookieConsentTranslations;
};

// ============================================================================
// PRIVATE UTILITIES
// ============================================================================

/**
 * Build translation lookup map from JSON
 * Converts CUID-based structure to key-based lookup
 * 
 * @internal
 */
function buildTranslationLookup(): Map<CookieConsentTranslationKeys, { [lang: string]: string }> {
  const lookup = new Map<CookieConsentTranslationKeys, { [lang: string]: string }>();
  const data = translationData as TranslationMap;

  Object.values(data).forEach((entry) => {
    lookup.set(entry.key, entry.translations);
  });

  return lookup;
}

/**
 * Cached translation lookup map
 * Built once on module initialization
 */
const TRANSLATION_LOOKUP = buildTranslationLookup();

/**
 * Get translations for specific language
 * 
 * @param lang - Language code (e.g., 'en', 'es', 'ru')
 * @returns Complete translations object for the language
 */
function getTranslationsForLanguage(lang: string): CookieConsentTranslations {
  const translations = {} as CookieConsentTranslations;

  TRANSLATION_LOOKUP.forEach((langMap, key) => {
    // Fallback to English if translation not found for language
    translations[key] = langMap[lang] || langMap['en'] || key;
  });

  return translations;
}

/**
 * Format translation template with parameters
 * 
 * Replaces placeholders like {site}, {brand}, {days} with actual values
 * 
 * @param template - Translation template string
 * @param params - Parameters to replace in template
 * @returns Formatted string
 * 
 * @example
 * formatI18nTemplate("Hello {name}!", { name: "World" })
 * // Returns: "Hello World!"
 */
function formatI18nTemplate(
  template: string, 
  params: TranslationParams = {}
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const val = params[key];
    return val === undefined || val === null ? `{${key}}` : String(val);
  });
}

// ============================================================================
// SERVER-SIDE TRANSLATION (Async)
// ============================================================================

/**
 * Get cookie consent translations for server components
 * 
 * This function is used in Server Components and Server Actions.
 * It returns a Promise to be compatible with Next.js 15 async requirements.
 * 
 * @param lang - Language code
 * @returns Promise resolving to translation helper
 * 
 * @example Server Component
 * ```
 * export default async function CookieBannerServer({ 
 *   params 
 * }: { 
 *   params: Promise<{ lang: string }> 
 * }) {
 *   const { lang } = await params;
 *   const { t, formatI18n } = await getCookieConsentTranslation(lang);
 *   
 *   return (
 *     <div>
 *       <h1>{t('cuid_cookie_banner_info_lead')}</h1>
 *       <p>{formatI18n(t('cuid_cookie_banner_info_body'), { site: 'example.com' })}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export async function getCookieConsentTranslation(
  lang: string
): Promise<CookieConsentTranslationHelper> {
  const translations = getTranslationsForLanguage(lang);

  return {
    t: (key: CookieConsentTranslationKeys) => translations[key] || key,
    formatI18n: formatI18nTemplate,
    lang,
    translations,
  };
}

// ============================================================================
// CLIENT-SIDE TRANSLATION (Hook)
// ============================================================================

/**
 * Use cookie consent translations in Client Components
 * 
 * This hook must be used in Client Components only.
 * It accepts a Promise (for compatibility with Next.js 15 async params).
 * 
 * @param langPromise - Promise resolving to language code
 * @returns Translation helper
 * 
 * @example Client Component
 * ```
 * 'use client';
 * 
 * export function CookieBannerClient({ 
 *   langPromise 
 * }: { 
 *   langPromise: Promise<string> 
 * }) {
 *   const { t, formatI18n } = useCookieConsentTranslation(langPromise);
 *   
 *   return (
 *     <div>
 *       <h1>{t('cuid_cookie_banner_info_lead')}</h1>
 *       <button>{t('cuid_cookie_banner_accept_all')}</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useCookieConsentTranslation(
  langPromise: Promise<string>
): CookieConsentTranslationHelper {
  const lang = use(langPromise);
  const translations = getTranslationsForLanguage(lang);

  return {
    t: (key: CookieConsentTranslationKeys) => translations[key] || key,
    formatI18n: formatI18nTemplate,
    lang,
    translations,
  };
}

// ============================================================================
// SYNCHRONOUS CLIENT-SIDE TRANSLATION (for direct lang access)
// ============================================================================

/**
 * Use cookie consent translations with direct language string
 * 
 * Use this when you already have the language string (not a Promise).
 * Common in client components that receive lang as a prop.
 * 
 * @param lang - Language code string
 * @returns Translation helper
 * 
 * @example Client Component with direct lang
 * ```
 * 'use client';
 * 
 * export function CookieBanner({ lang }: { lang: string }) {
 *   const { t, formatI18n } = useCookieConsentTranslationSync(lang);
 *   
 *   return (
 *     <button>{t('cuid_cookie_banner_accept_all')}</button>
 *   );
 * }
 * ```
 */
export function useCookieConsentTranslationSync(
  lang: string
): CookieConsentTranslationHelper {
  const translations = getTranslationsForLanguage(lang);

  return {
    t: (key: CookieConsentTranslationKeys) => translations[key] || key,
    formatI18n: formatI18nTemplate,
    lang,
    translations,
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { CookieConsentTranslationKeys, TranslationParams };
