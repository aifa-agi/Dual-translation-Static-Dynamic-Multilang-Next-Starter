// @/app/(lang)/left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_server)/fractal-artifact-fs-inspector-entry.tsx
import type { SupportedLanguage } from "@/config/translations/translations.config";

import { getFractalArtifactFsInspectorTranslation } from "../(_shared)/(_translations)/get-fractal-artifact-fs-inspector-translation";
import type {
  FractalArtifactFsInspectorTranslations,
  ArtifactFsInspectorPageData,
} from "../(_shared)/(_types)/fractal-artifact-fs-inspector-types";

import { ArtifactFsInspectorStarterServerConsumer } from "./(_servercomponents)/artifact-fs-inspector-starter-server-consumer";
import ArtifactFsInspectorStarterClientIsland from "../(_client)/(_uiclientislands)/artifact-fs-inspector-starter-client-island";

import { JSX } from "react";
import { cn } from "@/lib/utils";
import { FractalDevLabelHandler } from "../(_client)/(_uiclientislands)/fractal-dev-label-handler";

export type FractalArtifactFsInspectorEntryProps = {
  lang: SupportedLanguage;
  currentPath: string;
  level?: number;
};

export async function FractalArtifactFsInspectorEntry(
  props: FractalArtifactFsInspectorEntryProps,
): Promise<JSX.Element> {
  const { lang, currentPath, level } = props;

  const translations: FractalArtifactFsInspectorTranslations =
    await getFractalArtifactFsInspectorTranslation(lang);
  const currentFractalLevel = level || 1
  const pageData: ArtifactFsInspectorPageData = {
    fractalName: "(_ARTIFACT FS ISnspector)",
    fractalPath: "@/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)",
    fractalLevel: currentFractalLevel,
    fractalDescription:
      "Minimal embedded fractal that prepares a Markdown export template for a selected fractal path.",
    hint:
      "Paste a filesystem path to a fractal root, then use the button to generate a Markdown template for Perplexity.",
  };

  const isDevMode = process.env.NODE_ENV === "development";

  // Нормализуем level в диапазон 1–20
  const clampedLevel = Math.max(1, Math.min(currentFractalLevel, 20));
  return (
    <div
      className={cn(
        "aifa-fractal-container flex min-h-[60vh] flex-col gap-6 rounded-lg transition-all duration-200",
        isDevMode && `fractal-level-${clampedLevel}`,
      )}
      style={{ zIndex: clampedLevel * 100 }}
    >
      {isDevMode && (
        <div className="fractal-dev-tools">
          <FractalDevLabelHandler pageData={pageData} level={clampedLevel} />
        </div>
      )}

      <ArtifactFsInspectorStarterServerConsumer
        translations={translations}
        lang={lang}
        currentPath={currentPath}
        pageData={pageData}
        level={level}
      />

      <ArtifactFsInspectorStarterClientIsland
        translations={translations}
        lang={lang}
        currentPath={currentPath}
        pageData={pageData}
      />


    </div>
  );
}
