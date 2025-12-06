// @/app/[lang]/@rightStatic/(_PRICE_LIST)/(_subfractals)/(_PRICE_LIST_SUBDOMAIN)/(_server)/fractal-price-list-subdomain-entry.tsx

import type { JSX } from "react";
import type { SupportedLanguage } from "@/config/translations/translations.config";

import { cn } from "@/lib/utils";
import type {
  FractalPriceListSubdomainTranslations,
  PriceListSubdomainPageData,
} from "../(_shared)/(_types)/fractal-price-list-subdomain-types";
import { getFractalPriceListSubdomainTranslation } from "../(_shared)/(_translations)/get-price-list-subdomain-translation";


import { PriceListSubdomainStarterClientIsland } from "../(_client)/(_uiclientislands)/price-list-subdomain-starter-client-island";
import { FractalPriceListSubdomainDevLabelHandler } from "../(_client)/(_uiclientislands)/fractal-price-list-subdomain-dev-label-handler";
import { PriceListSubdomainStarterServerConsumer } from "./(_servercomponents)/price-list-subdomain-starter-server-consumer";

export type PriceListSubdomainFractalEntryProps = {
  lang: SupportedLanguage;
  currentPath: string;
  level?: number;
};

export async function FractalPriceListSubdomainEntry(
  props: PriceListSubdomainFractalEntryProps,
): Promise<JSX.Element> {
  const { lang, currentPath, level = 2 } = props;

  const translations: FractalPriceListSubdomainTranslations =
    await getFractalPriceListSubdomainTranslation(lang);

  const currentFractalLevel = level || 2;
  const clampedLevel = Math.max(1, Math.min(currentFractalLevel, 20));

  const fractalName = "PRICE_LIST_SUBDOMAIN";
  const fractalDescription =
    "Minimal Embedded Fractal for the Price List subdomain panel.";
  const hint =
    "This embedded fractal inherits routing and language from its parent route fractal.";

  const pageData: PriceListSubdomainPageData = {
    fractalName: fractalName,
    fractalPath: `@/app/[lang]/@rightStatic/(_PRICE_LIST)/(_subfractals)/(_PRICE_LIST_SUBDOMAIN)`,
    fractalLevel: clampedLevel,
    fractalDescription: fractalDescription,
    hint: hint,
  };

  const isDevMode = process.env.NODE_ENV === "development";

  return (
    <div
      className={cn(
        "aifa-fractal-container flex flex-col gap-2 rounded-lg transition-all duration-200",
        isDevMode && `fractal-level-${clampedLevel}`,
      )}
      style={{ zIndex: clampedLevel * 100 }}
    >
      {isDevMode && (
        <div className="fractal-dev-tools">
          <FractalPriceListSubdomainDevLabelHandler
            pageData={pageData}
            level={clampedLevel}
          />
        </div>
      )}

      <PriceListSubdomainStarterServerConsumer
        translations={translations}
        lang={lang}
        currentPath={currentPath}
        pageData={pageData}
        level={clampedLevel}
      />

      <PriceListSubdomainStarterClientIsland
        translations={translations}
        lang={lang}
        currentPath={currentPath}
        pageData={pageData}
      />

      <p className="mt-4 text-xs text-indigo-500 text-center">
        Minimal Embedded fractal: (_PRICE_LIST_SUBDOMAIN)/(_server)/fractal-price-list-subdomain-entry.tsx
      </p>
    </div>
  );
}
