// app/[lang]/@rightStatic/(_PRICE_LIST)/(_shared)/(_types)/fractal-price-list-types.ts

export type AllFractalPriceListTranslationKeys = "greeting";

export type FractalPriceListTranslations = {
  [K in AllFractalPriceListTranslationKeys]: string;
};

export type PriceListPageData = {
  fractalName?: string;
  fractalPath?: string;
  fractalLevel?: number;
  fractalDescription?: string;
  hint?: string;
};

