// components/aifa-footer/(_shared)/(_types)/footer-types.ts


export type AllFooterTranslationKeys =
  | "allRightsReserved"
  | "enterpriseGradeStarter";


export type FooterTranslations = {
  [K in AllFooterTranslationKeys]: string;
};
