# Universal Design System & Aesthetic Formula
# Version: 2.6.0 (Permanent Master Foundation)
# Blending: Apple Human Interface + Vercel Geist + Raycast Reel + Emil Kowalski Craft + Anti-Vibe-Code Standards
# Sovereign Baseline: Commit 857dc4b (LOCKED & IMMUTABLE UNIVERSAL LAW)

> [!IMPORTANT]
> **IMMUTABLE UNIVERSAL DESIGN BASELINE (Commit `857dc4b`)**:
> - **Hero Canvas**: Pure flat obsidian (`#000000`) / pure white (`#ffffff`). Strictly zero radial background glows (`.fx-hero-glow`), zero gradients behind hero headline text.
> - **Navigation**: Apple frosted glass dropdowns with 100% inline SVG micro-icons (zero cartoon emojis).
> - **Structure**: 10-section flagship architecture preserved across all locales.


================================================================================
PRIMARY SPECIFICATION REFERENCES & MASTER DIRECTORY
================================================================================
All comprehensive design specifications, agent skills, and rules are isolated in `[design-specs/](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/00-DESIGN-ECOSYSTEM-INDEX.md)`:

* 📑 **Master Ecosystem Index**: `[design-specs/00-DESIGN-ECOSYSTEM-INDEX.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/00-DESIGN-ECOSYSTEM-INDEX.md)`
* 📜 **Master Design Rules**: `[design-specs/01-DESIGN_SYSTEM_RULES.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/01-DESIGN_SYSTEM_RULES.md)`
* 🚫 **Anti-AI-Slop & Anti-Vibe-Code Rules**: `[design-specs/ANTI_AI_UI_RULES.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/ANTI_AI_UI_RULES.md)`
* ✨ **Emil Kowalski Design Engineering (Linear/Vercel)**: `[design-specs/06-EMIL-KOWALSKI-DESIGN-ENGINEERING.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/06-EMIL-KOWALSKI-DESIGN-ENGINEERING.md)` & `[.agents/skills/emil-design-eng/](file:///E:/Antigravity/Fashion%20Deals%20Website/.agents/skills/emil-design-eng/SKILL.md)`
* 🚀 **Astro 5+ Framework Standards**: `[design-specs/ASTRO_RULES.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/ASTRO_RULES.md)`
* ✍️ **Editorial & Scientific Content Rules**: `[design-specs/CONTENT_RULES.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/CONTENT_RULES.md)`
* ♿ **Accessibility & Usability (WCAG)**: `[design-specs/ACCESSIBILITY_RULES.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/ACCESSIBILITY_RULES.md)`
* 🍎 **Apple Design Specification**: `[design-specs/03-APPLE-DESIGN-SPECIFICATION.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/03-APPLE-DESIGN-SPECIFICATION.md)`
* ⬛ **Vercel Design Specification**: `[design-specs/04-VERCEL-DESIGN-SPECIFICATION.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/04-VERCEL-DESIGN-SPECIFICATION.md)`
* ⚡ **Raycast 3D Card Reel Architecture**: `[design-specs/05-RAYCAST-3D-CARD-ARCHITECTURE.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/05-RAYCAST-3D-CARD-ARCHITECTURE.md)`
* 📦 **Installed Agent Skills**: `[design-specs/07-AGENT-SKILLS-REGISTRY.md](file:///E:/Antigravity/Fashion%20Deals%20Website/design-specs/07-AGENT-SKILLS-REGISTRY.md)`

================================================================================
CORE ARCHITECTURE & DESIGN PHILOSOPHY
================================================================================
FreeIQExam.com blends these design languages to create an atmosphere of **Clinical Authority, Scientific Rigor, and Modern Developer-Grade Luxury**:

1. **Apple Human Interface**:
   - Monumental typography with tight negative letter-spacing (`-0.025em`).
   - Spacious whitespace and unhurried reading cadence (17px body standard).
   - Single Action Blue accent (`#0066cc` / `#2997ff`) for high-intent conversion.
   - Full-pill tactile CTAs with responsive spring interactions (`active:scale-[0.98]`).

