// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_client)/(_uiclientislands)/artifact-fs-inspector-header.tsx

"use client";

import type { JSX } from "react";
import type { FractalArtifactFsInspectorTranslations } from "../../(_shared)/(_types)/fractal-artifact-fs-inspector-types";

type ArtifactFsInspectorHeaderProps = {
  translations: FractalArtifactFsInspectorTranslations;
};

export function ArtifactFsInspectorHeader(
  props: ArtifactFsInspectorHeaderProps,
): JSX.Element {
  const { translations } = props;

  const title = translations.headerTitle;
  const description = translations.headerDescription;

  return (
    <header className="flex flex-col gap-2">
   
      <p className="text-xs text-muted-foreground">
        {description}
      </p>
    </header>
  );
}
