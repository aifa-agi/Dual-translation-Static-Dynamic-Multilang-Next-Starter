// components/aifa-footer/aifa-footer.tsx

import { appConfig } from "@/config/app-config";
import { GitHubLink } from "@/components/github-link";
import { ModeSwitcher } from "@/components/mode-switcher";
import type { SupportedLanguage } from "@/config/translations/translations.config";
import { getFooterTranslation } from "./(_shared)";

export default async function AifaFooter({
  lang,
}: {
  lang: SupportedLanguage;
}) {
  // Fetch translations for current language
  const t = await getFooterTranslation(lang);
  const CURRENT_YEAR = new Date().getFullYear();

  return (
    <footer className="p-2 text-xs text-muted-foreground border-t border-white/10 bg-black/80 text-white/70">
      {/* Desktop version */}
      <div className="hidden sm:flex w-full flex-row gap-1 justify-center items-center">
        <div>{t.allRightsReserved}</div>
        <div>{CURRENT_YEAR}</div>
        <div>
          ©{" "}
          <a
            href="https://aifa.dev"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
          >
            {appConfig.short_name}{" "}
          </a>
        </div>
        <div>{t.enterpriseGradeStarter}</div>
      </div>

      {/* Mobile version */}
      <div className="flex sm:hidden w-full flex-row gap-1 justify-between items-center px-2">
        <div />
        <div>
          ©{" "}
          <a
            href="https://aifa.dev"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
          >
            {appConfig.short_name}{" "}
          </a>
        </div>
        <div>
          <GitHubLink />
          <ModeSwitcher />
        </div>
      </div>
    </footer>
  );
}
