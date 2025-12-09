// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_server)/(_fsqueries)/(_fractal-readers)/build-file-node.ts

import * as fs from "fs";
import * as path from "path";

/**
 * Допустимые расширения файлов для чтения
 */
const ALLOWED_EXTENSIONS = [".ts", ".tsx", ".css", ".md", ".json"]; // 🔥 ДОБАВЛЕН .md

export type FileNode = {
  kind: "file";
  name: string;
  pathFromApp: string;
  content: string;
  extension: string;
};

/**
 * Создаёт узел дерева для файла с его содержимым
 * 
 * @param filePath - Абсолютный путь к файлу
 * @param projectRoot - Корень проекта (для вычисления pathFromApp)
 * @returns FileNode или null если файл нужно игнорировать
 * 
 * @example
 * await buildFileNode("/project/app/.../component.tsx", "/project")
 * // => { kind: "file", name: "component.tsx", content: "...", ... }
 */
export async function buildFileNode(
  filePath: string,
  projectRoot: string
): Promise<FileNode | null> {
  const fileName = path.basename(filePath);
  const ext = path.extname(filePath);

  console.log("[buildFileNode] 📄 Processing file:", fileName);

  // Игнорируем файлы с неподходящими расширениями
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    console.log("[buildFileNode]   ⏭️ Skipping (unsupported extension):", ext);
    return null;
  }

  try {
    // Читаем содержимое файла
    const content = fs.readFileSync(filePath, "utf-8");
    const pathFromApp = filePath.replace(projectRoot + "/", "");

    console.log("[buildFileNode]   ✅ File read, size:", content.length, "chars");

    return {
      kind: "file",
      name: fileName,
      pathFromApp,
      content,
      extension: ext,
    };
  } catch (error) {
    console.error("[buildFileNode]   ❌ Error reading file:", error);
    return null;
  }
}
