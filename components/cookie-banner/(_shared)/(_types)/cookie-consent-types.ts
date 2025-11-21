//components/cookie-banner/(_shared)/(_types)/cookie-consent-types.ts

// ============================================================================
// CONSENT STATE TYPES
// ============================================================================

/**
 * Cookie consent state structure
 * Stores user preferences for different cookie categories
 */
export type CookieConsent = {
  /** Essential cookies (always true, cannot be disabled) */
  essential: boolean;
  /** Analytics cookies (Google Analytics, etc.) */
  analytics: boolean;
  /** Marketing cookies (Facebook Pixel, ads, etc.) */
  marketing: boolean;
  /** Unix timestamp when consent was given */
  timestamp: number;
  /** Consent version for tracking changes in cookie policy */
  version: string;
};

/**
 * Cookie category identifier
 * Used to reference specific cookie categories in the UI
 */
export type CookieCategory = 'essential' | 'analytics' | 'marketing';

// ============================================================================
// TRANSLATION KEYS (CUID Format)
// ============================================================================

/**
 * Translation keys for cookie consent banner
 * All keys use CUID format for unique identification
 * 
 * Format: cuid_<context>_<description>_<variant>
 * Example: cuid_cookie_banner_title_main
 */
export type CookieConsentTranslationKeys =
  // Banner - Main View
  | 'cuid_cookie_banner_info_lead'           // "We use cookies and similar technologies"
  | 'cuid_cookie_banner_info_body'           // Main description with {site} placeholder
  | 'cuid_cookie_banner_manage_preferences'  // "Manage Preferences" button
  | 'cuid_cookie_banner_reject_all'          // "Reject All" button
  | 'cuid_cookie_banner_accept_all'          // "Accept All" button
  
  // Settings Panel
  | 'cuid_cookie_settings_title'             // "Cookie Settings"
  | 'cuid_cookie_settings_subtitle'          // "{brand} — customize your privacy preferences"
  | 'cuid_cookie_settings_save_btn'          // "Save Preferences" button
  
  // Essential Cookies Category
  | 'cuid_cookie_essential_title'            // "Essential Cookies"
  | 'cuid_cookie_essential_description'      // Description of essential cookies
  | 'cuid_cookie_essential_always_on'        // "Always On" label
  
  // Analytics Cookies Category
  | 'cuid_cookie_analytics_title'            // "Analytics Cookies"
  | 'cuid_cookie_analytics_description'      // Description of analytics cookies
  
  // Marketing Cookies Category
  | 'cuid_cookie_marketing_title'            // "Marketing Cookies"
  | 'cuid_cookie_marketing_description'      // Description of marketing cookies
  
  // Footer Links & Meta
  | 'cuid_cookie_footer_privacy_policy'      // "Privacy Policy" link
  | 'cuid_cookie_footer_support'             // "Support" link
  | 'cuid_cookie_footer_contact_support'     // "Contact Support" link
  | 'cuid_cookie_consent_expiry_template';   // "Consent expires in {days} days"

/**
 * Translation object structure
 * Maps CUID keys to localized strings for each supported language
 */
export type CookieConsentTranslations = {
  [K in CookieConsentTranslationKeys]: string;
};

/**
 * Full translation data structure
 * Contains translations for all 50 supported languages
 */
export type CookieConsentTranslationData = {
  [lang: string]: CookieConsentTranslations;
};

// ============================================================================
// CATEGORY CONFIGURATION
// ============================================================================

/**
 * Cookie category configuration
 * Defines metadata and icons for each category
 */
export type CookieCategoryConfig = {
  /** Category identifier */
  id: CookieCategory;
  /** Translation key for category title */
  titleKey: CookieConsentTranslationKeys;
  /** Translation key for category description */
  descriptionKey: CookieConsentTranslationKeys;
  /** Icon name (from lucide-react) */
  icon: 'Shield' | 'BarChart3' | 'Target';
  /** Color scheme */
  color: 'green' | 'blue' | 'purple';
  /** Whether category can be toggled by user */
  toggleable: boolean;
  /** Whether category is enabled by default */
  defaultEnabled: boolean;
};

// ============================================================================
// SERVER ACTION TYPES (for future database integration)
// ============================================================================

/**
 * Server action result for saving consent
 * Used when consent is saved to database (future implementation)
 */
export type SaveConsentResult = {
  success: boolean;
  message?: string;
  error?: string;
};

/**
 * Server action payload for saving consent
 * Includes user ID for authenticated users (optional)
 */
export type SaveConsentPayload = {
  consent: CookieConsent;
  userId?: string; // Optional: for authenticated users
  sessionId?: string; // Optional: for tracking anonymous users
};

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Template parameter types for dynamic translations
 * Used in formatI18n helper function
 */
export type TranslationParams = {
  site?: string;
  brand?: string;
  days?: number;
  [key: string]: string | number | undefined;
};
