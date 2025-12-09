// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_client)/(_uiclientislands)/artifact-fs-inspector-starter-client-island.tsx

"use client";

import { useState, useTransition } from "react";
import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  ArtifactFsInspectorFractalTree,
} from "../../(_server)/(_fsqueries)/artifact-fs-inspector-fs-queries";
import {
  artifactFsInspectorReadFractalTreeAction,
  type ArtifactFsInspectorReadFileResult,
} from "../../(_server)/(_actions)/artifact-fs-inspector-actions";
import type {
  FractalArtifactFsInspectorTranslations,
  ArtifactFsInspectorPageData,
} from "../../(_shared)/(_types)/fractal-artifact-fs-inspector-types";
import { ArtifactFsInspectorHeader } from "./artifact-fs-inspector-header";
import { ArtifactFsInspectorInputSection } from "./artifact-fs-inspector-input-section";
import { ArtifactFsInspectorFileView } from "./artifact-fs-inspector-file-view";
import { ArtifactFsInspectorFractalView } from "./artifact-fs-inspector-fractal-view";


type ArtifactFsInspectorState =
  | { mode: "idle" }
  | {
      mode: "file";
      data: Extract<ArtifactFsInspectorReadFileResult, { ok: true }>;
    }
  | {
      mode: "fractal";
      data: ArtifactFsInspectorFractalTree;
    };

type ArtifactFsInspectorErrorState =
  | { hasError: false }
  | { hasError: true; message: string };

type ArtifactFsInspectorStarterClientIslandProps = {
  translations: FractalArtifactFsInspectorTranslations;
  lang: SupportedLanguage;
  currentPath: string;
  pageData: ArtifactFsInspectorPageData;
};

export default function ArtifactFsInspectorStarterClientIsland(
  props: ArtifactFsInspectorStarterClientIslandProps
) {
  const initialPath = "@/app/[lang]/@left/(_ARTIFACT)";

  const [pathInput, setPathInput] = useState(initialPath);
  const [state, setState] = useState<ArtifactFsInspectorState>({
    mode: "idle",
  });
  const [errorState, setErrorState] = useState<ArtifactFsInspectorErrorState>({
    hasError: false,
  });
  const [isPending, startTransition] = useTransition();

 

  const handleReadFractal = () => {
    startTransition(async () => {
      setErrorState({ hasError: false });
      setState({ mode: "idle" });

      const result = await artifactFsInspectorReadFractalTreeAction(pathInput);

      if (!result.ok) {
        setErrorState({
          hasError: true,
          message: result.error,
        });
        return;
      }

      setState({
        mode: "fractal",
        data: result.tree,
      });
    });
  };

  const errorPrefix = "Error: ";

  return (
    <section className="flex flex-col gap-4 w-full px-4">
      <ArtifactFsInspectorHeader translations={props.translations}/>

      <ArtifactFsInspectorInputSection
        pathInput={pathInput}
        onPathChange={setPathInput}
        onReadFractal={handleReadFractal}
        isPending={isPending}
      />

      {errorState.hasError ? (
        <p className="text-xs text-red-600">
          {errorPrefix}
          {errorState.message}
        </p>
      ) : null}

      {state.mode === "file" ? (
        <ArtifactFsInspectorFileView state={state.data} />
      ) : null}

      {state.mode === "fractal" ? (
        <ArtifactFsInspectorFractalView tree={state.data} />
      ) : null}
    </section>
  );
}
