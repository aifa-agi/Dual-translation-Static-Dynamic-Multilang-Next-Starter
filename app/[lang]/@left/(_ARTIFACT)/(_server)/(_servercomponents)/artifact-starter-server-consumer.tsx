// @/app/[lang]/@left/(_ARTIFACT)/(_server)/(_servercomponents)/artifact-starter-server-consumer.tsx

import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  FractalArtifactTranslations,
  ArtifactPageData,
} from "../../(_shared)/(_types)/fractal-artifact-types";
import { JSX } from "react";

type ArtifactStarterServerConsumerProps = {
  translations: FractalArtifactTranslations;
  lang?: SupportedLanguage;
  currentPath?: string;
  pageData?: ArtifactPageData;
  level?: number;
};

export function ArtifactStarterServerConsumer(
  props: ArtifactStarterServerConsumerProps,
): JSX.Element {
  const { translations, lang, currentPath, level } = props;

  const title = translations.serverTitle;
  const description = translations.serverDescription;
  const hint = translations.serverHint;

  return (
    <section className="flex flex-col items-start justify-center gap-2 rounded-md ">
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
