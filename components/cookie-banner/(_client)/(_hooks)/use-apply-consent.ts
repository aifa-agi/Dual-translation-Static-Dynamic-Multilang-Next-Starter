// components/cookie-banner/(_client)/_hooks/use-apply-consent.ts

'use client';

/**
 * useApplyConsent Hook
 *
 * Applies user cookie consent preferences to third-party scripts.
 * Controls Google Consent Mode V2 and Facebook Pixel consent states.
 */

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
    // Guard for server-side rendering
    if (typeof window === 'undefined') return;

    // -----------------------------------------------------------------------
    // Google Consent Mode V2
    // -----------------------------------------------------------------------
    if (THIRD_PARTY_CONFIG.enableGoogleConsentMode && window.gtag) {
      const analyticsStorage = consent.analytics ? 'granted' : 'denied';
      const adStorage = consent.marketing ? 'granted' : 'denied';

      window.gtag('consent', 'update', {
        analytics_storage: analyticsStorage,
        ad_storage: adStorage,
      });

      if (consent.analytics && THIRD_PARTY_CONFIG.googleAnalyticsId) {
        window.gtag('config', THIRD_PARTY_CONFIG.googleAnalyticsId);
      }

      debugLog('Google Consent Mode updated', {
        analytics_storage: analyticsStorage,
        ad_storage: adStorage,
      });
    }

    // -----------------------------------------------------------------------
    // Facebook Pixel Consent
    // -----------------------------------------------------------------------
    if (THIRD_PARTY_CONFIG.enableFacebookConsent && window.fbq) {
      if (consent.marketing) {
        window.fbq('consent', 'grant');
      } else {
        window.fbq('consent', 'revoke');
      }

      debugLog('Facebook Pixel consent updated', {
        marketing: consent.marketing,
      });
    }
  }, [consent]);
}
