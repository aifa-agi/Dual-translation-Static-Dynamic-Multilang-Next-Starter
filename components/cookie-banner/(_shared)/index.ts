/**
 * Shared Exports Index
 * 
 * Central export point for all shared modules in cookie consent fractal.
 * Enables clean and simple imports throughout project.
 * 
 * @module _shared/index
 */

// Types
export type {
  CookieConsent,
  CookieCategoryConfig,
  CookieCategory,
  CookieConsentTranslationKeys,
  CookieConsentTranslations,
  CookieConsentTranslationData,
  SaveConsentPayload,
  SaveConsentResult,
  TranslationParams,
} from './(_types)/cookie-consent-types';

// Translations
export {
  getCookieConsentTranslation,
  useCookieConsentTranslation,
  useCookieConsentTranslationSync,
} from './(_translations)/get-cookie-consent-translation';

// Config
export {
  COOKIE_CATEGORIES,
  getCategoryConfig,
  getToggleableCategories,
  getDefaultConsentState,
  COLOR_SCHEMES,
  getColorScheme,
  ANIMATION_CONFIG,
  BANNER_CONFIG,
  THIRD_PARTY_CONFIG,
  hasAnalyticsConfig,
  hasMarketingConfig,
  hasAnyThirdPartyConfig,
  A11Y_CONFIG,
} from './(_config)/cookie-consent-config';

// Constants
export {
  COOKIE_CONSENT_KEY,
  CONSENT_STATE_KEY,
  BANNER_SHOWN_KEY,
  CONSENT_VERSION,
  isConsentVersionValid,
  CONSENT_EXPIRY_DAYS,
  CONSENT_EXPIRY_MS,
  isConsentExpired,
  getConsentExpiryDate,
  COOKIE_CONFIG,
  GOOGLE_CONSENT_DEFAULTS,
  FACEBOOK_CONSENT_DEFAULTS,
  GTM_EVENTS,
  TIMING,
  MIN_CONSENT_TIMESTAMP,
  isValidConsentTimestamp,
  DEV_FLAGS,
  debugLog,
} from './(_constants)/cookie-constants';

// Schema
export {
  CookieConsentSchema,
  validateCookieConsent,
  safeParseCookieConsent,
} from './(_schemas)/cookie-consent-schema';
