//app/[lang]/@rightStatic/(_INTERCEPTION_MODAL)/thank-you/(_client)/(_ui_components)/analytics-tracker.tsx

"use client";



import { useEffect } from "react";
import { THANK_YOU_PAGE_CONFIG } from "../../(_shared)/(_config)/thank-you-config";

/**
 * Analytics Tracker - fires conversion events on mount
 * Uses existing global type definitions from global.d.ts
 */
export function AnalyticsTracker() {
  useEffect(() => {
    const { analytics } = THANK_YOU_PAGE_CONFIG;

    if (!analytics.enabled) {
      console.log('[Analytics] Tracking disabled in configuration');
      return;
    }

    // Google Analytics conversion tracking
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('event', 'conversion', {
          'send_to': analytics.googleAnalyticsConversionId,
          'event_category': 'Lead Generation',
          'event_label': 'Thank You Page View'
        });
        console.log('[Analytics] Google Analytics conversion tracked');
      } catch (error) {
        console.error('[Analytics] Google Analytics error:', error);
      }
    }

    // Facebook Pixel tracking - using existing type from global.d.ts
    if (analytics.enableFacebookPixel && typeof window !== 'undefined' && window.fbq) {
      try {
        window.fbq('track', 'Lead');
        console.log('[Analytics] Facebook Pixel Lead event tracked');
      } catch (error) {
        console.error('[Analytics] Facebook Pixel error:', error);
      }
    }

    // Custom analytics event via dataLayer
    if (analytics.enableDataLayer && typeof window !== 'undefined' && window.dataLayer) {
      try {
        window.dataLayer.push({
          'event': 'lead_submitted',
          'event_category': 'conversion',
          'event_action': 'thank_you_page_view',
          'event_label': 'Lead Form Submission',
          'value': 1
        });
        console.log('[Analytics] dataLayer event pushed');
      } catch (error) {
        console.error('[Analytics] dataLayer error:', error);
      }
    }

    console.log('[Analytics] Thank You page view tracked successfully');
  }, []); // Empty dependency array - run once on mount

  // This component renders nothing
  return null;
}
