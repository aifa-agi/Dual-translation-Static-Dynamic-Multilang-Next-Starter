// @/app/[lang]/@rightStatic/(_PRICE_LIST)/(_subfractals)/(_PRICE_LIST_SUBDOMAIN)/(_shared)/(_types)/fractal-price-list-subdomain-types.ts

export type AllFractalPriceListSubdomainTranslationKeys = "greeting";

export type FractalPriceListSubdomainTranslations = {
  [K in AllFractalPriceListSubdomainTranslationKeys]: string;
};

export type PriceListSubdomainPageData = {
  fractalName?: string;
  fractalPath?: string;
  fractalLevel?: number;
  fractalDescription?: string;
  hint?: string;
};
