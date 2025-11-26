// app/[lang]/@rightStatic/(_PUBLIC)/(_HOME)/home/page.tsx

import type { SupportedLanguage } from '@/config/translations/translations.config';
import { FractalEntry } from './(_server)/fractal-entry';


type PageParams = { lang: SupportedLanguage };
type PageSearchParams = { [key: string]: string | string[] | undefined };

type PageProps = {
  params: Promise<PageParams>;
  searchParams: Promise<PageSearchParams>;
};

// export const dynamic = 'force-static';

export default async function Page(props: PageProps) {
  const { params, searchParams } = props;

  // Generate current segment name, for example only : home 
  const currentSegment = "home"
  const { lang } = await params;
  const search = await searchParams;
console.log("search ",search )
  const queryString = new URLSearchParams(
    Object.entries(search).reduce<Record<string, string>>((acc, [key, value]) => {
      if (typeof value === 'string') acc[key] = value;
      return acc;
    }, {}),
  ).toString();

  // Add current segment 
  const basePath = `/${lang}/${currentSegment}`;
  const currentPath = queryString ? `${basePath}?${queryString}` : basePath;

  return (
    <div className='relative'>
      <div className="h-20" />
      <FractalEntry lang={lang} currentPath={currentPath} searchParams={search} />
    </div>
  );
}