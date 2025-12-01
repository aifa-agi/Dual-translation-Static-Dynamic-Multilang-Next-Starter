// app/[lang]/@rightStatic/(_ABOUT_PAGE)/subfractals/(_ABOUT_PAGE_SUBDOMAIN)/about-page-subdomain-embedding-slot.tsx

import type { ReactElement } from "react";

import {
  FractalAboutPageSubdomainEntry,
  type AboutPageSubdomainFractalEntryProps,
} from "./(_server)/fractal-about-page-subdomain-entry";
import { SupportedLanguage } from "@/config/translations/translations.config";

export type AboutPageSubdomainEmbeddingSlotProps = {
  lang: SupportedLanguage;
  currentPath?: string;
  level?: number;
};

export async function AboutPageSubdomainEmbeddingSlot(
  props: AboutPageSubdomainEmbeddingSlotProps,
): Promise<ReactElement> {
  const { lang, currentPath, level } = props;

  const entryProps: AboutPageSubdomainFractalEntryProps = {
    lang,
    currentPath: currentPath ?? "",
    level,
  };

  // Thin connector: no translations or data loading here, only delegation to FractalEntry.
  return FractalAboutPageSubdomainEntry(entryProps);
}
