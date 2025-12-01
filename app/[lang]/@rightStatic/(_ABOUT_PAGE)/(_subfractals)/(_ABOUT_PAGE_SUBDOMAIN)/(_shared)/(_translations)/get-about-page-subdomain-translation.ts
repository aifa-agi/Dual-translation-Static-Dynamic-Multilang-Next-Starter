// app/[lang]/@rightStatic/(_ABOUT_PAGE)/subfractals/(_ABOUT_PAGE_SUBDOMAIN)/(_shared)/(_translations)/get-about-page-subdomain-translation.ts

import { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  FractalAboutPageSubdomainTranslations,
  AllFractalAboutPageSubdomainTranslationKeys,
} from "../(_types)/fractal-about-page-subdomain-types";
import translationsData from "./fractal-about-page-subdomain-translation.json";

type TranslationData = {
  [cuidKey: string]: {
    key: AllFractalAboutPageSubdomainTranslationKeys;
    translations: { [lang: string]: string };
  };
};

export async function getFractalAboutPageSubdomainTranslation(
  lang: SupportedLanguage,
): Promise<FractalAboutPageSubdomainTranslations> {
  const data = translationsData as TranslationData;
  const translations: Partial<FractalAboutPageSubdomainTranslations> = {};

  for (const cuidKey in data) {
    const entry = data[cuidKey];
    const translationKey = entry.key;
    const translatedValue =
      entry.translations[lang] ?? entry.translations.en ?? translationKey;

    translations[translationKey] = translatedValue;
  }

  return translations as FractalAboutPageSubdomainTranslations;
}
