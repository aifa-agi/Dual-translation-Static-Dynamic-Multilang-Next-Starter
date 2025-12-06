// app/[lang]/@rightStatic/(_PRICE_LIST)/price-list/page.tsx

import type { SupportedLanguage } from "@/config/translations/translations.config";
import { FractalPriceListEntry } from "../(_server)/fractal-price-list-entry";

type PageParams = {
  lang: SupportedLanguage;
};

type PageProps = {
  params: Promise<PageParams>;
};

export default async function Page(props: PageProps) {
  const params = await props.params;

  const currentSegment = "price-list";
  const { lang } = params;

  const currentPath = `/${lang}/${currentSegment}`;

  return (
    <div className="relative min-h-[60vh] px-4 py-6">
      <div className="h-20" />
      <FractalPriceListEntry lang={lang} currentPath={currentPath} />
    </div>
  );
}
