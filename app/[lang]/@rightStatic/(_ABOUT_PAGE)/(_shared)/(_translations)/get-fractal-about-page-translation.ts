// @/app/[lang]/@rightStatic/(_ABOUT_PAGE)/(_shared)/(_translations)/get-fractal-about-page-translation.ts

import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  FractalAboutPageTranslations,
  AllFractalAboutPageTranslationKeys,
} from "../(_types)/fractal-about-page-types";

import translationsData from "./fractal-about-page-translation.json";

type TranslationRecord = {
  cuidKey: string;
  key: AllFractalAboutPageTranslationKeys;
  translations: Record<string, string>;
};

export async function getFractalAboutPageTranslation(
  lang: SupportedLanguage,
): Promise<FractalAboutPageTranslations> {
  const data = translationsData as Record<string, TranslationRecord>;

  const translations: Partial<FractalAboutPageTranslations> = {};

  for (const cuidKey in data) {
    const entry = data[cuidKey];
    const translationKey = entry.key;
    const value =
      entry.translations[lang] ??
      entry.translations["en"] ??
      translationKey;

    translations[translationKey] = value;
  }

  return translations as FractalAboutPageTranslations;
}
