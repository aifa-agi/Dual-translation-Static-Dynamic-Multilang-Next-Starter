//config/content-data.ts

import { MenuCategory } from "@/types/menu-types";

export const contentData = {
  categories: [
    {
      "title": "Home",
      "pages": [
        {
          "id": "ks7eqcf6z1fhes1lwiwz75zn2",
          "href": "/home",
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
    },

    
   

  ]
} as { categories: MenuCategory[] };

export type contentData = typeof contentData;

export const lastUpdated = new Date().toISOString();
export const generatedBy = "menu-persist-api";
