// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_server)/(_fsqueries)/(_fractal-readers)/build-folder-node.ts

import * as path from "path";
import type { FileNode } from "./build-file-node";

export type FolderNode = {
  kind: "folder";
  name: string;
  pathFromApp: string;
  children: (FileNode | FolderNode)[];
  isBoundary?: boolean; // true только для (_subfractals)
};

/**
 * Создаёт узел дерева для папки
 * 
 * @param folderPath - Абсолютный путь к папке
 * @param projectRoot - Корень проекта (для вычисления pathFromApp)
 * @param children - Массив дочерних узлов (файлы и папки)
 * @param isBoundary - true если это (_subfractals) — граница фрактала
 * @returns FolderNode
 * 
 * @example
 * await buildFolderNode("/project/app/.../(_server)", "/project", [...], false)
 * // => { kind: "folder", name: "(_server)", children: [...], isBoundary: false }
 * 
 * await buildFolderNode("/project/app/.../(_subfractals)", "/project", [], true)
 * // => { kind: "folder", name: "(_subfractals)", children: [], isBoundary: true }
 */
export async function buildFolderNode(
  folderPath: string,
  projectRoot: string,
  children: (FileNode | FolderNode)[],
  isBoundary: boolean = false
): Promise<FolderNode> {
  const folderName = path.basename(folderPath);
  const pathFromApp = folderPath.replace(projectRoot + "/", "");

  if (isBoundary) {
    console.log("[buildFolderNode] 🛑 Creating BOUNDARY folder node:", folderName);
  } else {
    console.log("[buildFolderNode] 📁 Creating folder node:", folderName, `(${children.length} children)`);
  }

  return {
    kind: "folder",
    name: folderName,
    pathFromApp,
    children,
    isBoundary,
  };
}
