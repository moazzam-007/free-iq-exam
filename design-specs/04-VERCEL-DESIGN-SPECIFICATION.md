# Vercel Geist Design System & Precision Engineering
# Foundations: Monochrome Duet, 1px Crisp Hairlines, Bimodal Button Grammar, Monospace Eyebrows

================================================================================
1. CORE PRINCIPLES
================================================================================
Vercel's design language communicates engineering rigor, speed, and precision:

1. **The Monochrome Duet**:
   - Contrast is stark and unapologetic:
     - Light Mode: Near-black ink (`#09090b`) on pure white/zinc-50 (`#ffffff` / `#fafafa`).
     - Dark Mode: Pure white ink (`#ffffff`) on pure Obsidian (`#000000` / `#060709`).
   - Saturated colors are strictly quarantined to micro-status dots, badge chips, or telemetry charts.

2. **1px Crisp Hairline Borders**:
   - Depth is expressed through hair-thin borders rather than blurry shadows:
     - Light: `1px solid #e4e4e7` (zinc-200) or `1px solid #f4f4f5` (zinc-100).
     - Dark: `1px solid rgba(255,255,255,0.08)` or `1px solid #27272a` (zinc-800).

3. **Bimodal Button Grammar**:
   - Marketing CTAs: Rounded full-pill (`rounded-full`) for hero conversion.
   - Developer/UI Controls: Compact 6px/8px corners (`rounded-md` / `rounded-lg`) with 1px border.

4. **Uppercase Monospace Eyebrow Hierarchy**:
   - Overlines and category labels use monospace styling with generous letter spacing:
     - `font-mono text-xs uppercase tracking-widest text-zinc-500`.

5. **Fast Easing & Zero Lag**:
   - All dropdowns, dialogs, and tabs switch instantly with `ease-out` timing under 200ms.

================================================================================
2. COMPONENT BLUEPRINTS
================================================================================

### Bento Card (Geist Precision)
```html
<div class="group relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200">
  <div class="flex items-center justify-between gap-4 mb-4">
    <span class="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Clinical Instrument</span>
    <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">WHO ASRS v1.1</span>
  </div>
  <h3 class="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-2">ADHD Adult Self-Report</h3>
  <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">18 DSM-5 symptom inventory measuring executive function.</p>
  <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500">
    <span>18 Items · 5 Min</span>
    <span class="text-[#0066cc] dark:text-[#2997ff] font-medium group-hover:translate-x-0.5 transition-transform">Launch screener →</span>
  </div>
</div>
```
