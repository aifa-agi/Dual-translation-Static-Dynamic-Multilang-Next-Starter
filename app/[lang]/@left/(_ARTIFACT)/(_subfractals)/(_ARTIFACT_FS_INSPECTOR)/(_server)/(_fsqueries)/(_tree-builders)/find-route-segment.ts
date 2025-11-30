// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_server)/(_fsqueries)/(_tree-builders)/find-route-segment.ts

import * as fs from "fs";
import * as path from "path";
import { buildFileNode, type FileNode } from "../(_fractal-readers)/build-file-node";
import type { RouteSegmentInfo } from "./build-route-fractal-tree";

/**
 * Специальные файлы Next.js App Router
 */
const SPECIAL_ROUTE_FILES = [
  "page.tsx",
  "layout.tsx",
  "error.tsx",
  "not-found.tsx",
  "default.tsx",
  "loading.tsx",
] as const;

/**
 * Ищет роутинг-сегмент внутри корня фрактала
 * 
 * Логика:
 * 1. Если корень фрактала сам в скобках (route group) — ищем внутри
 * 2. Если корень без скобок — проверяем его самого
 * 
 * @param fractalRoot - Абсолютный путь к корню фрактала
 * @param projectRoot - Корень проекта
 * @returns RouteSegmentInfo или undefined если это Embedded Fractal
 * 
 * @example
 * // Route Fractal: (_ARTIFACT)/artifact/page.tsx
 * await findRouteSegment("/project/app/[lang]/@left/(_ARTIFACT)", "/project")
 * // => { name: "artifact", pathFromApp: "...", page: {...}, layout: {...} }
 * 
 * // Embedded Fractal: (_HERO_SECTION) без page.tsx
 * await findRouteSegment("/project/app/.../(_HERO_SECTION)", "/project")
 * // => undefined
 */
export async function findRouteSegment(
  fractalRoot: string,
  projectRoot: string
): Promise<RouteSegmentInfo | undefined> {
  console.log("[findRouteSegment] 🔍 Searching for route segment in:", fractalRoot);

  const fractalName = path.basename(fractalRoot);
  const isRouteGroup = fractalName.startsWith("(_");

  console.log("[findRouteSegment]   Fractal name:", fractalName);
  console.log("[findRouteSegment]   Is route group:", isRouteGroup);

  let segmentPath: string | undefined = undefined;
  let segmentName: string | undefined = undefined;

  if (isRouteGroup) {
    // Route group — ищем первую непарентезированную папку внутри
    console.log("[findRouteSegment]   Scanning inside route group...");
    
    const entries = fs.readdirSync(fractalRoot, { withFileTypes: true });

    for (const entry of entries) {
      // Пропускаем слои, (_subfractals), другие route groups
      if (entry.isDirectory() && 
          !entry.name.startsWith("(_") && 
          entry.name !== "(_subfractals)") {
        
        const candidatePath = path.join(fractalRoot, entry.name);
        const hasPage = fs.existsSync(path.join(candidatePath, "page.tsx"));

        console.log("[findRouteSegment]     Checking:", entry.name, "-> has page.tsx:", hasPage);

        if (hasPage) {
          segmentPath = candidatePath;
          segmentName = entry.name;
          console.log("[findRouteSegment]   ✅ Found route segment:", segmentName);
          break;
        }
      }
    }
  } else {
    // Корень без скобок — проверяем есть ли page.tsx здесь
    const hasPage = fs.existsSync(path.join(fractalRoot, "page.tsx"));
    
    console.log("[findRouteSegment]   Checking root for page.tsx:", hasPage);

    if (hasPage) {
      segmentPath = fractalRoot;
      segmentName = fractalName;
      console.log("[findRouteSegment]   ✅ Root itself is the route segment");
    }
  }

  // Если не нашли роутинг-сегмент — это Embedded Fractal
  if (!segmentPath || !segmentName) {
    console.log("[findRouteSegment]   ℹ️ No route segment found (Embedded Fractal)");
    return undefined;
  }

  // Читаем все специальные файлы
  console.log("[findRouteSegment]   📖 Reading special files...");

  const routeSegment: RouteSegmentInfo = {
    name: segmentName,
    pathFromApp: segmentPath.replace(projectRoot + "/", ""),
  };

  for (const fileName of SPECIAL_ROUTE_FILES) {
    const filePath = path.join(segmentPath, fileName);

    if (fs.existsSync(filePath)) {
      const fileNode = await buildFileNode(filePath, projectRoot);
      
      if (fileNode) {
        // Маппинг имён файлов на ключи объекта
        switch (fileName) {
          case "page.tsx":
            routeSegment.page = fileNode;
            break;
          case "layout.tsx":
            routeSegment.layout = fileNode;
            break;
          case "error.tsx":
            routeSegment.error = fileNode;
            break;
          case "not-found.tsx":
            routeSegment.notFound = fileNode;
            break;
          case "default.tsx":
            routeSegment.default = fileNode;
            break;
          case "loading.tsx":
            routeSegment.loading = fileNode;
            break;
        }

        console.log("[findRouteSegment]     ✓ Found:", fileName);
      }
    }
  }

  console.log("[findRouteSegment] ✅ Route segment built successfully");
  return routeSegment;
}
