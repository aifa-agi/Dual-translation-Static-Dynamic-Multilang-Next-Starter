//components/cookie-banner/(_shared)/(_client)/use-apply-consent.ts

'use client';

import { useEffect } from 'react';
import type { CookieConsent } from '@/components/cookie-banner/(_shared)/(_types)/cookie-consent-types';
import {
  THIRD_PARTY_CONFIG,
  debugLog,
} from '@/components/cookie-banner/(_shared)/index';

/**
 * Hook to apply cookie consent preferences to Google Analytics and Facebook Pixel.
 * 
 * @param consent - Current user consent object
 */
export function useApplyConsent(consent: CookieConsent) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Google Consent Mode
    if (THIRD_PARTY_CONFIG.enableGoogleConsentMode && window.gtag) {
      const analyticsStorage = consent.analytics ? 'granted' : 'denied';

      window.gtag('consent', 'update', {
        analytics_storage: analyticsStorage,
        ad_storage: consent.marketing ? 'granted' : 'denied',
      });

      if (consent.analytics && THIRD_PARTY_CONFIG.googleAnalyticsId) {
        window.gtag('config', THIRD_PARTY_CONFIG.googleAnalyticsId);
      }

      debugLog('Google Consent Mode updated', {
        analytics_storage: analyticsStorage,
        ad_storage: consent.marketing ? 'granted' : 'denied',
      });
    }

    // Facebook Pixel
    if (THIRD_PARTY_CONFIG.enableFacebookConsent && window.fbq) {
      if (consent.marketing) {
        window.fbq('consent', 'grant');
      } else {
        window.fbq('consent', 'revoke');
      }
      debugLog('Facebook Pixel consent updated', { marketing: consent.marketing });
    }
  }, [consent]);
}
