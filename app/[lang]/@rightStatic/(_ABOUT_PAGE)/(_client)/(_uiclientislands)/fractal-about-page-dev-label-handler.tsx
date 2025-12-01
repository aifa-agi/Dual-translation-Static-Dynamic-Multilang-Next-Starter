// @/app/[lang]/@rightStatic/(_ABOUT_PAGE)/(_client)/(_uiclientislands)/fractal-about-page-dev-label-handler.tsx

"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import type { AboutPagePageData } from "../../(_shared)/(_types)/fractal-about-page-types";

interface FractalAboutPageDevLabelHandlerProps {
  pageData: AboutPagePageData;
  level: number;
}

export function FractalAboutPageDevLabelHandler(
  props: FractalAboutPageDevLabelHandlerProps,
) {
  const { pageData, level } = props;
  const { fractalPath } = pageData;

  const router = useRouter();

  const handleCopyFractalPath = useCallback(async () => {
    try {
      const valueToCopy = fractalPath ?? "";
      await navigator.clipboard.writeText(valueToCopy);

      // Derive current lang from URL pathname for dev tooling
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
