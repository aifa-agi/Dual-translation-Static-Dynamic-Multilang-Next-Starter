<!-- app/[lang]/@rightStatic/(_PRICE_LIST)/SPEC.md -->

# (_PRICE_LIST) · Minimal Route Fractal · SPEC

## Lifecycle

- kind: Route Fractal (Minimal)
- currentVersion: v0.2.0

## Purpose

- Provides the canonical Minimal Route skeleton for this route fractal at `/{lang}/price-list`.
- Demonstrates routing, a single server entry, Minimal i18n chain, and a trivial placeholder UI for this route.
- Demonstrates canonical parent–child wiring with one Minimal Embedded Fractal mounted under `(_subfractals)` via an embedding slot.
- Exposes dev-mode visual debugging for this fractal: level-based color highlighting and a dev label for copying the fractal path.

## Structure

- Route root: `app/[lang]/@rightStatic/(_PRICE_LIST)/`
- Concrete segment: `price-list/` with `page.tsx` (route shell) and `layout.tsx` (scroll/fixed layout wrapper).
- Layers: `(_client)`, `(_server)`, `(_shared)`, plus `(_subfractals)` for embedded children.
- Single canonical embedded child at Minimal stage:
  - Root: `app/[lang]/@rightStatic/(_PRICE_LIST)/(_subfractals)/(_PRICE_LIST_SUBDOMAIN)/`
  - Entry for parent: `price-list-subdomain-embedding-slot.tsx` → `FractalPriceListSubdomainEntry`.

## i18n (Minimal)

- Single translation key: `greeting`.
- Explicit translations only for `en`, `ru`, `es` in `fractal-price-list-translation.json`.
- Translations are loaded exclusively in the single server entry and passed down as props to server and client consumers.
- The embedded child fractal follows the same Minimal i18n contract with its own `fractal-price-list-subdomain-translation.json`.

## Subfractals

- `(_subfractals)/` is present and contains exactly one Minimal Embedded Fractal: `(_PRICE_LIST_SUBDOMAIN)`.
- The embedded fractal has its own SPEC, `(_client)`, `(_server)`, `(_shared)` layers and Minimal i18n with the same `greeting` key (`en`, `ru`, `es`).
- The parent route fractal mounts the embedded fractal only via the embedding slot connector.

## Dev Mode Tooling

- In development mode, the main fractal container is wrapped into a level-aware dev shell.
- A dev-only label handler (`FractalPriceListDevLabelHandler`) is rendered in the fractal container.
- The embedded sub-fractal uses a similar dev label handler with its own `fractalDevPath`.
