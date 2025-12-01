// @/app/[lang]/@rightStatic/(_ABOUT_PAGE)/subfractals/(_ABOUT_PAGE_SUBDOMAIN)/(_server)/(_servercomponents)/about-page-subdomain-starter-server-consumer.tsx

import type { SupportedLanguage } from "@/config/translations/translations.config";
import type { FractalAboutPageSubdomainTranslations } from "../../(_shared)/(_types)/fractal-about-page-subdomain-types";

type PageData = {
  fractalName: string;
  fractalDescription: string;
  hint: string;
};

type AboutPageSubdomainStarterServerConsumerProps = {
  translations: FractalAboutPageSubdomainTranslations;
  lang?: SupportedLanguage;
  currentPath?: string;
  pageData?: PageData;
  level?: number;
};

export function AboutPageSubdomainStarterServerConsumer(
  props: AboutPageSubdomainStarterServerConsumerProps,
) {
  const { translations, lang, currentPath, pageData } = props;

  const title = pageData?.fractalName ?? "Embedded Fractal";

  return (
    <section className="flex flex-col gap-3 rounded-md bg-gray-100 p-4 text-gray-900">
      <p className="text-sm font-semibold ">Server component: {title}</p>

    </section>
  );
}
