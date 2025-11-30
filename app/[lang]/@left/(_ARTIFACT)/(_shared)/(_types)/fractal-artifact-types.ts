// @/app/(lang)/left/(_ARTIFACT)/(_shared)/(_types)/fractal-artifact-types.ts
// All translation keys for the ARTEFACT starter fractal.
export type AllFractalArtifactTranslationKeys = "greeting";

// Complete translations object for the ARTEFACT starter fractal.
export type FractalArtifactTranslations = {
  [K in AllFractalArtifactTranslationKeys]: string;
};

export type ArtifactPageData = {
  fractalName?: string;
  fractalPath?: string
  fractalLevel?: number
  fractalDescription?: string;
  hint?: string;
};
