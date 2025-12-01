// @/app/[lang]/@rightStatic/(_ABOUT_PAGE)/subfractals/(_ABOUT_PAGE_SUBDOMAIN)/(_server)/fractal-about-page-subdomain-entry.tsx

import type { ReactElement } from "react";
import type { SupportedLanguage } from "@/config/translations/translations.config";

import { getFractalAboutPageSubdomainTranslation } from "../(_shared)/(_translations)/get-about-page-subdomain-translation";
import type { FractalAboutPageSubdomainTranslations } from "../(_shared)/(_types)/fractal-about-page-subdomain-types";

import { AboutPageSubdomainStarterServerConsumer } from "./(_servercomponents)/about-page-subdomain-starter-server-consumer";
import { AboutPageSubdomainStarterClientIsland } from "../(_client)/(_uiclientislands)/about-page-subdomain-starter-client-island";
import { FractalAboutPageSubdomainDevLabelHandler } from "../(_client)/(_uiclientislands)/fractal-about-page-subdomain-dev-label-handler";
import { cn } from "@/lib/utils";

export type AboutPageSubdomainFractalEntryProps = {
  lang: SupportedLanguage;
  currentPath: string;
  level?: number;
};

export async function FractalAboutPageSubdomainEntry(
  props: AboutPageSubdomainFractalEntryProps,
): Promise<ReactElement> {
  const { lang, currentPath, level } = props;

  const translations: FractalAboutPageSubdomainTranslations =
    await getFractalAboutPageSubdomainTranslation(lang);

  const currentLevel = level ?? 1;
  const clampedLevel = Math.max(1, Math.min(currentLevel, 20));
  const placeholderCurrentSlot = "rightStatic"
  const placeholderFractalLevel1 = "(_ABOUT_PAGE)"
  const placeholderFractalLevel2 = "(_ABOUT_PAGE_SUBDOMAIN)"
  const fractalsSeparador = "(_subfractals)"
  
  const pageData = {
    fractalName: "ABOUT_PAGE_SUBDOMAIN",
    fractalDescription:
      "Minimal embedded sub-fractal for the About page subdomain.",
    hint:
      "Server and client components render only their canonical labels for this embedded fractal.",
    fractalPath:
      `@/app/[lang]/@${placeholderCurrentSlot}/${placeholderFractalLevel1}/${fractalsSeparador}/${placeholderFractalLevel2}`,
  };

  const isDevMode = process.env.NODE_ENV === "development";

  return (
    <div
      className={cn(
        "aifa-fractal-container flex  flex-col gap-4 rounded-lg transition-all duration-400 ",
        isDevMode && `fractal-level-${clampedLevel}`,
      )}
      style={{ zIndex: clampedLevel * 100 }}
    >
      {isDevMode && (
        <div className="fractal-dev-tools">
          <FractalAboutPageSubdomainDevLabelHandler
            pageData={pageData}
            level={clampedLevel}
          />
        </div>
      )}

      <AboutPageSubdomainStarterServerConsumer
        translations={translations}
        lang={lang}
        currentPath={currentPath}
        pageData={pageData}
        level={clampedLevel}
      />


      <AboutPageSubdomainStarterClientIsland
        translations={translations}
        lang={lang}
        currentPath={currentPath}
        pageData={pageData}
        level={clampedLevel}
      />

    </div>
  );
}
