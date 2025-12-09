// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/(_server)/(_actions)/response-parser-extract-action.ts

"use server";

import { nanoid } from "nanoid";
import type {
  FractalResponseParserParsedFile,
  FractalResponseParserExtractResult,
} from "../../(_shared)/(_types)/fractal-response-parser-types";

type ResponseParserExtractInput = {
  markdown: string;
  mode: "spec" | "code";
};

/**
 * Server Action: Extract phase — parse Markdown answer and build ParsedFile[]
 * for preview/editing before Apply.
 */
export async function responseParserExtractAction(
  input: ResponseParserExtractInput,
): Promise<FractalResponseParserExtractResult> {
  const { markdown, mode } = input;

  console.log("\n🔍 ===== EXTRACT ACTION v0.3.3 DEBUG START =====");
  console.log(`📊 Content length: ${markdown.length} characters`);
  console.log(`🎯 Mode: ${mode}`);

  const files: FractalResponseParserParsedFile[] = [];
  const errors: string[] = [];
  let skippedBlocks = 0;

  if (mode !== "code") {
    console.log("Non-CODE mode, returning empty result.");
    console.log("🔍 ===== EXTRACT ACTION DEBUG END =====\n");
    return {
      files: [],
      totalBlocks: 0,
      skippedBlocks: 0,
      errors: ["Only CODE mode is implemented for now"],
    };
  }

  // Строки вида:
  // // @/app/[lang]/...
  // // app/[lang]/...
  const pathCommentRegex =
    /^\/\/\s*(@?\/?app\/[^\s]+)\s*$/gm;

  type PathMatch = {
    path: string;
    position: number;
    fullMatchLength: number;
  };

  const pathMatches: PathMatch[] = [];
  let match: RegExpExecArray | null;

  let index = 0;
  while ((match = pathCommentRegex.exec(markdown)) !== null) {
    const fullMatch = match[0];
    const extractedPath = match[1];
    const position = match.index;

    if (!extractedPath) {
      continue;
    }

    index++;
    console.log(`\n📍 Path comment #${index} found at position ${position}`);
    console.log(`   Path: ${extractedPath}`);

    pathMatches.push({
      path: extractedPath,
      position,
      fullMatchLength: fullMatch.length,
    });
  }

  console.log(`\n📊 Total path comments found: ${pathMatches.length}`);

  if (pathMatches.length === 0) {
    const msg = "No path comments (// @/app/...) found in markdown";
    errors.push(msg);
    console.log(`❌ ${msg}`);
    console.log("🔍 ===== EXTRACT ACTION DEBUG END =====\n");
    return {
      files,
      totalBlocks: 0,
      skippedBlocks: 0,
      errors,
    };
  }

  // Три backtick-символа (без прямого использования ```
  const FENCE = "\x60\x60\x60";

  // Возможные языковые маркеры в первой строке fenced-блока
  const knownLanguageMarkers = new Set<string>([
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "md",
    "markdown",
    "css",
    "scss",
    "sass",
    "html",
    "xml",
    "yaml",
    "yml",
  ]);

  for (let i = 0; i < pathMatches.length; i++) {
    const current = pathMatches[i];
    const next = pathMatches[i + 1] ?? null;

    const path = current.path;

    console.log(`\n📦 Processing file #${i + 1}`);
    console.log(`   Path: ${path}`);
    console.log(`   Path comment position: ${current.position}`);

    let rawSlice = "";

    // 1) Попытка №1: path-комментарий ВНУТРИ fenced-блока.
    const fenceBefore = markdown.lastIndexOf(FENCE, current.position);
    const fenceAfter = markdown.indexOf(FENCE, current.position);

    console.log(
      `   Surrounding fences: before=${fenceBefore}, after=${fenceAfter}`,
    );

    if (fenceBefore !== -1 && fenceAfter !== -1 && fenceAfter > fenceBefore) {
      const blockStart = fenceBefore + FENCE.length;
      const blockEnd = fenceAfter;
      rawSlice = markdown.slice(blockStart, blockEnd);
      console.log(
        `   Using surrounding fenced block: start=${blockStart}, end=${blockEnd}, length=${rawSlice.length}`,
      );
    } else {
      // 2) Попытка №2 (fallback): path-комментарий СНАРУЖИ fenced-блока.
      const contentStartPos = current.position + current.fullMatchLength;
      const contentEndPos = next ? next.position : markdown.length;

      console.log(
        `   Fallback slice start: ${contentStartPos}, end: ${contentEndPos}`,
      );

      let sliceBetweenPaths = markdown.slice(contentStartPos, contentEndPos);
      console.log(
        `   Fallback raw slice length: ${sliceBetweenPaths.length} chars`,
      );

      const fenceOpenIndex = sliceBetweenPaths.indexOf(FENCE);
      if (fenceOpenIndex !== -1) {
        const afterOpen =
          sliceBetweenPaths.slice(fenceOpenIndex + FENCE.length);
        const fenceCloseIndex = afterOpen.indexOf(FENCE);

        console.log(
          `   Fallback fences: open at ${fenceOpenIndex}, close at ${
            fenceCloseIndex === -1 ? "NOT FOUND" : fenceCloseIndex
          }`,
        );

        if (fenceCloseIndex !== -1) {
          rawSlice = afterOpen.slice(0, fenceCloseIndex);
        } else {
          rawSlice = afterOpen;
        }
      } else {
        console.log(
          "   ⚠️ No fenced code block found in fallback slice, using entire slice",
        );
        rawSlice = sliceBetweenPaths;
      }
    }

    // 2.1 Убираем ведущие пробелы
    let content = rawSlice.trimStart();

    // 2.2 Удаляем первую НЕПУСТУЮ строку, если это языковой маркер (ts, tsx, md, markdown, json, css, ...)
    const langLines = content.split("\n");
    let firstNonEmptyIndex = -1;
    for (let li = 0; li < langLines.length; li++) {
      if (langLines[li].trim().length > 0) {
        firstNonEmptyIndex = li;
        break;
      }
    }

    if (firstNonEmptyIndex !== -1) {
      const firstLineTrimmed = langLines[firstNonEmptyIndex].trim();
      console.log(`   First non-empty line before lang-strip: ${firstLineTrimmed}`);

      if (knownLanguageMarkers.has(firstLineTrimmed)) {
        content = langLines
          .slice(firstNonEmptyIndex + 1)
          .join("\n")
          .trimStart();
        console.log(
          `   Language marker "${firstLineTrimmed}" removed from first line.`,
        );
      }
    }

    console.log(`   Content length before tail-strip: ${content.length} chars`);

    // 3) Дополнительная защита: режем по известным маркерам хвоста Markdown.
   const tailMarkers: string[] = [
  "// AIFA:END",
  "Этот шаг согласован",
  "\n[^1]:",
  "<div align=\"center\">",
];

let tailIndex = -1;
let usedMarker: string | null = null;

for (const marker of tailMarkers) {
  const idx = content.indexOf(marker);
  if (idx !== -1 && (tailIndex === -1 || idx < tailIndex)) {
    tailIndex = idx;
    usedMarker = marker;
  }
}

    if (tailIndex !== -1 && usedMarker) {
      console.log(
        `   Tail marker "${usedMarker}" found at ${tailIndex}, trimming tail.`,
      );
      content = content.slice(0, tailIndex).trimEnd();
      console.log(
        `   Content length after tail-strip: ${content.length} chars`,
      );
    } else {
      console.log("   Tail markers not found in content.");
    }

    // 4) Диагностика первых/последних строк
    const lines = content.split("\n");
    const firstLine = lines ?? "";
    const lastLine = lines[lines.length - 1] ?? "";
    console.log(`   Lines count: ${lines.length}`);
    console.log(`   First line: ${firstLine}`);
    console.log(`   Last line: ${lastLine}`);

    if (!content) {
      console.log("   ⚠️ EMPTY CONTENT - SKIPPING");
      skippedBlocks++;
      continue;
    }

    // Определяем язык из расширения файла
    const extension = path.split(".").pop()?.toLowerCase() || "txt";
    const language = determineLanguage(extension);

    console.log(`   Language: ${language}`);

    const linesCount = lines.length;

    const parsedFile: FractalResponseParserParsedFile = {
      id: nanoid(),
      targetPath: path,
      content,
      language,
      linesCount,
      originalPath: path,
      isEdited: false,
    };

    console.log(`   ✅ File created: ${path} (${linesCount} lines)`);
    files.push(parsedFile);
  }

  console.log(`\n📊 ===== EXTRACTION SUMMARY =====`);
  console.log(`Total path comments found: ${pathMatches.length}`);
  console.log(`Successfully extracted: ${files.length}`);
  console.log(`Skipped (empty content): ${skippedBlocks}`);
  console.log(`Errors: ${errors.length}`);
  console.log("🔍 ===== EXTRACT ACTION DEBUG END =====\n");

  return {
    files,
    totalBlocks: pathMatches.length,
    skippedBlocks,
    errors,
  };
}

/* -------------------------------------------------------------------------- */
/*                              Utilities                                     */
/* -------------------------------------------------------------------------- */

function determineLanguage(extension: string): string {
  const languageMap: Record<string, string> = {
    ts: "typescript",
    tsx: "tsx",
    js: "javascript",
    jsx: "jsx",
    json: "json",
    md: "markdown",
    css: "css",
    scss: "scss",
    sass: "sass",
    html: "html",
    xml: "xml",
    yaml: "yaml",
    yml: "yaml",
  };

  return languageMap[extension] || extension;
}
