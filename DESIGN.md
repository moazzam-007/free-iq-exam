---
version: 2.0.0
name: FreeIQExam-Apple-Vercel-Design-System
description: >
  A pure, ultra-clean design system combining Apple's world-class typography, spacious layout breathing room,
  and tactile pill buttons with Vercel's stark monochrome precision, 1px hairlines, and dark/light contrast.
  Notion has been removed. Both Pure White (Light) and Pure Black (Dark) themes are first-class citizens.
  Typography rule: No cramped/tiny text — all text is generously sized, readable, and commanding.

sources:
  apple: ./apple/DESIGN.md
  vercel: ./vercel/DESIGN.md

core_principles:
  1_apple_typography_and_space:
    - Display Headlines: SF/Outfit tight-tracking (tracking-tight), high impact, bold contrast.
    - Generous Whitespace: Sections breathe with py-20 to py-32 padding. Never cram elements.
    - Tactile Buttons: Pill-shaped (rounded-full), comfortable padding (px-8 py-4), subtle hover spring scale (hover:scale-[1.02] active:scale-[0.98]).
  2_vercel_monochrome_precision:
    - Pure Black Canvas in Dark Mode (#000000 / #09090b), Pure White Canvas in Light Mode (#ffffff).
    - Strict 1px hairline borders: Light (border-zinc-200), Dark (border-zinc-800).
    - Subtle mesh gradient highlights on key anchors (blue/indigo/purple).
  3_typography_sizing_standard (STRICT: NO TINY TEXT):
    - Display H1: 48px - 64px (text-4xl sm:text-5xl md:text-6xl), font-extrabold.
    - Section H2: 32px - 40px (text-2xl sm:text-4xl), font-bold.
    - Card Titles H3: 20px - 24px (text-xl sm:text-2xl), font-semibold.
    - Body Text: 16px - 18px (text-base sm:text-lg), leading-relaxed (1.65), text-zinc-600 dark:text-zinc-300.
    - Eyebrow / Badges: 13px - 14px (text-xs sm:text-sm font-medium), uppercase tracking-wider. NEVER below 13px!
    - Buttons: 16px (text-base font-semibold).

color_palettes:
  light_mode:
    canvas: "#ffffff"
    surface: "#fafafa"
    surface_elevated: "#ffffff"
    border: "#e4e4e7"
    ink_primary: "#09090b"
    ink_secondary: "#52525b"
    ink_muted: "#71717a"
    accent_blue: "#0066cc"
    accent_blue_hover: "#0071e3"
  dark_mode:
    canvas: "#000000"
    surface: "#09090b"
    surface_elevated: "#121215"
    border: "#27272a"
    ink_primary: "#ffffff"
    ink_secondary: "#a1a1aa"
    ink_muted: "#71717a"
    accent_blue: "#2997ff"
    accent_blue_hover: "#0071e3"
---
