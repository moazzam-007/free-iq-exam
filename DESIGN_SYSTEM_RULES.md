# FreeIQExam.com Universal Design System & Aesthetic Formula
# Version: 2.0.0 (Permanent Foundation Rulebook)
# Blending: Apple Human Interface + Vercel Geist Precision

================================================================================
CORE ARCHITECTURE & DESIGN PHILOSOPHY
================================================================================
FreeIQExam.com blends two world-class design languages to create an atmosphere of **Clinical Authority, Scientific Rigor, and Modern Developer-Grade Luxury**:

1. **Apple Human Interface (`apple/DESIGN.md`)**:
   - Monumental typography with tight negative letter-spacing.
   - Spacious whitespace and unhurried reading cadence (17px body standard).
   - Single Action Blue accent (`#0066cc` / `#2997ff`) for high-intent conversion.
   - Full-pill tactile CTAs with responsive spring interactions (`scale(0.98)`).

2. **Vercel Geist Precision (`vercel/DESIGN.md`)**:
   - Stark monochrome contrast: Near-black ink (`#09090b` / `#171717`) on near-white canvas (`#ffffff` / `#fafafa`) in Light Mode; Pure Obsidian (`#000000` / `#060709`) in Dark Mode.
   - Strict 1px hairline borders (`#e4e4e7` light, `#27272a` / `rgba(255,255,255,0.08)` dark).
   - Monospace uppercase eyebrow hierarchy (`font-mono uppercase tracking-wider`).
   - Extreme color restraint: Saturated hues are strictly confined to badge pills, status dots, and subtle ambient glows — NEVER flat rainbow flood fills.

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

### B. Controlled Domain & Scientific Accents (Strict Restraint)
*Colors are used ONLY for micro icon glyphs, monospace badge pills, and subtle radial ambient halos. Never apply saturated background flood-fills to entire cards.*
* 🧩 **Fluid Reasoning ($G_f$)**: Cosmic Sapphire (`#2563eb` / `#3b82f6` | Ambient: `rgba(14, 55, 88, 0.45)`)
* 🧊 **Visual-Spatial ($G_v$)**: Royal Violet (`#7c3aed` / `#8b5cf6` | Ambient: `rgba(58, 28, 92, 0.45)`)
* 🔢 **Quantitative ($G_q$)**: Mint / Emerald (`#059669` / `#10b981` | Ambient: `rgba(16, 68, 54, 0.45)`)
* 📖 **Verbal Reasoning ($G_c$)**: Warm Amber / Gold (`#d97706` / `#f59e0b` | Ambient: `rgba(85, 65, 12, 0.40)`)
* ⚡ **Reflex & Speed ($G_s$)**: Rose / Crimson (`#e11d48` / `#f43f5e` | Ambient: `rgba(88, 25, 42, 0.45)`)
* 📋 **Clinical Screeners**: Medical Authority Teal (`#0d9488` / `#14b8a6` | Ambient: `rgba(24, 45, 105, 0.45)`)

================================================================================
3. TYPOGRAPHY STANDARDS (STRICT: NO TINY TEXT)
================================================================================

| Level | Size | Weight | Line Height | Tracking | Application |
|---|---|---|---|---|---|
| **Display H1** | 48px – 64px (`text-4xl sm:text-5xl md:text-6xl`) | Extrabold (800) | 1.08 | `-0.025em` (tight) | Hero Monumental Display Title |
| **Section H2** | 32px – 44px (`text-3xl sm:text-4xl md:text-5xl`) | Bold (700) | 1.15 | `-0.02em` | Section Titles |
| **Card Title H3** | 20px – 24px (`text-xl sm:text-2xl`) | Semibold (600) | 1.30 | `-0.01em` | Feature & Bento Card Headings |
| **Body Large** | 17px – 18px (`text-base sm:text-lg`) | Regular (400) | 1.60 – 1.65 | Normal | Hero Lead & Major Intro Text |
| **Body Regular** | 15px – 16px (`text-sm sm:text-base`) | Regular (400) | 1.55 – 1.60 | Normal | Card Descriptors & Editorial Copy |
| **Eyebrow / Badge** | 13px – 14px (`text-xs sm:text-sm`) | Medium (500) | 1.40 | `+0.05em` (wide) | Monospace Section Overlines & Chips |
| **Buttons** | 15px – 16px (`text-sm sm:text-base`) | Semibold (600) | 1.00 | Normal | Action Buttons & Category Tabs |

