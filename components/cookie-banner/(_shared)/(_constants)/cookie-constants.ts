/**
 * Cookie Consent Constants
 * 
 * Global constants for cookie consent system.
 * Defines cookie keys, versions, expiry, and SameSite policies.
 * 
 * @module cookie-constants
 */

// ============================================================================
// COOKIE STORAGE KEYS
// ============================================================================

/**
 * Cookie name for storing user consent preferences
 * Stored in browser cookies with user's consent choices
 */
export const COOKIE_CONSENT_KEY = 'cookie-consent' as const;

/**
 * LocalStorage key for temporary consent state
 * Used for client-side state management before saving to cookies
 */
export const CONSENT_STATE_KEY = 'cookie-consent-state' as const;

/**
 * SessionStorage key for banner visibility state
 * Tracks if banner was shown in current session
 */
export const BANNER_SHOWN_KEY = 'cookie-banner-shown' as const;

// ============================================================================
// CONSENT VERSION
// ============================================================================

/**
 * Current consent version
 * 
 * Increment this when:
 * - Cookie policy changes
 * - New cookie categories are added
 * - Legal requirements update
 * - Third-party integrations change
 * 
 * Format: YYYY.MINOR (e.g., 2025.1, 2025.2)
 * 
 * When version changes, users will be prompted to re-consent.
 */
export const CONSENT_VERSION = '2025.2' as const;

/**
 * Check if stored consent version matches current version
 * 
 * @param storedVersion - Version from stored consent
 * @returns true if versions match, false if re-consent needed
 */
export function isConsentVersionValid(storedVersion: string): boolean {
  return storedVersion === CONSENT_VERSION;
}

// ============================================================================
// COOKIE EXPIRY
// ============================================================================

/**
 * Consent expiry in days
 * After this period, user will be prompted to re-consent
 * 
 * GDPR recommendation: 12 months (365 days)
 * Current setting: 6 months (180 days)
 */
export const CONSENT_EXPIRY_DAYS = 180 as const;

/**
 * Convert expiry days to milliseconds
 * Used for timestamp calculations
 */
export const CONSENT_EXPIRY_MS = CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

/**
 * Check if consent has expired
 * 
 * @param timestamp - Unix timestamp when consent was given
 * @returns true if consent has expired
 */
export function isConsentExpired(timestamp: number): boolean {
  return Date.now() - timestamp > CONSENT_EXPIRY_MS;
}

/**
 * Get consent expiry date
 * 
 * @param timestamp - Unix timestamp when consent was given
 * @returns Expiry date object
 */
export function getConsentExpiryDate(timestamp: number): Date {
  return new Date(timestamp + CONSENT_EXPIRY_MS);
}

// ============================================================================
// COOKIE CONFIGURATION
// ============================================================================

/**
 * Cookie configuration for storing consent
 * 
 * SameSite: 'Lax'
 * - Allows cookie on top-level navigation (e.g., clicking a link)
 * - Prevents CSRF attacks
 * - More permissive than 'Strict' but still secure
 * 
 * Secure: true in production
 * - Cookie only sent over HTTPS in production
 * - Allows HTTP in development for testing
 * 
 * Path: '/'
 * - Cookie available across entire site
 */
export const COOKIE_CONFIG = {
  /** Cookie name */
  name: COOKIE_CONSENT_KEY,
  /** Cookie expiry in days */
  maxAge: CONSENT_EXPIRY_DAYS,
  /** Cookie path (site-wide) */
  path: '/',
  /** SameSite policy */
  sameSite: 'lax' as const,
  /** Secure flag (HTTPS only in production) */
  secure: process.env.NODE_ENV === 'production',
  /** HttpOnly flag (not accessible via JavaScript) - FALSE for client-side access */
  httpOnly: false,
} as const;

// ============================================================================
// GOOGLE CONSENT MODE V2 DEFAULTS
// ============================================================================

/**
 * Google Consent Mode V2 default consent states
 * These are set before user makes a choice
 * 
 * Reference: https://developers.google.com/tag-platform/security/guides/consent
 */
