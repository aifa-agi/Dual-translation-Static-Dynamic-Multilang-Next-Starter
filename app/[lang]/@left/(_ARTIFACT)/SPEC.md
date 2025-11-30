// @/app/(lang)/left/(_ARTIFACT)/SPEC.md
# ARTEFACT Fractal – SPEC (Improved)

## Current Stage and Version

- Lifecycle stage: **Improved Fractal** (Route Fractal, left slot).  
- currentVersion: `v1.1.0`  

### Versions and Artifacts

- `v0.1.0` — Minimal: базовый скелет ARTEFACT без фактических subfractals и бизнес‑режимов.  
- `v0.2.0` — Mature: добавлен subfractal `ARTIFACT_FS_INSPECTOR` (Minimal Embedded) и статический блок FS Inspector под основной канвой.  
- `v1.0.0` — Improved v1: кнопка “FS Inspector” в клиентской канве управляет видимостью панели подфрактала `ARTIFACT_FS_INSPECTOR` (toggle) через стабильный `id` DOM‑элемента; остальные кнопки работают через toast‑уведомления. `blobUrl` для этой версии будет добавлен после экспорта артефакта.  
- `v1.1.0` — Improved v2 (animations): добавлена анимированная панель FS Inspector — при включении режима панель разворачивается с плавной анимацией высоты и прозрачности, при выключении сворачивается, не меняя контракт Minimal Embedded‑подфрактала. `blobUrl` будет добавлен после экспорта этого состояния.  

## Business Capabilities

### Implemented

1. FS Inspector как отдельный Minimal embedded‑подфрактал `ARTIFACT_FS_INSPECTOR`, монтируемый под основной канвой ARTEFACT (v0.2.0).  

2. **Improved v1: переключение режима FS Inspector**  
   - Клиентский островок ARTEFACT поддерживает локальное состояние активного режима и управляет видимостью контейнера FS Inspector по стабильному `id` DOM‑элемента панели.  
   - Кнопка “FS Inspector”:
     - при первом клике активирует режим FS Inspector и делает панель видимой;
     - при повторном клике отключает режим и скрывает панель.  
   - Остальные режимы (Prompt Builder, Response Parser, Project Schema, Blob Manager, Content Tool) на этой версии остаются “не реализованы” и продолжают работать через toast‑уведомления.  

3. **Improved v2: анимированная панель FS Inspector**  
   - Панель FS Inspector рендерится как серверный контейнер с фиксированным `id="artifact-fs-inspector-panel"` и CSS‑классами для плавного перехода высоты, прозрачности и смещения, оставаясь Minimal Embedded‑подфракталом без собственной routing/SEO‑логики.[attached_file:1][attached_file:6]  
   - Клиентский островок ARTEFACT при смене `activeMode` управляет `max-height`, `opacity` и `translateY` контейнера через DOM‑манипуляции, реализуя разворачивание/сворачивание панели без изменения контракта серверного entry и без вмешательства в правила статической генерации.[attached_file:5][attached_file:14]  

### Planned

- Расширить механику переключения режимов и анимаций на остальные кнопки (Prompt Builder, Response Parser, Project Schema, Blob Manager, Content Tool) по мере выноса их в отдельные subfractals и добавления собственных панелей под основной канвой ARTEFACT.  
