# MASTER PHASE 1 EXECUTION PROMPT: CRITICAL ANTI-SLOP & HERO GRADIENT REALIGNMENT
# Version: 1.1.0 (Refined Directive — Fix, Verify & Local Git Commit)
# Sovereign Baseline: Commit 857dc4b & design-specs/
# Target Repository: freeiqexam.com

---

## 🎯 MISSION OBJECTIVE
Execute **Phase 1 (Critical Anti-Slop & Hero Gradient Realignment)** across the explicitly identified **16 target files** in `freeiqexam.com`. This phase eliminates all banned visual signatures (gradient-clipped headline words, multi-color aurora radial stacks behind hero sections, and purple/indigo CTA banner floods), bringing these pages into strict, 100% compliance with the **Sovereign Immutable Baseline (Commit `857dc4b`)**.

> [!IMPORTANT]
> **PHASE 0 NON-INTERFERENCE GUARD**:
> Phase 1 must NOT modify `global.css`, `Layout.astro`, `Footer.astro`, or `Header.astro` (which are owned and locked by Phase 0), except importing the shared `<Header />` inside `results.astro`.
> **Line Number Precaution**: Before modifying any page, re-read the current file directly to locate target code blocks, as Phase 0 foundation changes may have shifted line numbers.

---

## 👑 SOVEREIGN UNIVERSAL DESIGN LAW & CONFLICT GUARD (INVIOLABLE)

1. **Pure Flat Canvas**: Hero title background is solid flat `#000000` (Dark) / `#ffffff` (Light). Strictly **ZERO radial background glows (`.fx-hero-glow`)**, strictly **ZERO purple/blue gradient spotlights behind hero text**.
2. **Typography Triad**:
   - Headings: `Geist` solid ink (`text-zinc-900 dark:text-white font-extrabold tracking-[-0.025em]`). Strictly **NO `bg-clip-text text-transparent bg-gradient-to-*` on headings**.
   - Eyebrows: `Geist Mono` uppercase tracking-wider (`font-mono uppercase tracking-wider text-xs`).
   - Body: `Inter` Apple 17px standard (`text-[17px] leading-relaxed text-zinc-600 dark:text-zinc-400`).
3. **Primary Accent**: Single Action Blue (`#0066cc` Light / `#2997ff` Dark). Strictly **NO purple/violet flood fills or gradient CTAs**.
4. **Surfaces**: Crisp 1px hairlines (`border-zinc-200/80 dark:border-white/10`) and dark glass cards (`bg-white/80 dark:bg-[#0f1016]/90`).

---

## 🛠️ EXACT PAGE-BY-PAGE REMEDIATION TASKS

---

### 🔹 1. `src/pages/anxiety-test.astro`
- **Hero H1 Gradient (Line ~206)**: Remove `text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-500 to-emerald-500`. Replace with solid ink:
  ```html
  <h1 class="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-zinc-900 dark:text-white tracking-[-0.025em] leading-[1.1] mb-6">
  ```
- **Start CTA Button (Line ~247)**: Remove `bg-gradient-to-r from-violet-600 to-indigo-600 shadow-violet-500/20`. Replace with Action Blue tactile button:
  ```html
  class="inline-flex items-center justify-center gap-2.5 px-8 py-4 min-h-[44px] rounded-full text-base font-bold text-white bg-[#0066cc] hover:bg-[#0071e3] dark:bg-[#2997ff] dark:hover:bg-[#3b82f6] transition-all duration-200 active:scale-[0.97] shadow-sm"
  ```
- **Progress Bar (Line ~269)**: Remove `from-violet-600 to-emerald-500`. Replace with solid Action Blue bar (`bg-[#0066cc] dark:bg-[#2997ff]`).
- **Emoji in Badge (Line ~225)**: Replace `🛡️` emoji with a crisp 16×16 inline SVG Shield icon.

---

### 🔹 2. `src/pages/aim-trainer.astro`
- **Hero H1 Gradient (Line ~160)**: Remove `bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400`. Replace with solid ink `text-zinc-900 dark:text-white font-display font-extrabold tracking-[-0.025em]`.
- **CTA & Reset Buttons (Lines ~309, 445)**: Standardize primary CTA to Action Blue with `active:scale-[0.97] transition-all duration-200 min-h-[44px]`.

---

