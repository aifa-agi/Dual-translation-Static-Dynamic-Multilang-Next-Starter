// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_server)/(_fsqueries)/(_fractal-readers)/is-subfractals-boundary.ts

/**
 * Проверяет является ли директория границей (_subfractals)
 * Это критическая функция для изоляции фракталов
 * 
 * Когда встречается (_subfractals), мы:
 * - НЕ читаем содержимое (дети — это отдельные фракталы)
 * - Только записываем имена субфракталов
 * 
 * @param dirName - Имя директории (без пути)
 * @returns true если это граница (_subfractals)
 * 
 * @example
 * isSubfractalsBoundary("(_subfractals)") // => true
 * isSubfractalsBoundary("(_server)") // => false
 */
export function isSubfractalsBoundary(dirName: string): boolean {
  const isBoundary = dirName === "(_subfractals)";
  
  if (isBoundary) {
    console.log("[isSubfractalsBoundary] 🛑 BOUNDARY detected:", dirName);
  }
  
  return isBoundary;
}
