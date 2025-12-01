// @/app/[lang]/@rightStatic/(_ABOUT_PAGE)/SPEC.md

# (_ABOUT_PAGE) · Minimal Route Fractal · SPEC

## Lifecycle

- kind: Route Fractal (Minimal)
- currentVersion: v0.1.0

## Purpose

- Provides the canonical Minimal Route skeleton for the About page at `/{lang}/about-page`.
- Demonstrates routing, server entry, Minimal i18n chain, dev-mode visual debugging, and a trivial placeholder UI.

## Structure

- Route root: `app/[lang]/@rightStatic/(_ABOUT_PAGE)/`
- Concrete segment: `about-page/` with `page.tsx` and `layout.tsx`.
- Layers: `(_client)`, `(_server)`, `(_shared)`, plus `(_subfractals)` for future embedded children.

## i18n (Minimal)

- Single translation key: `greeting`.
- Explicit translations only for `en`, `ru`, `es` in `fractal-about-page-translation.json`.

## Subfractals

- `(_subfractals)/` is present but empty at Minimal stage.
- Any future child without its own `page.tsx` must follow the Minimal Embedded Fractal standard.

## Notes for Tools and Models

- This fractal is a frozen Minimal Route template: structure, file names, and component naming MUST be copied 1:1 for any ABOUT_PAGE Minimal Route instance.
- Only placeholder values (fractal name, slot, URL segment) and textual content (SPEC.md text, translations) may change.
