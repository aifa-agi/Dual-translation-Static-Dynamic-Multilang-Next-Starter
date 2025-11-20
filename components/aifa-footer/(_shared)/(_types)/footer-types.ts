// components/aifa-footer/(_shared)/(_types)/footer-types.ts

/**
 * All possible translation keys for Footer component
 * Each key corresponds to a translatable text element in the footer
 */
export type AllFooterTranslationKeys =
  | "allRightsReserved"
  | "enterpriseGradeStarter";

/**
 * Complete translations object with all required keys
 * Used for type-safe access in components
 * 
 * @example
 * const t = await getFooterTranslation('en');
 * console.log(t.allRightsReserved); // "All rights reserved."
 */
export type FooterTranslations = {
  [K in AllFooterTranslationKeys]: string;
};
