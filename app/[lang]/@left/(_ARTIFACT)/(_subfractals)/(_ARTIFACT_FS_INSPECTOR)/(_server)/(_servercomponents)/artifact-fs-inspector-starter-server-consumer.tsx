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

  const title = pageData?.fractalName ?? "ARTIFACT FS Inspector";
  const description =
    pageData?.fractalDescription ??
    "Server container that proves translations and routing context are wired.";
  const hint =
    pageData?.hint ??
    "Use this section to prepare a Markdown export flow for a chosen fractal.";

  return (
    <section className="flex flex-col gap-2 rounded-md bg-white p-3 text-gray-900 shadow-sm">
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      <p className="text-xs text-gray-800">{description}</p>
      <p className="text-[11px] text-gray-700">{hint}</p>

      <div className="mt-1 space-y-1 text-[11px] text-gray-700">
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

      <p className="mt-2 text-[9px] font-semibold uppercase tracking-wide text-gray-500">
        FS Inspector · Server container
      </p>
    </section>
  );
}
