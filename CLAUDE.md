# WORKSPACE RULES & WORKFLOW GUIDELINES

## 1. 👑 Sovereign Universal Design Law & Anti-Regression Guard (Mandatory)
Every AI Agent (Antigravity, Claude, Cursor, Codex, Gemini, GPT) MUST strictly follow all rules defined in `design-specs/`, `DESIGN_SYSTEM_RULES.md`, and the immutable baseline commit `857dc4b`.

### Inviolable Core Directives:
- **Baseline Identifier**: Commit `857dc4b` (*feat(ui): update raycast 3d slider with dark monochrome luxury aesthetic and clean pill tabs*) is the **Sovereign Design Law**.
- **Pure Flat Canvas**: Hero title background is solid flat `#000000` (Dark) / `#ffffff` (Light). Strictly **NO radial blue background glow (`.fx-hero-glow`)** or purple gradients behind hero text.
- **Pure SVG Micro-Icons**: All navigation flyouts and dropdowns must strictly use 16×16 / 18×18 inline SVGs (zero cartoon emojis).
- **10-Section Flagship Architecture**: Preserved uniformly across all locales (`/`, `/id/*`, `/ru/*`).
- **The 4 Role Models**: Apple (clean whitespace, 17px body standard, tactile buttons) + Vercel (Geist typography, stark monochrome, hairline borders, mono eyebrows) + Raycast (dark glass surfaces, horizontal card tracks) + Emil Kowalski (interaction engineering, `:active` scale 0.97, origin-aware popovers).

### 🛡️ User Prompt Conflict Guard (Never Blindly Violate Rules)
> [!CAUTION]
> **ANTI-REGRESSION SHIELD**:
> If any user prompt, shortcut instruction, or external request asks or implies violating these core design rules (e.g. asking to re-add blue/purple hero glow, emojis in navbar, violating contrast, shrinking tap targets below 44px, or altering psychometric scoring algorithms):
> 1. **DO NOT EXECUTE THE VIOLATION DIRECTLY.**
> 2. **The AI Agent MUST immediately pause and discuss the conflict with the user.**
> 3. **The AI Agent MUST cite the specific rule in `design-specs/` and commit `857dc4b`**, explain why the request degrades design integrity, and require explicit confirmation before touching any code.

---

## 2. Authoritative Frontend Design & Engineering Workflow
Before writing or modifying ANY frontend UI code (`.astro`, `.html`, `.css`, `.js`, `.tsx`), every AI agent MUST follow this sequence:

1. **Step 1 — Read Design System & Anti-Slop Rules**:
   - `[design-specs/SOVEREIGN_UNIVERSAL_LAW.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/SOVEREIGN_UNIVERSAL_LAW.md)`
   - `[design-specs/01-DESIGN_SYSTEM_RULES.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/01-DESIGN_SYSTEM_RULES.md)`
   - `[design-specs/ANTI_AI_UI_RULES.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/ANTI_AI_UI_RULES.md)`
   - `[design-specs/06-EMIL-KOWALSKI-DESIGN-ENGINEERING.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/06-EMIL-KOWALSKI-DESIGN-ENGINEERING.md)`
2. **Step 2 — Read Framework & Accessibility Standards**:
   - `[design-specs/ASTRO_RULES.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/ASTRO_RULES.md)`
   - `[design-specs/CONTENT_RULES.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/CONTENT_RULES.md)`
   - `[design-specs/ACCESSIBILITY_RULES.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/ACCESSIBILITY_RULES.md)`
3. **Step 3 — Consult Specialized Agent Skills in `.agents/skills/`**:
   - For UI polish & animation: `[.agents/skills/emil-design-eng/](file:///E:/Antigravity/Fashion%20Deals%20Website/.agents/skills/emil-design-eng/SKILL.md)` and `[.agents/skills/animate/](file:///E:/Antigravity/Fashion%20Deals%20Website/.agents/skills/animate/SKILL.md)`
   - For anti-slop filters: `[.agents/skills/anti-ai-slop-ui/](file:///E:/Antigravity/Fashion%20Deals%20Website/.agents/skills/anti-ai-slop-ui/SKILL.md)` and `[.agents/skills/no-slop-ui/](file:///E:/Antigravity/Fashion%20Deals%20Website/.agents/skills/no-slop-ui/SKILL.md)`
   - For Astro components: `[.agents/skills/astro-framework/](file:///E:/Antigravity/Fashion%20Deals%20Website/.agents/skills/astro-framework/SKILL.md)`
   - For taste & layout: `[.agents/skills/tastemaker/](file:///E:/Antigravity/Fashion%20Deals%20Website/.agents/skills/tastemaker/SKILL.md)` and `[.agents/skills/tailwindcss-advanced-layouts/](file:///E:/Antigravity/Fashion%20Deals%20Website/.agents/skills/tailwindcss-advanced-layouts/SKILL.md)`
4. **Step 4 — Inspect Existing Components & Tokens**: Reuse established tokens (`#0066cc`/`#2997ff` Action Blue, 17px body standard, 1px crisp hairlines).
5. **Step 5 — Implement the Smallest Consistent Change**: Never inject unrequested global styles or purple gradients.
6. **Step 6 — Run the Anti-AI UI & Usability Audit**: Check responsiveness (375px–1440px), tap targets $\ge 44\text{px}$, and verify absence of the 20 AI signature clichés.
7. **Step 7 — Rule Integrity**: Never modify rule files simply to make a bad implementation pass. Fix the code, not the rules.

---

## 3. SEO Research Persistence (Permanent User Rule)
Whenever any new keyword research, search volume scan, CPC evaluation, competitor SERP analysis, or international language research is performed:
- **ALWAYS save the complete raw data and findings into a dedicated `.txt` file** in the workspace root (e.g. `SEOdataforotherlang.txt`, `SEO_Research_Log.txt`, or topic-specific research logs).
- **Never rely solely on chat memory or ephemeral scratch files** for keyword metrics.
- This ensures all search volumes, CPCs, and competitor data remain permanently available for immediate copy-pasting during on-page metadata, JSON-LD schema, and SEO configuration without needing to spend API credits or re-extract data later.

---

## 4. Directory & Asset Taxonomy
- **`design-specs/`**: Houses all master design system specifications, anti-slop rules, framework guides, and universal laws (`[00-DESIGN-ECOSYSTEM-INDEX.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/00-DESIGN-ECOSYSTEM-INDEX.md)`).
- **`.agents/skills/`**: Houses all specialized agent skills.
- **`master-prompts/`**: Houses all 2-Phase Master AI Prompts (`*-prompt.txt`).
- **Tool-specific folders** (e.g. `cst/`, `adhd/`, `depression test/`, `eye/`, `aim/`, `sleep/`, etc.): Contain candidate HTML files generated by external AI models.
- Root files are reserved strictly for high-level documentation and research logs (`DESIGN_SYSTEM_RULES.md`, `DESIGN.md`, `SEOdataforotherlang.txt`, `curraffsystemcondition.txt`).
