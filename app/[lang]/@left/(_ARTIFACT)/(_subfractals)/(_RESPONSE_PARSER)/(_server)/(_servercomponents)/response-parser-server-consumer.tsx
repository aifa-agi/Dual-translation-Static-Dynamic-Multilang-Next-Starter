import type { JSX } from "react";
import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  FractalResponseParserTranslations,
  FractalResponseParserPageData,
} from "../../(_shared)/(_types)/fractal-response-parser-types";

type ResponseParserServerConsumerProps = {
  translations: FractalResponseParserTranslations;
  lang?: SupportedLanguage;
  currentPath?: string;
  pageData?: FractalResponseParserPageData;
  level?: number;
};

export function ResponseParserServerConsumer(
  props: ResponseParserServerConsumerProps,
): JSX.Element {
  const { translations } = props;

  const title = translations.serverTitle;
  const description = translations.serverDescription;
  const hint = translations.serverHint;

  return (
    <section className="flex flex-col items-start justify-center gap-2 rounded-md">
      <h2 className="text-base font-semibold tracking-tight">
        {title}
      </h2>
      <p className="text-sm text-gray-800">
        {description}
      </p>
      <p className="text-xs text-gray-700">
        {hint}
      </p>
    </section>
  );
}