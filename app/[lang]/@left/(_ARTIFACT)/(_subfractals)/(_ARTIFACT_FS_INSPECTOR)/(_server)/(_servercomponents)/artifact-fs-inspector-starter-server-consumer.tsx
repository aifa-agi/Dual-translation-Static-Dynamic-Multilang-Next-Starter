// @/app/(lang)/left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_server)/(_servercomponents)/artifact-fs-inspector-starter-server-consumer.tsx

import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  FractalArtifactFsInspectorTranslations,
  ArtifactFsInspectorPageData,
} from "../../(_shared)/(_types)/fractal-artifact-fs-inspector-types";
import { JSX } from "react";

export type ArtifactFsInspectorStarterServerConsumerProps = {
  translations: FractalArtifactFsInspectorTranslations;
  lang?: SupportedLanguage;
  currentPath?: string;
  pageData?: ArtifactFsInspectorPageData;
  level?: number;
};

export function ArtifactFsInspectorStarterServerConsumer(
  props: ArtifactFsInspectorStarterServerConsumerProps,
): JSX.Element {
  const { translations, lang, currentPath, pageData, level } = props;

  const title =  translations.serverTitle;
  const description = translations.serverDescription;
  const hint = translations.serverHint;

  return (
    <section className="flex flex-col gap-2 rounded-md bg-white p-3 text-gray-900 shadow-sm">
      <h3 className="text-sm font-semibold tracking-tight">
        {title}
      </h3>
      <p className="text-xs text-gray-800">
        {description}
      </p>
      <p className="text-[11px] text-gray-700">
        {hint}
      </p>

      

    </section>
  );
}
