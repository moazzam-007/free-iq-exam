# Astro Framework Engineering & Architecture Standards
# Focus: Astro 5+ Static Build, Islands Architecture, Scoped Styling, Tailwind v4 Integration

================================================================================
1. CORE ASTRO PRINCIPLES
================================================================================

1. **Zero Client-Side JavaScript by Default**:
   - Astro renders 100% pure static HTML and CSS at build time.
   - Do NOT add client-side JavaScript unless genuine interactivity is required.

2. **Islands Architecture (Opt-In Hydration)**:
   - When interactive components (steppers, carousels, timers) are needed, hydrate with precise directives:
     - `client:load` — For critical above-the-fold interactive widgets (hero sample puzzle).
     - `client:idle` — For non-critical interactive elements (analytics, secondary tabs).
     - `client:visible` — For below-the-fold interactive components (sliding carousels, score calculators).
     - `client:media` — For breakpoint-dependent interactive controls.

3. **Component-Scoped Styles & Tailwind v4**:
   - Use Tailwind CSS v4 as the primary utility engine.
   - For complex animations, masks, or custom properties, use component-scoped `<style>` blocks in `.astro` files.
   - Avoid injecting unscoped global CSS into the layout.

4. **Directory Taxonomy**:
   - `src/pages/` — Static file-based routing.
   - `src/components/` — Reusable `.astro` components (cards, headers, footers, badges).
   - `src/layouts/` — Master base layout with SEO meta, font links, and theme scripts.
   - `src/lib/` — Pure TypeScript / JavaScript helper utilities and validation logic.

================================================================================
2. ASTRO CODE PATTERNS
================================================================================

### A. Dynamic Array-Mapped Section Components
Avoid duplicating markup. Define typed data structures in the Astro frontmatter and map cleanly:

```astro
---
interface CognitiveDrill {
  id: string;
  title: string;
  category: string;
  protocol: string;
  description: string;
  href: string;
  badge: string;
}

const drills: CognitiveDrill[] = [
  {
    id: "fluid-reasoning",
    title: "Pattern Matrix 5x5",
    category: "Fluid Reasoning (Gf)",
    protocol: "Cattell / Raven",
    description: "Multi-relational matrix progression evaluating non-verbal inductive deduction.",
    href: "/tools/pattern-matrix",
    badge: "Clinical Standard"
  }
];
---

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {drills.map((drill) => (
    <a href={drill.href} class="group block p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
      <div class="flex items-center justify-between text-xs font-mono text-zinc-500 mb-3">
        <span class="uppercase tracking-wider">{drill.category}</span>
        <span class="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">{drill.badge}</span>
      </div>
      <h3 class="text-xl font-semibold text-zinc-900 dark:text-white mb-2">{drill.title}</h3>
      <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{drill.description}</p>
    </a>
  ))}
</div>
```

### B. Minimal Scoped Script for Multi-Modal Carousel
```astro
<script>
  function initCarousels() {
    const track = document.getElementById('games-track');
    const prevBtn = document.getElementById('games-prev');
    const nextBtn = document.getElementById('games-next');
    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = 380;
    prevBtn.addEventListener('click', () => track.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
    nextBtn.addEventListener('click', () => track.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
  }

  // Support View Transitions & standard DOMContentLoaded
  document.addEventListener('astro:page-load', initCarousels);
  document.addEventListener('DOMContentLoaded', initCarousels);
</script>
```
