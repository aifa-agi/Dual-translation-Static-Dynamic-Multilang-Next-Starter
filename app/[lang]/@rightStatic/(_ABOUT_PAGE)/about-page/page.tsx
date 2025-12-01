// @/app/[lang]/@rightStatic/(_ABOUT_PAGE)/about-page/page.tsx

import type { SupportedLanguage } from "@/config/translations/translations.config";
import { FractalAboutPageEntry } from "../(_server)/fractal-about-page-entry";

type PageParams = {
  lang: SupportedLanguage;
};

type PageProps = {
  params: Promise<PageParams>;
};

export const dynamic = "force-static";

export default async function Page(props: PageProps) {
  const params = await props.params;

  const currentSegment = "about-page";
  const { lang } = params;

  const currentPath = `/${lang}/${currentSegment}`;

  return (
    <div className="relative min-h-[60vh] px-4 py-6">
      <div className="h-20" />
      <FractalAboutPageEntry lang={lang} currentPath={currentPath} />
    </div>
  );
}
