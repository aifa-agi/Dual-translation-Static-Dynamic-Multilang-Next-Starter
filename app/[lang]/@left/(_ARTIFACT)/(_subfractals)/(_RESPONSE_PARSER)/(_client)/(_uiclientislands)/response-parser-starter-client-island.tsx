// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/(_client)/(_uiclientislands)/response-parser-starter-client-island.tsx

"use client";

import { useState, useCallback } from "react";
import type { JSX } from "react";
import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  FractalResponseParserTranslations,
  FractalResponseParserPageData,
  FractalResponseParserParsedFile,
  FractalResponseParserParseStatus,
  FractalResponseParserApplyStatus,
  FractalResponseParserApplyPhaseResult,
  FractalResponseParserLoadFileStatus,
} from "../../(_shared)/(_types)/fractal-response-parser-types";
import { readLatestResponseFileAction } from "../../(_server)/(_actions)/read-latest-response-file-action";
import { responseParserExtractAction } from "../../(_server)/(_actions)/response-parser-extract-action";
import { responseParserApplyAction } from "../../(_server)/(_actions)/response-parser-apply-action";
import { ParsedFilesPreviewPanel } from "./parsed-files-preview-panel";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ResponseParserStarterClientIslandProps = {
  translations: FractalResponseParserTranslations;
  lang?: SupportedLanguage;
  currentPath?: string;
  pageData?: FractalResponseParserPageData;
};

type ParserMode = "spec" | "code";