### 🔹 3. `src/pages/sleep-calculator.astro`
- **Hero Aurora Radial Stack (Lines ~131, 895–907)**: Delete the `.aurora` radial gradient container (`rgba(99,102,241,0.28)` indigo + `rgba(139,92,246,0.24)` violet + sky blur). Ensure hero canvas is pure solid `#ffffff` (Light) / `#000000` (Dark).
- **H1 Typography (Line ~146)**: Ensure H1 uses `font-display font-extrabold tracking-[-0.025em] text-zinc-900 dark:text-white`.
- **Active Mode Tab (Line ~1077)**: Remove `linear-gradient(indigo to violet)` active tab styling. Replace with solid Action Blue indicator / pill (`bg-[#0066cc] dark:bg-[#2997ff] text-white`).

---

### 🔹 4. `src/pages/brown-noise.astro`
- **Hero H1 Gradient (Line ~161)**: Remove `bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400`. Replace with solid ink `text-zinc-900 dark:text-white font-display font-extrabold tracking-[-0.025em]`.
- **Play CTA (Line ~186)**: Remove `bg-amber-500` and unapproved `hover:scale-105`. Replace with solid Action Blue pill with `active:scale-[0.97] transition-all duration-200 min-h-[44px]`.

---

### 🔹 5. `src/pages/calorie-calculator.astro`
- **Hero H1 Gradient (Line ~161)**: Remove `from-emerald-500 via-teal-500 to-cyan-500`. Replace with solid ink `text-zinc-900 dark:text-white font-display font-extrabold tracking-[-0.025em]`.
- **Card Surface (Lines ~480 / 540)**: Remove `bg-gradient-to-br from-indigo-950/40` and stray indigo borders. Replace with dark glass surface (`bg-white/80 dark:bg-[#0f1016]/90 border border-zinc-200/80 dark:border-white/10`).
- **Primary Action Buttons**: Replace `bg-emerald-500` with Action Blue (`#0066cc`/`#2997ff`).

---

### 🔹 6. `src/pages/memento-mori.astro`
- **Hero H1 Gradient (Line ~160)**: Remove amber-to-orange gradient text. Replace with solid ink `text-zinc-900 dark:text-white font-display font-extrabold tracking-[-0.025em]`.
- **Calendar Halo Glow (Line ~279)**: Remove `amber-500/10 blur-3xl` ambient glow container behind the weeks grid.
- **Life Progress Bar (Line ~317)**: Replace amber/orange progress bar with clean Action Blue indicator.

---

### 🔹 7. `src/pages/circle-of-control.astro`
- **Hero H1 Gradient (Line ~138)**: Remove `from-emerald-500 via-cyan-500 to-emerald-500`. Replace with solid ink `text-zinc-900 dark:text-white font-display font-extrabold tracking-[-0.025em]`.
- **Multi-Hue Aurora (Lines ~583–585 / 698)**: Remove decorative `blur-3xl` radial stack (emerald/cyan/rose). Keep interactive canvas background clean and flat.

---

### 🔹 8. `src/pages/flag-quiz.astro`
- **Hero Background Glows (Lines ~144, 149)**: Delete `emerald-500/10` and `cyan-500/10 blur-3xl` background divs. Ensure background is pure flat `bg-white dark:bg-black`.
- **H1 Gradient (Line ~168)**: Replace `emerald→teal→cyan` gradient with solid ink.
- **Score Numeral (Line ~308)**: Remove gradient clip on live score numeral. Make it crisp `font-mono font-bold text-zinc-900 dark:text-white`.
- **Start CTA (Line ~259)**: Replace gradient CTA with Action Blue pill (`active:scale-[0.97]`).

---

### 🔹 9. `src/pages/results.astro`
- **Score Halo Blob (Line ~100)**: Remove `absolute w-96 h-96 bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-3xl` behind the score display.
- **Header Migration**: Replace custom top header with the standard shared `<Header currentPath="/results" />` component, ensuring navigation, share actions, and mobile drawer remain fully accessible.

---

### 🔹 10. `src/pages/preview-master-v3.astro`
- **SEO Protection**: Add `noindex={true}` in `<Layout>` (or `<meta name="robots" content="noindex, nofollow" />`) to prevent search engine indexing of internal preview.
- **Card Glows**: Remove `dark:radial-gradient` glow overlays on cards, aligning them to `#0f1016`.

---

### 🔹 11. `src/pages/matrix-reasoning-test.astro`
- **Bottom CTA Banner (Line ~374)**: Verify bottom CTA section is completely clean of any purple gradient remnants, using the canonical flat card (`border-zinc-800 dark:border-zinc-200`) and Action Blue button.

---

