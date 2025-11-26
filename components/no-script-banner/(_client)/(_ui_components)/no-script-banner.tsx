// components/no-script-banner/no-script-banner.tsx

import type { SupportedLanguage } from '@/config/translations/translations.config';
import { getNoScriptBannerTranslation } from '@/components/no-script-banner/(_shared)/(_translations)/get-no-script-banner-translations';

export default async function NoScriptBanner({
  lang,
}: {
  lang: SupportedLanguage;
}) {
  const t = await getNoScriptBannerTranslation(lang);
  const title = t.title;
  const description = t.description;

  return (
    <noscript>
      <div
        className="fixed inset-x-0 bottom-0 z-50 w-full bg-neutral-900 text-white border-t border-white/20 shadow-[0_-8px_24px_rgba(0,0,0,0.25)]"
        role="region"
        aria-label={title || 'JavaScript disabled notice'}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-white/10 text-sm font-semibold"
              >
                !
              </span>
              <div>
                <strong className="block text-[15px] leading-snug">
                  {title}
                </strong>
                <p className="mt-1 text-[13px] leading-relaxed text-neutral-200/90">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </noscript>
  );
}
