// app/[lang]/@rightStatic/(_PRICE_LIST)/(_client)/(_uiclientislands)/fractal-price-list-dev-label-handler.tsx

"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import type { PriceListPageData } from "../../(_shared)/(_types)/fractal-price-list-types";

interface FractalPriceListDevLabelHandlerProps {
  pageData: PriceListPageData;
  level: number;
}

export function FractalPriceListDevLabelHandler(
  props: FractalPriceListDevLabelHandlerProps,
) {
  const { pageData, level } = props;
  const { fractalPath } = pageData;

  const router = useRouter();

  const handleCopyFractalPath = useCallback(async () => {
    try {
      const valueToCopy = fractalPath ?? "";
      await navigator.clipboard.writeText(valueToCopy);

      const pathname = window.location.pathname || "/";
      const segments = pathname.split("/").filter(Boolean);
      const currentLang = segments[0] || "en";
      const artifactPath = `/${currentLang}/artifact`;

      toast.success(`Fractal path copied: ${valueToCopy}`, {
        duration: 6000,
        action: {
          label: "Open Artifact in left slot",
          onClick: () => {
            router.push(artifactPath);
          },
        },
        classNames: {
          toast: "flex-col items-start gap-2",
          actionButton: "w-full justify-center",
        },
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
