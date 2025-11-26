# HOME Fractal SPEC

## 1. Purpose

This fractal defines the public HOME route rendered in the rightStatic slot and acts as an AIFA Next.js starter homepage.  
Its primary purpose is to demonstrate the AIFA fractal architecture and multi-language offering on a simple, marketing-style landing page.

## 2. Scope

In scope (Minimal stage):
- Static homepage route under `app/[lang]/@rightStatic/(_PUBLIC)/(_HOME)/home/page.tsx`.
- Basic hero-like content and lightweight page copy that introduces the AIFA starter.
- Visible multi-language awareness (language-dependent text, labels, calls to action).

Out of scope (Minimal stage):
- Advanced layout system, rich content sections, and complex navigation.
- SEO metadata, JSON-LD, and any `_page_seo_tools` integration.
- Auth flows, dashboards, or deep product features.

## 3. Initial Subfractals Plan

At Minimal stage, this HOME fractal does not implement subfractals yet.  
Planned future subfractals (for Mature/Improved stages), subject to separate SPECs:
- `HOME_HERO_SECTION` – main hero and primary CTA zone.
- `HOME_FEATURES_SECTION` – brief feature list for the AIFA starter.
- `HOME_LOCALE_SHOWCASE_SECTION` – visual explanation of multi-language support and regions.
- `HOME_FOOTER_SECTION` – footer with links and legal information.

## 4. Constraints and Guidelines (Initial)

- Rendering mode: must comply with `@rightStatic` slot rules (static-first, no force-dynamic routing in this tree).
- Page shell `page.tsx` acts only as a routing shell and must call a single `FractalEntry` in `(_server)/fractal-entry.ts`, with no direct imports of internal UI components.
- Minimal Route Fractal restrictions apply: no SEO helpers, no `generateMetadata`, no JSON-LD until this fractal becomes Mature.

## 5. Global Project Context and Languages

- Global SPEC reference: `config/global-SPEC.md` (defines overall product, user groups, and platform goals).
- Global supported languages are configured via `NEXT_PUBLIC_SUPPORTED_LANGUAGES` and the central translations config; for this project they include:  
  `en, es, fr, de, it, pt, nl, be, ie, lu, ch, ru, pl, uk, cs, ro, bg, sr, hr, sk, hu, sw, am, ha, yo, zu, af, zh, ja, ko, hi, vi, th, id, bn, sv, no, da, fi, et, lv, lt, el, ka` (full global list).  

Minimal-stage language constraint:
- This HOME fractal actively maintains explicit translations only for **three** languages: `en`, `ru`, `es`.  
- All other globally configured languages fall back via the standard AIFA translations pattern (fallback to English or key), until this fractal is promoted to Mature or later.

Data access strategy (Minimal stage):
- Content is treated as static starter copy (no external APIs or databases).
- `fractal-entry.ts` may use simple inline data or filesystem-backed content later; for now it focuses on wiring translations and placeholder page data.

## 6. Key User Stories (Short)

- As a new visitor, I can open the HOME page and immediately see that this is an AIFA Next.js starter with multi-language support.
- As a developer or architect, I can use this page as a live example of a Minimal Route Fractal with translations and a clear structure (page shell → FractalEntry → server/client consumers).

## 7. Stage and Evolution Notes

- Current stage: **Minimal Route Fractal**.  
- Current version: `v0.1.0` (starter skeleton, placeholder content, minimal i18n triplet).  

Planned evolution:
- Mature: introduce real sections (hero, features, locale showcase, footer) as subfractals and first meaningful layout/styling.
- Improved: iterate on content, visuals, and possibly SEO once the fractal is promoted to Mature.

## 8. Open Questions

- Exact visual design and brand tone for the HOME content (to be defined later).
- Which subset of the full language list should receive explicit translations beyond `en`, `ru`, `es` when the fractal reaches Mature stage.
- Whether this HOME page will later integrate any dynamic data (e.g. recent changes, release notes) or remain fully static.
