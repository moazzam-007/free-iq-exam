# Raycast 3D Card Reel Architecture & Specification
# Foundations: Full-Bleed 100vw Track, Dark Glass Cards (#0f1016), Domain Radial Glows, Multi-Modal Gesture Physics

================================================================================
1. CORE ARCHITECTURE
================================================================================
The Raycast card showcase presents interactive cards sliding seamlessly across the screen with tactile physics:

1. **Full-Bleed Viewport Breakout**:
   - The section header remains neatly aligned within the standard max-width container (`max-w-7xl mx-auto px-4 sm:px-6`).
   - The card track breaks out into a 100% full-bleed carousel (`100vw`).
   - The first card aligns with the container header using:
     ```css
     padding-left: max(1rem, calc((100vw - 80rem) / 2 + 1.5rem));
     padding-right: max(1rem, calc((100vw - 80rem) / 2 + 1.5rem));
     ```
   - An asymmetric fade mask ensures smooth card emergence and fadeout at the edges:
     ```css
     mask-image: linear-gradient(to right, transparent 0%, black 48px, black calc(100% - 160px), transparent 100%);
     -webkit-mask-image: linear-gradient(to right, transparent 0%, black 48px, black calc(100% - 160px), transparent 100%);
     ```

2. **Card Dimensions & Dark Luxury Surface**:
   - Desktop Card: `width: 350px – 360px`, `height: 480px – 500px`, `border-radius: 20px` (`rounded-2xl`).
   - Surface: Dark luxury glass (`#0f1016`) with `1px solid rgba(255,255,255,0.08)` hairline border.
   - Bevel Highlight: `box-shadow: 0 1px 0 rgba(255,255,255,0.1) inset` on top card edge.
   - Ambient Radial Halos: Domain-specific color glows situated behind the illustration (no nested double box borders).

3. **Multi-Modal Interaction Physics**:
   - **Touch & Mobile**: Native hardware-accelerated momentum swipe (`scroll-snap-type: x mandatory`).
   - **Trackpad**: 2-finger horizontal swipe.
   - **Mouse Drag-to-Scroll**: `mousedown` / `mousemove` physics with drag detection to prevent accidental link activation.
   - **Step Arrows**: Accessible `w-11 h-11` round buttons shifting by `1 card + gap` on click.

================================================================================
2. COMPONENT BLUEPRINT
================================================================================

```html
<div class="relative w-full overflow-hidden py-12">
  <!-- Container Header -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between mb-8">
    <div>
      <div class="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">Interactive Arena</div>
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">Cognitive & Reflex Drills</h2>
    </div>
    <!-- Stepper Controls -->
    <div class="flex items-center gap-2">
      <button id="reel-prev" class="w-11 h-11 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:scale-105 active:scale-95 transition-all">←</button>
      <button id="reel-next" class="w-11 h-11 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:scale-105 active:scale-95 transition-all">→</button>
    </div>
  </div>

  <!-- Full Bleed 100vw Track -->
  <div id="reel-track" class="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 cursor-grab" style="padding-left: max(1rem, calc((100vw - 80rem) / 2 + 1.5rem)); padding-right: max(1rem, calc((100vw - 80rem) / 2 + 1.5rem));">
    <!-- Card items -->
  </div>
</div>
```
