// app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/(_client)/(_uiclientislands)/fractal-response-parser-dev-handler.tsx

"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { FractalResponseParserPageData } from "../../(_shared)/(_types)/fractal-response-parser-types";

interface FractalResponseParserDevLabelHandlerProps {
  pageData: FractalResponseParserPageData;
  level: number;
}

export function FractalResponseParserDevLabelHandler(
  props: FractalResponseParserDevLabelHandlerProps,
) {
  const { pageData, level } = props;
  const fractalPath = pageData.fractalPath ?? "";

  const router = useRouter();

  const handleCopyFractalPath = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fractalPath);
      toast.success(`Fractal path copied: ${fractalPath}`, {
        duration: 6000,
        action: {
          label: "Open Artifact in left slot",
          onClick: () => router.push("/" + fractalPath),
        },
        classNames: { toast: "flex-col items-start gap-2", actionButton: "w-full justify-center" },
      });
    } catch (error) {
      console.error("Failed to copy fractal path:", error);
      toast.error("Failed to copy fractal path");
    }
  }, [fractalPath, router]);

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
