// app/[lang]/@rightStatic/(_PRICE_LIST)/(_server)/fractal-price-list-entry.tsx

import type { JSX } from "react";
import type { SupportedLanguage } from "@/config/translations/translations.config";

import { cn } from "@/lib/utils";
import {
  type FractalPriceListTranslations,
  type PriceListPageData,
} from "../(_shared)/(_types)/fractal-price-list-types";
import { getFractalPriceListTranslation } from "../(_shared)/(_translations)/get-fractal-price-list-translation";

import { PriceListStarterServerConsumer } from "./(_servercomponents)/price-list-starter-server-consumer";
import { PriceListStarterClientIsland } from "../(_client)/(_uiclientislands)/price-list-starter-client-island";
import { PriceListSubdomainEmbeddingSlot } from "../(_subfractals)/(_PRICE_LIST_SUBDOMAIN)/price-list-subdomain-embedding-slot";
import { FractalPriceListDevLabelHandler } from "../(_client)/(_uiclientislands)/fractal-price-list-dev-label-handler";

type FractalPriceListEntryProps = {
  lang: SupportedLanguage;
  currentPath: string;
  level?: number;
};

export async function FractalPriceListEntry(
  props: FractalPriceListEntryProps,
): Promise<JSX.Element> {
  const { lang, currentPath, level = 1 } = props;

  const translations: FractalPriceListTranslations =
    await getFractalPriceListTranslation(lang);

  const currentFractalLevel = level || 1;
  const clampedLevel = Math.max(1, Math.min(currentFractalLevel, 20));

  const placeholderCurrentSlot = "rightStatic";
  const fractalsSeparador = "(_subfractals)";
  const fractalName = "PRICE_LIST";
  const fractalDescription =
    "Minimal Route Fractal for the Price List page with an embedded subdomain panel.";
  const hint =
    "Use the client button to toggle the embedded subdomain fractal.";

  const placeholderFractalLevel1 = "(_PRICE_LIST)";

  const pageData: PriceListPageData = {
    fractalName: fractalName,
    fractalPath: `@/app/[lang]/@${placeholderCurrentSlot}/${placeholderFractalLevel1}`,
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
          <FractalPriceListDevLabelHandler
            pageData={pageData}
            level={clampedLevel}
          />
        </div>
      )}

      <PriceListStarterServerConsumer
        translations={translations}
        lang={lang}
        currentPath={currentPath}
        pageData={pageData}
        level={clampedLevel}
      />

      <PriceListStarterClientIsland
        translations={translations}
        lang={lang}
        currentPath={currentPath}
        pageData={pageData}
      />

      <section
        id="price-list-subdomain-fractal-container"
        data-visible="false"
        className="mt-4 hidden data-[visible='true']:block"
      >
        <PriceListSubdomainEmbeddingSlot
          translations={translations}
          lang={lang}
          currentPath={currentPath}
          pageData={pageData}
          level={clampedLevel + 1}
        />
      </section>
    </div>
  );
}
