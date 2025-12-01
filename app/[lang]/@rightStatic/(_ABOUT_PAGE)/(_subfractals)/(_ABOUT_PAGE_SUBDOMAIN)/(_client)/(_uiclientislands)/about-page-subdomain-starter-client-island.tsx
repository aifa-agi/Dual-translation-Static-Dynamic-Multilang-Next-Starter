// @/app/[lang]/@rightStatic/(_ABOUT_PAGE)/subfractals/(_ABOUT_PAGE_SUBDOMAIN)/(_client)/(_uiclientislands)/about-page-subdomain-starter-client-island.tsx

"use client";

import type { SupportedLanguage } from "@/config/translations/translations.config";
import type { FractalAboutPageSubdomainTranslations } from "../../(_shared)/(_types)/fractal-about-page-subdomain-types";

type PageData = {
  fractalName: string;
  fractalDescription: string;
  hint: string;
};

type AboutPageSubdomainStarterClientIslandProps = {
  translations: FractalAboutPageSubdomainTranslations;
  lang?: SupportedLanguage;
  currentPath?: string;
  pageData?: PageData;
  level?: number;
};

export function AboutPageSubdomainStarterClientIsland(
  props: AboutPageSubdomainStarterClientIslandProps,
) {
  const { translations, lang, currentPath, pageData } = props;
  const title = pageData?.fractalName ?? "Embedded Fractal";
  return (
    <section className="flex flex-col gap-3 rounded-md bg-gray-100 p-4 text-gray-900">
      <p className="text-sm font-semibold ">Client component: {title}</p>

    </section>
  );
}
