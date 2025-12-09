// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_server)/(_fsqueries)/(_fractal-readers)/read-layer.ts

import * as fs from "fs";
import * as path from "path";
import { readDirectoryRecursive } from "./read-directory-recursive";
import type { FileNode } from "./build-file-node";
import type { FolderNode } from "./build-folder-node";

export type LayerContent = {
  name: string;
  children: (FileNode | FolderNode)[];
};

/**
 * Читает содержимое одного слоя фрактала
 * 
 * Слои: (_client), (_server), (_shared)
 * Читает рекурсивно, но останавливается на (_subfractals)
 * 
 * @param fractalRoot - Абсолютный путь к корню фрактала
 * @param layerName - Имя слоя для чтения
 * @param projectRoot - Корень проекта
 * @returns Содержимое слоя или null если слой не существует
 * 
 * @example
 * await readLayer("/project/app/.../artifact", "(_server)", "/project")
 * // => { name: "(_server)", children: [FileNode, FolderNode, ...] }
 */
export async function readLayer(
  fractalRoot: string,
  layerName: "(_client)" | "(_server)" | "(_shared)",
  projectRoot: string
): Promise<LayerContent | null> {
  const layerPath = path.join(fractalRoot, layerName);

  console.log("[readLayer] 📖 Reading layer:", layerName);
  console.log("[readLayer]   Path:", layerPath);

  // Проверяем существует ли слой
  if (!fs.existsSync(layerPath)) {
    console.log("[readLayer]   ⚠️ Layer does not exist, skipping");
    return null;
  }

  // Проверяем что это директория
  const stats = fs.statSync(layerPath);
  if (!stats.isDirectory()) {
    console.log("[readLayer]   ⚠️ Layer path is not a directory, skipping");
    return null;
  }

  console.log("[readLayer]   ✅ Layer exists, reading contents...");

  // Рекурсивно читаем содержимое слоя
  // readDirectoryRecursive автоматически остановится на (_subfractals)
  const children = await readDirectoryRecursive(layerPath, projectRoot);

  console.log("[readLayer] ✅ Layer read complete, total children:", children.length);

  return {
    name: layerName,
    children,
  };
}
