""// @/app/(lang)/@left/(_ARTIFACT)/artifact/page.tsx
import type { SupportedLanguage } from "@/config/translations/translations.config";
import { FractalArtifactEntry } from "../(_server)/fractal-artifact-entry";

type PageParams = {
  lang: SupportedLanguage;
};

type PageProps = {
  params: Promise<PageParams>;
};

export const dynamic = "force-dynamic";

export default async function Page(props: PageProps) {
  const params = await props.params;
  const { lang } = params;

  const currentSegment = "artifact";
  const currentPath = `/${lang}/left/${currentSegment}`;

  return (
    <div className="relative min-h-[60vh] px-4 py-6">
       <div className="h-20" />
      <FractalArtifactEntry lang={lang} currentPath={currentPath} />
    </div>
  );
}
