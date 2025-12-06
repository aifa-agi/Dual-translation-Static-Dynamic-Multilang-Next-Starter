// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/(_shared)/(_translations)/get-fractal-response-parser-translation.ts

import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  FractalResponseParserTranslations,
  AllFractalResponseParserTranslationKeys,
} from "../(_types)/fractal-response-parser-types";
import translationsData from "./fractal-response-parser-translation.json";

type FractalResponseParserTranslationData = {
  [cuid: string]: {
    key: AllFractalResponseParserTranslationKeys;
    translations: {
      [langCode: string]: string;
    };
  };
};

export async function getFractalResponseParserTranslation(
  lang: SupportedLanguage,
): Promise<FractalResponseParserTranslations> {
  const data = translationsData as FractalResponseParserTranslationData;
  const translations: Partial<FractalResponseParserTranslations> = {};

  for (const cuidKey in data) {
    const entry = data[cuidKey];
    const translationKey = entry.key;
    const translatedValue =
      entry.translations[lang] ?? entry.translations["en"] ?? translationKey;

    translations[translationKey] = translatedValue;
  }

  return translations as FractalResponseParserTranslations;
}
