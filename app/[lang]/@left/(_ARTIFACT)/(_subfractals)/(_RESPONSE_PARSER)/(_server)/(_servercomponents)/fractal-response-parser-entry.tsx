// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/(_server)/fractal-response-parser-entry.tsx

import type { SupportedLanguage } from "@/config/translations/translations.config";

import { getResponseParserTranslation } from "../../(_shared)/(_translations)/get-response-parser-translation";
import type {
  FractalResponseParserTranslations,
  ResponseParserPageData,
} from "../../(_shared)/(_types)/fractal-response-parser-types";

import { ResponseParserServerConsumer } from "../(_servercomponents)/response-parser-server-consumer";
import { ResponseParserStarterClientIsland } from "../../(_client)/(_uiclientislands)/response-parser-starter-client-island";

import { JSX } from "react";

type FractalResponseParserEntryProps = {
  lang: SupportedLanguage;
  currentPath: string;
  level?: number;
};

export async function FractalResponseParserEntry(
  props: FractalResponseParserEntryProps,
): Promise<JSX.Element> {
  const { lang, currentPath, level = 2 } = props;

  const translations: FractalResponseParserTranslations =
    await getResponseParserTranslation(lang);

  const pageData: ResponseParserPageData = {
    fractalName: "(_RESPONSE_PARSER)",
    fractalPath: "@/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)",
    fractalLevel: level,
    fractalDescription:
      "Minimal Embedded AIFA fractal for parsing AI responses.",
    hint:
      "This fractal is toggled by the Response Parser button in the parent ARTEFACT canvas.",
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-300 bg-gray-50 p-4">
      <ResponseParserServerConsumer
        translations={translations}
        lang={lang}
        currentPath={currentPath}
        pageData={pageData}
        level={level}
      />

      <ResponseParserStarterClientIsland
        translations={translations}
        lang={lang}
        currentPath={currentPath}
        pageData={pageData}
      />
    </div>
  );
}
