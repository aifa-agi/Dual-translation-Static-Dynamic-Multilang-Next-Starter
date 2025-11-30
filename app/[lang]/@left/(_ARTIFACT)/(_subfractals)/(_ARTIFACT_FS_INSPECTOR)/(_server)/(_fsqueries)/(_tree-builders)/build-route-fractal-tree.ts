// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_server)/(_fsqueries)/(_tree-builders)/build-route-fractal-tree.ts

import * as fs from "fs";
import * as path from "path";
import { readLayer, type LayerContent } from "../(_fractal-readers)/read-layer";
import { listSubfractalNames } from "../(_fractal-readers)/list-subfractal-names";
import { buildFileNode, type FileNode } from "../(_fractal-readers)/build-file-node";
import { findRouteSegment } from "./find-route-segment"; // 🔥 НОВЫЙ ИМПОРТ

export type RouteSegmentInfo = {
  name: string;
  pathFromApp: string;
  page?: FileNode;
  layout?: FileNode;
  error?: FileNode;
  notFound?: FileNode;
  default?: FileNode;
  loading?: FileNode;
};

export type ArtifactFsInspectorFractalTree = {
  fractalRootPathFromApp: string;
  fractalType: "fractal-root";
  filesAtRoot: FileNode[];
  routeSegment?: RouteSegmentInfo; // 🔥 НОВОЕ
  clientLayer: LayerContent | null;
  serverLayer: LayerContent | null;
  sharedLayer: LayerContent | null;
  subfractals: string[];
};

/**
 * Строит полное дерево фрактала
 */
export async function buildRouteFractalTree(
  fractalRoot: string,
  projectRoot: string
): Promise<ArtifactFsInspectorFractalTree> {
  const fractalRootPathFromApp = fractalRoot.replace(projectRoot + "/", "");

  console.log("[buildRouteFractalTree] 🏗️ Building tree for Fractal");
  console.log("[buildRouteFractalTree]   Root:", fractalRootPathFromApp);

  // 1️⃣ Читаем файлы в корне (SPEC.md, README.md и т.д.)
  const filesAtRoot: FileNode[] = [];
  const rootEntries = fs.readdirSync(fractalRoot, { withFileTypes: true });

  console.log("[buildRouteFractalTree]   📄 Reading files at root...");

  for (const entry of rootEntries) {
    // Только файлы, пропускаем директории
    if (entry.isFile()) {
      const filePath = path.join(fractalRoot, entry.name);
      const fileNode = await buildFileNode(filePath, projectRoot);
      if (fileNode) {
        filesAtRoot.push(fileNode);
        console.log("[buildRouteFractalTree]     ✓", entry.name);
      }
    }
  }

  console.log("[buildRouteFractalTree]   Files at root:", filesAtRoot.length);

  // 2️⃣ 🔥 НОВОЕ: Ищем роутинг-сегмент (page.tsx, layout.tsx и т.д.)
  const routeSegment = await findRouteSegment(fractalRoot, projectRoot);

  if (routeSegment) {
    console.log("[buildRouteFractalTree]   ✅ Route segment found:", routeSegment.name);
  } else {
    console.log("[buildRouteFractalTree]   ℹ️ No route segment (Embedded Fractal)");
  }

  // 3️⃣ Читаем слои
  console.log("[buildRouteFractalTree]   📖 Reading layers...");
  const clientLayer = await readLayer(fractalRoot, "(_client)", projectRoot);
  const serverLayer = await readLayer(fractalRoot, "(_server)", projectRoot);
  const sharedLayer = await readLayer(fractalRoot, "(_shared)", projectRoot);

  // 4️⃣ Читаем субфракталы
  console.log("[buildRouteFractalTree]   📖 Reading subfractals...");
  const subfractals = await listSubfractalNames(fractalRoot);

  console.log("[buildRouteFractalTree] ✅ Tree built successfully");

  return {
    fractalRootPathFromApp,
    fractalType: "fractal-root",
    filesAtRoot,
    routeSegment, // 🔥 НОВОЕ
    clientLayer,
    serverLayer,
    sharedLayer,
    subfractals,
  };
}
