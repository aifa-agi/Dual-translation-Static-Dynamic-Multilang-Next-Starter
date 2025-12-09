// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_server)/(_fsqueries)/(_path-utils)/normalize-path.ts

/**
 * Нормализует входной путь, убирая алиасы и лишние символы
 * 
 * @param input - Сырой путь от пользователя (может содержать @/, app/, пробелы)
 * @returns Нормализованный путь относительно app/
 * 
 * @example
 * normalizePath("@/app/[lang]/@left/(_ARTIFACT)")
 * // => "app/[lang]/@left/(_ARTIFACT)"
 * 
 * normalizePath("  app/[lang]/@left  ")
 * // => "app/[lang]/@left"
 */
export function normalizePath(input: string): string {
  console.log("[normalizePath] 🔧 Input:", JSON.stringify(input));

  // Удаляем пробелы в начале и конце
  let normalized = input.trim();
  console.log("[normalizePath]   After trim:", JSON.stringify(normalized));

  // Удаляем алиас @/ если есть
  if (normalized.startsWith("@/")) {
    normalized = normalized.slice(2);
    console.log("[normalizePath]   After removing @/:", JSON.stringify(normalized));
  }

  // Убеждаемся что путь начинается с app/
  if (!normalized.startsWith("app/")) {
    // Если пользователь ввёл путь без app/, добавляем
    // Но сначала убираем слэш в начале если есть
    normalized = normalized.replace(/^\/+/, "");
    normalized = `app/${normalized}`;
    console.log("[normalizePath]   After ensuring app/ prefix:", JSON.stringify(normalized));
  }

  // Убираем множественные слэши
  normalized = normalized.replace(/\/+/g, "/");
  console.log("[normalizePath] ✅ Output:", JSON.stringify(normalized));

  return normalized;
}
