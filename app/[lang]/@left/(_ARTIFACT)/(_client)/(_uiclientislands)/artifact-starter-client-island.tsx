// @/app/[lang]/@left/(_ARTIFACT)/(_client)/(_uiclientislands)/artifact-starter-client-island.tsx

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

type ArtifactMode =
  | "FS_INSPECTOR"
  | "RESPONSE_PARSER"
  | "PROMPT_BUILDER"
  | "PROJECT_SCHEMA"
  | "BLOB_MANAGER"
  | "PLUGIN_TRANSFORMER"
  | "CONTENT_TOOL";

const FS_INSPECTOR_MODE: ArtifactMode = "FS_INSPECTOR";
const RESPONSE_PARSER_MODE: ArtifactMode = "RESPONSE_PARSER";

export function ArtifactStarterClientIsland(
  props: ArtifactStarterClientIslandProps,
): JSX.Element {
  const { translations, lang, currentPath } = props;

  const [activeMode, setActiveMode] = useState<ArtifactMode | null>(null);

  const getLabel = (mode: ArtifactMode): string => {
    switch (mode) {
      case "FS_INSPECTOR":
        return translations.modeFsInspector;
      case "RESPONSE_PARSER":
        return translations.modeResponseParser;
      case "PROMPT_BUILDER":
        return translations.modePromptBuilder;
      case "PROJECT_SCHEMA":
        return translations.modeProjectSchema;
      case "BLOB_MANAGER":
        return translations.modeBlobManager;
      case "PLUGIN_TRANSFORMER":
        return translations.modePluginTransformer;
      case "CONTENT_TOOL":
        return translations.modeContentTool;
      default:
        return "";
    }
  };

  const handleClick = useCallback(
    (mode: ArtifactMode) => {
      if (mode === FS_INSPECTOR_MODE) {
        setActiveMode((previous) =>
          previous === FS_INSPECTOR_MODE ? null : FS_INSPECTOR_MODE,
        );
        return;
      }

      if (mode === RESPONSE_PARSER_MODE) {
        setActiveMode((previous) =>
          previous === RESPONSE_PARSER_MODE ? null : RESPONSE_PARSER_MODE,
        );
        return;
      }

      toast.info(
        `${getLabel(mode)} · lang=${lang ?? "n/a"} · path=${currentPath ?? "n/a"
        }`,
        {
          description: `Greeting: ${translations.greeting}`,
          duration: 3500,
        },
      );
    },
    [currentPath, lang, translations.greeting],
  );

  useEffect(() => {
    const fsInspectorPanel = document.getElementById(
      "artifact-fs-inspector-panel",
    );
    const responseParserPanel = document.getElementById(
      "artifact-response-parser-panel",
    );

    if (fsInspectorPanel) {
      if (activeMode === FS_INSPECTOR_MODE) {
        fsInspectorPanel.classList.remove("hidden");
      } else {
        fsInspectorPanel.classList.add("hidden");
      }
    }

    if (responseParserPanel) {
      if (activeMode === RESPONSE_PARSER_MODE) {
        responseParserPanel.classList.remove("hidden");
      } else {
        responseParserPanel.classList.add("hidden");
      }
    }
  }, [activeMode]);

  const modes: ArtifactMode[] = [
    "FS_INSPECTOR",
    "RESPONSE_PARSER",
    "PROMPT_BUILDER",
    "PROJECT_SCHEMA",
    "BLOB_MANAGER",
    "CONTENT_TOOL",
    "PLUGIN_TRANSFORMER",
  ];

  return (
    <section className="flex flex-col gap-3  ">
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {modes.map((mode) => (
          <Button
  key={mode}
  type="button"
  size="sm"
  variant={activeMode === mode ? "default" : "outline"}
  className="relative justify-start px-2 text-xs  rounded-md"
  onClick={() => handleClick(mode)}
>
  <span className="block max-w-full break-words pr-4 overflow-hidden">
    {getLabel(mode)}
  </span>

  <span
    aria-hidden="true"
    className={
      "pointer-events-none absolute inset-y-0 right-0  w-4 h-3" +
      (activeMode === mode
        ? "bg-gradient-to-l from-primary to-transparent  "
        : "bg-gradient-to-l from-background to-transparent ")
    }
  />
</Button>

        ))}
      </div>


    </section>
  );
}