// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_server)/(_fsqueries)/(_fractal-readers)/list-subfractal-names.ts

import * as fs from "fs";
import * as path from "path";

/**
 * Читает список имён субфракталов (только имена, не содержимое)
 * 
 * Субфракталы находятся в папке (_subfractals)
 * Возвращаем только имена директорий, НЕ читая их содержимое
 * 
 * @param fractalRoot - Абсолютный путь к корню фрактала
 * @returns Массив имён субфракталов
 * 
 * @example
 * await listSubfractalNames("/project/app/.../(_ARTIFACT)/artifact")
 * // => ["(_ARTIFACT_FS_INSPECTOR)", "(_SOME_OTHER)"]
 */
export async function listSubfractalNames(
  fractalRoot: string
): Promise<string[]> {
  const subfractalsPath = path.join(fractalRoot, "(_subfractals)");

  console.log("[listSubfractalNames] 🔍 Looking for subfractals in:", subfractalsPath);

  // Проверяем существует ли папка (_subfractals)
  if (!fs.existsSync(subfractalsPath)) {
    console.log("[listSubfractalNames]   ℹ️ No (_subfractals) directory found");
    return [];
  }

  try {
    const entries = fs.readdirSync(subfractalsPath, { withFileTypes: true });

    // Берём только директории (субфракталы — это всегда папки)
    const subfractalNames = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    console.log("[listSubfractalNames] ✅ Found", subfractalNames.length, "subfractals:", subfractalNames);

    return subfractalNames;
  } catch (error) {
    console.error("[listSubfractalNames] ❌ Error reading (_subfractals):", error);
    return [];
  }
}
