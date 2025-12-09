// @/app/[lang]/@left/(_ARTIFACT)/(_shared)/(_types)/fractal-artifact-types.ts
export type AllFractalArtifactTranslationKeys =
  | "greeting"
  | "serverTitle"
  | "serverDescription"
  | "serverHint"
  | "modeFsInspector"
  | "modeResponseParser"
  | "modePromptBuilder"
  | "modeProjectSchema"
  | "modeBlobManager"
  | "modeContentTool"
  | "modePluginFractalManager";

export type FractalArtifactTranslations = {
  [K in AllFractalArtifactTranslationKeys]: string;
};

export type ArtifactPageData = {
  fractalName?: string;
  fractalPath?: string;
  fractalLevel?: number;
  fractalDescription?: string;
  hint?: string;
};