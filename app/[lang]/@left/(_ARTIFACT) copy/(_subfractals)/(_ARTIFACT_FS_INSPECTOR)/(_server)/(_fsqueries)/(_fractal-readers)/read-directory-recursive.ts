// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_server)/(_fsqueries)/(_fractal-readers)/read-directory-recursive.ts

import * as fs from "fs";
import * as path from "path";
import { shouldIgnoreDirectory } from "./should-ignore-directory";
import { isSubfractalsBoundary } from "./is-subfractals-boundary";
import { buildFileNode, type FileNode } from "./build-file-node";
import { buildFolderNode, type FolderNode } from "./build-folder-node";

/**
 * Рекурсивно читает содержимое директории с фильтрацией
 * 
 * Останавливается на:
 * - (_subfractals) — граница фрактала (НЕ читаем детей)
 * - node_modules, .next и т.д. — служебные папки (игнорируем полностью)
 * 
 * @param dirPath - Абсолютный путь к директории
 * @param projectRoot - Корень проекта
 * @returns Массив узлов дерева (файлы и папки)
 * 
 * @example
 * await readDirectoryRecursive("/project/app/.../(_server)", "/project")
 * // => [FileNode, FolderNode, FolderNode(boundary), ...]
 */
export async function readDirectoryRecursive(
  dirPath: string,
  projectRoot: string
): Promise<(FileNode | FolderNode)[]> {
  console.log("[readDirectoryRecursive] 📖 Reading directory:", dirPath);

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const result: (FileNode | FolderNode)[] = [];

    console.log("[readDirectoryRecursive]   Found", entries.length, "entries");

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      // 🔥 Фильтр 1: Служебные папки (игнорируем полностью)
      if (entry.isDirectory() && shouldIgnoreDirectory(entry.name)) {
        continue; // Пропускаем без добавления в результат
      }

      // 🔥 Фильтр 2: Граница (_subfractals) — НЕ читаем детей!
      if (entry.isDirectory() && isSubfractalsBoundary(entry.name)) {
        // Добавляем как закрытую папку
        const boundaryNode = await buildFolderNode(
          fullPath,
          projectRoot,
          [], // Пустой массив детей — НЕ читаем!
          true // isBoundary = true
        );
        result.push(boundaryNode);
        continue; // Переходим к следующей записи
      }

      // Обычные файлы
      if (entry.isFile()) {
        const fileNode = await buildFileNode(fullPath, projectRoot);
        if (fileNode) {
          result.push(fileNode);
        }
        continue;
      }

      // Обычные папки — рекурсивно читаем
      if (entry.isDirectory()) {
        console.log("[readDirectoryRecursive]   📁 Recursing into:", entry.name);
        
        // Рекурсивно читаем содержимое папки
        const children = await readDirectoryRecursive(fullPath, projectRoot);
        
        const folderNode = await buildFolderNode(
          fullPath,
          projectRoot,
          children,
          false // не граница
        );
        
        result.push(folderNode);
      }
    }

    console.log("[readDirectoryRecursive] ✅ Finished reading, total nodes:", result.length);
    return result;

  } catch (error) {
    console.error("[readDirectoryRecursive] ❌ Error reading directory:", error);
    return [];
  }
}
