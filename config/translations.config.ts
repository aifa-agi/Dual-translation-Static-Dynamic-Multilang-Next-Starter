// config/translations.config.ts

const parseSupportedLanguages = (): readonly string[] => {
  const envLangs = process.env.NEXT_PUBLIC_SUPPORTED_LANGUAGES?.trim();
  
  if (!envLangs) {
    console.warn(
      '⚠️  NEXT_PUBLIC_SUPPORTED_LANGUAGES not set in .env. Using default: ["en"]'
    );
    return ['en'] as const;
  }

  const langs = envLangs
    .split(',')
    .map((lang) => lang.trim().toLowerCase())
    .filter((lang) => lang.length > 0);

  if (langs.length === 0) {
    console.warn(
      '⚠️  NEXT_PUBLIC_SUPPORTED_LANGUAGES is empty. Using default: ["en"]'
    );
    return ['en'] as const;
  }

  return langs as readonly string[];
};

/**
 * All supported languages from environment variable
 * Used for generateStaticParams in app/[lang]/layout.tsx
 */
export const SUPPORTED_LANGUAGES = parseSupportedLanguages() as readonly [
  string,
  ...string[]
];

/**
 * Type representing a valid language code
 */
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * Translation entry type - maps language codes to translated strings
 */
export type TranslationEntry = {
  [K in SupportedLanguage]: string;
};

/**
 * Translations object type - maps translation keys to language entries
 */
export type Translations = {
  [key: string]: TranslationEntry;
};

/**
 * Default language from environment variable
 * Falls back to 'en' if not configured or invalid
 */
export const DEFAULT_LANGUAGE: SupportedLanguage = (() => {
  const envLang = process.env.NEXT_PUBLIC_DEFAULT_LOCALE?.trim().toLowerCase();

  if (!envLang) {
    console.warn(
      '⚠️  NEXT_PUBLIC_DEFAULT_LOCALE not set in .env. Using default: "en"'
    );
    return 'en' as SupportedLanguage;
  }

  if (!SUPPORTED_LANGUAGES.includes(envLang)) {
    console.warn(
      `⚠️  DEFAULT_LOCALE "${envLang}" is not in SUPPORTED_LANGUAGES. Using first supported: "${SUPPORTED_LANGUAGES[0]}"`
    );
    return SUPPORTED_LANGUAGES[0] as SupportedLanguage;
  }

  return envLang as SupportedLanguage;
})();

/**
 * Validate if a string is a supported language code
 */
export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

/**
 * Get language label for UI display
 */
export function getLanguageLabel(lang: SupportedLanguage): string {
  const labels: Record<string, string> = {
    en: 'English',
    ru: 'Русский',
    es: 'Español',
    de: 'Deutsch',
    fr: 'Français',
    it: 'Italiano',
  };

  return labels[lang] || lang.toUpperCase();
}

/**
 * Get language native name
 */
export function getLanguageNativeName(lang: SupportedLanguage): string {
  const names: Record<string, string> = {
    en: 'English',
    ru: 'Русский',
    es: 'Español',
    de: 'Deutsch',
    fr: 'Français',
    it: 'Italiano',
  };

  return names[lang] || lang;
}
