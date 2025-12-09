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
 * 
 * Steps:
 * 1. Receive array of ParsedFile (potentially edited by user)
 * 2. For each file:
 *    - Add path comment as first line (AIFA Core Rule)
 *    - Remove first line comment for JSON files
 *    - Validate path
 *    - Create directory if needed
 *    - Write file to disk
 * 3. Return detailed result for each file
 */
export async function responseParserApplyAction(
  input: FractalResponseParserApplyRequest,
): Promise<FractalResponseParserApplyPhaseResult> {
  const { files } = input;

  const results: FractalResponseParserApplyFileResult[] = [];
  let successCount = 0;
  let failedCount = 0;
  let skippedCount = 0;

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
    let finalContent = file.content;

    const fileExtension = file.targetPath.split(".").pop()?.toLowerCase() || "";
    const isMarkdown = fileExtension === "md";
    const isJson = fileExtension === "json";

    if (isMarkdown) {
      // Добавляем HTML‑комментарий и НИЧЕГО больше с finalContent не делаем
      const pathComment = `<!-- ${file.targetPath} -->`;
      finalContent = `${pathComment}\n\n${file.content}`;
    } else if (isJson) {
      // JSON оставляем без комментариев
      const lines = file.content.split("\n");
      const firstLine = lines[0]?.trim() || "";
      if (firstLine.startsWith("//") || firstLine.startsWith("/*")) {
        finalContent = lines.slice(1).join("\n").trim();
      } else {
        finalContent = file.content.trim();
      }
    } else {
      // Остальные файлы получают комментарий с путём
      const fileExt = fileExtension; // переиспользуем
      const commentStyle = getCommentStyleForExtension(fileExt);
      const pathComment = formatPathComment(file.targetPath, commentStyle);
      finalContent = `${pathComment}\n${file.content}`;
    }

    const absolutePath = resolveAbsolutePath(file.targetPath);
    await ensureDirectoryExists(absolutePath);
    await writeFile(absolutePath, finalContent, "utf-8");

    return {
      targetPath: file.targetPath,
      status: "applied",
      message: `Successfully written to ${file.targetPath}`,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown write error";
    return {
      targetPath: file.targetPath,
      status: "failed",
      message: `Failed to write: ${message}`,
    };
  }
}


/* -------------------------------------------------------------------------- */
/*                           Path utilities                                   */
/* -------------------------------------------------------------------------- */

function resolveAbsolutePath(relativePath: string): string {
  const projectRoot = process.cwd();
  
  // Remove @/ prefix if present
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

/**
 * Determine comment style based on file extension
 */
function getCommentStyleForExtension(extension: string): CommentStyle {
  const blockCommentExtensions = ["css", "scss", "sass"];
  
  if (blockCommentExtensions.includes(extension)) {
    return "block";
  }
  
  return "double-slash";
}

/**
 * Format path comment based on comment style
 */
function formatPathComment(path: string, style: CommentStyle): string {
  if (style === "block") {
    return `/* ${path} */`;
  }
  
  return `// ${path}`;
}
