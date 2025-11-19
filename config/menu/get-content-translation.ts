//config/menu/get-content-translation.ts

import translations from "./content-translation.json";
import {
  DEFAULT_LANGUAGE,
  SupportedLanguage,
} from "@/config/translations/translations.config";

type TranslationEntry = {
  [K in SupportedLanguage]?: string;
};

type Translations = {
  [key: string]: TranslationEntry;
};

const typedTranslations: Translations = translations;

/**
 * Create translation helpers for specified language
 * @param language language code to use for translations
 */
export function getContentTranslation(language: SupportedLanguage) {
  // fallback language if parameter is invalid
  const lang = language || DEFAULT_LANGUAGE;

  console.log ("lang config/menu/get-content-translation.ts",lang)
  function t(key: string): string {
    const entry = typedTranslations[key];
    if (!entry) return key;
    return entry[lang] || entry[DEFAULT_LANGUAGE] || key;
  }

  function adaptHref(href: string): string {
    const parts = href.split('/');
    if (parts.length > 1 && parts[1].length === 2) {
      parts[1] = lang;
      return parts.join('/');
    }
    return href;
  }

  function getTranslatedContent(categories: any[]) {
    return categories.map(category => ({
      ...category,
      title: t(category.title),
      pages: category.pages.map((page: any) => ({
        ...page,
        title: t(page.title),
        description: t(page.description),
        href: adaptHref(page.href),
      })),
    }));
  }

  return { t, getTranslatedContent };
}
