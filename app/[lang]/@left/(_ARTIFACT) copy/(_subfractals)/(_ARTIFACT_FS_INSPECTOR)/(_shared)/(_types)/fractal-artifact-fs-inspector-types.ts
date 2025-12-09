// @/app/(lang)/left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/(_shared)/(_types)/fractal-artifact-fs-inspector-types.ts

// All translation keys for the ARTIFACT_FS_INSPECTOR fractal.
export type AllFractalArtifactFsInspectorTranslationKeys =
  | "greeting"
  | "serverTitle"
  | "serverDescription"
  | "serverHint"
  | "headerTitle"
  | "headerDescription";

// Complete translations object for the ARTIFACT_FS_INSPECTOR fractal.
export type FractalArtifactFsInspectorTranslations = {
  [K in AllFractalArtifactFsInspectorTranslationKeys]: string;
};

export type ArtifactFsInspectorPageData = {
  fractalName?: string;
  fractalPath: string;
  fractalLevel: number;
  fractalDescription?: string;
  hint?: string;
};
