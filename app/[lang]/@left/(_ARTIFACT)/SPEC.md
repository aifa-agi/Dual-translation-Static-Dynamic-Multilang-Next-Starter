// @/app/[lang]/@left/(_ARTIFACT)/SPEC.md

# ARTEFACT Fractal – SPEC (Improved)

## Current Stage and Version

- Lifecycle stage: **Improved Fractal** (Route Fractal, left slot).  
- currentVersion: `v1.2.0`  

### Versions and Artifacts

- `v0.1.0` — Minimal: базовый скелет ARTEFACT без фактических subfractals и бизнес‑режимов.  
- `v0.2.0` — Mature: добавлен subfractal `ARTIFACT_FS_INSPECTOR` (Minimal Embedded) и статический блок FS Inspector под основной канвой.  
- `v1.0.0` — Improved v1: кнопка "FS Inspector" в клиентской канве управляет видимостью панели подфрактала `ARTIFACT_FS_INSPECTOR` (toggle) через стабильный `id` DOM‑элемента; остальные кнопки работают через toast‑уведомления. `blobUrl` для этой версии будет добавлен после экспорта артефакта.  
- `v1.1.0` — Improved v2 (animations): добавлена анимированная панель FS Inspector — при включении режима панель разворачивается с плавной анимацией высоты и прозрачности, при выключении сворачивается, не меняя контракт Minimal Embedded‑подфрактала. `blobUrl` будет добавлен после экспорта этого состояния.  
- `v1.2.0` — Improved v3 (Response Parser): добавлен второй Minimal Embedded subfractal `(_RESPONSE_PARSER)` с собственной toggle‑панелью и эксклюзивным переключением режимов. Кнопка "Response Parser" в клиентском островке ARTEFACT управляет видимостью панели парсера через DOM `id`. В каждый момент времени может быть активен только один режим (FS Inspector ИЛИ Response Parser). Остальные режимы (Prompt Builder, Project Schema, Blob Manager, Content Tool) остаются нереализованными и продолжают работать через toast. `blobUrl` будет добавлен после экспорта.  

## Business Capabilities

### Implemented

1. **FS Inspector** как отдельный Minimal embedded‑подфрактал `ARTIFACT_FS_INSPECTOR`, монтируемый под основной канвой ARTEFACT (v0.2.0).  

2. **Improved v1: переключение режима FS Inspector**  
   - Клиентский островок ARTEFACT поддерживает локальное состояние активного режима и управляет видимостью контейнера FS Inspector по стабильному `id` DOM‑элемента панели.  
   - Кнопка "FS Inspector":
     - при первом клике активирует режим FS Inspector и делает панель видимой;
     - при повторном клике отключает режим и скрывает панель.  
   - Остальные режимы (Prompt Builder, Response Parser, Project Schema, Blob Manager, Content Tool) на этой версии остаются "не реализованы" и продолжают работать через toast‑уведомления.  

3. **Improved v2: анимированная панель FS Inspector**  
   - Панель FS Inspector рендерится как серверный контейнер с фиксированным `id="artifact-fs-inspector-panel"` и CSS‑классами для плавного перехода высоты, прозрачности и смещения, оставаясь Minimal Embedded‑подфракталом без собственной routing/SEO‑логики.  
   - Клиентский островок ARTEFACT при смене `activeMode` управляет `max-height`, `opacity` и `translateY` контейнера через DOM‑манипуляции, реализуя разворачивание/сворачивание панели без изменения контракта серверного entry и без вмешательства в правила статической генерации.  

4. **Improved v3: Response Parser subfractal с эксклюзивным переключением режимов**  
   - Добавлен Minimal Embedded subfractal `(_RESPONSE_PARSER)` с трёхслойной структурой (client/server/shared), собственным SPEC.md, минимальным i18n‑триплетом (greeting key, en/ru/es) и `embedding-response-parser-slot.tsx` для подключения к родителю.  
   - Клиентский островок ARTEFACT расширен для поддержки режима "Response Parser" с **эксклюзивным переключением**:
     - В каждый момент времени может быть активен только один режим (FS Inspector ИЛИ Response Parser).
     - При активации Response Parser режим FS Inspector автоматически деактивируется и его панель скрывается.
     - При активации FS Inspector режим Response Parser автоматически деактивируется и его панель скрывается.
     - При повторном клике на активную кнопку режим выключается полностью (обе панели скрыты, activeMode = null).
   - Панель Response Parser (`id="artifact-response-parser-panel"`) монтируется в `fractal-artifact-entry.tsx` под панелью FS Inspector и управляется через независимый DOM‑контейнер с классом `hidden` по умолчанию.  
   - Логика переключения реализована через единственное состояние `activeMode` типа `ArtifactMode | null`, что гарантирует эксклюзивность режимов на уровне типов TypeScript.  
   - Остальные режимы (Prompt Builder, Project Schema, Blob Manager, Content Tool) остаются нереализованными и продолжают работать через toast.  

### Planned

- Расширить механику переключения режимов и анимаций на остальные кнопки (Prompt Builder, Project Schema, Blob Manager, Content Tool) по мере выноса их в отдельные subfractals и добавления собственных панелей под основной канвой ARTEFACT.  
- Добавить функциональность парсинга AI‑ответов в subfractal Response Parser (текущая версия содержит только скелет UI с минимальной демонстрацией i18n и серверного рендеринга).  
