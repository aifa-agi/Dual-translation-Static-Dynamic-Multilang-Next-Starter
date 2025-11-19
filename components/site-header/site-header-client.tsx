"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MainNav } from "@/components/navigation-menu/main-nav";
import { GitHubLink } from "@/components/github-link";
import { ModeSwitcher } from "@/components/mode-switcher";
import { MobileNav } from "@/components/navigation-menu/mobile-nav";
import { AuthButton } from "@/components/site-header/auth-button";
import { appConfig } from "@/config/app-config";
import { getContentData } from "@/config/menu/content-data";
import { initAuthState, useAuth } from "@/app/[lang]/@left/(_AUTH)/login/(_client)/(_hooks)/use-auth-state";
import { usePathname } from "next/navigation";
import { MobailCloseChatButton } from "./mobail-close-chat-button";
import dynamic from "next/dynamic";
import { SupportedLanguage } from "@/config/translations/translations.config";

import { useMediaQuery } from "@/hooks/use-media-query";
import LanguageSwitcher from "./language-switcher";

interface SiteHeaderClientProps {
  initialAuth: boolean;
  lang: SupportedLanguage;
}

export function SiteHeaderClient({ initialAuth, lang }: SiteHeaderClientProps) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const [shouldShowCloseChat, setShouldShowCloseChat] = React.useState(false);

  // Получаем перевод контента для текущего языка
  const { categories } = React.useMemo(() => getContentData(lang), [lang]);

  const PWAInstallPrompt = dynamic(
    () => import('@/components/pwa-install-prompt').then(mod => mod.PWAInstallPrompt),
    { ssr: false }
  );

  // Адаптивность для переключателя языка
  const isDesktop = useMediaQuery('(min-width: 640px)'); // sm breakpoint

  React.useEffect(() => {
    const update = () => {
      const current = typeof window !== "undefined" ? window.location.pathname : pathname;
      setShouldShowCloseChat(current.includes("interception_chat"));
    };

    update();

    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, [pathname]);

  React.useEffect(() => {
    initAuthState(initialAuth);
  }, [initialAuth]);

  if (!lang) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-100">
      <div className="container px-6 mt-4">
        <div className="mx-auto rounded-full border border-white/10 bg-black/80 backdrop-blur-sm">
          <div className="flex h-12 items-center justify-between px-2">

            {/* Left section - Logo and Navigation */}
            <div className="flex items-center gap-3">
              {!isAuthenticated ? (
                <Link href={`/${lang}/home`} className="flex items-center gap-2">
                  <Image
                    src={appConfig.logo}
                    alt={`${appConfig.name} image`}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="inline-block text-sm font-semibold text-white md:text-base">
                    {appConfig.short_name}
                  </span>
                </Link>
              ) : (
                <Link href={`/${lang}/`} className="flex items-center gap-2">
                  <Image
                    src={appConfig.logo}
                    alt={`${appConfig.name} image`}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="inline-block text-sm font-semibold text-white md:text-base">
                    {appConfig.short_name}
                  </span>
                </Link>
              )}

              {/* Navigation - скрывается при аутентификации */}
              {!isAuthenticated && (
                <>
                  <div className="hidden h-6 w-px bg-white/20 lg:block" />
                  <MainNav lang={lang} items={categories} className="hidden lg:flex" />
                </>
              )}
            </div>

            {/* Right section - Controls */}
            <div className="flex items-center gap-2">

              {/* GitHub и переключатель темы */}
              <div className="hidden sm:flex">
                <GitHubLink />
              </div>
              <div className="hidden sm:flex">
                <ModeSwitcher />
              </div>


              <div className="hidden sm:flex">
                <LanguageSwitcher currentLang={lang} variant="desktop" />
              </div>




              {!isAuthenticated && shouldShowCloseChat ? (
                <MobailCloseChatButton />
              ) : (
                <AuthButton initialAuth={initialAuth} lang={lang} />
              )}
              <div className="flex sm:hidden">
                <LanguageSwitcher currentLang={lang} variant="mobile" />
              </div>

              {!isAuthenticated && (
                <MobileNav lang={lang} categories={categories} className="flex lg:hidden" />
              )}
            </div>
          </div>
        </div>
      </div>

      {process.env.NODE_ENV === "production" && <PWAInstallPrompt />}
    </header>
  );
}
