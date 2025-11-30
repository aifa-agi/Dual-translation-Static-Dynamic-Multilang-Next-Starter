// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_client)/(_uiclientislands)/artifact-fs-inspector-route-segment-section.tsx

"use client";

import type { RouteSegmentInfo } from "../../(_server)/(_fsqueries)/(_tree-builders)/build-route-fractal-tree";
import { ArtifactFsInspectorFileItemRender } from "./artifact-fs-inspector-file-item-render";

type ArtifactFsInspectorRouteSegmentSectionProps = {
  routeSegment: RouteSegmentInfo;
};

export function ArtifactFsInspectorRouteSegmentSection(
  props: ArtifactFsInspectorRouteSegmentSectionProps
) {
  const { routeSegment } = props;

  const title = `🛣️ Route Segment: ${routeSegment.name}`;

  return (
    <div className="border-l-2 border-blue-500 pl-3 py-2">
      <p className="font-semibold text-blue-600 mb-1">
        {title}
      </p>
      <p className="text-[10px] text-muted-foreground mb-2">
        {routeSegment.pathFromApp}
      </p>
      <ul className="space-y-1">
        {routeSegment.page && (
          <ArtifactFsInspectorFileItemRender
            file={routeSegment.page}
            icon="📄"
            label="page.tsx"
          />
        )}
        {routeSegment.layout && (
          <ArtifactFsInspectorFileItemRender
            file={routeSegment.layout}
            icon="🎨"
            label="layout.tsx"
          />
        )}
        {routeSegment.error && (
          <ArtifactFsInspectorFileItemRender
            file={routeSegment.error}
            icon="❌"
            label="error.tsx"
          />
        )}
        {routeSegment.notFound && (
          <ArtifactFsInspectorFileItemRender
            file={routeSegment.notFound}
            icon="🔍"
            label="not-found.tsx"
          />
        )}
        {routeSegment.default && (
          <ArtifactFsInspectorFileItemRender
            file={routeSegment.default}
            icon="⚡"
            label="default.tsx"
          />
        )}
        {routeSegment.loading && (
          <ArtifactFsInspectorFileItemRender
            file={routeSegment.loading}
            icon="⏳"
            label="loading.tsx"
          />
        )}
      </ul>
    </div>
  );
}
