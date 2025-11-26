// components/no-script-banner/(_shared)/(_types)/no-script-banner-types.ts

export type AllNoScriptBannerTranslationKeys = 'title' | 'description';

export type NoScriptBannerTranslations = {
  [K in AllNoScriptBannerTranslationKeys]: string;
};
