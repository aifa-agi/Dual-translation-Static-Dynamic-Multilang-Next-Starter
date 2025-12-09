// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/(_server)/(_services)/response-parser-apply-service.ts

import type {
  FractalResponseParserCodeBlock,
  FractalResponseParserParseResult,
  FractalResponseParserPlannedFileChange,
  FractalResponseParserPlannedFileOperationKind,
} from "../../(_shared)/(_types)/fractal-response-parser-types";

/**
 * Core service operation: build planned changes array from Markdown parse result.
 * Pure function with no side effects, no filesystem writes.
 */
export function responseParserBuildPlannedChanges(
  parseResult: FractalResponseParserParseResult,
): FractalResponseParserPlannedFileChange[] {
  const { codeBlocks } = parseResult;

  return mapCodeBlocksToPlannedChanges(codeBlocks);
}

/* -------------------------------------------------------------------------- */
/*                       Level 1: array operations                            */
/* -------------------------------------------------------------------------- */

/**
 * Map code blocks array to planned changes array.
 */
export function mapCodeBlocksToPlannedChanges(
  codeBlocks: FractalResponseParserCodeBlock[],
): FractalResponseParserPlannedFileChange[] {
  return codeBlocks.map((block) => buildPlannedChangeForBlock(block));
}

/* -------------------------------------------------------------------------- */
/*                    Level 2: single block operations                        */
/* -------------------------------------------------------------------------- */

/**
 * Build one planned change from one code block.
 * Strict contract per FractalResponseParserPlannedFileChange:
 * - targetPath: string
 * - language: string
 * - code: string
 * - operation: FractalResponseParserPlannedFileOperationKind
 * - sourceCodeBlockId: string
 * - reason?: string (optional)
 */
export function buildPlannedChangeForBlock(
  block: FractalResponseParserCodeBlock,
): FractalResponseParserPlannedFileChange {
  const targetPath = extractTargetPath(block);
  const language = normalizeLanguage(block.language);
  const code = block.code;
  const operation = determineOperation(block);
  const sourceCodeBlockId = block.id;
  const reason = buildReason(operation, targetPath);

  return {
    targetPath,
    language,
    code,
    operation,
    sourceCodeBlockId,
    reason,
  };
}

/* -------------------------------------------------------------------------- */
/*                Level 3: small pure utility functions                       */
/* -------------------------------------------------------------------------- */

/**
 * Extract target path for file write operation.
 * If inferredFilePath exists, use it; otherwise use placeholder.
 */
export function extractTargetPath(
  block: FractalResponseParserCodeBlock,
): string {
  if (block.inferredFilePath && block.inferredFilePath.trim().length > 0) {
    return block.inferredFilePath.trim();
  }
  return "unknown-path";
}

/**
 * Normalize language: planned change type expects string,
 * so convert null/undefined to "unknown".
 */
export function normalizeLanguage(raw: string | null | undefined): string {
  if (!raw || raw.trim().length === 0) {
    return "unknown";
  }
  return raw.trim();
}

/**
 * Determine operation type (create, update, skip) based on block data.
 * Logic: if inferredFilePath exists, operation is "write", otherwise "skip".
 * Distinction between "create" and "update" is made at action level (fs.existsSync check).
 */
export function determineOperation(
  block: FractalResponseParserCodeBlock,
): FractalResponseParserPlannedFileOperationKind {
  if (block.inferredFilePath && block.inferredFilePath.trim().length > 0) {
    return "write";
  }
  return "skip";
}

/**
 * Build human-readable reason for the operation.
 */
export function buildReason(
  operation: FractalResponseParserPlannedFileOperationKind,
  targetPath: string,
): string {
  if (operation === "skip") {
    return "Code block does not have a valid path comment, so it will be skipped.";
  }
  return `File will be created at ${targetPath}.`;
}