### 🔹 12. `src/pages/mensa-iq-test-practice.astro`
- **Bottom CTA Purple Banner (Line ~321)**:
  - Replace `bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600` with the standard flat obsidian/white bento card:
    ```html
    <section class="p-8 sm:p-12 rounded-3xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-center shadow-lg relative overflow-hidden border border-zinc-800 dark:border-zinc-200">
      <h2 class="font-display font-extrabold text-2xl sm:text-4xl mb-3 tracking-tight">
        Ready for the Full Assessment?
      </h2>
      <p class="text-zinc-400 dark:text-zinc-600 text-[17px] leading-relaxed max-w-xl mx-auto mb-6">
        Challenge yourself with our calibrated 24-question psychometric battery and receive an instant breakdown.
      </p>
      <a 
        href="/test" 
        class="inline-flex items-center gap-2 px-8 py-4 min-h-[44px] rounded-full text-base font-bold text-white bg-[#0066cc] hover:bg-[#0071e3] dark:bg-[#2997ff] dark:hover:bg-[#3b82f6] transition-all duration-200 active:scale-[0.97] shadow-md"
      >
        <span>Start 24-Item Assessment</span>
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </a>
    </section>
    ```
- **Step Numerals (Lines ~250, 258)**: Replace `text-indigo-600` and `text-purple-600` step numerals with `text-zinc-900 dark:text-zinc-100` / Action Blue.

---

### 🔹 13. `src/pages/quick-test.astro`
- **Logo Gradient (Line ~106)**: Replace `bg-gradient-to-tr blue-600→indigo-600` logo badge with solid Action Blue chip (`bg-[#0066cc] dark:bg-[#2997ff]`).

---

### 🔹 14. Shared Component: `src/components/CategoryTestRunner.astro` (4 Reasoning Tests Healed)
- **Progress Bar Gradient (Line ~164)**: Replace `bg-gradient-to-r from-blue-600 to-indigo-600` with solid Action Blue bar (`bg-[#0066cc] dark:bg-[#2997ff]`).
- *(This single component fix automatically heals all 4 CHC reasoning pages: `fluid-reasoning-test.astro`, `spatial-reasoning-test.astro`, `quantitative-reasoning-test.astro`, and `verbal-reasoning-test.astro`).*

---

### 🔹 15. Bottom CTA Banners on Reference & Scale Pages
Apply the identical clean flat card + Action Blue button structure to the bottom CTA sections in:
- `src/pages/iq-classification-scale.astro` (Line ~321)
- `src/pages/iq-percentile-calculator.astro` (Line ~604)
- `src/pages/average-iq-by-age.astro` (Line ~324)
- `src/pages/high-iq-societies.astro` (Line ~537 — remove blue-900/10 wash)

---

## 🛡️ VERIFICATION & ACCEPTANCE GATE (MANDATORY)

1. **Automated Build Test**:
   ```powershell
   npm run build
   ```
   *Requirement: 0 build errors and 0 new warnings.*
2. **Repository-Wide Grep Verification (`src/pages/` and `src/components/`)**:
   - Run grep for `bg-clip-text` on headings — must return ZERO matches.
   - Run grep for `.aurora` — must return ZERO matches.
   - Run grep for `from-blue-600 via-indigo-600 to-purple-600` — must return ZERO matches.
   - Run grep for `from-violet-` and `from-purple-` on CTA buttons — must return ZERO matches.
3. **Representative Visual Confirmation**:
   - Clinical: `anxiety-test.astro`
   - Tool/Calculator: `sleep-calculator.astro`, `calorie-calculator.astro`
   - Interactive: `aim-trainer.astro`, `flag-quiz.astro`, `circle-of-control.astro`
   - Results: `results.astro`
   - Reasoning Battery: `fluid-reasoning-test.astro` (CategoryTestRunner)
   - Reference: `mensa-iq-test-practice.astro`, `iq-percentile-calculator.astro`

---

## 💾 LOCAL GIT COMMIT CHECKPOINT (MANDATORY)
Once all tasks and verification gates pass:
```powershell
git add src/pages/anxiety-test.astro src/pages/aim-trainer.astro src/pages/sleep-calculator.astro src/pages/brown-noise.astro src/pages/calorie-calculator.astro src/pages/memento-mori.astro src/pages/circle-of-control.astro src/pages/flag-quiz.astro src/pages/results.astro src/pages/preview-master-v3.astro src/pages/matrix-reasoning-test.astro src/pages/mensa-iq-test-practice.astro src/pages/quick-test.astro src/components/CategoryTestRunner.astro src/pages/iq-classification-scale.astro src/pages/iq-percentile-calculator.astro src/pages/average-iq-by-age.astro src/pages/high-iq-societies.astro
git commit -m "feat(ui): complete Phase 1 critical anti-slop (remove hero glows, gradient text, purple CTA banners, CategoryTestRunner progress)"
```
