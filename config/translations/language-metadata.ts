// config/translations/language-metadata.ts

/**
 * Language metadata type - contains all display information for a language
 */
export type LanguageMetadata = {
  code: string;         // ISO 639-1 code (e.g., 'en', 'ru')
  flag: string;         // Emoji flag
  nativeName: string;   // Name in the language itself
  englishName: string;  // Name in English
};

/**
 * Complete database of all available languages with metadata
 * Includes major tech markets and growing developer communities worldwide
 * Add new languages here - they will be automatically available when added to .env
 */
export const ALL_LANGUAGE_METADATA: Record<string, LanguageMetadata> = {
  // Western Europe & Americas
en: { 
    code: 'en', 
    flag: '🇺🇸',  // Англоязычный флаг США для английского
    nativeName: 'English', 
    englishName: 'English' 
  },
  es: { 
    code: 'es', 
    flag: '🇪🇸', 
    nativeName: 'Español', 
    englishName: 'Spanish' 
  },
  fr: { 
    code: 'fr', 
    flag: '🇫🇷', 
    nativeName: 'Français', 
    englishName: 'French' 
  },
  de: { 
    code: 'de', 
    flag: '🇩🇪', 
    nativeName: 'Deutsch', 
    englishName: 'German' 
  },
  it: { 
    code: 'it', 
    flag: '🇮🇹', 
    nativeName: 'Italiano', 
    englishName: 'Italian' 
  },
  pt: { 
    code: 'pt', 
    flag: '🇵🇹', 
    nativeName: 'Português', 
    englishName: 'Portuguese' 
  },
  nl: { 
    code: 'nl', 
    flag: '🇳🇱', 
    nativeName: 'Nederlands', 
    englishName: 'Dutch' 
  },
  be: {
    code: 'be',
    flag: '🇧🇪',
    nativeName: 'Nederlands / Français / Deutsch',
    englishName: 'Belgian',
  },
  ie: {
    code: 'ie',
    flag: '🇮🇪',
    nativeName: 'English / Gaeilge',
    englishName: 'Irish',
  },
  lu: {
    code: 'lu',
    flag: '🇱🇺',
    nativeName: 'Lëtzebuergesch',
    englishName: 'Luxembourgish',
  },
  ch: {
    code: 'ch',
    flag: '🇨🇭',
    nativeName: 'Deutsch / Français / Italiano / Rumantsch',
    englishName: 'Swiss',
  },

  // Eastern Europe (major tech hubs)
  ru: { 
    code: 'ru', 
    flag: '🇷🇺', 
    nativeName: 'Русский', 
    englishName: 'Russian' 
  },
  pl: { 
    code: 'pl', 
    flag: '🇵🇱', 
    nativeName: 'Polski', 
    englishName: 'Polish' 
  },
  uk: { 
    code: 'uk', 
    flag: '🇺🇦', 
    nativeName: 'Українська', 
    englishName: 'Ukrainian' 
  },
  cs: { 
    code: 'cs', 
    flag: '🇨🇿', 
    nativeName: 'Čeština', 
    englishName: 'Czech' 
  },
  ro: { 
    code: 'ro', 
    flag: '🇷🇴', 
    nativeName: 'Română', 
    englishName: 'Romanian' 
  },
  bg: { 
    code: 'bg', 
    flag: '🇧🇬', 
    nativeName: 'Български', 
    englishName: 'Bulgarian' 
  },
  sr: { 
    code: 'sr', 
    flag: '🇷🇸', 
    nativeName: 'Српски', 
    englishName: 'Serbian' 
  },
  hr: { 
    code: 'hr', 
    flag: '🇭🇷', 
    nativeName: 'Hrvatski', 
    englishName: 'Croatian' 
  },
  sk: { 
    code: 'sk', 
    flag: '🇸🇰', 
    nativeName: 'Slovenčina', 
    englishName: 'Slovak' 
  },
  hu: { 
    code: 'hu', 
    flag: '🇭🇺', 
    nativeName: 'Magyar', 
    englishName: 'Hungarian' 
  },

  // Middle East & North Africa
  ar: { 
    code: 'ar', 
    flag: '🇸🇦', 
    nativeName: 'العربية', 
    englishName: 'Arabic' 
  },
  tr: { 
    code: 'tr', 
    flag: '🇹🇷', 
    nativeName: 'Türkçe', 
    englishName: 'Turkish' 
  },
  he: { 
    code: 'he', 
    flag: '🇮🇱', 
    nativeName: 'עברית', 
    englishName: 'Hebrew' 
  },

  // Sub-Saharan Africa (major tech markets)
  sw: { 
    code: 'sw', 
    flag: '🇰🇪', 
    nativeName: 'Kiswahili', 
    englishName: 'Swahili' 
  },
  am: { 
    code: 'am', 
    flag: '🇪🇹', 
    nativeName: 'አማርኛ', 
    englishName: 'Amharic' 
  },
  ha: { 
    code: 'ha', 
    flag: '🇳🇬', 
    nativeName: 'Hausa', 
    englishName: 'Hausa' 
  },
  yo: { 
    code: 'yo', 
    flag: '🇳🇬', 
    nativeName: 'Yorùbá', 
    englishName: 'Yoruba' 
  },
  zu: { 
    code: 'zu', 
    flag: '🇿🇦', 
    nativeName: 'isiZulu', 
    englishName: 'Zulu' 
  },
  af: { 
    code: 'af', 
    flag: '🇿🇦', 
    nativeName: 'Afrikaans', 
    englishName: 'Afrikaans' 
  },

  // Asia (major tech hubs)
  zh: { 
    code: 'zh', 
    flag: '🇨🇳', 
    nativeName: '中文', 
    englishName: 'Chinese' 
  },
  ja: { 
    code: 'ja', 
    flag: '🇯🇵', 
    nativeName: '日本語', 
    englishName: 'Japanese' 
  },
  ko: { 
    code: 'ko', 
    flag: '🇰🇷', 
    nativeName: '한국어', 
    englishName: 'Korean' 
  },
  hi: { 
    code: 'hi', 
    flag: '🇮🇳', 
    nativeName: 'हिन्दी', 
    englishName: 'Hindi' 
  },
  vi: { 
    code: 'vi', 
    flag: '🇻🇳', 
    nativeName: 'Tiếng Việt', 
    englishName: 'Vietnamese' 
  },
  th: { 
    code: 'th', 
    flag: '🇹🇭', 
    nativeName: 'ไทย', 
    englishName: 'Thai' 
  },
  id: { 
    code: 'id', 
    flag: '🇮🇩', 
    nativeName: 'Bahasa Indonesia', 
    englishName: 'Indonesian' 
  },
  bn: { 
    code: 'bn', 
    flag: '🇧🇩', 
    nativeName: 'বাংলা', 
    englishName: 'Bengali' 
  },

  // Nordic countries (high tech adoption)
  sv: { 
    code: 'sv', 
    flag: '🇸🇪', 
    nativeName: 'Svenska', 
    englishName: 'Swedish' 
  },
  no: { 
    code: 'no', 
    flag: '🇳🇴', 
    nativeName: 'Norsk', 
    englishName: 'Norwegian' 
  },
  da: { 
    code: 'da', 
    flag: '🇩🇰', 
    nativeName: 'Dansk', 
    englishName: 'Danish' 
  },
  fi: { 
    code: 'fi', 
    flag: '🇫🇮', 
    nativeName: 'Suomi', 
    englishName: 'Finnish' 
  },

  // Baltic states (growing tech scene)
  et: { 
    code: 'et', 
    flag: '🇪🇪', 
    nativeName: 'Eesti', 
    englishName: 'Estonian' 
  },
  lv: { 
    code: 'lv', 
    flag: '🇱🇻', 
    nativeName: 'Latviešu', 
    englishName: 'Latvian' 
  },
  lt: { 
    code: 'lt', 
    flag: '🇱🇹', 
    nativeName: 'Lietuvių', 
    englishName: 'Lithuanian' 
  },

  // Other strategic markets
  el: { 
    code: 'el', 
    flag: '🇬🇷', 
    nativeName: 'Ελληνικά', 
    englishName: 'Greek' 
  },
  ka: { 
    code: 'ka', 
    flag: '🇬🇪', 
    nativeName: 'ქართული', 
    englishName: 'Georgian' 
  },
};
