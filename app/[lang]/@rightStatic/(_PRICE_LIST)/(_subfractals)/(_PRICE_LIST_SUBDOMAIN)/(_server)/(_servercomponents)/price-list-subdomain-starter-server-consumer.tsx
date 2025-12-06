// @/app/[lang]/@rightStatic/(_PRICE_LIST)/(_subfractals)/(_PRICE_LIST_SUBDOMAIN)/(_server)/(_servercomponents)/price-list-subdomain-starter-server-consumer.tsx

import type { JSX } from "react";
import type { SupportedLanguage } from "@/config/translations/translations.config";

import type {
  FractalPriceListSubdomainTranslations,
  PriceListSubdomainPageData,
} from "../../(_shared)/(_types)/fractal-price-list-subdomain-types";

type PriceListSubdomainStarterServerConsumerProps = {
  translations: FractalPriceListSubdomainTranslations;
  lang?: SupportedLanguage;
  currentPath?: string;
  pageData?: PriceListSubdomainPageData;
  level?: number;
};

export function PriceListSubdomainStarterServerConsumer(
  props: PriceListSubdomainStarterServerConsumerProps,
): JSX.Element {
  const { translations, lang, currentPath, pageData, level } = props;

  const title =
    pageData?.fractalName ?? "(_PRICE_LIST_SUBDOMAIN) Embedded Fractal";
  const description =
    pageData?.fractalDescription ??
    "Minimal server container showing that embedded fractal translations and dev-level props are wired.";
  const hint =
    pageData?.hint ??
    "Tip: this embedded fractal inherits routing and language from its parent route fractal.";

  return (
    <section className="flex flex-col items-start justify-center gap-2 rounded-md bg-indigo-200 p-4 text-indigo-900">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-indigo-800">{description}</p>
      <p className="text-xs text-indigo-700">{hint}</p>

      <div className="mt-2 text-xs text-indigo-700">
        <div>
          <span className="font-semibold">Greeting: </span>
          <span>{translations.greeting}</span>
        </div>
        <div>
          <span className="font-semibold">Lang: </span>
          <span>{lang ?? "n/a"}</span>
        </div>
        <div>
          <span className="font-semibold">Current path: </span>
          <span>{currentPath ?? "n/a"}</span>
        </div>
        <div>
          <span className="font-semibold">Level: </span>
          <span>{level ?? 2}</span>
        </div>
      </div>

      <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-indigo-600">
        Server container · Embedded · React Server Component
      </p>
    </section>
  );
}
