// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/(_shared)/(_types)/fractal-response-parser-types.ts

// All translation keys for the Response Parser fractal.
export type AllFractalResponseParserTranslationKeys = "greeting";

// Complete translations object for the Response Parser fractal.
export type FractalResponseParserTranslations = {
  [K in AllFractalResponseParserTranslationKeys]: string;
};

// Page data for Response Parser fractal
export type ResponseParserPageData = {
  fractalName?: string;
  fractalPath?: string;
  fractalLevel?: number;
  fractalDescription?: string;
  hint?: string;
};
