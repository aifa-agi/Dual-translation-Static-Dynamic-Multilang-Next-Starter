//components/cookie-banner/(_shared)/(_client)/(_hooks)/use-cookie-consent.ts

/**
 * useCookieConsent Hook
 *
 * Manages cookie consent state and persistence in client components.
 * Provides methods to accept/reject/save preferences and read initial consent.
 *
 * @module use-cookie-consent
 */

'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import type { CookieConsent } from '@/components/cookie-banner/(_shared)/(_types)/cookie-consent-types';
import {
  COOKIE_CONSENT_KEY,
  CONSENT_VERSION,
  CONSENT_EXPIRY_DAYS,
  isConsentExpired,
  isConsentVersionValid,
  validateCookieConsent,
  safeParseCookieConsent,
  debugLog,
} from '@/components/cookie-banner/(_shared)/index';

/**
 * Default consent state if no cookie is set.
 * Essential cookies are always true, analytics and marketing false.
 */
const DEFAULT_CONSENT: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
  timestamp: Date.now(),
  version: CONSENT_VERSION,
};

/**
 * useCookieConsent hook - manages consent state in client, persists in cookies.
 *
 * @returns
 *   consent - current consent state object
 *   isLoaded - true after initial load
 *   setConsent - update consent object
 *   acceptAll - accept all toggleable categories
 *   rejectAll - reject all toggleable categories
 *   saveConsent - save current consent to cookie
 */
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>(DEFAULT_CONSENT);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const cookie = Cookies.get(COOKIE_CONSENT_KEY);
      if (!cookie) {
        debugLog('No consent cookie found, showing banner');
        setConsent(DEFAULT_CONSENT);
        setIsLoaded(true);
        return;
      }

      const parsed = JSON.parse(cookie);
      const validation = safeParseCookieConsent(parsed);

      if (!validation.success) {
        debugLog('Consent cookie invalid, resetting to default', validation.error);
        setConsent(DEFAULT_CONSENT);
        setIsLoaded(true);
        return;
      }

      if (!validation.data) {
        debugLog('Consent cookie missing data, resetting to default');
        setConsent(DEFAULT_CONSENT);
        setIsLoaded(true);
        return;
      }

      const validConsent = validation.data;

      if (
        isConsentExpired(validConsent.timestamp) ||
        !isConsentVersionValid(validConsent.version)
      ) {
        debugLog('Consent expired or version mismatch, resetting to default');
        setConsent(DEFAULT_CONSENT);
        setIsLoaded(true);
        return;
      }

      setConsent(validConsent);
      setIsLoaded(true);
    } catch (e) {
      debugLog('Error parsing consent cookie, resetting to default', e);
      setConsent(DEFAULT_CONSENT);
      setIsLoaded(true);
    }
  }, []);

  /**
   * Save the current consent object to cookie and update state.
   */
  function saveConsent(newConsent: CookieConsent) {
    try {
      newConsent.timestamp = Date.now();
      newConsent.version = CONSENT_VERSION;
      validateCookieConsent(newConsent);
      Cookies.set(COOKIE_CONSENT_KEY, JSON.stringify(newConsent), {
        expires: CONSENT_EXPIRY_DAYS,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
      setConsent(newConsent);
      debugLog('Consent saved', newConsent);
    } catch (error) {
      debugLog('Failed to save consent', error);
    }
  }

  /**
   * Accept all toggleable cookie categories
   */
  function acceptAll() {
    const newConsent: CookieConsent = {
      ...consent,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    saveConsent(newConsent);
  }

  /**
   * Reject all toggleable cookie categories
   */
  function rejectAll() {
    const newConsent: CookieConsent = {
      ...consent,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    saveConsent(newConsent);
  }

  return {
    consent,
    isLoaded,
    setConsent,
    saveConsent,
    acceptAll,
    rejectAll,
  };
}
