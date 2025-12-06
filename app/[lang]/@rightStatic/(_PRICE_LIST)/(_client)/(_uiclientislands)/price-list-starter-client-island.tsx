// app/[lang]/@rightStatic/(_PRICE_LIST)/(_client)/(_uiclientislands)/price-list-starter-client-island.tsx

"use client";

import { useCallback } from "react";
import type { JSX } from "react";

import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  FractalPriceListTranslations,
  PriceListPageData,
} from "../../(_shared)/(_types)/fractal-price-list-types";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type PriceListStarterClientIslandProps = {
  translations: FractalPriceListTranslations;
  lang?: SupportedLanguage;
  currentPath?: string;
  pageData?: PriceListPageData;
};

export function PriceListStarterClientIsland(
  props: PriceListStarterClientIslandProps,
): JSX.Element {
  const { translations, lang, currentPath, pageData } = props;

  const title =
    pageData?.fractalName ?? "Price List · Client Canvas";
  const description =
    pageData?.fractalDescription ??
    "Client-side canvas showing that the Price List fractal can host an embedded subdomain panel.";
  const hint =
    pageData?.hint ??
    "Use the buttons to inspect routing context and toggle the embedded subdomain fractal.";

  const handleShowInfo = useCallback(() => {
    toast.info("Price List client demo", {
      description: `Greeting: ${translations.greeting} · lang=${lang ?? "n/a"} · path=${currentPath ?? "n/a"}`,
      duration: 4000,
    });
  }, [currentPath, lang, translations.greeting]);

  const handleToggleSubdomain = useCallback(() => {
    const container = document.getElementById(
      "price-list-subdomain-fractal-container",
    );

    if (!container) {
      toast.error("Subfractal panel container not found");
      return;
    }

    const current = container.getAttribute("data-visible") === "true";
    const next = !current;

    container.setAttribute("data-visible", next ? "true" : "false");

    toast.success(next ? "Subfractal panel opened" : "Subfractal panel hidden");
  }, []);

  return (
    <section className="flex flex-col gap-3 rounded-md bg-gray-100 p-4 text-gray-900">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-gray-800">{description}</p>
      <p className="text-xs text-gray-700">{hint}</p>

      <div className="mt-2 flex flex-col gap-2">
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={handleShowInfo}
          className="text-xs"
        >
          Show Price List info toast
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleToggleSubdomain}
          className="text-xs"
        >
          Toggle subdomain panel
        </Button>
      </div>

      <p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
        Client island · use client
      </p>
    </section>
  );
}
