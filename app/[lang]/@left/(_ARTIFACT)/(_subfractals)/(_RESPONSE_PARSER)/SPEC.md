// @/app/[lang]/@left/(_ARTIFACT)/(_subfractals)/(_RESPONSE_PARSER)/SPEC.md

# Response Parser Fractal – SPEC (Minimal Embedded)

## Current Stage and Version

- Lifecycle stage: **Minimal Embedded Fractal** (не имеет собственного роутинга, монтируется в родительский фрактал ARTEFACT).  
- currentVersion: `v0.1.0`  

### Versions and Artifacts

- `v0.1.0` — Minimal: базовый скелет Response Parser с минимальным UI (серверный компонент + клиентский островок), трёхслойной структурой (client/server/shared), минимальным i18n‑триплетом (greeting key, en/ru/es) и `embedding-response-parser-slot.tsx` для подключения к родителю. Функциональность парсинга AI‑ответов не реализована — только демонстрация архитектуры Minimal Embedded Fractal. `blobUrl` будет добавлен после экспорта артефакта.  

## Architecture

### Fractal Type

**Minimal Embedded Fractal** — подфрактал без собственного роутинга, монтируемый в родительский Route Fractal `(_ARTIFACT)` через `embedding-response-parser-slot.tsx`.

### Structure

(_RESPONSE_PARSER)/
├── SPEC.md # Спецификация фрактала
├── embedding-response-parser-slot.tsx # Коннектор для родителя
├── (_client)/
│ └── (_uiclientislands)/
│ └── response-parser-starter-client-island.tsx # Клиентский островок
├── (_server)/
│ ├── fractal-response-parser-entry.tsx # Серверный entry point
│ └── (_servercomponents)/
│ └── response-parser-server-consumer.tsx # Серверный компонент
└── (_shared)/
├── (_types)/
│ └── fractal-response-parser-types.ts # Типы и контракты
└── (_translations)/
├── response-parser-translation.json # Переводы (en/ru/es)
└── get-response-parser-translation.ts # Хелпер переводов

### Integration with Parent

Родительский фрактал `(_ARTIFACT)` монтирует Response Parser через:

1. **Embedding slot** — `embedding-response-parser-slot.tsx` импортируется в `fractal-artifact-entry.tsx`
2. **DOM container** — панель с `id="artifact-response-parser-panel"` и классом `hidden` по умолчанию
3. **Toggle logic** — клиентский островок ARTEFACT управляет видимостью через `activeMode` состояние и DOM‑манипуляции
4. **Exclusive mode** — только один режим активен (FS Inspector ИЛИ Response Parser)

## Business Capabilities

### Implemented

1. **Minimal UI скелет**  
   - Серверный компонент `ResponseParserServerConsumer` отображает название фрактала, описание, текущий язык и путь.
   - Клиентский островок `ResponseParserStarterClientIsland` содержит заголовок, описание и placeholder для будущего UI парсинга.
   - Минимальный i18n‑триплет с ключом `greeting` (en/ru/es).

2. **Embedding integration**  
   - Коннектор `embedding-response-parser-slot.tsx` принимает пропсы `lang`, `currentPath`, `level` от родителя.
   - Серверный entry point `fractal-response-parser-entry.tsx` координирует рендеринг серверного и клиентского компонентов.

### Planned

- Добавить функциональность парсинга AI‑ответов:
  - Поле ввода для текста ответа (textarea)
  - Кнопка "Parse Response"
  - Отображение структурированного результата парсинга
  - Поддержка различных форматов (markdown, JSON, code blocks)
- Добавить копирование распарсенных данных в буфер обмена
- Добавить экспорт результата в файл

## Dependencies

### Parent Fractal

- `(_ARTIFACT)` — родительский Route Fractal, управляющий видимостью панели Response Parser

### Shared Types

- `SupportedLanguage` из `@/config/translations/translations.config`
- Собственные типы в `(_shared)/(_types)/fractal-response-parser-types.ts`

### UI Components

- React Server Components для серверного рендеринга
- Client Components ("use client") для интерактивности
- shadcn/ui компоненты (Button, Textarea) для будущих версий

## Technical Notes

- Фрактал НЕ имеет собственной папки роутинга (нет `page.tsx`, `layout.tsx`)
- Видимость управляется родителем через DOM `id` и CSS класс `hidden`
- Состояние фрактала изолировано внутри клиентского островка
- i18n реализован через минимальный триплет (types, JSON, helper)
- Серверные и клиентские компоненты чётко разделены по слоям `(_server)` и `(_client)`
