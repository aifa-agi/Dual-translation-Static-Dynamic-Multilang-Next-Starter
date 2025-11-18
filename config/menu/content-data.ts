//config/menu/content-data.ts

import { MenuCategory } from "@/types/menu-types";
import { getContentTranslation } from "./get-content-translation";

// Original raw categories data without translation
const rawCategories = [
  {
    "id": "homeCategory",
    "title": "Home",
    "pages": [
      {
        "id": "homePage",
        "href": "/en/home",
        "roles": [
          "guest"
        ],
        "hasBadge": false,
        "type": "homePage",
        "isPublished": true,
        "isAddedToPrompt": false,
        "isVectorConnected": false,
        "isChatSynchronized": false,
        "order": 1,
        "title": "Home",
        "description": "Welcome to our AI-powered platform. Discover innovative solutions and cutting-edge technology.",
        "images": [],
        "keywords": [
          "Ai"
        ]
      }
    ],
    "order": 1,
  }
] as MenuCategory[];

/**
 * Function that returns content categories translated to specified language
 * @param lang - language code
 * @returns translated categories array
 */
export function getContentData(lang: string) {
  const { getTranslatedContent } = getContentTranslation(lang as any);

  return {
    categories: getTranslatedContent(rawCategories)
  };
}

export type contentData = ReturnType<typeof getContentData>;

export const lastUpdated = new Date().toISOString();
export const generatedBy = "menu-persist-api";
