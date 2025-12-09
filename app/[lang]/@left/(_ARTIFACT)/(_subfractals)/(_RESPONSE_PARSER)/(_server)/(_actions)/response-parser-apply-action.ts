// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/(_server)/(_actions)/response-parser-apply-action.ts

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

const PATH_VALIDATION_LOG_PREFIX = "[RESPONSE_PARSER][APPLY][PATH_VALIDATION]";

// Дефолтный набор допустимых слотов, если переменная окружения не задана.
const DEFAULT_AVAILABLE_SLOTS = [
  "@left",
  "@rightStatic",
  "@rightDynamic",
  "@headerMenu",
  "@footer",
] as const;

// Разрешённые route‑файлы под сегментом кодового имени фрактала.
const ROUTE_SHELL_FILES = new Set<string>([
  "layout.tsx",
  "page.tsx",
  "route.ts",
  "error.tsx",
  "default.tsx",
  "not-found.tsx",
  "loading.tsx",
]);

// Fallback‑папки для слоёв (формат "(_foldername)") из каталога слоёв AIFA,
// имена папок строчные, как в Core Rules и Layers Catalog.[file:7][file:6]
const DEFAULT_SERVER_FOLDERS = [
  "(_api)",
  "(_actions)",
  "(_pageseotools)",
  "(_dbqueries)",
  "(_fsqueries)",
  "(_redisqueries)",
  "(_blobqueries)",
  "(_gitqueries)",
  "(_middleware)",
  "(_adapters)",
  "(_webhooks)",
  "(_events)",
  "(_servercomponents)",
  "(_services)",
  "(_jobs)",
  "(_drizzle)",
] as const;

const DEFAULT_CLIENT_FOLDERS = [
  "(_uiclientislands)",
  "(_hooks)",
  "(_contextproviders)",
  "(_localstoragequery)",
  "(_navigationeffects)",
] as const;

const DEFAULT_SHARED_FOLDERS = [
  "(_types)",
  "(_schemas)",
  "(_constants)",
  "(_libs)",
  "(_regularexpressions)",
  "(_config)",
  "(_translations)",
  "(_content)",
  "(_events)",
  "(_docs)",
] as const;

/**
 * Server Action: Apply phase — записывает распарсенные файлы в файловую систему.
 */
export async function responseParserApplyAction(
  input: FractalResponseParserApplyRequest,
): Promise<FractalResponseParserApplyPhaseResult> {
  const files = input.files;
  const results: FractalResponseParserApplyFileResult[] = [];
  let successCount = 0;
  let failedCount = 0;
  let skippedCount = 0;

  console.log(
    "[RESPONSE_PARSER][APPLY] ===== APPLY ACTION START =====\n  Files count:",
    files.length,
  );

  for (const file of files) {
    const result = await applyFileToFilesystem(file);
    results.push(result);

    if (result.status === "applied") {
      successCount += 1;
    } else if (result.status === "failed") {
      failedCount += 1;
    } else if (result.status === "skipped") {
      skippedCount += 1;
    }
  }

  console.log("[RESPONSE_PARSER][APPLY] ===== APPLY ACTION END =====");

  return {
    results,
    successCount,
    failedCount,
    skippedCount,
  };
}

/* -------------------------------------------------------------------------- */
/*                           File write operations                            */
/* -------------------------------------------------------------------------- */

