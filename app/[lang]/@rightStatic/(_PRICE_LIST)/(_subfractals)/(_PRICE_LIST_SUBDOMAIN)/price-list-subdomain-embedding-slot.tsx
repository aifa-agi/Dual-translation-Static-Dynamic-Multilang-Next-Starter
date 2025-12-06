// @/app/[lang]/@rightStatic/(_PRICE_LIST)/(_subfractals)/(_PRICE_LIST_SUBDOMAIN)/price-list-subdomain-embedding-slot.tsx

import type { ReactElement } from "react";

import {
  FractalPriceListSubdomainEntry,
  type PriceListSubdomainFractalEntryProps,
} from "./(_server)/fractal-price-list-subdomain-entry";
import type { SupportedLanguage } from "@/config/translations/translations.config";
import type {
  PriceListPageData,
  FractalPriceListTranslations,
} from "../../(_shared)";

export type PriceListSubdomainEmbeddingSlotProps = {
  translations: FractalPriceListTranslations;
  lang: SupportedLanguage;
  currentPath?: string;
  pageData?: PriceListPageData;
  level?: number;
};

export async function PriceListSubdomainEmbeddingSlot(
  props: PriceListSubdomainEmbeddingSlotProps,
): Promise<ReactElement> {
  const { lang, currentPath, level } = props;

  const entryProps: PriceListSubdomainFractalEntryProps = {
    lang,
    currentPath: currentPath ?? "",
    level,
  };

  return FractalPriceListSubdomainEntry(entryProps);
}
