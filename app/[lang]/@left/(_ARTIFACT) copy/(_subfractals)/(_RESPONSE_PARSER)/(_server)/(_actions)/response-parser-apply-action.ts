// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/(_server)/(_actions)/response-parser-apply-action.ts

"use server";

import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { dirname, join } from "path";
import type {
  FractalResponseParserApplyRequest,
  FractalResponseParserApplyPhaseResult,
  FractalResponseParserApplyFileResult,
  FractalResponseParserParsedFile,
} from "../../(_shared)/(_types)/fractal-response-parser-types";

/**
 * Server Action: Write parsed files to filesystem (Apply phase).
 */
export async function responseParserApplyAction(
  input: FractalResponseParserApplyRequest,
): Promise<FractalResponseParserApplyPhaseResult> {
  const { files } = input;

  const results: FractalResponseParserApplyFileResult[] = [];
  let successCount = 0;
  let failedCount = 0;
  let skippedCount = 0;

  console.log("\n[RESPONSE_PARSER][APPLY] ===== APPLY ACTION START =====");
  console.log("  Files count:", files.length);

  for (const file of files) {
    const result = await applyFileToFilesystem(file);
    results.push(result);

    if (result.status === "applied") {
      successCount++;
    } else if (result.status === "failed") {
      failedCount++;
    } else if (result.status === "skipped") {
      skippedCount++;
    }
  }

  console.log("[RESPONSE_PARSER][APPLY] ===== APPLY ACTION END =====\n");

  return {
    results,
    successCount,
    failedCount,
    skippedCount,
  };
}

/* -------------------------------------------------------------------------- */
/*                         File write operations                              */
/* -------------------------------------------------------------------------- */

