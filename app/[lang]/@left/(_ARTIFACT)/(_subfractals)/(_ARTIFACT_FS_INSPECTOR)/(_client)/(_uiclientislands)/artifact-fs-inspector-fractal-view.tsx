// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_client)/(_uiclientislands)/artifact-fs-inspector-fractal-view.tsx

"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { ArtifactFsInspectorFractalTree } from "../../(_server)/(_fsqueries)/artifact-fs-inspector-fs-queries";
import { ArtifactFsInspectorFolderRender } from "./artifact-fs-inspector-folder-render";
import { ArtifactFsInspectorRouteSegmentSection } from "./artifact-fs-inspector-route-segment-section";
import { formatFractalTreeAsMarkdown } from "../../(_shared)/(_utils)/format-fractal-markdown";
import { copyToClipboard } from "../../(_shared)/(_utils)/copy-to-clipboard";

type ArtifactFsInspectorFractalViewProps = {
  tree: ArtifactFsInspectorFractalTree;
};

export function ArtifactFsInspectorFractalView(
  props: ArtifactFsInspectorFractalViewProps
) {
  const { tree } = props;

  const handleCopyAll = async () => {
    const markdown = formatFractalTreeAsMarkdown(tree);
    const success = await copyToClipboard(markdown);

    if (success) {
      toast.success("All components copied to clipboard", {
        duration: 3000,
      });
    } else {
      toast.error("Failed to copy components");
    }
  };

  const title = "Fractal tree";
  const copyAllText = "Copy All Components";
  const subfractalsTitle = "(_subfractals) (names only)";

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          onClick={handleCopyAll}
          variant="outline"
          size="sm"
          className="self-start"
        >
          {copyAllText}
        </Button>
        
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground font-mono">
            {tree.fractalRootPathFromApp}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-xs font-mono">
        <ArtifactFsInspectorFolderRender
          label="ROOT"
          nodes={tree.filesAtRoot}
        />

        {tree.routeSegment ? (
          <ArtifactFsInspectorRouteSegmentSection
            routeSegment={tree.routeSegment}
          />
        ) : null}

        {tree.clientLayer ? (
          <ArtifactFsInspectorFolderRender
            label={tree.clientLayer.name}
            nodes={tree.clientLayer.children}
          />
        ) : null}

        {tree.serverLayer ? (
          <ArtifactFsInspectorFolderRender
            label={tree.serverLayer.name}
            nodes={tree.serverLayer.children}
          />
        ) : null}

        {tree.sharedLayer ? (
          <ArtifactFsInspectorFolderRender
            label={tree.sharedLayer.name}
            nodes={tree.sharedLayer.children}
          />
        ) : null}

        {tree.subfractals.length > 0 ? (
          <div>
            <p className="font-semibold">{subfractalsTitle}</p>
            <ul className="ml-3 list-disc">
              {tree.subfractals.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
