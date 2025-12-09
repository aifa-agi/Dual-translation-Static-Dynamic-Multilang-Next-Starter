// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_server)/(_fsqueries)/(_fractal-detection)/is-fractal-root.ts

import * as fs from "fs";
import * as path from "path";

/**
 * Проверяет является ли директория корнем фрактала
 * 
 * Корень фрактала имеет:
 * - SPEC.md (с учётом возможных пробелов в имени файла)
 * - Хотя бы один из слоёв: (_client), (_server), (_shared)
 * 
 * @param dirPath - Абсолютный путь к директории
 * @returns true если это корень фрактала
 */
export function isFractalRoot(dirPath: string): boolean {
  console.log("[isFractalRoot] 🔍 Checking:", dirPath);

  // Проверка 1: Директория существует?
  if (!fs.existsSync(dirPath)) {
    console.log("[isFractalRoot]   ⏭️ Directory does not exist");
    return false;
  }

  // Проверка 2: Это директория?
  const stats = fs.statSync(dirPath);
  if (!stats.isDirectory()) {
    console.log("[isFractalRoot]   ⏭️ Not a directory");
    return false;
  }

  // 🔥 КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Ищем SPEC.md с учётом возможных пробелов
  let hasSpec = false;
  let specFile: string | undefined;

  try {
    const files = fs.readdirSync(dirPath);
    
    // Ищем файл, который после удаления пробелов равен "SPEC.md"
    specFile = files.find(f => f.trim() === "SPEC.md");
    hasSpec = specFile !== undefined;
    
    const specPath = specFile 
      ? path.join(dirPath, specFile)
      : path.join(dirPath, "SPEC.md");
    
    console.log("[isFractalRoot]   SPEC.md path:", specPath);
    console.log("[isFractalRoot]   SPEC.md exists:", hasSpec);
    
    if (specFile && specFile !== "SPEC.md") {
      console.log("[isFractalRoot]   ⚠️ WARNING: SPEC.md has extra characters!");
      console.log("[isFractalRoot]   Actual filename:", JSON.stringify(specFile));
      console.log("[isFractalRoot]   Expected:", JSON.stringify("SPEC.md"));
    }

    // Если не нашли SPEC.md, показываем что есть в директории
    if (!hasSpec) {
      console.log("[isFractalRoot]   Files in directory:", files.slice(0, 10));
    }
  } catch (error) {
    console.log("[isFractalRoot]   Cannot read directory:", error);
    return false;
  }

  // Проверка 3: Есть ли слои?
  const hasClient = fs.existsSync(path.join(dirPath, "(_client)"));
  const hasServer = fs.existsSync(path.join(dirPath, "(_server)"));
  const hasShared = fs.existsSync(path.join(dirPath, "(_shared)"));
  
  const hasLayers = hasClient || hasServer || hasShared;
  
  console.log("[isFractalRoot]   Has layers:", hasLayers, `(client: ${hasClient}, server: ${hasServer}, shared: ${hasShared})`);

  // Итоговая проверка
  const isFractal = hasSpec && hasLayers;

  if (isFractal) {
    console.log("[isFractalRoot] ✅ This IS a Fractal Root");
  } else {
    console.log("[isFractalRoot] ❌ Not a Fractal Root (spec:", hasSpec, ", layers:", hasLayers, ")");
  }

  return isFractal;
}