async function applyFileToFilesystem(
  file: FractalResponseParserParsedFile,
): Promise<FractalResponseParserApplyFileResult> {
  try {
    const finalContent = buildFinalContentForFile(file);

    const absolutePath = resolveAbsolutePath(file.targetPath);
    await ensureDirectoryExists(absolutePath);
    await writeFile(absolutePath, finalContent, "utf-8");

    const finalFirstLine = getFirstLine(finalContent);
    console.log("\n[RESPONSE_PARSER][APPLY] WRITE FILE");
    console.log("  targetPath:", file.targetPath);
    console.log("  finalFirstLine:", finalFirstLine);

    return {
      targetPath: file.targetPath,
      status: "applied",
      message: `Successfully written to ${file.targetPath}`,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown write error";
    console.log(
      "[RESPONSE_PARSER][APPLY] WRITE ERROR:",
      file.targetPath,
      message,
    );
    return {
      targetPath: file.targetPath,
      status: "failed",
      message: `Failed to write: ${message}`,
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                         Content “parsers”                                  */
/* -------------------------------------------------------------------------- */

function buildFinalContentForFile(
  file: FractalResponseParserParsedFile,
): string {
  const fileExtension = getFileExtensionFromPath(file.targetPath);

  const isMarkdown = fileExtension === "md";
  const isJson = fileExtension === "json";

  if (isMarkdown) {
    return buildMarkdownFinalContent(file);
  }

  if (isJson) {
    return buildJsonFinalContent(file);
  }

  // Все кодовые файлы (ts, tsx, js, css, и т.п.)
  return buildCodeLikeFinalContent(file, fileExtension);
}

/**
 * Markdown: добавляем HTML‑комментарий с путём, сам content не трогаем.
 */
function buildMarkdownFinalContent(
  file: FractalResponseParserParsedFile,
): string {
  const pathComment = `<!-- ${file.targetPath} -->`;
  return `${pathComment}\n\n${file.content}`;
}

/**
 * JSON: при необходимости убираем первую строку‑комментарий, потом trim.
 */
function buildJsonFinalContent(
  file: FractalResponseParserParsedFile,
): string {
  const lines = file.content.split("\n");
  const firstLine = lines[0]?.trim() || "";

  if (firstLine.startsWith("//") || firstLine.startsWith("/*")) {
    return lines.slice(1).join("\n").trim();
  }

  return file.content.trim();
}

/**
 * Кодовые файлы: считаем/удаляем строки с // и гарантируем
 * РОВНО одну адресную строку с путём сверху.
 */
function buildCodeLikeFinalContent(
  file: FractalResponseParserParsedFile,
  fileExtension: string,
): string {
  const commentStyle = getCommentStyleForExtension(fileExtension);
  const expectedComment = formatPathComment(file.targetPath, commentStyle);

  const originalFirstLine = getFirstLine(file.content);
  console.log("\n[RESPONSE_PARSER][APPLY] buildCodeLikeFinalContent");
  console.log("  targetPath:", file.targetPath);
  console.log("  extension:", fileExtension);
  console.log("  expectedComment:", expectedComment);
  console.log("  originalFirstLine:", originalFirstLine);

  // 1) Удаляем строковые комментарии и логируем статистику
  const contentWithoutComments = stripCommentsFromContent(
    file.content,
    commentStyle,
    file.targetPath,
  );
  const cleanedFirstLine = getFirstLine(contentWithoutComments);
  console.log("  cleanedFirstLine:", cleanedFirstLine);

  // 2) Если вдруг уже начинается с корректного path‑коммента, не дублируем
  if (hasLeadingPathComment(contentWithoutComments, expectedComment)) {
    console.log("  result: existing correct path comment, no prepend");
    return contentWithoutComments;
  }

  // 3) Добавляем корректный path‑комментарий поверх очищенного содержимого
  const result = `${expectedComment}\n${contentWithoutComments}`;
  const finalFirstLine = getFirstLine(result);
  const isCorrect = finalFirstLine === expectedComment;
  console.log("  finalFirstLine (after prepend):", finalFirstLine);
  console.log("  isFinalFirstLinePathComment:", isCorrect);

  return result;
}

/**
 * Удаляет строки‑комментарии из содержимого и логирует статистику по //.
 */
function stripCommentsFromContent(
  content: string,
  commentStyle: CommentStyle,
  targetPath: string,
): string {
  const lines = content.split("\n");

  let doubleSlashFound = 0;

  const cleanedLines = lines.filter((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return true;
    }

    if (trimmed.startsWith("//")) {
      doubleSlashFound++;
      return false;
    }

    if (commentStyle === "block") {
      if (
        trimmed.startsWith("/*") ||
        trimmed.startsWith("*/") ||
        trimmed.startsWith("*")
      ) {
        return false;
      }
    }

    return true;
  });

  const doubleSlashRemoved = doubleSlashFound; // все //‑строки мы выкидываем

  console.log("[RESPONSE_PARSER][APPLY] stripCommentsFromContent", {
    targetPath,
    totalLines: lines.length,
    doubleSlashFound,
    doubleSlashRemoved,
  });

  return cleanedLines.join("\n").replace(/^\s+/, "");
}

/**
 * Проверяет, начинается ли контент с заданного path‑комментария.
 */
function hasLeadingPathComment(content: string, expectedComment: string): boolean {
  const firstLine = getFirstLine(content);
  return firstLine === expectedComment;
}

/**
 * Безопасно возвращает первую строку текста.
 */
function getFirstLine(text: string): string {
  const trimmed = text.trimStart();
  const newlineIndex = trimmed.indexOf("\n");
  return newlineIndex === -1 ? trimmed : trimmed.slice(0, newlineIndex);
}

/**
 * Вспомогательный парсер для расширения файла.
 */
function getFileExtensionFromPath(path: string): string {
  return path.split(".").pop()?.toLowerCase() || "";
}

/* -------------------------------------------------------------------------- */
/*                           Path utilities                                   */
/* -------------------------------------------------------------------------- */

function resolveAbsolutePath(relativePath: string): string {
  const projectRoot = process.cwd();

  const cleanPath = relativePath.startsWith("@/")
    ? relativePath.slice(2)
    : relativePath;

  return join(projectRoot, cleanPath);
}

async function ensureDirectoryExists(filePath: string): Promise<void> {
  const dir = dirname(filePath);

  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

/* -------------------------------------------------------------------------- */
/*                         Comment style utilities                            */
/* -------------------------------------------------------------------------- */

type CommentStyle = "double-slash" | "block";

function getCommentStyleForExtension(extension: string): CommentStyle {
  const blockCommentExtensions = ["css", "scss", "sass"];

  if (blockCommentExtensions.includes(extension)) {
    return "block";
  }

  return "double-slash";
}

function formatPathComment(path: string, style: CommentStyle): string {
  if (style === "block") {
    return `/* ${path} */`;
  }

  return `// ${path}`;
}
