// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/(_shared)/(_libs)/response-parser-parse-perplexity-markdown.ts

import type {
  FractalResponseParserCodeBlock,
  FractalResponseParserParseIssue,
  FractalResponseParserParseResult,
} from "../(_types)/fractal-response-parser-types";

/**
 * Главная функция: разбирает Markdown-ответ Perplexity
 * и возвращает нормализованный результат для артефакта.
 */
export function responseParserParsePerplexityMarkdown(
  markdown: string,
): FractalResponseParserParseResult {
  const lines = splitMarkdownIntoLines(markdown);

  const codeBlocks: FractalResponseParserCodeBlock[] = [];
  const issues: FractalResponseParserParseIssue[] = [];

  collectCodeBlocksFromLines(lines, codeBlocks, issues);

  if (codeBlocks.length === 0) {
    issues.push({
      message: "No code blocks were found in the Markdown input.",
      severity: "info",
    });
  }

  return {
    originalMarkdownLength: markdown.length,
    codeBlocks,
    issues,
  };
}

/* -------------------------------------------------------------------------- */
/*                               Линейные утилы                               */
/* -------------------------------------------------------------------------- */

function splitMarkdownIntoLines(markdown: string): string[] {
  return markdown.split(/\r?\n/);
}

type FenceState = {
  inBlock: boolean;
  language: string | null;
  startLine: number;
  lines: string[];
};

function createEmptyFenceState(): FenceState {
  return {
    inBlock: false,
    language: null,
    startLine: 0,
    lines: [],
  };
}

/**
 * Обход всех строк с накоплением code blocks и issues.
 */
function collectCodeBlocksFromLines(
  lines: string[],
  codeBlocks: FractalResponseParserCodeBlock[],
  issues: FractalResponseParserParseIssue[],
): void {
  const state = createEmptyFenceState();

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const fence = tryParseFenceLine(line);

    if (fence) {
      if (!state.inBlock) {
        // Открывающая "```
        startFenceBlock(state, fence.language, index);
      } else {
        // Закрывающая "```"
        endFenceBlock(state, index, codeBlocks, issues);
      }
      continue;
    }

    if (state.inBlock) {
      state.lines.push(line);
    }
  }

  // Незакрытый блок в конце файла
  if (state.inBlock) {
    issues.push({
      message: "Unclosed code fence at end of Markdown input.",
      severity: "error",
    });
  }
}

/* -------------------------------------------------------------------------- */
/*                        Разбор строк с "```
/* -------------------------------------------------------------------------- */

type FenceMatch = {
  language: string | null;
};

/**
 * Возвращает язык из строки вида:
 * ```ts
 * ```
 * ``` json
 * или null, если это просто "```
 *
 * ВАЖНО: здесь НИКОГДА не возвращается RegExpMatchArray — только наш FenceMatch.
 * Это устраняет ошибку "Argument of type 'RegExpMatchArray' is not assignable to parameter of type 'string'".
 */
function tryParseFenceLine(line: string): FenceMatch | null {
  const match = line.match(/^```(?:\s*([\w-]+))?\s*$/);
  if (!match) return null;

  const rawLang = match[1];
  const language = normalizeFenceLanguage(rawLang);
  return { language };
}

function normalizeFenceLanguage(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/* -------------------------------------------------------------------------- */
/*                   Управление состоянием текущего блока                     */
/* -------------------------------------------------------------------------- */

function startFenceBlock(
  state: FenceState,
  language: string | null,
  startLine: number,
): void {
  state.inBlock = true;
  state.language = language;
  state.startLine = startLine;
  state.lines = [];
}

function endFenceBlock(
  state: FenceState,
  endLine: number,
  codeBlocks: FractalResponseParserCodeBlock[],
  issues: FractalResponseParserParseIssue[],
): void {
  const rawCode = state.lines.join("\n");
  const blockIndex = codeBlocks.length;

  const block = buildCodeBlockFromRaw(
    rawCode,
    state.language,
    state.startLine,
    endLine,
    blockIndex,
  );

  codeBlocks.push(block);

  if (!block.pathComment) {
    issues.push({
      codeBlockId: block.id,
      message:
        "Code block does not contain a path comment starting with '// app/'.",
      severity: "warning",
    });
  }

  resetFenceState(state);
}

function resetFenceState(state: FenceState): void {
  state.inBlock = false;
  state.language = null;
  state.startLine = 0;
  state.lines = [];
}

/* -------------------------------------------------------------------------- */
/*                     Постобработка одного code block                        */
/* -------------------------------------------------------------------------- */

type ExtractedPathComment = {
  cleanedCode: string;
  pathComment?: string;
  inferredFilePath?: string;
};

function buildCodeBlockFromRaw(
  rawCode: string,
  language: string | null,
  startLine: number,
  endLine: number,
  index: number,
): FractalResponseParserCodeBlock {
  const { cleanedCode, pathComment, inferredFilePath } =
    extractPathCommentAndCode(rawCode);

  const id = `code-block-${index + 1}`;

  return {
    id,
    language,
    code: cleanedCode,
    pathComment,
    inferredFilePath,
    isSpecBlock: false,
    startLine,
    endLine,
  };
}

/**
 * Ищет первую строку-комментарий с путём вида:
 * // app/...
 * и вырезает её из кода.
 */
function extractPathCommentAndCode(code: string): ExtractedPathComment {
  const lines = code.split(/\r?\n/);

  let pathComment: string | undefined;
  let inferredFilePath: string | undefined;
  const remainingLines: string[] = [];

  for (const line of lines) {
    if (!pathComment && isPathCommentLine(line)) {
      pathComment = line.trim();
      inferredFilePath = inferFilePathFromComment(pathComment);
      continue;
    }
    remainingLines.push(line);
  }

  const cleanedCode = trimEmptyEdges(remainingLines.join("\n"));

  return {
    cleanedCode,
    pathComment,
    inferredFilePath,
  };
}

function isPathCommentLine(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith("// app/");
}

/**
 * Достаёт путь файла из комментария:
 * // app/lang/...
 */
function inferFilePathFromComment(comment: string): string | undefined {
  const match = comment.match(/^\/\/\s*(app\/.+)$/);
  if (!match) return undefined;
  return match[1].trim();
}

/**
 * Обрезает пустые строки в начале и в конце блока кода.
 */
function trimEmptyEdges(code: string): string {
  const lines = code.split(/\r?\n/);
  let start = 0;
  let end = lines.length - 1;

  while (start <= end && lines[start].trim().length === 0) {
    start += 1;
  }
  while (end >= start && lines[end].trim().length === 0) {
    end -= 1;
  }

  return lines.slice(start, end + 1).join("\n");
}
