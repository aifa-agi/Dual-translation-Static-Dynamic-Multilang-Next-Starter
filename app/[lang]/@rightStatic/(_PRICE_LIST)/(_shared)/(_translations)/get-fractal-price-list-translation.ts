// app/[lang]/@rightStatic/(_PRICE_LIST)/(_shared)/(_translations)/get-fractal-price-list-translation.ts

import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  FractalPriceListTranslations,
  AllFractalPriceListTranslationKeys,
} from "../(_types)/fractal-price-list-types";

import translationsData from "./fractal-price-list-translation.json";

type TranslationRecord = {
  cuidKey: string;
  key: AllFractalPriceListTranslationKeys;
  translations: Record<string, string>;
};

export async function getFractalPriceListTranslation(
  lang: SupportedLanguage,
): Promise<FractalPriceListTranslations> {
  const data = translationsData as Record<string, TranslationRecord>;

  const translations: Partial<FractalPriceListTranslations> = {};

  for (const cuidKey in data) {
    const entry = data[cuidKey];
    const translationKey = entry.key;
    const value =
      entry.translations[lang] ??
      entry.translations["en"] ??
      translationKey;

    translations[translationKey] = value;
  }

  return translations as FractalPriceListTranslations;
}