export function ResponseParserStarterClientIsland(
  props: ResponseParserStarterClientIslandProps,
): JSX.Element {
  const { translations, pageData } = props;

  // Mode
  const [mode, setMode] = useState<ParserMode>("code");

  // Load file phase
  const [loadFileStatus, setLoadFileStatus] =
    useState<FractalResponseParserLoadFileStatus>("idle");
  const [loadedFileInfo, setLoadedFileInfo] = useState<{
    fileName: string;
    fileSize: number;
    modifiedAt: string;
  } | null>(null);
  const [loadedContent, setLoadedContent] = useState<string>("");

  // Parse phase (Extract)
  const [parseStatus, setParseStatus] =
    useState<FractalResponseParserParseStatus>("idle");
  const [parsedFiles, setParsedFiles] = useState<
    FractalResponseParserParsedFile[]
  >([]);

  // Apply phase
  const [applyStatus, setApplyStatus] =
    useState<FractalResponseParserApplyStatus>("idle");
  const [applyResult, setApplyResult] =
    useState<FractalResponseParserApplyPhaseResult | null>(null);

  const title = pageData?.fractalName ?? "Response Parser";
  const description =
    pageData?.fractalDescription ??
    "Parse Perplexity responses from file system and apply changes.";
  const hint =
    pageData?.hint ?? "Load latest file from public/response-for-parsing/";

  /* -------------------------------------------------------------------------- */
  /*                         Phase 0: Load File                                */
  /* -------------------------------------------------------------------------- */

  const handleLoadFile = useCallback(async () => {
    setLoadFileStatus("loading");
    setParsedFiles([]);
    setApplyResult(null);
    setLoadedContent("");
    setLoadedFileInfo(null);

    try {
      const result = await readLatestResponseFileAction();

      if (!result.success || !result.content) {
        setLoadFileStatus("error");
        toast.error(result.error || "Failed to load file");
        return;
      }

      setLoadFileStatus("success");
      setLoadedContent(result.content);
      setLoadedFileInfo({
        fileName: result.fileName || "unknown",
        fileSize: result.fileSize || 0,
        modifiedAt: result.modifiedAt || new Date().toISOString(),
      });

      toast.success(`Loaded: ${result.fileName} (${result.fileSize} bytes)`);

      // Auto-parse after loading
      handleParseAfterLoad(result.content);
    } catch (error) {
      setLoadFileStatus("error");
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Load failed: ${message}`);
    }
  }, [mode]);

  /* -------------------------------------------------------------------------- */
  /*                         Phase 1: Parse (Extract)                          */
  /* -------------------------------------------------------------------------- */

  const handleParseAfterLoad = useCallback(
    async (content: string) => {
      setParseStatus("parsing");
      setParsedFiles([]);
      setApplyResult(null);

      try {
        const extractResult = await responseParserExtractAction({
          markdown: content,
          mode,
        });

        if (extractResult.files.length === 0) {
          setParseStatus("no-blocks");
          toast.info(
            `No files with path comments found. ${extractResult.skippedBlocks} block(s) skipped.`,
          );
          return;
        }

        setParseStatus("success");
        setParsedFiles(extractResult.files);
        toast.success(
          `Extracted ${extractResult.files.length} file(s) successfully`,
        );
      } catch (error) {
        setParseStatus("error");
        const message = error instanceof Error ? error.message : "Unknown error";
        toast.error(`Parse failed: ${message}`);
      }
    },
    [mode],
  );

  /* -------------------------------------------------------------------------- */
  /*                         Phase 2: Apply (Write to FS)                      */
  /* -------------------------------------------------------------------------- */

  const handleApply = useCallback(async () => {
    if (parsedFiles.length === 0) {
      toast.error("No files to apply");
      return;
    }

    setApplyStatus("applying");
    setApplyResult(null);

    try {
      const result = await responseParserApplyAction({
        files: parsedFiles,
      });

      setApplyResult(result);

      if (result.failedCount > 0) {
        setApplyStatus("error");
        toast.error(
          `Applied ${result.successCount}, failed ${result.failedCount} file(s)`,
        );
      } else {
        setApplyStatus("success");
        toast.success(`Successfully applied ${result.successCount} file(s)`);
      }
    } catch (error) {
      setApplyStatus("error");
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Apply failed: ${message}`);
    }
  }, [parsedFiles]);

  /* -------------------------------------------------------------------------- */
  /*                              Handlers                                      */
  /* -------------------------------------------------------------------------- */

  const handleFilesChange = (files: FractalResponseParserParsedFile[]) => {
    setParsedFiles(files);
  };

  const getLoadFileStatusLabel = (): string => {
    switch (loadFileStatus) {
      case "idle":
        return "Ready to load";
      case "loading":
        return "Loading file...";
      case "success":
        return "File loaded successfully";
      case "error":
        return "Failed to load file";
      default:
        return "Unknown";
    }
  };

  const getParseStatusLabel = (): string => {
    switch (parseStatus) {
      case "idle":
        return translations.parseCodeStatusIdle;
      case "parsing":
        return translations.parseCodeStatusRunning;
      case "success":
        return translations.parseCodeStatusSuccess;
      case "error":
        return translations.parseCodeStatusError;
      case "no-blocks":
        return translations.parseCodeStatusNoBlocks;
      default:
        return "Unknown";
    }
  };

  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-gray-700">{description}</p>
        <p className="text-xs text-gray-600">{hint}</p>
      </div>

      {/* Mode selector */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Parser Mode</label>
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant={mode === "spec" ? "default" : "outline"}
            onClick={() => setMode("spec")}
            disabled={loadFileStatus === "loading" || parseStatus === "parsing"}
          >
            {translations.specMode}
          </Button>
          <Button
            type="button"
            size="sm"
            variant={mode === "code" ? "default" : "outline"}
            onClick={() => setMode("code")}
            disabled={loadFileStatus === "loading" || parseStatus === "parsing"}
          >
            {translations.codeMode}
          </Button>
        </div>
        <p className="text-xs text-gray-600">
          {mode === "spec"
            ? translations.specModeDescription
            : translations.codeModeDescription}
        </p>
      </div>

      {/* Load File Section */}
      <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold">Load Latest Response</h3>
            <p className="text-xs text-gray-600">
              Reads the latest file from{" "}
              de className="rounded bg-gray-200 px-1 py-0.5 text-xs"
              public/response-for-parsing/

            </p>
          </div>
          <Button
            type="button"
            size="default"
            variant="default"
            onClick={handleLoadFile}
            disabled={loadFileStatus === "loading"}
          >
            {loadFileStatus === "loading"
              ? "Loading..."
              : "Load Latest File"}
          </Button>
        </div>

        {/* File info */}
        {loadedFileInfo && (
          <div className="flex flex-col gap-1 rounded border border-blue-200 bg-blue-50 p-3">
            <div className="flex items-center gap-2 text-xs text-blue-900">
              <span className="font-semibold">📄 {loadedFileInfo.fileName}</span>
              <span>•</span>
              <span>{Math.round(loadedFileInfo.fileSize / 1024)} KB</span>
              <span>•</span>
              <span>
                {new Date(loadedFileInfo.modifiedAt).toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-blue-700">
              Status: {getLoadFileStatusLabel()}
            </p>
          </div>
        )}

        {/* Parse status */}
        {loadedContent && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>Parse status:</span>
            <span className="font-semibold">{getParseStatusLabel()}</span>
          </div>
        )}
      </div>

      {/* Preview Panel */}
      {parsedFiles.length > 0 && (
        <ParsedFilesPreviewPanel
          files={parsedFiles}
          onFilesChange={handleFilesChange}
          onApply={handleApply}
          isApplying={applyStatus === "applying"}
        />
      )}

      {/* Apply Results */}
      {/* Apply Results */}
      {applyResult && (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold">Apply Results</h3>
          <div className="mb-3 flex gap-4 text-xs">
            <span className="text-green-600">
              ✅ Success: {applyResult.successCount}
            </span>
            <span className="text-red-600">
              ❌ Failed: {applyResult.failedCount}
            </span>
            <span className="text-gray-600">
              ⏭️ Skipped: {applyResult.skippedCount}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {applyResult.results.map((res, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-1 rounded border border-gray-200 bg-gray-50 p-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold ${res.status === "applied"
                        ? "text-green-600"
                        : res.status === "failed"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                  >
                    {res.status === "applied"
                      ? "✅"
                      : res.status === "failed"
                        ? "❌"
                        : "⏭️"}
                  </span>
                  <span className="font-semibold text-xs text-gray-700">
                    {res.status}
                  </span>
                </div>
                <span className="font-mono text-xs text-gray-800 break-all">
                  {res.targetPath}
                </span>
                {res.message && (
                  <span className="text-xs text-gray-600">{res.message}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}


      
    </section>
  );
}
