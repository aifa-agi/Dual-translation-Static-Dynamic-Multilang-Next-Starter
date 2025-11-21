// components/cookie-banner/(_shared)/(_config)/cookie-consent-config.ts

import type { 
  CookieCategoryConfig, 
  CookieCategory 
} from '../(_types)/cookie-consent-types';

// ============================================================================
// COOKIE CATEGORIES CONFIGURATION
// ============================================================================

/**
 * Cookie categories configuration
 * Defines metadata, icons, and behavior for each cookie category
 */
export const COOKIE_CATEGORIES: CookieCategoryConfig[] = [
  {
    id: 'essential',
    titleKey: 'cuid_cookie_essential_title',
    descriptionKey: 'cuid_cookie_essential_description',
    icon: 'Shield',
    color: 'green',
    toggleable: false, // Cannot be disabled
    defaultEnabled: true, // Always enabled
  },
  {
    id: 'analytics',
    titleKey: 'cuid_cookie_analytics_title',
    descriptionKey: 'cuid_cookie_analytics_description',
    icon: 'BarChart3',
    color: 'blue',
    toggleable: true, // User can toggle
    defaultEnabled: false, // Disabled by default (GDPR compliance)
  },
  {
    id: 'marketing',
    titleKey: 'cuid_cookie_marketing_title',
    descriptionKey: 'cuid_cookie_marketing_description',
    icon: 'Target',
    color: 'purple',
    toggleable: true, // User can toggle
    defaultEnabled: false, // Disabled by default (GDPR compliance)
  },
];

// ============================================================================
// CATEGORY LOOKUP UTILITIES
// ============================================================================

/**
 * Get category configuration by ID
 * 
 * @param categoryId - Cookie category identifier
 * @returns Category configuration or undefined
 */
export function getCategoryConfig(
  categoryId: CookieCategory
): CookieCategoryConfig | undefined {
  return COOKIE_CATEGORIES.find((cat) => cat.id === categoryId);
}

/**
 * Get all toggleable categories
 * Returns categories that user can enable/disable
 * 
 * @returns Array of toggleable category configurations
 */
export function getToggleableCategories(): CookieCategoryConfig[] {
  return COOKIE_CATEGORIES.filter((cat) => cat.toggleable);
}

/**
 * Get default consent state
 * Returns initial consent preferences based on category defaults
 * 
 * @returns Object mapping category IDs to default enabled state
 */
export function getDefaultConsentState(): Record<CookieCategory, boolean> {
  return COOKIE_CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat.id] = cat.defaultEnabled;
      return acc;
    },
    {} as Record<CookieCategory, boolean>
  );
}

// ============================================================================
// COLOR SCHEME UTILITIES
// ============================================================================

/**
 * Color scheme mappings for Tailwind CSS classes
 * Maps category colors to Tailwind utility classes
 */
export const COLOR_SCHEMES = {
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-600 dark:text-green-400',
    textSecondary: 'text-green-700 dark:text-green-400',
    toggle: 'bg-green-600',
    hover: 'hover:border-green-300 dark:hover:border-green-600',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-600 dark:text-blue-400',
    textSecondary: 'text-blue-700 dark:text-blue-400',
    toggle: 'bg-blue-600',
    hover: 'hover:border-blue-300 dark:hover:border-blue-600',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-purple-600 dark:text-purple-400',
    textSecondary: 'text-purple-700 dark:text-purple-400',
    toggle: 'bg-purple-600',
    hover: 'hover:border-purple-300 dark:hover:border-purple-600',
  },
} as const;

/**
 * Get color scheme for category
 * 
 * @param color - Category color identifier
 * @returns Tailwind CSS class mappings
 */
export function getColorScheme(color: 'green' | 'blue' | 'purple') {
  return COLOR_SCHEMES[color];
}

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

/**
 * Animation configuration for banner appearance
 */
export const ANIMATION_CONFIG = {
  /** Delay before showing banner (ms) */
  showDelay: 200,
  /** Toggle switch animation duration (ms) */
  toggleDuration: 300,
  /** Fade in/out duration (ms) */
  fadeDuration: 200,
} as const;

// ============================================================================
// BANNER DISPLAY CONFIGURATION
// ============================================================================

/**
 * Banner display and behavior configuration
 */
export const BANNER_CONFIG = {
  /** Show banner on mobile devices */
  showOnMobile: true,
  /** Show banner on tablet devices */
  showOnTablet: true,
  /** Show banner on desktop devices */
  showOnDesktop: true,
  /** Z-index for banner positioning */
  zIndex: 50,
  /** Banner position */
  position: 'bottom' as const, // 'top' | 'bottom'
  /** Max width for banner content */
  maxWidth: '7xl', // Tailwind max-w-{size}
  /** Enable backdrop blur effect */
  backdropBlur: false,
} as const;

// ============================================================================
// THIRD-PARTY INTEGRATION CONFIGURATION
// ============================================================================

/**
 * Third-party service integration settings
 * Environment variables for analytics and marketing tools
 */
export const THIRD_PARTY_CONFIG = {
  /** Google Analytics measurement ID */
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  /** Facebook Pixel ID */
  facebookPixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
  /** Enable Google Consent Mode V2 */
  enableGoogleConsentMode: true,
  /** Enable Facebook Consent API */
  enableFacebookConsent: true,
} as const;

/**
 * Check if analytics services are configured
 * @returns true if Google Analytics is configured
 */
export function hasAnalyticsConfig(): boolean {
  return !!THIRD_PARTY_CONFIG.googleAnalyticsId;
}

/**
 * Check if marketing services are configured
 * @returns true if Facebook Pixel is configured
 */
export function hasMarketingConfig(): boolean {
  return !!THIRD_PARTY_CONFIG.facebookPixelId;
}

/**
 * Check if any third-party services are configured
 * @returns true if at least one service is configured
 */
export function hasAnyThirdPartyConfig(): boolean {
  return hasAnalyticsConfig() || hasMarketingConfig();
}

// ============================================================================
// ACCESSIBILITY CONFIGURATION
// ============================================================================

/**
 * Accessibility and ARIA configuration
 */
export const A11Y_CONFIG = {
  /** Enable keyboard navigation */
  enableKeyboardNav: true,
  /** Enable screen reader announcements */
  enableAriaLive: true,
  /** Focus trap in settings panel */
  enableFocusTrap: true,
  /** ARIA labels */
  ariaLabels: {
    banner: 'Cookie consent banner',
    settingsPanel: 'Cookie settings panel',
    toggleAnalytics: 'Toggle analytics cookies',
    toggleMarketing: 'Toggle marketing cookies',
    closeSettings: 'Close cookie settings',
  },
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

export type { CookieCategoryConfig, CookieCategory };
