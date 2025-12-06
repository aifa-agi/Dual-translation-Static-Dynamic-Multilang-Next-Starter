<!-- @/app/[lang]/@rightStatic/(_PRICE_LIST)/(_subfractals)/(_PRICE_LIST_SUBDOMAIN)/SPEC.md -->

# (_PRICE_LIST_SUBDOMAIN) · Minimal Embedded Fractal · SPEC

## Purpose

Minimal embedded sub-fractal for the parent route that renders static server and client labels for debugging and composition demos.

## Type and Placement

- Type: Minimal Embedded Fractal (no own route, mounted via embedding-slot from the parent route fractal).
- Root: `app/[lang]/@rightStatic/(_PRICE_LIST)/(_subfractals)/(_PRICE_LIST_SUBDOMAIN)`
- Entry for parent: `price-list-subdomain-embedding-slot.tsx` → `FractalPriceListSubdomainEntry`.

## Current Stage and Version

- Lifecycle stage: Minimal Embedded.
- Current version: v0.1.0.
- Layers: `(_client)`, `(_server)`, `(_shared)`.
- i18n: `greeting` key with `en`, `ru`, `es` according to the Minimal Embedded standard.

## Intended Capabilities (Minimal)

- Provide a thin embedded block with:
  - Server component label: `SERVER COMPONENT: PriceListSubdomain`.
  - Client component label: `CLIENT COMPONENT: PriceListSubdomain`.
- Reuse the same i18n chain and color/level container logic as other Minimal Embedded fractals.

## Future Evolution

- Extend server consumer with real server-side logic once the embedded domain feature is defined.
- Extend client island with interactive controls while preserving the translation and embedding contracts.
