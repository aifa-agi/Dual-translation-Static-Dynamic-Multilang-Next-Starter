// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_server)/(_fsqueries)/(_path-utils)/resolve-absolute-path.ts

import * as path from "path";

/**
 * Преобразует нормализованный относительный путь в абсолютный путь файловой системы
 * 
 * @param normalizedPath - Нормализованный путь относительно app/ (из normalize-path)
 * @returns Абсолютный путь в файловой системе
 * 
 * @example
 * resolveAbsolutePath("app/[lang]/@left/(_ARTIFACT)")
 * // => "/Users/user/project/app/[lang]/@left/(_ARTIFACT)"
 */
export function resolveAbsolutePath(normalizedPath: string): string {
  console.log("[resolveAbsolutePath] 🔧 Input (normalized):", JSON.stringify(normalizedPath));

  // Получаем корень проекта (директория где package.json)
  const projectRoot = process.cwd();
  console.log("[resolveAbsolutePath]   Project root:", projectRoot);

  // Соединяем корень проекта с относительным путём
  const absolutePath = path.join(projectRoot, normalizedPath);
  console.log("[resolveAbsolutePath] ✅ Output (absolute):", absolutePath);

  return absolutePath;
}
