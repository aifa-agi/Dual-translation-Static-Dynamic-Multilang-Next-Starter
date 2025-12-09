// @/app/[lang]/@left/(_ARTIFACT)/(_server)/fractal-artifact-entry.tsx

import type { SupportedLanguage } from "@/config/translations/translations.config";

import { getFractalArtifactTranslation } from "../(_shared)/(_translations)/get-fractal-artifact-translation";
import type {
  FractalArtifactTranslations,
  ArtifactPageData,
} from "../(_shared)/(_types)/fractal-artifact-types";

import { ArtifactStarterServerConsumer } from "./(_servercomponents)/artifact-starter-server-consumer";
import { ArtifactStarterClientIsland } from "../(_client)/(_uiclientislands)/artifact-starter-client-island";
import { ArtifactFsInspectorEmbeddingSlot } from "../(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/embedding-artifact-fs-inspector-slot";
import { ResponseParserEmbeddingSlot } from "../(_subfractals)/(_RESPONSE_PARSER)/embedding-response-parser-slot";

import { JSX } from "react";
import { FractalDevLabelHandler } from "../(_client)/(_uiclientislands)/fractal-dev-label-handler";
import { cn } from "@/lib/utils";

type FractalArtifactEntryProps = {
  lang: SupportedLanguage;
  currentPath: string;
  level?: number;
};

export async function FractalArtifactEntry(
  props: FractalArtifactEntryProps,
): Promise<JSX.Element> {
  const { lang, currentPath, level = 1 } = props;

  const translations: FractalArtifactTranslations =
    await getFractalArtifactTranslation(lang);
  const currentFractalLevel = level || 1;
  const pageData: ArtifactPageData = {
    fractalName: "(_ARTIFACT)",
    fractalPath: "@/app/[lang]/@left/(_ARTIFACT)",
    fractalLevel: currentFractalLevel,
    fractalDescription:
      "Improved AIFA fractal for the left slot: an AI-assisted canvas to work with other fractals and the project filesystem.",
    hint:
      "FS Inspector and Response Parser are dedicated subfractals below. Use the buttons to toggle their visibility; other modes will be extracted to subfractals later.",
  };

  const isDevMode = process.env.NODE_ENV === "development";

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

      <ArtifactStarterServerConsumer
        translations={translations}
        lang={lang}
        currentPath={currentPath}
        pageData={pageData}
        level={clampedLevel}
      />

      <ArtifactStarterClientIsland
        translations={translations}
        lang={lang}
        currentPath={currentPath}
        pageData={pageData}
      />

      <div
        id="artifact-fs-inspector-panel"
        className="hidden rounded-md border border-dashed border-gray-300 bg-gray-50"
      >
        <ArtifactFsInspectorEmbeddingSlot
          lang={lang}
          currentPath={currentPath}
          level={level + 1}
        />
      </div>

      <div
        id="artifact-response-parser-panel"
        className="hidden rounded-md border border-dashed border-purple-300 bg-purple-50"
      >
        <ResponseParserEmbeddingSlot
          lang={lang}
          currentPath={currentPath}
          level={level + 1}
        />
      </div>
    </div>
  );
}
