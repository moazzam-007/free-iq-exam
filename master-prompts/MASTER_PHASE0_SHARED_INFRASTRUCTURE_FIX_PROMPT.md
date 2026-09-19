# MASTER PHASE 0 EXECUTION PROMPT: SHARED INFRASTRUCTURE & GLOBAL FOUNDATION
# Version: 1.1.0 (Refined Directive — Fix, Verify & Local Git Commit)
# Sovereign Baseline: Commit 857dc4b & design-specs/
# Target Repository: freeiqexam.com

---

## 🎯 MISSION OBJECTIVE
Execute **Phase 0 (Shared Infrastructure & Foundation Remediation)** across `freeiqexam.com`. This step establishes the rock-solid global typography, design tokens, responsive header guards, and clean vector footer icons that form the master baseline for all 56 pages.

> [!IMPORTANT]
> **STRICT PHASE 0 BOUNDARY**:
> Make shared infrastructure fixes ONLY (`Layout.astro`, `global.css`, `Footer.astro`, `Header.astro`, and the verified surgical 1-line `matrix-reasoning-test.astro` toggle bug).
> **DO NOT perform 55-page visual sweeping in Phase 0.** Page-by-page token and gradient sweeps belong strictly to Phase 1–3.

---

## 👑 SOVEREIGN UNIVERSAL DESIGN LAW & CONFLICT GUARD (INVIOLABLE)

1. **Commit `857dc4b` Baseline**:
   - Hero canvas remains pure flat obsidian `#000000` (Dark) / `#ffffff` (Light). Strictly **ZERO radial background glows (`.fx-hero-glow`)**, strictly **ZERO purple/blue text gradients**.
   - Navigation: Apple frosted glass with **100% inline SVG micro-icons (16×16 / 18×18)**. Strictly **ZERO cartoon emojis**.
2. **Typography Triad**:
   - Display/Headings: `Geist`, `-apple-system, BlinkMacSystemFont, sans-serif` (with `-0.025em` tracking).
   - Body/Editorial: `Inter`, `-apple-system, BlinkMacSystemFont, sans-serif` (Apple 17px body standard).
   - Eyebrows/Metrics: `Geist Mono`, `JetBrains Mono, monospace`.
3. **Primary Accent**: Single Action Blue (`#0066cc` Light / `#2997ff` Dark).
4. **Card Surfaces & Hairlines**:
   - Light Card Surface: `rgba(255, 255, 255, 0.80)`
   - Dark Card Surface: `rgba(15, 16, 22, 0.90)` (`#0f1016`)
   - Light Hairline: `rgba(228, 228, 231, 0.80)` (`border-zinc-200/80`)
   - Dark Hairline: `rgba(255, 255, 255, 0.10)` (`dark:border-white/10`)

---

## 🛠️ EXACT STEP-BY-STEP IMPLEMENTATION TASKS

### 🔹 Task 1: Update Google Fonts Loader in `src/layouts/Layout.astro`
- **File**: `src/layouts/Layout.astro` (around line 195–200)
- **Problem**: Google Fonts currently requests only `Inter + Outfit`. `Geist` and `Geist Mono` are never requested and silently fall back to random system fonts.
- **Action**:
  - Request only the essential production weights (Geist 400, 500, 600, 700, 800; Geist Mono 400, 500, 600; Inter 400, 500, 600, 700) for optimal web performance:
    ```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    ```
  - Ensure CSS font fallback stack includes `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` to allow seamless per-glyph system fallbacks for Russian Cyrillic (`/ru/*`) and Indonesian (`/id/*`).

---

### 🔹 Task 2: Standardize Canonical Tokens in `src/styles/global.css`
- **File**: `src/styles/global.css`
- **Action**:
  - Extract/publish the existing canonical values from `index.astro` and Commit `857dc4b` into `:root`, `.dark`, and `@layer base`:
    ```css
    :root {
      --font-display: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-mono: 'Geist Mono', 'JetBrains Mono', monospace;
      
      --color-action-blue: #0066cc;
      --color-bg-canvas: #ffffff;
      --color-bg-card: rgba(255, 255, 255, 0.80);
      --color-border-hairline: rgba(228, 228, 231, 0.80);
      --color-ink-primary: #09090b;
      --color-ink-secondary: #52525b;
    }

    .dark {
      --color-action-blue: #2997ff;
      --color-bg-canvas: #000000;
      --color-bg-card: rgba(15, 16, 22, 0.90);
      --color-border-hairline: rgba(255, 255, 255, 0.10);
      --color-ink-primary: #ffffff;
      --color-ink-secondary: #a1a1aa;
    }
    ```
  - Add utility class helpers `.font-display` and `.font-mono` so components can reliably apply Geist Display and Geist Mono site-wide.

