// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/(_client)/(_uiclientislands)/response-parser-starter-client-island.tsx

"use client";

import { JSX } from "react";
import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  FractalResponseParserTranslations,
  ResponseParserPageData,
} from "../../(_shared)/(_types)/fractal-response-parser-types";

type ResponseParserStarterClientIslandProps = {
  translations: FractalResponseParserTranslations;
  lang?: SupportedLanguage;
  currentPath?: string;
  pageData?: ResponseParserPageData;
};

export function ResponseParserStarterClientIsland(
  props: ResponseParserStarterClientIslandProps,
): JSX.Element {
  const { translations, lang, currentPath, pageData } = props;

  const title =
    pageData?.fractalName ?? "Response Parser · Client Canvas";
  const description =
    pageData?.fractalDescription ??
    "Client-side canvas for parsing AI responses.";
  const hint =
    pageData?.hint ??
    "Parsing functionality will be added in future versions.";

  return (
    <section className="flex flex-col gap-3 rounded-md bg-gray-100 p-4 text-gray-900">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-gray-800">{description}</p>
      <p className="text-xs text-gray-700">{hint}</p>

      <div className="mt-2 text-xs text-gray-700">
        <div>
          <span className="font-semibold">Greeting: </span>
          <span>{translations.greeting}</span>
        </div>
        <div>
          <span className="font-semibold">Lang: </span>
          <span>{lang ?? "n/a"}</span>
        </div>
        <div>
          <span className="font-semibold">Current path: </span>
          <span>{currentPath ?? "n/a"}</span>
        </div>
      </div>

      <p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
        Client island · use client
      </p>
    </section>
  );
}
