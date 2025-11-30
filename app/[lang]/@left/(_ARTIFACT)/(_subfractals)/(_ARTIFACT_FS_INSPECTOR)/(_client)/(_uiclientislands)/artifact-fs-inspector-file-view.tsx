// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_client)/(_uiclientislands)/artifact-fs-inspector-file-view.tsx

"use client";

import type { ArtifactFsInspectorReadFileResult } from "../../(_server)/(_actions)/artifact-fs-inspector-actions";
import { ArtifactFsInspectorCopyButton } from "./artifact-fs-inspector-copy-button";

type ArtifactFsInspectorFileViewProps = {
  state: Extract<ArtifactFsInspectorReadFileResult, { ok: true }>;
};

export function ArtifactFsInspectorFileView(
  props: ArtifactFsInspectorFileViewProps
) {
  const { pathFromApp, content } = props.state;

  const title = "File content";

  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-xs text-muted-foreground font-mono">
        {pathFromApp}
      </p>
      <div className="relative">
        <pre className="text-xs font-mono whitespace-pre overflow-auto border rounded p-2 max-h-[400px]">
          {content}
        </pre>
        <div className="absolute top-2 right-2">
          <ArtifactFsInspectorCopyButton
            content={content}
            label={pathFromApp}
          />
        </div>
      </div>
    </section>
  );
}
