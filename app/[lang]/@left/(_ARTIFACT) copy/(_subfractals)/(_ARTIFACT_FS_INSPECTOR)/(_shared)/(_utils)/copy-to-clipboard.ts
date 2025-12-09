// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_shared)/(_utils)/copy-to-clipboard.ts

/**
 * Копирует текст в буфер обмена браузера
 * 
 * @param text - Текст для копирования
 * @returns Promise<boolean> - true если успешно, false если ошибка
 * 
 * @example
 * const success = await copyToClipboard("Hello World");
 * if (success) {
 *   toast.success("Copied!");
 * }
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Современный Clipboard API (предпочтительный)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      console.log("[copyToClipboard] ✅ Copied using Clipboard API");
      return true;
    }

    // Fallback для старых браузеров
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);

    if (successful) {
      console.log("[copyToClipboard] ✅ Copied using fallback method");
      return true;
    }

    console.error("[copyToClipboard] ❌ Fallback method failed");
    return false;
  } catch (error) {
    console.error("[copyToClipboard] ❌ Error:", error);
    return false;
  }
}
