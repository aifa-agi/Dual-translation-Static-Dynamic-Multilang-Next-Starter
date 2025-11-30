// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_client)/(_uiclientislands)/artifact-fs-inspector-file-item-render.tsx

"use client";

import type { ArtifactFsInspectorFileNode } from "../../(_server)/(_fsqueries)/artifact-fs-inspector-fs-queries";
import { ArtifactFsInspectorCopyButton } from "./artifact-fs-inspector-copy-button";

type ArtifactFsInspectorFileItemRenderProps = {
  file: ArtifactFsInspectorFileNode;
  icon: string;
  label: string;
};

export function ArtifactFsInspectorFileItemRender(
  props: ArtifactFsInspectorFileItemRenderProps
) {
  const { file, icon, label } = props;

  return (
    <li className="mb-1">
      <details>
        <summary className="cursor-pointer hover:text-blue-600">
          <span className="mr-1">{icon}</span>
          {label}
        </summary>
        <p className="text-[10px] text-muted-foreground mt-1">
          {file.pathFromApp}
        </p>
        <div className="relative mt-1">
          <pre className="text-[10px] whitespace-pre overflow-auto border rounded p-1 max-h-[250px] bg-gray-50">
            {file.content}
          </pre>
          <div className="absolute top-1 right-1">
            <ArtifactFsInspectorCopyButton
              content={file.content}
              label={file.name}
            />
          </div>
        </div>
      </details>
    </li>
  );
}
