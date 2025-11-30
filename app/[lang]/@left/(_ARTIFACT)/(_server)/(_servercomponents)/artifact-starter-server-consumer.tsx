// @/app/(lang)/left/(_ARTIFACT)/(_server)/(_servercomponents)/artifact-starter-server-consumer.tsx
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
  const { translations, lang, currentPath, pageData, level } = props;

  const title = pageData?.fractalName ?? "ARTEFACT Left Slot Fractal";
  const description =
    pageData?.fractalDescription ??
    "Minimal server container showing that translations and routing context are wired.";
  const hint =
    pageData?.hint ??
    "Tip: use this slot to orchestrate prompts, filesystem operations, and Blob artifacts.";

  return (
    <section className="flex flex-col items-start justify-center gap-2 rounded-md bg-gray-200 p-4 text-gray-900">
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
        <div>
          <span className="font-semibold">Level: </span>
          <span>{level ?? 1}</span>
        </div>
      </div>

      <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
        Server container · React Server Component
      </p>
    </section>
  );
}
