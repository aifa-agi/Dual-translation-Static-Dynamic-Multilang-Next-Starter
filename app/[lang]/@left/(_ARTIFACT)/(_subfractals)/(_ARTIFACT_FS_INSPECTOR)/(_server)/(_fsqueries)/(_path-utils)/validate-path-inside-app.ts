// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_server)/(_fsqueries)/(_path-utils)/validate-path-inside-app.ts

import * as fs from "fs";
import * as path from "path";

/**
 * Проверяет что абсолютный путь существует и находится внутри директории app/
 * 
 * @param absolutePath - Абсолютный путь для проверки
 * @throws Error если путь не существует или находится вне app/
 * 
 * @example
 * validatePathInsideApp("/Users/user/project/app/[lang]/@left")
 * // Успех, ничего не возвращает
 * 
 * validatePathInsideApp("/Users/user/project/src/components")
 * // Ошибка: Path must be inside app/ directory
 */
export function validatePathInsideApp(absolutePath: string): void {
  console.log("[validatePathInsideApp] 🔧 Validating path:", absolutePath);

  // Проверка 1: путь существует?
  if (!fs.existsSync(absolutePath)) {
    const error = `Path does not exist: ${absolutePath}`;
    console.error("[validatePathInsideApp] ❌", error);
    throw new Error(error);
  }
  console.log("[validatePathInsideApp]   ✓ Path exists");

  // Проверка 2: это директория?
  const stats = fs.statSync(absolutePath);
  if (!stats.isDirectory()) {
    const error = `Path is not a directory: ${absolutePath}`;
    console.error("[validatePathInsideApp] ❌", error);
    throw new Error(error);
  }
  console.log("[validatePathInsideApp]   ✓ Path is a directory");

  // Проверка 3: путь содержит /app/ ?
  const normalizedPath = absolutePath.replace(/\\/g, "/"); // Windows compatibility
  if (!normalizedPath.includes("/app/") && !normalizedPath.endsWith("/app")) {
    const error = `Path must be inside app/ directory. Got: ${absolutePath}`;
    console.error("[validatePathInsideApp] ❌", error);
    throw new Error(error);
  }
  console.log("[validatePathInsideApp]   ✓ Path is inside app/");

  console.log("[validatePathInsideApp] ✅ Validation passed");
}
