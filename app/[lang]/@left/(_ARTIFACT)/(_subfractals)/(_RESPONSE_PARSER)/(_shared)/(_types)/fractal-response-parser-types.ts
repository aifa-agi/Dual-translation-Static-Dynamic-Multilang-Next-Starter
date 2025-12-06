// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/(_shared)/(_types)/fractal-response-parser-types.ts

export type AllFractalResponseParserTranslationKeys =
  | "serverTitle"
  | "serverDescription"
  | "serverHint"
  | "specMode"
  | "codeMode"
  | "specModeDescription"
  | "codeModeDescription"
  | "markdownInputPlaceholder"
  | "parseCodeButtonLabel"
  | "parseCodeButtonHint"
  | "parseCodeStatusIdle"
  | "parseCodeStatusRunning"
  | "parseCodeStatusSuccess"
  | "parseCodeStatusError"
  | "parseCodeStatusNoBlocks"
  | "loadLatestFileButtonLabel"
  | "loadLatestFileButtonHint"
  | "loadFileStatusIdle"
  | "loadFileStatusLoading"
  | "loadFileStatusSuccess"
  | "loadFileStatusError";

export type FractalResponseParserTranslations = {
  [K in AllFractalResponseParserTranslationKeys]: string;
};

export type FractalResponseParserPageData = {
  fractalName?: string;
  fractalPath?: string;
  fractalLevel?: number;
  fractalDescription?: string;
  hint?: string;
};

export type FractalResponseParserCodeBlock = {
  id: string;
  language: string | null;
  code: string;
  pathComment?: string;
  inferredFilePath?: string;
  isSpecBlock: boolean;
  startLine: number;
  endLine: number;
};

export type FractalResponseParserParseIssue = {
  codeBlockId?: string;
  message: string;
  severity: "info" | "warning" | "error";
};

export type FractalResponseParserParseResult = {
  originalMarkdownLength: number;
  codeBlocks: FractalResponseParserCodeBlock[];
  issues: FractalResponseParserParseIssue[];
};

export type FractalResponseParserPlannedFileOperationKind =
  | "create"
  | "write"
  | "update"
  | "skip";

export type FractalResponseParserPlannedFileChange = {
  targetPath: string;
  language: string;
  code: string;
  operation: FractalResponseParserPlannedFileOperationKind;
  reason?: string;
  sourceCodeBlockId: string;
};

export type FractalResponseParserApplyFileStatus =
  | "pending"
  | "applied"
  | "failed"
  | "skipped";

export type FractalResponseParserAppliedFileResult = {
  targetPath: string;
  status: FractalResponseParserApplyFileStatus;
  message?: string;
};

export type FractalResponseParserApplyResult = {
  plannedChanges: FractalResponseParserPlannedFileChange[];
  appliedResults: FractalResponseParserAppliedFileResult[];
  hasErrors: boolean;
};

export type FractalResponseParserApplyServerActionInput = {
  parseResult: FractalResponseParserParseResult;
  dryRun?: boolean;
};

// ============================================
// NEW TYPES FOR 2-PHASE WORKFLOW (Parse → Apply)
// ============================================

/**
 * Parsed file ready for preview and editing (after Extract phase, before Apply phase)
 */
export type FractalResponseParserParsedFile = {
  id: string; // unique ID for React keys
  targetPath: string; // editable path where file will be written
  content: string; // editable file content
  language: string; // file extension/language: tsx, ts, json, md, css, etc.
  linesCount: number; // number of lines in content
  originalPath?: string; // original path extracted from comment (for reference)
  isEdited: boolean; // flag indicating if user modified path or content
};

/**
 * Result of Extract phase (parsing markdown and extracting files)
 */
export type FractalResponseParserExtractResult = {
  files: FractalResponseParserParsedFile[]; // successfully extracted files
  totalBlocks: number; // total code blocks found in markdown
  skippedBlocks: number; // blocks without valid path
  errors: string[]; // parse errors
};

/**
 * Input for Apply phase (write files to filesystem)
 */
export type FractalResponseParserApplyRequest = {
  files: FractalResponseParserParsedFile[]; // files to write (potentially edited by user)
};

/**
 * Result of applying a single file to filesystem
 */
export type FractalResponseParserApplyFileResult = {
  targetPath: string; // path where file was written
  status: "applied" | "failed" | "skipped"; // result status
  message?: string; // error message or additional info
};

/**
 * Complete result of Apply phase
 */
export type FractalResponseParserApplyPhaseResult = {
  results: FractalResponseParserApplyFileResult[]; // result for each file
  successCount: number; // number of successfully written files
  failedCount: number; // number of failed writes
  skippedCount: number; // number of skipped files
};

/**
 * Parse status for UI
 */
export type FractalResponseParserParseStatus =
  | "idle"
  | "parsing"
  | "success"
  | "error"
  | "no-blocks";

/**
 * Apply status for UI
 */
export type FractalResponseParserApplyStatus =
  | "idle"
  | "applying"
  | "success"
  | "error";

// ============================================
// NEW TYPES FOR v0.3.0 (File Reading from public/)
// ============================================

/**
 * Result of reading latest file from public/response-for-parsing/
 */
export type FractalResponseParserReadFileResult = {
  success: boolean; // whether file was successfully read
  content?: string; // file content
  fileName?: string; // name of the file
  fileSize?: number; // size in bytes
  modifiedAt?: string; // ISO date string of last modification
  error?: string; // error message if failed
};

/**
 * Load file status for UI
 */
export type FractalResponseParserLoadFileStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";
