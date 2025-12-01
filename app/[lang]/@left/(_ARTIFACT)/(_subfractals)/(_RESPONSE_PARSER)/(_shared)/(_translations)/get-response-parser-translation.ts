// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/(_shared)/(_translations)/get-response-parser-translation.ts

import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  FractalResponseParserTranslations,
  AllFractalResponseParserTranslationKeys,
} from "../(_types)/fractal-response-parser-types";

import translationsData from "./response-parser-translation.json";

type TranslationRecord = {
  cuidKey: string;
  key: AllFractalResponseParserTranslationKeys;
  translations: Record<string, string>;
};

export async function getResponseParserTranslation(
  lang: SupportedLanguage,
): Promise<FractalResponseParserTranslations> {
  const data = translationsData as Record<string, TranslationRecord>;

  const translations: Partial<FractalResponseParserTranslations> = {};

  for (const cuidKey in data) {
    const entry = data[cuidKey];
    const translationKey = entry.key;
    const value =
      entry.translations[lang] ??
      entry.translations["en"] ??
      translationKey;

    translations[translationKey] = value;
  }

  return translations as FractalResponseParserTranslations;
}
