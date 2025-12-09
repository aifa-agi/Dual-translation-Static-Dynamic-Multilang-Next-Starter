// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_client)/(_uiclientislands)/artifact-fs-inspector-folder-render.tsx

"use client";

import type { ArtifactFsInspectorTreeNode } from "../../(_server)/(_fsqueries)/artifact-fs-inspector-fs-queries";
import { ArtifactFsInspectorTreeNodeRender } from "./artifact-fs-inspector-tree-node-render";

type ArtifactFsInspectorFolderRenderProps = {
  label: string;
  nodes: ArtifactFsInspectorTreeNode[];
};

export function ArtifactFsInspectorFolderRender(
  props: ArtifactFsInspectorFolderRenderProps
) {
  const { label, nodes } = props;

  return (
    <div>
      <p className="font-semibold">{label}</p>
      <ul className="ml-3">
        {nodes.map((node) => (
          <ArtifactFsInspectorTreeNodeRender
            key={node.pathFromApp}
            node={node}
          />
        ))}
      </ul>
    </div>
  );
}
