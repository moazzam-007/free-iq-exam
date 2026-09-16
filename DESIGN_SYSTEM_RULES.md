# FreeIQExam.com Universal Design System & Aesthetic Formula
# Version: 2.1.0 (Permanent Foundation Rulebook)
# Blending: Apple Human Interface + Vercel Geist Precision + Raycast 3D Card Architecture

================================================================================
PRIMARY SOURCE REFERENCES & INSPIRATION PATHS
================================================================================
For all design iterations, component builds, and visual verification, reference these master specification files:

* 🍎 **Apple Design System Specification**:
  - Path: `[apple/DESIGN.md](file:///E:/Antigravity/freeiqexam.com/apple/DESIGN.md)`
  - Key Principles: 17px body standard, -0.374px display tracking, single Action Blue `#0066cc` / `#2997ff`, parchment dividers, zero decorative drop-shadows.

* ⬛ **Vercel Design System Specification**:
  - Path: `[vercel/DESIGN.md](file:///E:/Antigravity/freeiqexam.com/vercel/DESIGN.md)`
  - Key Principles: Geist monochrome duet, 1px crisp hairlines (`#e4e4e7` / `#27272a`), bimodal button grammar (pills for CTAs, 6px for UI), uppercase mono eyebrows (`13px-14px`).

* ⚡ **Raycast Interactive 3D Card Reel Specification**:
  - Path: `[DESIGN.md](file:///E:/Antigravity/Fashion%20Deals%20Website/DESIGN.md)`
  - Master Prompt: `[master-prompts/raycast-card-slider-prompt.txt](file:///E:/Antigravity/Fashion%20Deals%20Website/master-prompts/raycast-card-slider-prompt.txt)`
  - Key Principles: Full-bleed 100vw sliding track, dark luxury glass cards (`#0f1016`), subtle ambient halos, grab drag physics, and smooth edge masks.

================================================================================
CORE ARCHITECTURE & DESIGN PHILOSOPHY
================================================================================
FreeIQExam.com blends these design languages to create an atmosphere of **Clinical Authority, Scientific Rigor, and Modern Developer-Grade Luxury**:

1. **Apple Human Interface**:
   - Monumental typography with tight negative letter-spacing (`-0.025em`).
   - Spacious whitespace and unhurried reading cadence (17px body standard).
   - Single Action Blue accent (`#0066cc` / `#2997ff`) for high-intent conversion.
   - Full-pill tactile CTAs with responsive spring interactions (`scale(0.98)`).

2. **Vercel Geist Precision**:
   - Stark monochrome contrast: Near-black ink (`#09090b` / `#171717`) on near-white canvas (`#ffffff` / `#fafafa`) in Light Mode; Pure Obsidian (`#000000` / `#060709`) in Dark Mode.
   - Strict 1px hairline borders (`#e4e4e7` light, `#27272a` / `rgba(255,255,255,0.08)` dark).
   - Monospace uppercase eyebrow hierarchy (`font-mono uppercase tracking-wider`).
   - Extreme color restraint: Saturated hues are strictly confined to badge pills, status dots, and subtle ambient glows — NEVER flat rainbow flood fills.

3. **Apple / Raycast Horizontal Card Scroll Architecture**:
   - Cards slide smoothly across the viewport with full-bleed screen width (`100vw`).
   - Deep dark glass cards infused with domain-specific ambient lighting.

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
3. TYPOGRAPHY STANDARDS (STRICT: NO TINY TEXT)
================================================================================

