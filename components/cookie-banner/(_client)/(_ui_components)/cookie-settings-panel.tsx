//components/cookie-banner/(_client)/(_ui_components)/cookie-settings-panel.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useCookieConsentTranslationSync } from '@/components/cookie-banner/(_shared)/(_translations)/get-cookie-consent-translation';
import { CookieConsent, CookieCategoryConfig } from '@/components/cookie-banner/(_shared)/(_types)/cookie-consent-types';
import { getColorScheme, COOKIE_CATEGORIES } from '@/components/cookie-banner/(_shared)/index';

interface CookieSettingsPanelProps {
  lang: string;
  brandName: string;
  brandLogo: string;
  supportMail: string;
  consent: CookieConsent;
  onToggleCategory: (categoryId: string) => void;
  onClose: () => void;
  onSave: () => void;
  onRejectAll: () => void;
}

export function CookieSettingsPanel({
  lang,
  brandName,
  brandLogo,
  supportMail,
  consent,
  onToggleCategory,
  onClose,
  onSave,
  onRejectAll,
}: CookieSettingsPanelProps) {
  const { t, formatI18n } = useCookieConsentTranslationSync(lang);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Image src={brandLogo} alt={brandName} width={40} height={40} className="rounded" priority />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('cuid_cookie_settings_title')}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatI18n(t('cuid_cookie_settings_subtitle'), { brand: brandName })}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 h-8 w-8 p-0" aria-label="Close">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4 mb-8">
        {COOKIE_CATEGORIES.map(({ id, titleKey, descriptionKey, icon, color }) => {
          const enabled = consent[id];
          const colorScheme = getColorScheme(color);

          const Icon = ({ className }: { className?: string }) => {
            switch (icon) {
              case 'Shield':
                return <svg className={className} role="img" aria-label={t(titleKey)} />;
              case 'BarChart3':
                return <svg className={className} role="img" aria-label={t(titleKey)} />;
              case 'Target':
                return <svg className={className} role="img" aria-label={t(titleKey)} />;
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
                  <h4 id={`${id}-title`} className="font-semibold text-gray-900 dark:text-white">
                    {t(titleKey)}
                  </h4>
                  {id !== 'essential' ? (
                    <button
                      onClick={() => onToggleCategory(id)}
                      className={`w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        enabled ? colorScheme.toggle : 'bg-gray-300 dark:bg-gray-600'
                      } flex items-center px-1`}
                      aria-pressed={enabled}
                      aria-label={`${enabled ? 'Disable' : 'Enable'} ${t(titleKey)}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${enabled ? 'translate-x-6' : ''}`} />
                    </button>
                  ) : (
                    <div className="w-12 h-6 bg-green-600 rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{t(descriptionKey)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          {/* Здесь можно добавить дополнительную информацию или текст */}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={onRejectAll} className="font-medium">
            {t('cuid_cookie_banner_reject_all')}
          </Button>
          <Button
            size="sm"
            onClick={onSave}
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {t('cuid_cookie_settings_save_btn')}
          </Button>
        </div>
      </div>
    </div>
  );
}
