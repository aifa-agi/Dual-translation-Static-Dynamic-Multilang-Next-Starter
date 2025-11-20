//app/[lang]/@rightStatic/(_INTERCEPTION_MODAL)/thank-you/(_shared)/(_types)/thank-you-types.ts

export type AllThankYouTranslationKeys =
  | "title"
  | "description"
  | "whatNextTitle"
  | "whatNextDescription"
  | "backToHome"
  | "startChat"
  | "successIllustrationAlt";

/**
 * Complete translations object with all required keys
 * Used for type-safe access in components
 */
export type ThankYouTranslations = {
  [K in AllThankYouTranslationKeys]: string;
};

/**
 * Analytics configuration type
 */
export type AnalyticsConfig = {
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  enableTracking: boolean;
};
