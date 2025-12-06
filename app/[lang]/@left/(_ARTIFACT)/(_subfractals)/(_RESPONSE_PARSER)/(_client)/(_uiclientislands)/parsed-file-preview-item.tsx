// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/(_client)/(_uiclientislands)/parsed-file-preview-item.tsx

"use client";

import { useState } from "react";
import type { JSX } from "react";
import type { FractalResponseParserParsedFile } from "../../(_shared)/(_types)/fractal-response-parser-types";
import { Button } from "@/components/ui/button";

type ParsedFilePreviewItemProps = {
  file: FractalResponseParserParsedFile;
  onPathChange: (fileId: string, newPath: string) => void;
  onContentChange: (fileId: string, newContent: string) => void;
  onRemove: (fileId: string) => void;
};

export function ParsedFilePreviewItem(
  props: ParsedFilePreviewItemProps,
): JSX.Element {
  const { file, onPathChange, onContentChange, onRemove } = props;

  const [isPathEditing, setIsPathEditing] = useState(false);
  const [isContentEditing, setIsContentEditing] = useState(false);

  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPathChange(file.id, e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(file.id, e.target.value);
  };

  const handleRemove = () => {
    onRemove(file.id);
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-300 bg-white p-4">
      {/* Header with metadata */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
              {file.language}
            </span>
            <span className="text-xs text-gray-600">
              {file.linesCount} lines
            </span>
            {file.isEdited && (
              <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700">
                Edited
              </span>
            )}
          </div>
        </div>
        <Button
          type="button"
          size="sm"
          variant="destructive"
          onClick={handleRemove}
        >
          Remove
        </Button>
      </div>

      {/* Path editor */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-700">
          File Path
        </label>
        <input
          type="text"
          className="w-full rounded border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={file.targetPath}
          onChange={handlePathChange}
          onFocus={() => setIsPathEditing(true)}
          onBlur={() => setIsPathEditing(false)}
          placeholder="@/app/[lang]/..."
        />
        {file.originalPath && file.targetPath !== file.originalPath && (
          <span className="text-xs text-gray-500">
            Original: de className="text-xs"{file.originalPath}
          </span>
        )}
      </div>

      {/* Content editor */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-gray-700">
            File Content
          </label>
          <button
            type="button"
            className="text-xs text-blue-600 hover:underline"
            onClick={() => setIsContentEditing(!isContentEditing)}
          >
            {isContentEditing ? "Collapse" : "Expand"}
          </button>
        </div>
        <textarea
          className="w-full rounded border border-gray-300 px-3 py-2 font-mono text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={file.content}
          onChange={handleContentChange}
          rows={isContentEditing ? 20 : 8}
          placeholder="File content..."
        />
      </div>
    </div>
  );
}
