// @/app/[lang]/@rightStatic/(_ABOUT_PAGE)/(_shared)/(_types)/fractal-about-page-types.ts

export type AllFractalAboutPageTranslationKeys = "greeting";

export type FractalAboutPageTranslations = {
  [K in AllFractalAboutPageTranslationKeys]: string;
};

export type AboutPagePageData = {
  fractalName?: string;
  fractalPath?: string;
  fractalLevel?: number;
  fractalDescription?: string;
  hint?: string;
};
