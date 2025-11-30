// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_server)/(_fsqueries)/(_fractal-readers)/should-ignore-directory.ts

/**
 * Список служебных директорий, которые нужно игнорировать при чтении фракталов
 */
const IGNORED_DIRECTORIES = new Set([
  "node_modules",
  ".next",
  ".turbo",
  ".git",
  ".github",
  ".vscode",
  "dist",
  "build",
  "coverage",
  ".cache",
  "out",
]);

/**
 * Проверяет нужно ли игнорировать директорию
 * Игнорируются служебные папки: node_modules, .next, .git и т.д.
 * 
 * @param dirName - Имя директории (без пути)
 * @returns true если директорию нужно игнорировать
 * 
 * @example
 * shouldIgnoreDirectory("node_modules") // => true
 * shouldIgnoreDirectory("(_server)") // => false
 * shouldIgnoreDirectory(".next") // => true
 */
export function shouldIgnoreDirectory(dirName: string): boolean {
  const shouldIgnore = IGNORED_DIRECTORIES.has(dirName);
  
  if (shouldIgnore) {
    console.log("[shouldIgnoreDirectory] ⏭️ Ignoring:", dirName);
  }
  
  return shouldIgnore;
}