*Rule: Text must NEVER fall below 13px anywhere on the website.*

================================================================================
4. BUTTON GRAMMAR & INTERACTION PHYSICS
================================================================================

1. **Marketing Primary CTAs (Full Pill)**:
   - Shape: `rounded-full` (`100px` / `rounded-pill`).
   - Padding: `px-7 py-3.5` to `px-8 py-4`.
   - Interaction: Smooth hover transition + active spring feedback (`hover:scale-[1.01] active:scale-[0.98]`).
   - Style: High-contrast Solid Blue or Solid Ink with crisp white text.

2. **Secondary / Outline Buttons**:
   - Shape: `rounded-full`.
   - Style: Translucent glass or 1px hairline border (`bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700`).

3. **Segmented Category Pills (Tab Switchers)**:
   - Container: Dark capsule (`bg-zinc-900/90 border border-zinc-800 rounded-full p-1`).
   - Active Tab: Solid high-contrast pill (`bg-[#27272a] text-white font-semibold shadow-xs`).
   - Inactive Tabs: `text-zinc-400 hover:text-white transition-colors`.
   - Overflow Rule: No ugly horizontal scrollbars (`scrollbar-none` or flex-wrap).

4. **Circular Icon Controls**:
   - Diameter: `w-11 h-11` (`44px` minimum tap target).
   - Shape: `rounded-full`.
   - Style: Dark glass with 1px subtle top border and hover scaling (`scale-105`).

================================================================================
5. LAYOUT RHYTHM & FULL-WIDTH CAROUSEL BLEED
================================================================================
* **Vertical Section Rhythm**: Generous padding (`py-16 sm:py-24 md:py-28`) ensuring monumental breathing room.
* **Content Container**: Standard centered container locks at `max-w-7xl mx-auto px-4 sm:px-6` (or `max-w-6xl`).
* **Interactive Carousel Bleed Rule**:
  - The Section Header remains inside `max-w-7xl mx-auto`.
  - The sliding card track bleeds **100% full-width (`100vw`)** edge-to-edge across the viewport.
  - The first card aligns with the header container using `padding-left: max(1rem, calc((100vw - 80rem) / 2 + 1.5rem))`.
  - Smooth edge mask fade (`mask-image: linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)`).

================================================================================
6. STRICT DO'S AND DON'TS (NON-NEGOTIABLE)
================================================================================

### DO:
- ✅ Keep the monochrome duet (Black/White/Zinc) as the foundation of 90%+ of the UI.
- ✅ Use Action Blue (`#0066cc` / `#2997ff`) as the sole high-intent action accent.
- ✅ Use 1px crisp hairline borders on cards instead of heavy dark drop shadows.
- ✅ Maintain generous line height (`leading-relaxed`) and large, legible font sizes.
- ✅ Wrap interactive cards in full anchor tags (`<a>`) with `min-h-[44px]` tap targets.
- ✅ Use subtle, atmospheric ambient glows behind card graphics to create luxury depth.

### DON'T:
- ❌ NEVER create cartoonish rainbow cards or saturated background color blocks.
- ❌ NEVER introduce nested double borders (inner box inside an outer boxed card).
- ❌ NEVER use font sizes below 13px.
- ❌ NEVER use cramped, dense layouts without sufficient vertical whitespace.
- ❌ NEVER add heavy muddy drop shadows to cards, buttons, or text.
- ❌ NEVER allow horizontal browser scrollbars on tab pill bars.
