# Apple Human Interface & Web Craft Specification
# Foundations: SF Pro Typography, Negative Tracking, 17px Standard, Parchment Cadence

================================================================================
1. CORE PRINCIPLES
================================================================================
Apple's web interface delivers quiet confidence through spacious whitespace, monumental typography, and unhurried reading cadence:

1. **Monumental Display Typography**:
   - Giant display headings (`48px – 64px`) with tight negative tracking (`-0.025em` / `-0.374px`).
   - Clean hierarchy: Display H1 $\rightarrow$ Section H2 $\rightarrow$ Feature H3 $\rightarrow$ 17px Body standard.

2. **The 17px Body Standard**:
   - Body copy is set generously at `17px` (`1.0625rem`) with `1.6` line-height for optimal legibility across Retina and high-DPI displays.
   - Text never feels dense or cramped.

3. **Parchment Section Dividers**:
   - Instead of harsh 1px borders dividing major sections, Apple uses subtle alternating background fills:
     - Pure White (`#ffffff`) $\leftrightarrow$ Parchment Off-White (`#f5f5f7` light / `#090a0f` dark).
   - This creates natural page rhythm without visual clutter.

4. **Single Action Blue Accent**:
   - High-intent conversion relies on Apple Action Blue:
     - Light Mode: `#0066cc` (hover: `#0071e3`)
     - Dark Mode: `#2997ff` (hover: `#3b82f6`)
   - Blue is used exclusively for primary CTAs, text links, and active interactive indicators.

5. **Tactile Pill Grammar**:
   - Full pill shapes (`rounded-full` / `9999px`) for primary buttons.
   - Active tactile feedback: `active:scale-[0.98]` with fast spring recovery.

================================================================================
2. COMPONENT BLUEPRINTS
================================================================================

### Primary Button (Apple Action Pill)
```html
<button class="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#0066cc] dark:bg-[#2997ff] text-white font-medium text-[15px] hover:bg-[#0071e3] dark:hover:bg-[#3b82f6] active:scale-[0.98] transition-all duration-150 shadow-xs cursor-pointer">
  Start Assessment
  <svg class="w-4 h-4 ml-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
</button>
```

### Secondary Pill (Translucent Glass)
```html
<button class="inline-flex items-center justify-center px-6 py-3 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 font-medium text-[15px] border border-zinc-200/80 dark:border-zinc-700/80 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80 active:scale-[0.98] transition-all duration-150">
  Learn More
</button>
```

### Trust Badges & Micro-Copy
- Category badges: `bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-xs px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-700`.
- Footnotes: `text-xs text-zinc-500 leading-relaxed max-w-prose`.