2. **Vercel Geist Precision**:
   - Stark monochrome contrast: Near-black ink (`#09090b` / `#171717`) on near-white canvas (`#ffffff` / `#fafafa`) in Light Mode; Pure Obsidian (`#000000` / `#060709`) in Dark Mode.
   - Strict 1px hairline borders (`#e4e4e7` light, `#27272a` / `rgba(255,255,255,0.08)` dark).
   - Monospace uppercase eyebrow hierarchy (`font-mono uppercase tracking-wider`).
   - Extreme color restraint: Saturated hues are strictly confined to badge pills, status dots, and subtle ambient glows — NEVER flat rainbow flood fills.

3. **Apple / Raycast Horizontal Card Scroll Architecture**:
   - Cards slide smoothly across the viewport with full-bleed screen width (`100vw`).
   - Deep dark glass cards infused with domain-specific ambient lighting.

4. **Emil Kowalski Design Engineering & Micro-Interactions**:
   - Tactile feedback: Every pressable element responds with `scale(0.97)` on `:active`.
   - Never animate from `scale(0)`; start from `scale(0.95)` with `opacity: 0`.
   - Popovers scale from their trigger origin (`transform-origin: var(--transform-origin)`).
   - Fast UI animations: Keep interactions under 250ms with custom `cubic-bezier(0.23, 1, 0.32, 1)`.

================================================================================
1. CANVASES, SURFACES & ELEVATION
================================================================================

| Element | Light Mode | Dark Mode | Styling Rule |
|---|---|---|---|
| **Base Canvas** | `#ffffff` | `#000000` / `#060709` | Pure, distraction-free foundation |
| **Parchment Section** | `#f5f5f7` | `#090a0f` | Alternating section backgrounds serve as dividers |
| **Card Surfaces** | `#ffffff` | `#0f1016` (Dark Glass) | 1px hairline border + subtle top bevel highlight |
| **Hairline Borders** | `1px solid #e4e4e7` (zinc-200) | `1px solid rgba(255,255,255,0.08)` | 1px crisp definition before any shadow |
| **Elevation / Shadows** | Flat hairline or `0 1px 2px rgba(0,0,0,0.03)` | Top glass bevel `0 1px 0 rgba(255,255,255,0.1) inset` | ZERO heavy muddy drops; no double nested borders |

================================================================================
2. COLOR PALETTES & TOKEN SYSTEM
================================================================================

### A. Primary Action & Text Tokens
* **Action Blue (Primary CTA & Interactive Links)**:
  - Light Mode: `#0066cc` (hover: `#0071e3` / `#2563eb`)
  - Dark Mode: `#2997ff` (hover: `#3b82f6`)
* **Ink Hierarchy (Text)**:
  - **Ink Primary (Headings / H1-H3)**: `#09090b` (Light) / `#ffffff` (Dark) — Maximum contrast and legibility.
  - **Ink Secondary (Body Paragraphs)**: `#52525b` (Light) / `#a1a1aa` (Dark) — Calm, editorial reading pace.
  - **Ink Muted (Footnotes / Captions)**: `#71717a` (Light) / `#71717a` (Dark).

### B. Controlled Domain & Scientific Accents (Brand Identity)
*Colors are used ONLY for micro icon glyphs, monospace badge pills, and subtle radial ambient halos. Never apply saturated background flood-fills to entire cards.*
* 🧩 **Fluid Reasoning ($G_f$)**: Cosmic Sapphire (`#2563eb` / `#3b82f6` | Ambient: `rgba(14, 55, 88, 0.45)`)
* 🧊 **Visual-Spatial ($G_v$)**: Royal Violet (`#7c3aed` / `#8b5cf6` | Ambient: `rgba(58, 28, 92, 0.45)`)
* 🔢 **Quantitative ($G_q$)**: Mint / Emerald (`#059669` / `#10b981` | Ambient: `rgba(16, 68, 54, 0.45)`)
* 📖 **Verbal Reasoning ($G_c$)**: Warm Amber / Gold (`#d97706` / `#f59e0b` | Ambient: `rgba(85, 65, 12, 0.40)`)
* ⚡ **Reflex & Speed ($G_s$)**: Rose / Crimson (`#e11d48` / `#f43f5e` | Ambient: `rgba(88, 25, 42, 0.45)`)
* 📋 **Clinical Screeners**: Medical Authority Teal (`#0d9488` / `#14b8a6` | Ambient: `rgba(24, 45, 105, 0.45)`)

================================================================================
3. BRAND TYPOGRAPHY: THE SCIENTIFIC PRECISION TRIAD (LOCKED)
================================================================================

