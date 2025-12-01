// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/embedding-response-parser-slot.tsx

import type { SupportedLanguage } from "@/config/translations/translations.config";
import { JSX } from "react";
import { FractalResponseParserEntry } from "./(_server)/(_servercomponents)/fractal-response-parser-entry";

type ResponseParserEmbeddingSlotProps = {
  lang: SupportedLanguage;
  currentPath: string;
  level?: number;
};

export async function ResponseParserEmbeddingSlot(
  props: ResponseParserEmbeddingSlotProps,
): Promise<JSX.Element> {
  const { lang, currentPath, level = 2 } = props;

  return (
    <FractalResponseParserEntry
      lang={lang}
      currentPath={currentPath}
      level={level}
    />
  );
}
