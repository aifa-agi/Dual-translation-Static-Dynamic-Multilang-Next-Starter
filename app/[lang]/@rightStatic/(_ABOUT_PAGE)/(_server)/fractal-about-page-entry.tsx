// @/app/[lang]/@rightStatic/(_ABOUT_PAGE)/(_server)/fractal-about-page-entry.tsx

import type { JSX } from "react";
import type { SupportedLanguage } from "@/config/translations/translations.config";

import { cn } from "@/lib/utils";
import {
  type FractalAboutPageTranslations,
  type AboutPagePageData,
} from "../(_shared)/(_types)/fractal-about-page-types";
import { getFractalAboutPageTranslation } from "../(_shared)/(_translations)/get-fractal-about-page-translation";

import { AboutPageStarterServerConsumer } from "./(_servercomponents)/about-page-starter-server-consumer";
import { AboutPageStarterClientIsland } from "../(_client)/(_uiclientislands)/about-page-starter-client-island";
import { AboutPageSubdomainEmbeddingSlot } from "../(_subfractals)/(_ABOUT_PAGE_SUBDOMAIN)/about-page-subdomain-embedding-slot";
import { FractalAboutPageDevLabelHandler } from "../(_client)/(_uiclientislands)/fractal-about-page-dev-label-handler";


type FractalAboutPageEntryProps = {
  lang: SupportedLanguage;
  currentPath: string;
  level?: number;
};

export async function FractalAboutPageEntry(
  props: FractalAboutPageEntryProps,
): Promise<JSX.Element> {
  const { lang, currentPath, level = 1 } = props;

  const translations: FractalAboutPageTranslations =
    await getFractalAboutPageTranslation(lang);

  const currentFractalLevel = level || 1;
  const clampedLevel = Math.max(1, Math.min(currentFractalLevel, 20));
  const placeholderCurrentSlot = "rightStatic"
  const placeholderFractalLevel1 = "(_ABOUT_PAGE)"
  const pageData: AboutPagePageData = {
    fractalName: "(_ABOUT_PAGE)",
    fractalPath: `@/app/[lang]/@${placeholderCurrentSlot}/${placeholderFractalLevel1}`,
    fractalLevel: clampedLevel,
    fractalDescription:
      "Minimal Route Fractal for the About page with an embedded subdomain panel.",
    hint:
      "Use the client button to toggle the embedded subdomain fractal, similar to the ARTIFACT FS Inspector.",

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
          <FractalAboutPageDevLabelHandler
            pageData={pageData}
            level={clampedLevel}
          />
        </div>
      )}

      <AboutPageStarterServerConsumer
        translations={translations}
        lang={lang}
        currentPath={currentPath}
        pageData={pageData}
        level={clampedLevel}
      />

      <AboutPageStarterClientIsland
        translations={translations}
        lang={lang}
        currentPath={currentPath}
        pageData={pageData}
      />

      <section
        id="about-subdomain-fractal-container"
        data-visible="false"
        className="mt-4 hidden data-[visible='true']:block"
      >
        <AboutPageSubdomainEmbeddingSlot
          lang={lang}
          currentPath={currentPath}
          level={clampedLevel + 1}
        />
      </section>
    </div>
  );
}

