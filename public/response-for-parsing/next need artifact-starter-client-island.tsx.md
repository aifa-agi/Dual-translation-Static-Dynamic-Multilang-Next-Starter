<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# next need artifact-starter-client-island.tsx

Компонент `artifact-starter-client-island.tsx` должен быть клиентским островом, который получает переводы и данные страницы через пропсы, не читает JSON напрямую и живёт под client‑слоем артефакт‑фрактала.  Ниже код полного файла с корректной путь‑строкой и относительными импортами, согласованными с твоим `fractal-artifact-types.ts`.[^1][^2][^3]

## artifact-starter-client-island.tsx

```tsx
// @/app/[lang]/@left/(_ARTIFACT)/(_client)/(_uiclientislands)/artifact-starter-client-island.tsx
"use client";

import { useCallback } from "react";
import type { JSX } from "react";
import type SupportedLanguage from "config/translations/translations.config";

import type {
  FractalArtifactTranslations,
  ArtifactPageData,
} from "../../(_shared)/(_types)/fractal-artifact-types";

import Button from "components/ui/button";
import { toast } from "sonner";

export type ArtifactStarterClientIslandProps = {
  translations: FractalArtifactTranslations;
  lang?: SupportedLanguage;
  currentPath?: string;
  pageData?: ArtifactPageData;
};

export function ArtifactStarterClientIsland(
  props: ArtifactStarterClientIslandProps,
): JSX.Element {
  const { translations, lang, currentPath, pageData } = props;

  const title = pageData?.fractalName ?? "Artifact Client Canvas";
  const description =
    pageData?.fractalDescription ??
    "Client-side canvas for experimenting with artifact tools and modes.";
  const hint =
    pageData?.hint ??
    "Use the buttons to inspect routing context and try different artifact modes.";

  const handleShowInfo = useCallback(() => {
    toast.info("Artifact client demo", {
      description: [
        `Greeting: ${translations.greeting}`,
        `Lang: ${lang ?? "n/a"}`,
        `Path: ${currentPath ?? "n/a"}`,
      ].join(" | "),
      duration: 4000,
    });
  }, [translations.greeting, lang, currentPath]);

  const handleSelectMode = useCallback(
    (modeKey: keyof FractalArtifactTranslations) => {
      const label = translations[modeKey];

      toast.success(`Mode selected: ${label}`, {
        description: `Current path: ${currentPath ?? "n/a"}`,
        duration: 3500,
      });
    },
    [translations, currentPath],
  );

  return (
    <section className="flex flex-col gap-3 rounded-md bg-gray-100 p-4 text-gray-900">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>

      <p className="text-sm text-gray-800">{description}</p>
      <p className="text-xs text-gray-700">{hint}</p>

      <div className="mt-2 flex flex-col gap-2">
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={handleShowInfo}
          className="text-xs"
        >
          Show artifact info toast
        </Button>

        <div className="mt-1 flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => handleSelectMode("modeFsInspector")}
          >
            {translations.modeFsInspector}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => handleSelectMode("modeResponseParser")}
          >
            {translations.modeResponseParser}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => handleSelectMode("modePromptBuilder")}
          >
            {translations.modePromptBuilder}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => handleSelectMode("modeProjectSchema")}
          >
            {translations.modeProjectSchema}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => handleSelectMode("modeBlobManager")}
          >
            {translations.modeBlobManager}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => handleSelectMode("modeContentTool")}
          >
            {translations.modeContentTool}
          </Button>
        </div>
      </div>

      <p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
        Client island · Artifact fractal
      </p>
    </section>
  );
}
```

Этот файл соблюдает требования AIFA: корректный path‑комментарий, размещение под client‑слоем, префикс имени фрактала в компоненте и отсутствие прямого доступа к JSON‑файлу переводов (используются только пропсы `translations`).[^2][^3][^1]

<div align="center">⁂</div>

[^1]: AIFA-Minimal-Starter-Fractal-Route.md

[^2]: AIFA-Core-Rules-and-Output.md

[^3]: AIFA-Glossary-and-Conventions.md

