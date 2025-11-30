// @/app/(lang)/left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/embedding-artifact-fs-inspector-slot.tsx
import type { SupportedLanguage } from "@/config/translations/translations.config";
import type { JSX } from "react";

import { FractalArtifactFsInspectorEntry } from "./(_server)/fractal-artifact-fs-inspector-entry";

export type ArtifactFsInspectorEmbeddingSlotProps = {
  lang: SupportedLanguage;
  currentPath?: string;
  level?: number;
};

export async function ArtifactFsInspectorEmbeddingSlot(
  props: ArtifactFsInspectorEmbeddingSlotProps,
): Promise<JSX.Element> {
  const { lang, currentPath, level } = props;

  return (
    <FractalArtifactFsInspectorEntry
      lang={lang}
      currentPath={currentPath ?? ""}
      level={level}
    />
  );
}
