<!-- @/app/[lang]/@left/(_ARTIFACT)/SPEC.md -->

// @/app/[lang]/@left/(_ARTIFACT)/SPEC.md
---
specVersion: 1.0.0
stage: Mature
currentVersion: v0.2.0
fractalId: _ARTIFACT
kind: Route
---

# AIFA Fractal SPEC.md — (_ARTIFACT)

## 1. Purpose

The (_ARTIFACT) route fractal owns the left-slot Artifact UI at `/[lang]/artifact` and provides the main control surface for working with AIFA fractals through Perplexity chats, filesystem operations and Blob artifacts.  
It orchestrates high-level tools such as prompt generation, project structure inspection, response parsing, explicit application of changes to the filesystem, and artifact export, without embedding low-level auth or storage logic in this fractal itself.[file:4][file:3]

## 2. Scope

**In scope**

- Present the Artifact UI in the left slot and list available tools for the currently active fractal or sub-fractal (e.g. filesystem scanner, prompt builders, response parser, Blob export helpers).[file:4]  
- Provide a Response Parser panel that can read the latest Perplexity answer, extract code/SPEC fragments into a structured internal model, show a preview of parsed files, and trigger an explicit “Apply” action to write those changes into the project filesystem via typed server actions.[file:4]  
- Route user actions from buttons and panels (including the new Response Parser Apply button) to dedicated server actions living under this fractal’s server/actions layer, with clear success and error feedback in the UI.[file:16]  

**Out of scope**

- Implementing low-level authentication, authorization, Perplexity integration, or filesystem/Blob adapters; these remain infrastructure concerns outside of the standard fractal lifecycle and must not be modified from this fractal.[file:4]  
- Auto-applying model responses without user confirmation or performing destructive operations (deletes, large refactors) without an explicit, visible confirmation step.  
- Managing business behaviour of individual domain fractals (e.g. HOMEPAGE, HEROSECTION); this fractal only orchestrates tooling around them.

## 3. Initial Subfractals Plan

Existing and planned subfractals under `app/[lang]/@left/(_ARTIFACT)/(_subfractals)`:

- `(_RESPONSE_PARSER)` — Minimal Embedded sub-fractal that owns the Response Parser UI: reading the latest response, extracting structured file entries, showing parsed files preview, and wiring the “Apply parsed changes” button to the corresponding server action while keeping all parsing/apply logic inside server/shared code.[file:10][file:9]  
- `(_PLUGIN_FRACTAL_MANAGER)` — Planned Minimal Embedded sub-fractal (future) for managing per-fractal feature toggles and “plugins” (e.g. enabling/disabling use of specific tools like Response Parser or Blob export per fractal), without touching global auth or infra wiring.  

At the Mature stage of (_ARTIFACT), only small, well-scoped embedded subfractals like these are expected; any further decomposition must follow the Subfractals rules and respect layer limits before adding new roots under `(_subfractals)`. [file:10][file:16]

## 4. Constraints & Initial Guidelines

- The left slot chat/auth/filesystem integration is treated as infrastructure and must not be redesigned or significantly extended inside this project; the (_ARTIFACT) fractal may add UI around existing server actions but cannot introduce new auth flows or storage backends.[file:4]  
- Response Parser Apply must always operate on a reviewed, human-confirmed parse result: the user first runs Extract, inspects the parsed files preview, and only then triggers Apply; no auto-apply flows or background application of responses are allowed.  
- All new server actions for parsing and applying responses must live under `server/(_actions)` for this fractal, respect AIFA server-layer limits (12 entries at root), and use strongly-typed inputs/outputs aligned with shared types for parsed files and operations.[file:16][file:3]  

## 5. Open Questions

- Do we need per-fractal permissions or toggles (likely via the future `(_PLUGIN_FRACTAL_MANAGER)` sub-fractal) to restrict which fractals may use Response Parser Apply, or is global availability acceptable for now?  
- Should Response Parser Apply support conflict resolution (e.g. showing diffs when the on-disk file changed since extraction), and if yes, does that belong in this fractal or in a dedicated conflict-resolution sub-fractal?  
- How far should the Artifact UI go in tracking history of applied responses (local log vs. integration with external audit/Blob history)?

## 6. Global Project Context, Inherited Properties & Data Access Strategy

- Global SPEC: this fractal inherits overall product context, domains, and user groups from `config/global-SPEC.md`, including the rule that every fractal has its own SPEC, lifecycle, and Blob artifact history tracked in that SPEC.[file:15][file:3]  
- Languages: the application supports a global set of languages defined in shared configuration (e.g. `SupportedLanguage`), but at Minimal stage each fractal is required to actively support only `en`, `ru`, and `es`, with other languages served via fallback; (_ARTIFACT) and its subfractals follow the same base rule unless explicitly extended in their own SPECs.[file:10][file:15]  
- Data access: this fractal primarily uses server actions and filesystem-based queries (fsqueries, blobqueries, gitqueries) to inspect and mutate the AIFA project tree and to work with Blob artifacts; it must never bypass the standard server-layer folders defined in the Layers/Folders catalog.[file:16]  

## 7. Fractal Instantiation Template Variables (Minimal Starter only)

Although (_ARTIFACT) is now at the Mature stage, it was originally instantiated as a Minimal Route fractal; the Instantiation block below remains the single source of truth for Minimal template expansion. [file:3][file:15]

