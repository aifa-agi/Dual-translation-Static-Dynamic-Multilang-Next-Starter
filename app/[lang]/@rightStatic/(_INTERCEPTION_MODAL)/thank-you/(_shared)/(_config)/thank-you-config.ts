//app/[lang]/@rightStatic/(_INTERCEPTION_MODAL)/thank-you/(_shared)/(_config)/thank-you-config.ts
import { appConfig, getHomePageIllustration } from "@/config/app-config";

/**
 * Page metadata configuration
 */
export const THANK_YOU_PAGE_CONFIG = {
  /**
   * Response time promise (in hours)
   */
  responseTime: 24,

  /**
   * Analytics tracking configuration
   */
  analytics: {
    enabled: true,
    googleAnalyticsConversionId: process.env.NEXT_PUBLIC_GA_CONVERSION_ID || 'CONVERSION_ID',
    enableFacebookPixel: true,
    enableDataLayer: true,
  },

  /**
   * Navigation links
   */
  navigation: {
    homeUrl: '/',
    chatUrl: '/chat',
  },

  /**
   * Static generation settings
   */
  revalidate: false,
  dynamic: 'force-static' as const,
} as const;

/**
 * Get theme-aware illustrations for Thank You page
 * 
 * @returns Object with dark and light theme illustration paths
 */
export function getThankYouIllustrations() {
  const darkPath = getHomePageIllustration("dark");
  const lightPath = getHomePageIllustration("light");

  // Validate paths
  const darkSrc = darkPath && typeof darkPath === 'string' && darkPath.length > 0 ? darkPath : null;
  const lightSrc = lightPath && typeof lightPath === 'string' && lightPath.length > 0 ? lightPath : null;

  return {
    dark: darkSrc,
    light: lightSrc,
  };
}

/**
 * Type for Thank You page configuration
 */
export type ThankYouPageConfig = typeof THANK_YOU_PAGE_CONFIG;
