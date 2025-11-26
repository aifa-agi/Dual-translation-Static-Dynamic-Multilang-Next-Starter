// app/[lang]/@rightStatic/(_PUBLIC)/(_HOME)/(_shared)/(_types)/fractal-types.ts

/**
 * All translation keys used by the HOME fractal.
 * Minimal stage: a single greeting key for demo purposes.
 */
export type AllFractalTranslationKeys = 'greeting';

/**
 * Complete translations object for the HOME fractal.
 * Each key must be present for every supported language entry in the JSON helper.
 */
export type FractalTranslations = {
  [K in AllFractalTranslationKeys]: string;
};