export const GOOGLE_CONSENT_DEFAULTS = {
  /** Analytics and measurement cookies */
  analytics_storage: 'denied',
  /** Advertising cookies */
  ad_storage: 'denied',
  /** Ad personalization */
  ad_user_data: 'denied',
  /** Ad personalization for remarketing */
  ad_personalization: 'denied',
  /** Functionality cookies (always granted for essential) */
  functionality_storage: 'granted',
  /** Personalization cookies */
  personalization_storage: 'denied',
  /** Security cookies (always granted for essential) */
  security_storage: 'granted',
  /** Wait time for consent (ms) */
  wait_for_update: 500,
} as const;

// ============================================================================
// FACEBOOK CONSENT API DEFAULTS
// ============================================================================

/**
 * Facebook Pixel consent defaults
 * Set before user consent
 */
export const FACEBOOK_CONSENT_DEFAULTS = {
  /** Initial consent state */
  consent: 'revoke' as const,
  /** Auto-config disabled (manual control) */
  autoConfig: false,
} as const;

// ============================================================================
// DATA LAYER EVENTS
// ============================================================================

/**
 * Google Tag Manager / dataLayer event names
 * Used for tracking consent changes
 */
export const GTM_EVENTS = {
  /** Fired when user updates consent */
  CONSENT_UPDATE: 'cookie_consent_updated',
  /** Fired when user accepts all */
  CONSENT_ACCEPT_ALL: 'cookie_consent_accept_all',
  /** Fired when user rejects all */
  CONSENT_REJECT_ALL: 'cookie_consent_reject_all',
  /** Fired when user saves custom preferences */
  CONSENT_SAVE_PREFERENCES: 'cookie_consent_save_preferences',
  /** Fired when banner is shown */
  BANNER_SHOWN: 'cookie_banner_shown',
  /** Fired when settings panel is opened */
  SETTINGS_OPENED: 'cookie_settings_opened',
} as const;

// ============================================================================
// TIMING CONSTANTS
// ============================================================================

/**
 * Timing constants for animations and delays
 */
export const TIMING = {
  /** Delay before showing banner after page load (ms) */
  BANNER_SHOW_DELAY: 200,
  /** Toggle animation duration (ms) */
  TOGGLE_ANIMATION: 300,
  /** Fade animation duration (ms) */
  FADE_ANIMATION: 200,
  /** Debounce delay for consent saves (ms) */
  SAVE_DEBOUNCE: 500,
} as const;

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Minimum consent timestamp (Unix epoch)
 * Used to validate stored timestamps
 * 
 * Set to: January 1, 2024 00:00:00 UTC
 */
export const MIN_CONSENT_TIMESTAMP = 1704067200000;

/**
 * Validate consent timestamp
 * 
 * @param timestamp - Unix timestamp to validate
 * @returns true if timestamp is valid
 */
export function isValidConsentTimestamp(timestamp: number): boolean {
  return (
    typeof timestamp === 'number' &&
    timestamp >= MIN_CONSENT_TIMESTAMP &&
    timestamp <= Date.now()
  );
}

// ============================================================================
// DEVELOPMENT FLAGS
// ============================================================================

/**
 * Development mode flags
 * Only active in development environment
 */
export const DEV_FLAGS = {
  /** Enable debug logging in console */
  DEBUG_LOGGING: process.env.NODE_ENV === 'development',
  /** Skip consent validation (for testing) */
  SKIP_VALIDATION: false,
  /** Force show banner (for testing) */
  FORCE_SHOW_BANNER: false,
  /** Mock consent responses (for testing) */
  MOCK_CONSENT: false,
} as const;

/**
 * Log debug message if debug logging is enabled
 * 
 * @param message - Debug message
 * @param data - Optional data to log
 */
export function debugLog(message: string, data?: unknown): void {
  if (DEV_FLAGS.DEBUG_LOGGING) {
    console.log(`[Cookie Consent] ${message}`, data || '');
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

/** Cookie consent storage key type */
export type CookieConsentKey = typeof COOKIE_CONSENT_KEY;

/** Consent version type */
export type ConsentVersion = typeof CONSENT_VERSION;
