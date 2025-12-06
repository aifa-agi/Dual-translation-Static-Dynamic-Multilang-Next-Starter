// @/app/[lang]/@rightStatic/(_PRICE_LIST)/(_subfractals)/(_PRICE_LIST_SUBDOMAIN)/(_client)/(_uiclientislands)/price-list-subdomain-starter-client-island.tsx

"use client";

import { useCallback } from "react";
import type { JSX } from "react";

import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  FractalPriceListSubdomainTranslations,
  PriceListSubdomainPageData,
} from "../../(_shared)/(_types)/fractal-price-list-subdomain-types";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type PriceListSubdomainStarterClientIslandProps = {
  translations: FractalPriceListSubdomainTranslations;
  lang?: SupportedLanguage;
  currentPath?: string;
  pageData?: PriceListSubdomainPageData;
};

export function PriceListSubdomainStarterClientIsland(
  props: PriceListSubdomainStarterClientIslandProps,
): JSX.Element {
  const { translations, lang, currentPath, pageData } = props;

  const title =
    pageData?.fractalName ?? "Price List Subdomain · Client Canvas";
  const description =
    pageData?.fractalDescription ??
    "Client-side canvas for the embedded subdomain fractal.";
  const hint =
    pageData?.hint ??
    "Use the button to inspect routing context passed from the parent.";

  const handleShowInfo = useCallback(() => {
    toast.info("Price List Subdomain client demo", {
      description: `Greeting: ${translations.greeting} · lang=${lang ?? "n/a"} · path=${currentPath ?? "n/a"}`,
      duration: 4000,
    });
  }, [currentPath, lang, translations.greeting]);

  return (
    <section className="flex flex-col gap-3 rounded-md bg-gray-200 p-4 text-gray-900">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-indigo-800">{description}</p>
      <p className="text-xs text-indigo-700">{hint}</p>

      <div className="mt-2 flex flex-col gap-2">
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={handleShowInfo}
          className="text-xs"
        >
          Show Subdomain info toast
        </Button>
      </div>

      <p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-indigo-600">
        Client island · Embedded · use client
      </p>
    </section>
  );
}