async function applyFileToFilesystem(
  file: FractalResponseParserParsedFile,
): Promise<FractalResponseParserApplyFileResult> {
  try {
    // 0) Маршрутизатор валидатора — шаги 1–5.
    const validationOk = runPathValidationRouter(file.targetPath);

    if (!validationOk) {
      return {
        targetPath: file.targetPath,
        status: "skipped",
        message:
          "Path validation failed (see logs for step details); file was not written.",
      };
    }

    // 1) Определяем тип файла по расширению (для выбора комментария).
    let finalContent = file.content;
    const fileExtension =
      file.targetPath.split(".").pop()?.toLowerCase() ?? "txt";
    const isMarkdown = fileExtension === "md";
    const isJson = fileExtension === "json";

    if (isMarkdown) {
      const pathComment = `<!-- ${file.targetPath} -->`;
      finalContent = `${pathComment}\n${file.content}`;
    } else if (isJson) {
      const lines = file.content.split("\n");
      const firstLine = (lines[0] ?? "").trim();

      if (firstLine.startsWith("//") || firstLine.startsWith("/*")) {
        finalContent = lines.slice(1).join("\n").trim();
      } else {
        finalContent = file.content.trim();
      }
    } else {
      const commentStyle = getCommentStyleForExtension(fileExtension);
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

    console.error(
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
/*  Path validation router: шаги 1–5                                          */
/* -------------------------------------------------------------------------- */

/**
 * Шаги:
 * 1. [lang] после "app".
 * 2. slot из env/fallback.
 * 3. имя фрактала "(_FRACTALNAME)" (UPPERSNAKE).[file:7]
 * 4. SPEC.md / слой / кодовое имя фрактала + route‑файл.
 * 5. Под слоями:
 *    - под "(_subfractals)" — имя подфрактала "(_SUBFRACTAL)";
 *    - под "(_server)", "(_client)", "(_shared)" — имя служебной папки
 *      из каталога (env + fallback), "(_foldername)" в нижнем регистре.[file:6][file:7]
 */
function runPathValidationRouter(targetPath: string): boolean {
  const trimmed = targetPath.trim();

  // Нормализация: убираем "@/"" и ведущий "/".
  let cleanPath = trimmed;
  if (cleanPath.startsWith("@/")) {
    cleanPath = cleanPath.slice(2);
  }
  if (cleanPath.startsWith("/")) {
    cleanPath = cleanPath.slice(1);
  }

  const segments = cleanPath.split("/").filter(Boolean);

  // ------------------------ Шаг 1: [lang] после app -------------------------
  const root = segments[0];
  const langSeg = segments[1];

  if (root !== "app") {
    console.log(
      `${PATH_VALIDATION_LOG_PREFIX} Шаг 1 валидации [lang]: ошибка — путь должен начинаться с "app/", получено "${root ?? ""}".`,
    );
    return false;
  }

  if (langSeg !== "[lang]") {
    console.log(
      `${PATH_VALIDATION_LOG_PREFIX} Шаг 1 валидации [lang]: ошибка — сегмент после "app/" должен быть ровно "[lang]". Получено "${langSeg ?? ""}".`,
    );
    return false;
  }

  console.log(
    `${PATH_VALIDATION_LOG_PREFIX} Шаг 1 валидации [lang]: успешно. Путь "${targetPath}" имеет корректный динамический сегмент "[lang]".`,
  );

  // ------------------------ Шаг 2: slot (параллельный слот) ----------------
  const slotSeg = segments[2];

  const envSlotsRaw = process.env.NEXT_PUBLIC_AVAILABLE_PARALLEL_SLOTS;
  let allowedSlots: string[];

  if (envSlotsRaw && envSlotsRaw.trim().length > 0) {
    allowedSlots = envSlotsRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  } else {
    allowedSlots = [...DEFAULT_AVAILABLE_SLOTS];
  }

  if (!slotSeg) {
    console.log(
      `${PATH_VALIDATION_LOG_PREFIX} Шаг 2 валидации slot: ошибка — отсутствует сегмент слота после "app/[lang]/". Разрешены только: ${allowedSlots.join(
        ", ",
      )}.`,
    );
    return false;
  }

  if (!allowedSlots.includes(slotSeg)) {
    console.log(
      `${PATH_VALIDATION_LOG_PREFIX} Шаг 2 валидации slot: ошибка — слот "${slotSeg}" не входит в список допустимых. Разрешены только: ${allowedSlots.join(
        ", ",
      )}.`,
    );
    return false;
  }

  console.log(
    `${PATH_VALIDATION_LOG_PREFIX} Шаг 2 валидации slot: успешно. Используется допустимый слот "${slotSeg}".`,
  );

  // ------------------------ Шаг 3: fractal name -----------------------------
  const fractalSeg = segments[3];

  if (!fractalSeg) {
    console.log(
      `${PATH_VALIDATION_LOG_PREFIX} Шаг 3 валидации fractal: ошибка — после слота "${slotSeg}" отсутствует сегмент с названием фрактала. Ожидается что-то вроде "(_ARTIFACT)".`,
    );
    return false;
  }

  const fractalPattern = /^\(_[A-Z0-9]+\)$/;

  if (!fractalPattern.test(fractalSeg)) {
    console.log(
      `${PATH_VALIDATION_LOG_PREFIX} Шаг 3 валидации fractal: ошибка — сегмент "${fractalSeg}" не является корректным названием фрактала. Ожидается формат "(_FRACTALNAME)" с заглавными буквами и цифрами без разделителей, например "(_ARTIFACT)" или "(_HEROSECTION)".`,
    );
    return false;
  }

  console.log(
    `${PATH_VALIDATION_LOG_PREFIX} Шаг 3 валидации fractal: успешно. Сегмент "${fractalSeg}" распознан как корректное имя фрактала (формат "(_NAME)").`,
  );

  // ------------------------ Шаг 4: SPEC / слои / кодовое имя ----------------
  const afterFractalSeg = segments[4];

  if (!afterFractalSeg) {
    console.log(
      `${PATH_VALIDATION_LOG_PREFIX} Шаг 4 валидации next-after-fractal: ошибка — после фрактала "${fractalSeg}" отсутствует следующий сегмент. Ожидается "SPEC.md", один из слоёв "(_server)", "(_client)", "(_shared)", "(_subfractals)" или кодовое имя фрактала в нижнем регистре (например "artifact").`,
    );
    return false;
  }

  const fractalInnerName = fractalSeg.slice(2, -1); // "ARTIFACT"
  const fractalCodeLower = fractalInnerName.toLowerCase();

  // Вариант 1: SPEC.md и путь должен закончиться на этом файле.
  if (afterFractalSeg === "SPEC.md") {
    if (segments.length !== 5) {
      console.log(
        `${PATH_VALIDATION_LOG_PREFIX} Шаг 4 валидации: ошибка — "SPEC.md" должен быть последним сегментом пути фрактала. Текущий путь содержит дополнительные сегменты после "SPEC.md".`,
      );
      return false;
    }

    console.log(
      `${PATH_VALIDATION_LOG_PREFIX} Шаг 4 валидации: успешно. Обнаружен SPEC-документ корня фрактала: "${cleanPath}".`,
    );
    return true;
  }

  // Вариант 2: один из фиксированных слоёв / служебных папок.
  const allowedLayers = new Set<string>([
    "(_server)",
    "(_client)",
    "(_shared)",
    "(_subfractals)",
  ]);

  const isLayer = allowedLayers.has(afterFractalSeg);

  // Вариант 3: кодовое имя фрактала как сегмент маршрута (artifact, herosection и т.п.).
  if (!isLayer && afterFractalSeg === fractalCodeLower) {
    const routeFileSeg = segments[5];

    if (!routeFileSeg) {
      console.log(
        `${PATH_VALIDATION_LOG_PREFIX} Шаг 4 валидации: ошибка — после сегмента кодового имени фрактала "${afterFractalSeg}" отсутствует имя route-файла. Ожидается один из: ${Array.from(
          ROUTE_SHELL_FILES,
        ).join(", ")}.`,
      );
      return false;
    }

    if (!ROUTE_SHELL_FILES.has(routeFileSeg)) {
      console.log(
        `${PATH_VALIDATION_LOG_PREFIX} Шаг 4 валидации: ошибка — файл "${routeFileSeg}" под сегментом "${afterFractalSeg}" не входит в список допустимых route-файлов. Разрешены только: ${Array.from(
          ROUTE_SHELL_FILES,
        ).join(", ")}.`,
      );
      return false;
    }

    if (segments.length !== 6) {
      console.log(
        `${PATH_VALIDATION_LOG_PREFIX} Шаг 4 валидации: ошибка — после "${afterFractalSeg}/${routeFileSeg}" не должно быть дополнительных сегментов. Текущий путь содержит лишние сегменты.`,
      );
      return false;
    }

    console.log(
      `${PATH_VALIDATION_LOG_PREFIX} Шаг 4 валидации: успешно. Обнаружен корректный route-сегмент фрактала "${fractalSeg}" → "${afterFractalSeg}/${routeFileSeg}".`,
    );
    return true;
  }

  // Если это слой — не завершаем, а идём на шаг 5.
  if (isLayer) {
    console.log(
      `${PATH_VALIDATION_LOG_PREFIX} Шаг 4 валидации: успешно. Обнаружен слой/служебная папка "${afterFractalSeg}" после фрактала "${fractalSeg}". Переходим к шагу 5.`,
    );
    return runStep5ValidationForLayer(segments, afterFractalSeg);
  }

  // Ни один из вариантов не подошёл.
  console.log(
    `${PATH_VALIDATION_LOG_PREFIX} Шаг 4 валидации: ошибка — сегмент "${afterFractalSeg}" после "${fractalSeg}" не является ни "SPEC.md", ни допустимым слоем, ни кодовым именем фрактала "${fractalCodeLower}".`,
  );
  return false;
}

/* -------------------------------------------------------------------------- */
/*                             Step 5 validator                               */
/* -------------------------------------------------------------------------- */

/**
 * Шаг 5:
 * 1) Если родитель — "(_subfractals)", следующий сегмент обязан быть
 *    корректным названием подфрактала "(_SUBFRACTAL)" (как на шаге 3).[file:7]
 * 2) Если родитель — "(_server)", "(_client)", "(_shared)", следующий сегмент
 *    обязан быть именем папки из допустимого списка для этого слоя
 *    (env + fallback), в виде "(_foldername)" в нижнем регистре.[file:6]
 */
function runStep5ValidationForLayer(
  segments: string[],
  layerSeg: string,
): boolean {
  // Индекс слоя: 4 (app / [lang] / slot / (_FRACTAL) / LAYER / ...)
  const layerIndex = 4;
  const childSeg = segments[layerIndex + 1];

  if (!childSeg) {
    // Путь заканчивается на слое: допустимо (например, ссылка на корень слоя).
    console.log(
      `${PATH_VALIDATION_LOG_PREFIX} Шаг 5 валидации: слой "${layerSeg}" без дочерних сегментов — дополнительных проверок нет, успешно.`,
    );
    return true;
  }

  // 5.1 Под "(_subfractals)" — ожидаем имя субфрактала.
  if (layerSeg === "(_subfractals)") {
    const fractalPattern = /^\(_[A-Z0-9]+\)$/;

    if (!fractalPattern.test(childSeg)) {
      console.log(
        `${PATH_VALIDATION_LOG_PREFIX} Шаг 5 валидации: ошибка — под "(_subfractals)" сегмент "${childSeg}" не является корректным названием подфрактала. Ожидается формат "(_SUBFRACTAL)" с заглавными буквами и цифрами без разделителей.`,
      );
      return false;
    }

    console.log(
      `${PATH_VALIDATION_LOG_PREFIX} Шаг 5 валидации: успешно. Под "(_subfractals)" обнаружен корректный подфрактал "${childSeg}".`,
    );
    return true; // Детализация структуры подфрактала — на следующих шагах.
  }

  // 5.2 Под "(_server)", "(_client)", "(_shared)" — ожидаем служебную папку.
  if (layerSeg === "(_server)" || layerSeg === "(_client)" || layerSeg === "(_shared)") {
    const allowedFolders = getAllowedFoldersForLayer(layerSeg);

    if (!allowedFolders.includes(childSeg)) {
      console.log(
        `${PATH_VALIDATION_LOG_PREFIX} Шаг 5 валидации: ошибка — сегмент "${childSeg}" под слоем "${layerSeg}" не входит в список допустимых папок. Разрешены только: ${allowedFolders.join(
          ", ",
        )}.`,
      );
      return false;
    }

    console.log(
      `${PATH_VALIDATION_LOG_PREFIX} Шаг 5 валидации: успешно. Под слоем "${layerSeg}" обнаружена допустимая папка "${childSeg}".`,
    );
    return true;
  }

  // На всякий случай catch‑all (сюда приходить не должны).
  console.log(
    `${PATH_VALIDATION_LOG_PREFIX} Шаг 5 валидации: ошибка — слой "${layerSeg}" не поддерживается этим шагом.`,
  );
  return false;
}

/**
 * Возвращает список допустимых папок для слоя с учётом env + fallback.
 * Все имена в формате "(_foldername)" и соответствуют каталогу слоёв.[file:6]
 */
function getAllowedFoldersForLayer(layerSeg: string): string[] {
  if (layerSeg === "(_server)") {
    const raw = process.env.NEXT_PUBLIC_AVAILABLE_SERVER_FOLDERS;
    if (raw && raw.trim().length > 0) {
      return raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [...DEFAULT_SERVER_FOLDERS];
  }

  if (layerSeg === "(_client)") {
    const raw = process.env.NEXT_PUBLIC_AVAILABLE_CLIENT_FOLDERS;
    if (raw && raw.trim().length > 0) {
      return raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [...DEFAULT_CLIENT_FOLDERS];
  }

  if (layerSeg === "(_shared)") {
    const raw = process.env.NEXT_PUBLIC_AVAILABLE_SHARED_FOLDERS;
    if (raw && raw.trim().length > 0) {
      return raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [...DEFAULT_SHARED_FOLDERS];
  }

  // Для других слоёв — пустой список (не должны сюда попадать).
  return [];
}

/* -------------------------------------------------------------------------- */
/*                             Path utilities                                 */
/* -------------------------------------------------------------------------- */

function resolveAbsolutePath(relativePath: string): string {
  const projectRoot = process.cwd();

  let clean = relativePath;
  if (clean.startsWith("@/")) {
    clean = clean.slice(2);
  }
  if (clean.startsWith("/")) {
    clean = clean.slice(1);
  }

  return join(projectRoot, clean);
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
 * Определяет стиль комментария для path‑строки по расширению файла.
 */
function getCommentStyleForExtension(extension: string): CommentStyle {
  const blockCommentExtensions = new Set<string>(["css", "scss", "sass"]);

  if (blockCommentExtensions.has(extension)) {
    return "block";
  }

  return "double-slash";
}

/**
 * Формирует path‑комментарий по AIFA‑правилу.
 */
function formatPathComment(path: string, style: CommentStyle): string {
  if (style === "block") {
    return `/* ${path} */`;
  }
  return `// ${path}`;
}
