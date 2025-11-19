import { MetadataRoute } from "next";
import { SUPPORTED_LANGUAGES } from "@/config/translations/translations.config";
import { getContentData } from "@/config/menu/content-data";
import { appConfig } from "@/config/app-config";
import { PageData } from "@/types/page-types";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = appConfig.url;
  const currentDate = new Date();

  // Храним все ссылки чтобы избежать дублей
  const urlSet = new Map<string, MetadataRoute.Sitemap[number]>();

  SUPPORTED_LANGUAGES.forEach((lang) => {
    const { categories } = getContentData(lang);

    categories.forEach((category) => {
      if (category.href) {
        const url = `${baseUrl}${category.href}`;
        addOrUpdate(url, {
          url,
          lastModified: currentDate,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }

      category.pages.forEach((page: PageData) => {
        if (page.isPublished && page.href) {
          const url = `${baseUrl}${page.href}`;
          addOrUpdate(url, {
            url,
            lastModified: currentDate,
            changeFrequency: getChangeFrequency(page.type),
            priority: getPriority(page.type, page.href),
          });
        }
      });
    });
  });

 
  addOrUpdate(baseUrl, {
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: 1.0,
  });

  return Array.from(urlSet.values());

  function addOrUpdate(
    url: string,
    route: MetadataRoute.Sitemap[number],
  ) {
    const existing = urlSet.get(url);
    if (!existing || (route.priority && existing.priority && route.priority > existing.priority)) {
      urlSet.set(url, route);
    }
  }

  function getChangeFrequency(
    pageType: string,
  ): MetadataRoute.Sitemap[number]["changeFrequency"] {
    const frequencyMap: Record<string, MetadataRoute.Sitemap[number]["changeFrequency"]> = {
      feature: "monthly",
      blog: "weekly",
      news: "weekly",
      docs: "monthly",
      staticPage: "monthly",
    };
    return frequencyMap[pageType] || "monthly";
  }

  function getPriority(pageType: string, href: string): number {
    if (href === "/") return 1.0;
    const priorityMap: Record<string, number> = {
      feature: 0.7,
      blog: 0.8,
      news: 0.6,
      docs: 0.7,
      staticPage: 0.6,
    };
    return priorityMap[pageType] || 0.5;
  }
}
