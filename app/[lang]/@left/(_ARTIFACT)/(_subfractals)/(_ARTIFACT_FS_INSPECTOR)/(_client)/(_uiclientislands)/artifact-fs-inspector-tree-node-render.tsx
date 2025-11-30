// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_client)/(_uiclientislands)/artifact-fs-inspector-tree-node-render.tsx

"use client";

import type {
  ArtifactFsInspectorTreeNode,
  ArtifactFsInspectorFileNode,
  ArtifactFsInspectorFolderNode,
} from "../../(_server)/(_fsqueries)/artifact-fs-inspector-fs-queries";
import { ArtifactFsInspectorCopyButton } from "./artifact-fs-inspector-copy-button";

type ArtifactFsInspectorTreeNodeRenderProps = {
  node: ArtifactFsInspectorTreeNode;
};

export function ArtifactFsInspectorTreeNodeRender(
  props: ArtifactFsInspectorTreeNodeRenderProps
) {
  const { node } = props;

  if (node.kind === "file") {
    return <FileNodeRender file={node as ArtifactFsInspectorFileNode} />;
  }

  return <FolderNodeRender folder={node as ArtifactFsInspectorFolderNode} />;
}

function FileNodeRender(props: { file: ArtifactFsInspectorFileNode }) {
  const { file } = props;

  return (
    <li className="mb-1">
      <details>
        <summary className="cursor-pointer">
          {file.name}
        </summary>
        <p className="text-[10px] text-muted-foreground">
          {file.pathFromApp}
        </p>
        <div className="relative mt-1">
          <pre className="text-[10px] whitespace-pre overflow-auto border rounded p-1 max-h-[250px]">
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

function FolderNodeRender(props: { folder: ArtifactFsInspectorFolderNode }) {
  const { folder } = props;

  return (
    <li className="mb-1">
      <details open>
        <summary className="cursor-pointer">
          {folder.name}
        </summary>
        <ul className="ml-3">
          {folder.children.map((child) => (
            <ArtifactFsInspectorTreeNodeRender
              key={child.pathFromApp}
              node={child}
            />
          ))}
        </ul>
      </details>
    </li>
  );
}
