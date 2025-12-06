// @/app/[lang]/@left/(_ARTIFACT)/SPEC.md

---
specVersion: "1.0.0"
stage: "Improved"
currentVersion: "v1.3.0"
fractalId: "(_ARTIFACT)"
kind: "Route"
---

# ARTEFACT Fractal – SPEC (Improved v1.3.0)

## Current Stage and Version
- **Lifecycle stage**: Improved Fractal (Route Fractal, left slot)  
- **currentVersion**: `v1.3.0`

### Versions and Artifacts
| Версия | Дата | Изменения | blobUrl |
|--------|------|-----------|---------|
| `v0.1.0` | Minimal | Базовый скелет ARTEFACT | - |
| `v0.2.0` | Mature | Добавлен `(_ARTIFACT_FS_INSPECTOR)` | - |
| `v1.0.0` | Improved v1 | Toggle FS Inspector | - |
| `v1.1.0` | Improved v2 | Анимации FS Inspector | - |
| `v1.2.0` | Improved v3 | Добавлен `(_RESPONSE_PARSER)` + эксклюзивное переключение | - |
| **`v1.3.0`** | **Improved v4** | **2 режима парсинга**: SPEC Parser (текст→Minimal) + Code Parser (код→Mature/Improved)** | **будет добавлен** |

## Business Capabilities

### Implemented (v1.3.0)
1. **FS Inspector** (`(_ARTIFACT_FS_INSPECTOR)`) — toggle + анимации
2. **Response Parser** (`(_RESPONSE_PARSER)`) — 2 режима с эксклюзивным переключением:
   - **SPEC Parser** — парсит Markdown→SPEC.md → запускает генератор Minimal fractals
   - **Code Parser** — парсит кодовые блоки → применяет к Mature/Improved fractals

### Response Parser Modes
SPEC MODE (текст → Minimal fractals)
├── Парсит SPEC.md блоки из Perplexity ответа
├── Создает/обновляет SPEC.md фрактала
└── Запускает Minimal Starter generator

CODE MODE (код → Mature/Improved)
├── State machine парсер для broken/nested ``` blocks
├── Extract path из <!-- app/... -->
└── Создает/обновляет .tsx/.ts/.json файлы


## 16. AI–Architect Interaction Log

**2025-12-03T18:52:00Z** Architect: "2 кнопки парсинга: SPEC Parser (текст→Minimal) + Code Parser (код→Mature/Improved)"  
**AI Questions**:  
- Логика переключения? → Эксклюзивное (один активен)  
- UI? → 2 toggle кнопки в ArtifactStarterClientIsland  
- Порядок? → Сначала SPEC.md → потом код  

**Agreed Summary**:  
`(_RESPONSE_PARSER)` эволюционирует в 2 режима: SPEC Parser для спецификаций/Minimal + Code Parser для кода/Mature. Эксклюзивное переключение через `activeMode`. v1.3.0 SPEC обновлен.  

**Links**: Business Capabilities, Response Parser Modes[1]

## Next Steps
1. ✅ **v1.3.0 SPEC** — зафиксировано разделение парсеров
2. **Mature (_RESPONSE_PARSER)**: UI + базовый SPEC/Code парсер  
3. **Improved v1 (_RESPONSE_PARSER)**: State machine + file writes
4. **Improved v2**: Автозапуск generators по SPEC.md
