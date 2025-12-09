// @/app/(lang)/left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_shared)/(_translations)/get-fractal-artifact-fs-inspector-translation.ts
import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  FractalArtifactFsInspectorTranslations,
  AllFractalArtifactFsInspectorTranslationKeys,
} from "../(_types)/fractal-artifact-fs-inspector-types";

import translationsData from "./fractal-artifact-fs-inspector-translation.json";

type TranslationRecord = {
  key: AllFractalArtifactFsInspectorTranslationKeys;
  translations: Record<string, string>;
};

export async function getFractalArtifactFsInspectorTranslation(
  lang: SupportedLanguage,
): Promise<FractalArtifactFsInspectorTranslations> {
  const data = translationsData as Record<string, TranslationRecord>;

  const translations: Partial<FractalArtifactFsInspectorTranslations> = {};

  for (const cuidKey in data) {
    const entry = data[cuidKey];
    const translationKey = entry.key;
    const value =
      entry.translations[lang] ?? entry.translations["en"] ?? translationKey;

    translations[translationKey] = value;
  }

  return translations as FractalArtifactFsInspectorTranslations;
}
