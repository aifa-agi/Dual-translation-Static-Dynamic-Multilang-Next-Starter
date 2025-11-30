// @/app/(lang)/@left/(_ARTIFACT)/(_client)/(_uiclientislands)/fractal-dev-label-handler.tsx
'use client';

import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { ArtifactPageData } from "../../(_shared)/(_types)/fractal-artifact-types";

interface FractalDevLabelHandlerProps {
  pageData: ArtifactPageData;
  level: number;
}

export function FractalDevLabelHandler({
  pageData,
  level,
}: FractalDevLabelHandlerProps) {
  const { fractalPath } = pageData;

  const handleCopyFractalPath = useCallback(async () => {
    try {
      const valueToCopy = fractalPath ?? "";
      await navigator.clipboard.writeText(valueToCopy);

      toast.success(`Fractal path copied: ${valueToCopy}`);
    } catch (error) {
      console.error("Failed to copy fractal path:", error);
      toast.error("Failed to copy fractal path");
    }
  }, [fractalPath]);

  return (
    <span
      className={cn("fractal-copy-btn", "animate-fade-in-fast")}
      data-fractal-level={level}
      onClick={handleCopyFractalPath}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleCopyFractalPath();
        }
      }}
    >
      Copy fractal path
    </span>
  );
}