---

### 🔹 Task 3: Fix Corrupted Emojis & Mojibake in `src/components/Footer.astro`
- **File**: `src/components/Footer.astro` (and check `FooterId.astro` / `FooterRu.astro` if present)
- **Problem**: Column headers currently contain corrupted characters (`dYZr`, `sT,?`, `dY"`).
- **Action**:
  - Replace corrupted glyphs in the 4 column `<h4>` tags with crisp 16×16 inline SVGs (`stroke="currentColor" stroke-width="1.75"`):
    1. **Column 1 (Clinical Tests & Diagnostics)**: Stethoscope / Medical Cross SVG icon.
    2. **Column 2 (Cognitive Games & Speed)**: Gamepad / Reflex Grid SVG icon.
    3. **Column 3 (Bio-Tools & Calculators)**: Calculator / Dial Gauge SVG icon.
    4. **Column 4 (Science, Rigor & Legal)**: Microscope / Document Shield SVG icon.
  - Fix any trailing mojibake characters (e.g. replace corrupted `+'` with clean inline arrow SVGs `→`).
  - Ensure links have hover state `hover:text-[#0066cc] dark:hover:text-[#2997ff]`.

---

### 🔹 Task 4: Polish Header Typography & Mobile Flyout in `src/components/Header.astro`
- **File**: `src/components/Header.astro`
- **Action**:
  - **Typography Floor**: Ensure all text elements meet the $\ge 13\text{px}$ floor (raise any 10px-11px badges/eyebrows to `text-xs` / 13px, with high-contrast text colors `text-zinc-600 dark:text-zinc-400`).
  - **Flyout Responsiveness**: On the tests 2-column flyout container (`w-[580px]`), add `max-w-[calc(100vw-3rem)]` so that resizing viewports never induces horizontal scrollbars.
  - **Logo Interaction**: Ensure logo hover uses subtle transition (`opacity-90 transition-opacity` or `active:scale-[0.98]`), removing any unapproved `group-hover:scale-105`.

---

### 🔹 Task 5: ⚡ Immediate Surgical Bug Fix in `src/pages/matrix-reasoning-test.astro`
- **File**: `src/pages/matrix-reasoning-test.astro`
- **Problem**: Button markup has `id="toggle-solution-btn"`, but the script calls `document.getElementById('btn-toggle-solution')`, resulting in `null` and breaking the "Reveal Step-by-Step Proof" click action.
- **Action**:
  - Align the JavaScript selector:
    ```javascript
    const btnToggleSolution = document.getElementById('toggle-solution-btn');
    ```
  - Verify that clicking the button toggles `solutionDrawer` smoothly and updates `aria-expanded` accurately.
  - *(Note: This is the ONLY page-level exception allowed in Phase 0. No other page-level styling edits in this phase).*

---

## 🛡️ VERIFICATION & ACCEPTANCE GATE (MANDATORY)

1. **Automated Build Test**:
   ```powershell
   npm run build
   ```
   *Requirement: Build must complete with 0 errors and 0 NEW warnings. Record any pre-existing warnings.*
2. **Visual & Browser Verification**:
   - Homepage (`/`): Verify zero visual regressions vs Commit `857dc4b`.
   - Fonts: Verify Geist / Geist Mono and Inter are requested without network errors; verify Russian (`/ru/`) and Indonesian (`/id/`) render cleanly without glyph clipping.
   - Header: Verify no text under 13px, and 2-column flyout does not overflow on small viewports.
   - Footer: Verify zero mojibake strings and 4 clean vector SVGs in column headers.
   - Matrix Test: Verify clicking "Reveal Step-by-Step Proof" opens the explanation drawer.

---

## 💾 LOCAL GIT COMMIT CHECKPOINT (MANDATORY)
Once all tasks and verification gates pass:
```powershell
git add src/layouts/Layout.astro src/styles/global.css src/components/Footer.astro src/components/Header.astro src/pages/matrix-reasoning-test.astro
git commit -m "feat(infra): complete Phase 0 shared infrastructure (Geist fonts, global tokens, SVG footer, matrix toggle fix)"
```
*(This ensures a clean, isolated git checkpoint for easy rollback or cross-checking before starting Phase 1).*
