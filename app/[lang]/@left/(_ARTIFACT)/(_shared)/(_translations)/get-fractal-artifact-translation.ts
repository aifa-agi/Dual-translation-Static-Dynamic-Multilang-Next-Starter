// @/app/(lang)/left/(_ARTIFACT)/(_shared)/(_translations)/get-fractal-artifact-translation.ts
import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  FractalArtifactTranslations,
  AllFractalArtifactTranslationKeys,
} from "../(_types)/fractal-artifact-types";

import translationsData from "./fractal-artifact-translation.json";

type TranslationRecord = {
  cuidKey: string;
  key: AllFractalArtifactTranslationKeys;
  translations: Record<string, string>;
};

export async function getFractalArtifactTranslation(
  lang: SupportedLanguage,
): Promise<FractalArtifactTranslations> {
  const data = translationsData as Record<string, TranslationRecord>;

  const translations: Partial<FractalArtifactTranslations> = {};

  for (const cuidKey in data) {
    const entry = data[cuidKey];
    const translationKey = entry.key;
    const value =
      entry.translations[lang] ??
      entry.translations["en"] ??
      translationKey;

    translations[translationKey] = value;
  }

  return translations as FractalArtifactTranslations;
}
