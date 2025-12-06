// @/app/[lang]/@rightStatic/(_PRICE_LIST)/(_subfractals)/(_PRICE_LIST_SUBDOMAIN)/(_shared)/(_translations)/get-price-list-subdomain-translation.ts

import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  FractalPriceListSubdomainTranslations,
  AllFractalPriceListSubdomainTranslationKeys,
} from "../(_types)/fractal-price-list-subdomain-types";

import translationsData from "./fractal-price-list-subdomain-translation.json";

type TranslationRecord = {
  cuidKey: string;
  key: AllFractalPriceListSubdomainTranslationKeys;
  translations: Record<string, string>;
};

export async function getFractalPriceListSubdomainTranslation(
  lang: SupportedLanguage,
): Promise<FractalPriceListSubdomainTranslations> {
  const data = translationsData as Record<string, TranslationRecord>;

  const translations: Partial<FractalPriceListSubdomainTranslations> = {};

  for (const cuidKey in data) {
    const entry = data[cuidKey];
    const translationKey = entry.key;
    const value =
      entry.translations[lang] ??
      entry.translations["en"] ??
      translationKey;

    translations[translationKey] = value;
  }

  return translations as FractalPriceListSubdomainTranslations;
}
