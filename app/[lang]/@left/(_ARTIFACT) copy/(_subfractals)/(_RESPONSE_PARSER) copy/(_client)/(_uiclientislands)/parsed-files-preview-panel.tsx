// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/(_client)/(_uiclientislands)/parsed-files-preview-panel.tsx

"use client";

import type { JSX } from "react";
import type { FractalResponseParserParsedFile } from "../../(_shared)/(_types)/fractal-response-parser-types";
import { ParsedFilePreviewItem } from "./parsed-file-preview-item";
import { Button } from "@/components/ui/button";

type ParsedFilesPreviewPanelProps = {
  files: FractalResponseParserParsedFile[];
  onFilesChange: (files: FractalResponseParserParsedFile[]) => void;
  onApply: () => void;
  isApplying: boolean;
};

export function ParsedFilesPreviewPanel(
  props: ParsedFilesPreviewPanelProps,
): JSX.Element {
  const { files, onFilesChange, onApply, isApplying } = props;

  const handlePathChange = (fileId: string, newPath: string) => {
    const updatedFiles = files.map((f) =>
      f.id === fileId
        ? { ...f, targetPath: newPath, isEdited: true }
        : f
    );
    onFilesChange(updatedFiles);
  };

  const handleContentChange = (fileId: string, newContent: string) => {
    const updatedFiles = files.map((f) =>
      f.id === fileId
        ? {
            ...f,
            content: newContent,
            linesCount: newContent.split("\n").length,
            isEdited: true,
          }
        : f
    );
    onFilesChange(updatedFiles);
  };

  const handleRemove = (fileId: string) => {
    const updatedFiles = files.filter((f) => f.id !== fileId);
    onFilesChange(updatedFiles);
  };

  const handleClearAll = () => {
    onFilesChange([]);
  };

  const totalLines = files.reduce((sum, f) => sum + f.linesCount, 0);
  const editedCount = files.filter((f) => f.isEdited).length;

  if (files.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
        <p className="text-sm text-gray-600">
          No files extracted yet. Parse markdown to see files here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-gray-900">
            Extracted Files Preview
          </h3>
          <div className="flex gap-3 text-xs text-gray-600">
            <span>📦 {files.length} file(s)</span>
            <span>📄 {totalLines} total lines</span>
            {editedCount > 0 && (
              <span className="text-yellow-700">
                ✏️ {editedCount} edited
              </span>
            )}
          </div>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleClearAll}
          disabled={isApplying}
        >
          Clear All
        </Button>
      </div>

      {/* File list */}
      <div className="flex flex-col gap-3">
        {files.map((file) => (
          <ParsedFilePreviewItem
            key={file.id}
            file={file}
            onPathChange={handlePathChange}
            onContentChange={handleContentChange}
            onRemove={handleRemove}
          />
        ))}
      </div>

      {/* Apply button */}
      <div className="flex items-center justify-between gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-blue-900">
            Ready to apply changes
          </p>
          <p className="text-xs text-blue-700">
            {files.length} file(s) will be written to filesystem
          </p>
        </div>
        <Button
          type="button"
          size="default"
          variant="default"
          onClick={onApply}
          disabled={isApplying || files.length === 0}
        >
          {isApplying ? "Applying..." : "Apply to Filesystem"}
        </Button>
      </div>
    </div>
  );
}
