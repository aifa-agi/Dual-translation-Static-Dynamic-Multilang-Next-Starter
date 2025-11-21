// components/cookie-banner/(_client)/(_ui_components)/cookie-banner.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Settings, X } from 'lucide-react';
import { useCookieConsent } from '../(_hooks)/use-cookie-consent';
import { useApplyConsent } from '../(_hooks)/use-apply-consent';
import { getColorScheme, COOKIE_CATEGORIES } from '@/components/cookie-banner/(_shared)/index';
import { useCookieConsentTranslationSync } from '@/components/cookie-banner/(_shared)/(_translations)/get-cookie-consent-translation';
import { SupportedLanguage } from '@/config/translations/translations.config';
import { appConfig } from '@/config/app-config';

interface CookieBannerProps {
  lang: SupportedLanguage;
}

/**
 * CookieBanner component
 *
 * Responsible for rendering the cookie consent banner UI.
 * Uses useCookieConsent hook for state (consent + visibility)
 * and useApplyConsent hook to propagate consent to third-party services.
 */
export function CookieBanner({ lang }: CookieBannerProps) {
  // Hook manages consent state, loading state and banner visibility.
  const {
    consent,
    isLoaded,
    isBannerVisible,
    setConsent,
    saveConsent,
    acceptAll,
    rejectAll,
    hideBanner,
  } = useCookieConsent();

  // Apply consent to Google Consent Mode / Facebook Pixel on changes.
  useApplyConsent(consent);

  // Translation helper for current language.
  const { t, formatI18n } = useCookieConsentTranslationSync(lang);

  // Local state to toggle between compact banner and detailed settings view.
  const [showDetails, setShowDetails] = useState(false);

  // Do not render until consent state is loaded or banner is not supposed to be visible.
  if (!isLoaded || !isBannerVisible) return null;

  const consentExpiryText = formatI18n(
    t('cuid_cookie_consent_expiry_template'),
    { days: 180 }
  );

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {!showDetails ? (
          // -------------------------------------------------------------------
          // Compact banner view
          // -------------------------------------------------------------------
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-shrink-0 mt-1">
                    <Image
                      src={appConfig.logo}
                      alt={appConfig.short_name}
                      width={32}
                      height={32}
                      className="rounded"
                      priority
                    />
                  </div>
                  <h3
                    id="cookie-banner-title"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    {t('cuid_cookie_banner_info_lead')} — {appConfig.short_name}
                  </h3>
                </div>
                <p
                  id="cookie-banner-description"
                  className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  {formatI18n(
                    t('cuid_cookie_banner_info_body'),
                    { site: appConfig.url }
                  )}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>v{consent.version || '1.0'}</span>
                  <span>•</span>
                  <Link
                    href="/privacy-policy"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t('cuid_cookie_footer_privacy_policy')}
                  </Link>
                  <span>•</span>
                  <Link
                    href={`mailto:${appConfig.mailSupport}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t('cuid_cookie_footer_support')}
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 min-w-0 max-sm:w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(true)}
              >
                <Settings className="w-4 h-4 mr-2" />
                {t('cuid_cookie_banner_manage_preferences')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={rejectAll}
              >
                {t('cuid_cookie_banner_reject_all')}
              </Button>
              <Button
                size="sm"
                onClick={acceptAll}
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {t('cuid_cookie_banner_accept_all')}
              </Button>
            </div>
          </div>
        ) : (
          // -------------------------------------------------------------------
          // Detailed settings view
          // -------------------------------------------------------------------
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Image
                  src={appConfig.logo}
                  alt={appConfig.short_name}
                  width={40}
                  height={40}
                  className="rounded"
                  priority
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t('cuid_cookie_settings_title')}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatI18n(
                      t('cuid_cookie_settings_subtitle'),
                      { brand: appConfig.short_name }
                    )}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Close details panel; optionally keep banner visible.
                  setShowDetails(false);
                  // If you also want to fully hide banner on "X", uncomment:
                  // hideBanner();
                }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 h-8 w-8 p-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4 mb-8">
              {COOKIE_CATEGORIES.map(({ id, titleKey, descriptionKey, icon, color }) => {
                const colorScheme = getColorScheme(color);
                const enabled = consent[id];

                // Local icon resolver; you can replace with lucide-react icons if needed.
                const Icon = ({ className }: { className?: string }) => {
                  switch (icon) {
                    case 'Shield':
                      return (
                        <svg
                          className={className}
                          role="img"
                          aria-label={t(titleKey)}
                        />
                      );
                    case 'BarChart3':
                      return (
                        <svg
                          className={className}
                          role="img"
                          aria-label={t(titleKey)}
                        />
                      );
                    case 'Target':
                      return (
                        <svg
                          className={className}
                          role="img"
                          aria-label={t(titleKey)}
                        />
                      );
                    default:
                      return null;
                  }
                };

                return (
                  <div
                    key={id}
                    className={`flex items-start gap-4 p-4 border ${colorScheme.border} rounded-xl hover:${colorScheme.hover} transition-colors`}
                    role="region"
                    aria-labelledby={`${id}-title`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <Icon className={`${colorScheme.text} w-6 h-6`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4
                          id={`${id}-title`}
                          className="font-semibold text-gray-900 dark:text-white"
                        >
                          {t(titleKey)}
                        </h4>
                        {id !== 'essential' && (
                          <button
                            onClick={() =>
                              setConsent({ ...consent, [id]: !enabled })
                            }
                            className={`w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                              enabled
                                ? colorScheme.toggle
                                : 'bg-gray-300 dark:bg-gray-600'
                            } flex items-center px-1`}
                            aria-pressed={enabled}
                            aria-label={`${
                              enabled ? 'Disable' : 'Enable'
                            } ${t(titleKey)}`}
                          >
                            <div
                              className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                                enabled ? 'translate-x-6' : ''
                              }`}
                            />
                          </button>
                        )}
                        {id === 'essential' && (
                          <div className="w-12 h-6 bg-green-600 rounded-full flex items-center justify-end px-1">
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {t(descriptionKey)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span>{consentExpiryText}</span>
                <span>•</span>
                <Link
                  href="/privacy-policy"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t('cuid_cookie_footer_privacy_policy')}
                </Link>
                <span>•</span>
                <Link
                  href={`mailto:${appConfig.mailSupport}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t('cuid_cookie_footer_contact_support')}
                </Link>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={rejectAll}
                  className="font-medium"
                >
                  {t('cuid_cookie_banner_reject_all')}
                </Button>
                <Button
                  size="sm"
                  onClick={() => saveConsent(consent)}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {t('cuid_cookie_settings_save_btn')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
