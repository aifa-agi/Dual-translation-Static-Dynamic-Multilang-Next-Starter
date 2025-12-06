// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/embedding-response-parser-slot.tsx

import type { ReactElement } from "react";
import type { SupportedLanguage } from "@/config/translations/translations.config";
import { FractalResponseParserEntry } from "./(_server)/fractal-response-parser-entry";

type ResponseParserEmbeddingSlotProps = {
  lang: SupportedLanguage;
  currentPath: string;
  level: number;
};

/**
 * Тонкий коннектор embedding slot для субфрактала RESPONSE_PARSER.
 * Только передаёт lang, currentPath, level в entry фрактала.
 * Переводы загружаются внутри FractalResponseParserEntry.
 */
export async function ResponseParserEmbeddingSlot(
  props: ResponseParserEmbeddingSlotProps,
): Promise<ReactElement> {
  const { lang, currentPath, level } = props;

  return (
    <FractalResponseParserEntry
      lang={lang}
      currentPath={currentPath}
      level={level}
    />
  );
}
