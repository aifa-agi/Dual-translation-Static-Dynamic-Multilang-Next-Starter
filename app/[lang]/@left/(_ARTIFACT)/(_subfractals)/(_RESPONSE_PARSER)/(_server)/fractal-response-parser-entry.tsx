// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/(_server)/fractal-response-parser-entry.tsx

import type { JSX } from "react";
import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  FractalResponseParserTranslations,
  FractalResponseParserPageData,
} from "../(_shared)/(_types)/fractal-response-parser-types";

import { ResponseParserStarterClientIsland } from "../(_client)/(_uiclientislands)/response-parser-starter-client-island";
import { getFractalResponseParserTranslation } from "../(_shared)/(_translations)/get-response-parser-translation";

type FractalResponseParserEntryProps = {
  lang: SupportedLanguage;
  currentPath: string;
  level?: number;
};

export async function FractalResponseParserEntry(
  props: FractalResponseParserEntryProps,
): Promise<JSX.Element> {
  const { lang, currentPath, level = 1 } = props;

  const translations: FractalResponseParserTranslations =
    await getFractalResponseParserTranslation(lang);

  const currentFractalLevel = level + 1;
  const clampedLevel = Math.max(1, Math.min(currentFractalLevel, 20));

  const fractalName = "RESPONSE_PARSER";
  const fractalDescription =
    "Embedded fractal for parsing Perplexity Markdown responses and applying file changes.";
  const hint =
    "Paste Perplexity response markdown, parse it, and write files to the project.";

  const pageData: FractalResponseParserPageData = {
    fractalName: fractalName,
    fractalPath: `app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)`,
    fractalLevel: clampedLevel,
    fractalDescription: fractalDescription,
    hint: hint,
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6">
      <ResponseParserStarterClientIsland
        translations={translations}
        lang={lang}
        currentPath={currentPath}
        pageData={pageData}
      />
    </div>
  );
}
