<!-- @/app/test/SPEC.md -->

---
specVersion: 1.0.0
stage: Minimal
currentVersion: v0.1.0
fractalId: TEST
kind: Embedded
---

# AIFA Fractal SPEC.md — TEST

## 1. Purpose

TEST — минимальный embedded фрактал для тестирования Response Parser v0.3.0.

Проверяет:
- Парсинг SPEC.md (должен получить HTML комментарий `<!-- @/... -->`)
- Парсинг JSON (должен быть БЕЗ комментария)
- Парсинг TypeScript файлов (должны получить `// @/...` комментарий)
- Корректное создание файлов через Apply Action

## 2. Scope

**In scope:**
- Демонстрация полного цикла: Load → Parse → Preview → Apply
- Тестирование создания файлов через парсер
- Валидация структуры фрактала
- Проверка path-комментариев для разных типов файлов

**Out of scope:**
- Реальная бизнес-логика
- Интеграция с другими фракталами
- Полноценный UI с переводами (это тестовый фрактал)

## 3. Initial Subfractals Plan

Subfractals не планируются. Это минимальный фрактал для тестирования парсера.

## 4. Constraints & Guidelines

- Соблюдение AIFA Core Rules
- Минимальная структура для тестирования
- SPEC.md получает HTML комментарий
- JSON файлы без комментариев
- TypeScript файлы с // комментариями

## 5. Technology Stack

- React 18+
- Next.js 15+ App Router
- TypeScript 5+
- Server Actions
- Sonner (toast notifications)

## 6. Interaction Log

### 2025-12-04 — Initial Creation
- Created by Response Parser v0.3.0
- Testing path comment logic for different file types
- Added translations for client island
- Verified SPEC.md HTML comment rendering