| Level | Size | Weight | Line Height | Tracking | Application |
|---|---|---|---|---|---|
| **Display H1** | 48px – 64px (`text-4xl sm:text-5xl md:text-6xl`) | Extrabold (800) | 1.08 | `-0.025em` (tight) | Hero Monumental Display Title |
| **Section H2** | 32px – 44px (`text-3xl sm:text-4xl md:text-5xl`) | Bold (700) | 1.15 | `-0.02em` | Section Titles |
| **Card Title H3** | 20px – 24px (`text-xl sm:text-2xl`) | Semibold (600) | 1.30 | `-0.01em` | Feature & Bento Card Headings |
| **Body Large** | 17px – 18px (`text-base sm:text-lg`) | Regular (400) | 1.60 – 1.65 | Normal | Hero Lead & Major Intro Text (Apple 17px standard) |
| **Body Regular** | 15px – 16px (`text-sm sm:text-base`) | Regular (400) | 1.55 – 1.60 | Normal | Card Descriptors & Editorial Copy |
| **Eyebrow / Badge** | 13px – 14px (`text-xs sm:text-sm`) | Medium (500) | 1.40 | `+0.05em` (wide) | Monospace Section Overlines & Chips |
| **Buttons** | 15px – 16px (`text-sm sm:text-base`) | Semibold (600) | 1.00 | Normal | Action Buttons & Category Tabs |

*Rule: Text must NEVER fall below 13px anywhere on the website.*

================================================================================
4. APPLE & RAYCAST HORIZONTAL CARD SCROLL ARCHITECTURE
================================================================================

For interactive showcase sections (like the 28+ cognitive tools carousel):
1. **Full-Bleed Viewport Breakout**:
   - The Section Header stays centered inside `max-w-7xl mx-auto px-4 sm:px-6`.
   - The Card Track breaks out to **100% full-width (`100vw`)** edge-to-edge across the screen.
   - The first card aligns with the header container using:
     `padding-left: max(1rem, calc((100vw - 80rem) / 2 + 1.5rem))`
   - Asymmetric edge fade mask ensures smooth card entrance/exit:
     `mask-image: linear-gradient(to right, transparent 0%, black 64px, black calc(100% - 224px), transparent 100%)`

2. **Card Dimensions & Aesthetic**:
   - Desktop card width: `350px – 360px`, height: `490px`, border-radius: `20px` (`rounded-2xl`).
   - Dark glass surface (`#0f1016`) with 1px hairline border (`rgba(255,255,255,0.08)`) and top-edge bevel highlight.
   - Domain-specific ambient radial glows placed behind the inner visual (no nested boxed double borders).

3. **Multi-Modal Interaction Physics**:
   - Native Touch Swipe: Hardware-accelerated touch momentum (`scroll-snap-type: x mandatory`).
   - Trackpad 2-Finger Horizontal Gestures.
   - Desktop Mouse Drag-to-Scroll: `mousedown` grab physics with prevention of accidental link clicks during drag.
   - Circular Navigation Arrows: `w-11 h-11` pill buttons that shift by 1 card step (`cardWidth + gap`) with dynamic `disabled` boundaries.

================================================================================
5. BUTTON GRAMMAR & INTERACTION PHYSICS
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
6. STRICT DO'S AND DON'TS (NON-NEGOTIABLE)
================================================================================

### DO:
- ✅ Keep the monochrome duet (Black/White/Zinc) as the foundation of 90%+ of the UI.
- ✅ Use Action Blue (`#0066cc` / `#2997ff`) as the sole high-intent action accent.
- ✅ Use 1px crisp hairline borders on cards instead of heavy dark drop shadows.
- ✅ Maintain generous line height (`leading-relaxed`) and large, legible font sizes (17px body standard).
- ✅ Wrap interactive cards in full anchor tags (`<a>`) with `min-h-[44px]` tap targets.
- ✅ Use subtle, atmospheric ambient glows behind card graphics to create luxury depth with our 6 brand domain colors.
- ✅ Bleed interactive card sliders 100vw edge-to-edge while keeping headers container-aligned.

### DON'T:
- ❌ NEVER create cartoonish rainbow cards or saturated background color blocks.
- ❌ NEVER introduce nested double borders (inner box inside an outer boxed card).
- ❌ NEVER use font sizes below 13px.
- ❌ NEVER use cramped, dense layouts without sufficient vertical whitespace (`py-20` to `py-28`).
- ❌ NEVER add heavy muddy drop shadows to cards, buttons, or text.
- ❌ NEVER allow horizontal browser scrollbars on tab pill bars.
