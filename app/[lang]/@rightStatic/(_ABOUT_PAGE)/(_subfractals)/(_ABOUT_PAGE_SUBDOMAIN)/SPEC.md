<!-- app/[lang]/@rightStatic/(_ABOUT_PAGE)/subfractals/(_ABOUT_PAGE_SUBDOMAIN)/SPEC.md -->

# ABOUT_PAGE_SUBDOMAIN SPEC

## Purpose

Minimal embedded sub-fractal for the About page that renders static server and client labels for debugging and composition demos.

## Type and Placement

- Type: Minimal Embedded Fractal (no own route, mounted via embedding-slot from the (_ABOUT_PAGE) route fractal).
- Root: `app/[lang]/@rightStatic/(_ABOUT_PAGE)/subfractals/(_ABOUT_PAGE_SUBDOMAIN)`
- Entry for parent: `about-page-subdomain-embedding-slot.tsx` → `FractalAboutPageSubdomainEntry`.

## Current Stage and Version

- Lifecycle stage: Minimal Embedded.
- Current version: v0.1.0.
- Layers: `(_client)`, `(_server)`, `(_shared)`.
- i18n: `greeting` key with `en`, `ru`, `es` according to the Minimal Embedded standard.

## Intended Capabilities (Minimal)

- Provide a thin embedded block with:
  - Server component label: `SERVER COMPONENT: ABOUT_PAGE_SUBDOMAIN`.
  - Client component label: `CLIENT COMPONENT: ABOUT_PAGE_SUBDOMAIN`.
- Reuse the same i18n chain and color/level container logic as other Minimal Embedded fractals.

## Future Evolution

- Extend server consumer with real server-side logic once the About subdomain feature is defined.
- Extend client island with interactive controls while preserving the translation and embedding contracts.
