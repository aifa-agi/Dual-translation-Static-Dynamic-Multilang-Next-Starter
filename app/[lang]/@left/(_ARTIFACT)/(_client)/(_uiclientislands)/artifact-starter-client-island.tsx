// @/app/(lang)/left/(_ARTIFACT)/(_client)/(_uiclientislands)/artifact-starter-client-island.tsx
"use client";

import { JSX, useCallback, useEffect, useState } from "react";
import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  FractalArtifactTranslations,
  ArtifactPageData,
} from "../../(_shared)/(_types)/fractal-artifact-types";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type ArtifactStarterClientIslandProps = {
  translations: FractalArtifactTranslations;
  lang?: SupportedLanguage;
  currentPath?: string;
  pageData?: ArtifactPageData;
};

const MODES = [
  "FS Inspector",
  "Prompt Builder",
  "Response Parser",
  "Project Schema",
  "Blob Manager",
  "Content Tool",
] as const;

type ArtifactMode = (typeof MODES)[number];

const FS_INSPECTOR_MODE: ArtifactMode = "FS Inspector";

export function ArtifactStarterClientIsland(
  props: ArtifactStarterClientIslandProps,
): JSX.Element {
  const { translations, lang, currentPath, pageData } = props;

  const [activeMode, setActiveMode] = useState<ArtifactMode | null>(
    FS_INSPECTOR_MODE,
  );

  const title =
    pageData?.fractalName ?? "ARTEFACT Workspace · Client Canvas";
  const description =
    pageData?.fractalDescription ??
    "Client-side canvas with mode buttons for artifact tooling.";
  const hint =
    pageData?.hint ??
    "Click FS Inspector to toggle the filesystem inspector panel below. Other modes are not implemented yet and will show a toast only.";

  const handleClick = useCallback(
    (mode: ArtifactMode) => {
      if (mode === FS_INSPECTOR_MODE) {
        // Toggle FS Inspector visibility.
        setActiveMode((previous) =>
          previous === FS_INSPECTOR_MODE ? null : FS_INSPECTOR_MODE,
        );
        return;
      }

      // Other modes: keep current toast-only behaviour.
      toast.info(
        `${mode} · lang=${lang ?? "n/a"} · path=${currentPath ?? "n/a"}`,
        {
          description: `Greeting: ${translations.greeting}`,
          duration: 3500,
        },
      );
    },
    [currentPath, lang, translations.greeting],
  );

  useEffect(() => {
    const panel = document.getElementById("artifact-fs-inspector-panel");
    if (!panel) {
      return;
    }

    if (activeMode === FS_INSPECTOR_MODE) {
      panel.classList.remove("hidden");
    } else {
      panel.classList.add("hidden");
    }
  }, [activeMode]);

  return (
    <section className="flex flex-col gap-3 rounded-md bg-gray-100 p-4 text-gray-900">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-gray-800">{description}</p>
      <p className="text-xs text-gray-700">{hint}</p>

      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {MODES.map((mode) => (
          <Button
            key={mode}
            type="button"
            size="sm"
            variant={activeMode === mode ? "default" : "secondary"}
            className="justify-start text-xs"
            onClick={() => handleClick(mode)}
          >
            {mode}
          </Button>
        ))}
      </div>

      <p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
        Client island · use client
      </p>
    </section>
  );
}