```css
--font-display: 'Geist', -apple-system, sans-serif;
--font-body: 'Inter', -apple-system, sans-serif;
--font-mono: 'Geist Mono', 'JetBrains Mono', monospace;
```

| Level | Font Family | Size | Weight | Line Height | Tracking | Application |
|---|---|---|---|---|---|---|
| **Display H1** | **`Geist`** | 48px – 64px (`text-4xl sm:text-5xl md:text-6xl`) | Extrabold (800) | 1.08 | `-0.025em` (tight) | Hero Monumental Display Title |
| **Section H2** | **`Geist`** | 32px – 44px (`text-3xl sm:text-4xl md:text-5xl`) | Bold (700) | 1.15 | `-0.02em` | Major Section Titles |
| **Card Title H3** | **`Geist`** | 20px – 24px (`text-xl sm:text-2xl`) | Semibold (600) | 1.30 | `-0.01em` | Feature & Bento Card Headings |
| **Body Large** | **`Inter`** | 17px – 18px (`text-[17px] sm:text-lg`) | Regular (400) | 1.60 – 1.65 | Normal | Hero Lead & Major Intro Text (Apple 17px standard) |
| **Body Regular** | **`Inter`** | 15px – 16px (`text-[15px] sm:text-base`) | Regular (400) | 1.55 – 1.60 | Normal | Card Descriptors & Editorial Copy |
| **Eyebrow / Badge** | **`Geist Mono`** | 13px – 14px (`text-xs sm:text-sm`) | Medium (500) | 1.40 | `+0.05em` (wide) | Protocol citations (`WHO ASRS v1.1`), telemetry (`182 ms`), chips |
| **Buttons** | **`Geist`** / **`Inter`** | 15px – 16px (`text-sm sm:text-base`) | Semibold (600) | 1.00 | Normal | Action Buttons & Category Tabs |

*Rule: Text must NEVER fall below 13px anywhere on the website.*

================================================================================
4. ANIMATION & MOTION STANDARDS (EMIL KOWALSKI CRAFT)
================================================================================

1. **The 250ms Rule**:
   - UI micro-interactions must stay between **120ms – 250ms**.
   - Button press feedback: `120ms – 160ms`.
   - Tooltips / small popovers: `125ms – 200ms`.
   - Modals / Drawers: `200ms – 280ms`.

2. **Custom Easing Curves**:
   ```css
   /* Strong ease-out for entering elements */
   --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
   
   /* Strong ease-in-out for movement across canvas */
   --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
   
   /* Tactile spring feel */
   --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
   ```

3. **Tactile Button Grammar**:
   - Always apply `active:scale-[0.97]` or `active:scale-[0.98]` with `transition: transform 160ms ease-out`.
   - Never use `transition: all`. Specify exact properties (`transform`, `opacity`, `border-color`).

================================================================================
5. STRICT DO'S AND DON'TS (NON-NEGOTIABLE)
================================================================================

### DO:
- ✅ Keep the monochrome duet (Black/White/Zinc) as the foundation of 90%+ of the UI.
- ✅ Use Action Blue (`#0066cc` / `#2997ff`) as the sole high-intent action accent.
- ✅ Use 1px crisp hairline borders on cards instead of heavy dark drop shadows.
- ✅ Maintain generous line height (`leading-relaxed`) and large, legible font sizes (17px body standard).
- ✅ Wrap interactive cards in full anchor tags (`<a>`) with `min-h-[44px]` tap targets.
- ✅ Use subtle, atmospheric ambient glows behind card graphics to create luxury depth with our 6 brand domain colors.
- ✅ Bleed interactive card sliders 100vw edge-to-edge while keeping headers container-aligned.
- ✅ Apply Emil Kowalski's tactile `:active` scaling (`scale(0.97)`) to interactive elements.

### DON'T:
- ❌ NEVER create cartoonish rainbow cards or saturated background color blocks.
- ❌ NEVER introduce nested double borders (inner box inside an outer boxed card).
- ❌ NEVER use font sizes below 13px.
- ❌ NEVER use cramped, dense layouts without sufficient vertical whitespace (`py-20` to `py-28`).
- ❌ NEVER add heavy muddy drop shadows to cards, buttons, or text.
- ❌ NEVER allow horizontal browser scrollbars on tab pill bars.
- ❌ NEVER use purple gradients or AI vibe-coded clichés.
