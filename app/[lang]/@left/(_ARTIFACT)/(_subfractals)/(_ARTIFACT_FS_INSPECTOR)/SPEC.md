// @/app/(lang)/left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)/SPEC.md
# ARTIFACT_FS_INSPECTOR – SPEC (Minimal Embedded)

## Purpose

Подфрактал `ARTIFACT_FS_INSPECTOR` предоставляет в левом слоте ARTEFACT отдельный режим “FS Inspector”, где пользователь может ввести путь к корню фрактала в файловой системе и получить Markdown‑заготовку для экспорта его компонентов в Perplexity.[attached_file:9][attached_file:10]

## Type and Placement

- Тип: Minimal Embedded Fractal (не владеет собственным маршрутом, рендерится через серверный entry родителя).[attached_file:1][attached_file:2]  
- Путь: `app/(lang)/left/(_ARTIFACT)/(_subfractals)/(_ARTIFACT_FS_INSPECTOR)`  
- Точка подключения: `FractalArtifactEntry` через `ArtifactFsInspectorEmbeddingSlot`.

## Current Stage and Version

- Lifecycle stage: Minimal (embedded, без собственных subfractals).[attached_file:1][attached_file:6]  
- currentVersion: `v0.1.0`  
- Реализовано:  
  - три слоя `(_client)`, `(_server)`, `(_shared)`;  
  - минимальный i18n‑триплет с ключом `greeting` для `en/ru/es`;  
  - server entry + server consumer;  
  - client island с формой ввода пути и генерацией Markdown‑шаблона (локально, без чтения ФС).[attached_file:1][attached_file:2]

## Intended Capabilities

- Принимать от пользователя строку пути к корню фрактала (скопированную из файловой системы).[attached_file:10]  
- Строить Markdown‑документ, описывающий выбранный фрактал и пригодный для передачи в Perplexity как контекст (на текущей версии — на основе введённого пути и статической структуры, в будущих версиях — на основе реального чтения ФС).[attached_file:9][attached_file:10]

## Future Evolution

- Stage Mature (для этого подфрактала): подключить серверные `fsqueries` для чтения компонентов фрактала с диска и формирования полного Markdown‑документа.[attached_file:10][attached_file:11]  
- Возможное расширение: выбор подмножеств дерева (отдельные subfractals) для включения в экспорт.[attached_file:3][attached_file:6]
