// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/(_server)/(_actions)/response-parser-extract-action.ts

"use server";

import { nanoid } from "nanoid";
import type {
  FractalResponseParserExtractResult,
  FractalResponseParserParsedFile,
} from "../../(_shared)/(_types)/fractal-response-parser-types";

type ExtractActionInput = {
  markdown: string;
  mode: "spec" | "code";
};

/**
 * Extract files from Perplexity response based on path comments.
 * NEW v0.3.0 logic: searches for lines with "// @/path/to/file.ext"
 * and extracts content after them (until next path or end of document).
 * Does NOT write to filesystem - only parses and extracts.
 */
export async function responseParserExtractAction(
  input: ExtractActionInput,
): Promise<FractalResponseParserExtractResult> {
  const { markdown, mode } = input;

  console.log("\n🔍 ===== EXTRACT ACTION v0.3.0 DEBUG START =====");
  console.log(`📊 Content length: ${markdown.length} characters`);
  console.log(`🎯 Mode: ${mode}`);

  const files: FractalResponseParserParsedFile[] = [];
  const errors: string[] = [];
  let skippedBlocks = 0;

  // Regex to find path comments: // @/path/to/file.ext
  const pathCommentRegex = /^\/\/\s*(@?\/[^\s]+\.[\w]+)\s*$/gm;

  // Find all path comments with their positions
  const pathMatches: Array<{ path: string; position: number; index: number }> = [];
  let match: RegExpExecArray | null;
  let matchIndex = 0;

  while ((match = pathCommentRegex.exec(markdown)) !== null) {
    matchIndex++;
    const path = match[1];
    const position = match.index;

    pathMatches.push({
      path,
      position,
      index: matchIndex,
    });

    console.log(`\n📍 Path comment #${matchIndex} found at position ${position}`);
    console.log(`   Path: ${path}`);
  }

  console.log(`\n📊 Total path comments found: ${pathMatches.length}`);

  if (pathMatches.length === 0) {
    const errorMsg = "No path comments found (expected format: // @/path/to/file.ext)";
    errors.push(errorMsg);
    console.log(`❌ ${errorMsg}`);
    console.log(`\n💡 Content preview (first 800 chars):`);
    console.log(markdown.slice(0, 800));
    console.log("🔍 ===== EXTRACT ACTION DEBUG END =====\n");

    return {
      files,
      totalBlocks: 0,
      skippedBlocks: 0,
      errors,
    };
  }

  // Extract content for each path
  for (let i = 0; i < pathMatches.length; i++) {
    const currentMatch = pathMatches[i];
    const nextMatch = pathMatches[i + 1];

    const path = currentMatch.path;
    const startPos = currentMatch.position;

    // Find the end of the current line (after the path comment)
    const lineEndPos = markdown.indexOf("\n", startPos);
    const contentStartPos = lineEndPos !== -1 ? lineEndPos + 1 : startPos;

    // Content ends at the next path comment or end of document
    const contentEndPos = nextMatch ? nextMatch.position : markdown.length;

    // Extract content
    let content = markdown.slice(contentStartPos, contentEndPos).trim();

    console.log(`\n📦 Processing file #${i + 1}`);
    console.log(`   Path: ${path}`);
    console.log(`   Content start: ${contentStartPos}, end: ${contentEndPos}`);
    console.log(`   Content length: ${content.length} chars`);

    // Skip if content is empty
    if (!content) {
      console.log(`   ⚠️ EMPTY CONTENT - SKIPPING`);
      skippedBlocks++;
      continue;
    }

    // Determine language from file extension
    const extension = path.split(".").pop()?.toLowerCase() || "txt";
    const language = determineLanguage(extension);

    console.log(`   Language: ${language}`);

    // Count lines
    const linesCount = content.split("\n").length;

    const parsedFile: FractalResponseParserParsedFile = {
      id: nanoid(),
      targetPath: path,
      content: content,
      language: language,
      linesCount: linesCount,
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

/**
 * Determine language identifier from file extension
 */
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
