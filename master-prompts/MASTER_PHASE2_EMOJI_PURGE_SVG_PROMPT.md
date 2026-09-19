# MASTER PHASE 2 EXECUTION PROMPT: EMOJI PURGE & INLINE SVG CONVERSION
# Version: 1.0.0 (Execution Directive — Fix, Verify & Local Git Commit)
# Sovereign Baseline: Commit 857dc4b & design-specs/
# Target Repository: freeiqexam.com

---

## 🎯 MISSION OBJECTIVE
Execute **Phase 2 (Emoji Purge & Inline SVG Micro-Icon Conversion)** across `freeiqexam.com`. This step eliminates all cartoon emojis (`🌙`, `🎯`, `🔬`, `🇺🇸`, `🔊`, `🎧`, `⏱️`, etc.) from UI chrome, buttons, headers, and tool controls, replacing them with crisp 16×16 / 18×18 inline vector SVGs in strict compliance with the **Sovereign Immutable Baseline (Commit `857dc4b`)**.

> [!IMPORTANT]
> **SCOPE & NON-INTERFERENCE BOUNDARY**:
> - Phase 2 focuses strictly on replacing raw text emojis with inline SVG icons.
> - **DO NOT re-introduce gradients** or touch Phase 0 infrastructure (`global.css`, `Layout.astro`, `Header.astro`, `Footer.astro`).
> - Biological notations (e.g. `♂` Male / `♀` Female text labels) are scientific notations and may remain clean text or icon chips.

---

## 👑 SOVEREIGN UNIVERSAL DESIGN LAW & SVG SPECIFICATIONS

1. **Icon Grid & Sizing**:
   - Navigation & Button Icons: `16×16` or `18×18` (`w-4 h-4` / `w-[18px] h-[18px]`).
   - Feature & Card Chip Icons: `20×20` (`w-5 h-5`) enclosed in subtle frosted chips (`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-100 dark:bg-white/[0.05] border border-zinc-200/60 dark:border-white/10`).
2. **Stroke & Styling**:
   - `stroke="currentColor"` with `stroke-width="1.75"` or `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, and `fill="none"` (unless solid vector glyph).
   - Inherits color from text / Action Blue parent (`#0066cc` Light / `#2997ff` Dark).
3. **Flag Glyphs**:
   - Replace raw country emoji flags (`🇺🇸`, `🇯🇵`, `🇩🇪`, `🇬🇧`, `🇦🇺`, `🇫🇮`) with clean vector flag SVGs or uppercase monospace country code badges (e.g. `<span class="font-mono text-xs font-semibold px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">US</span>`).

---

## 🛠️ EXACT PAGE-BY-PAGE EMOJI REPLACEMENT TASKS

---

### 🔹 1. `src/pages/tools.astro`
- **Location**: Tool catalog data array (`icon:` properties lines ~18–120) and page cards.
- **Action**:
  - Replace raw text emojis (`🌙`, `🔥`, `🎧`, `🎙️`, `⏳`, `🧭`, `📊`, `🎯`, `📐`, `📈`, `🔬`) with inline SVG vector components/paths (Moon, Fire/Metabolism, Headphones, Mic, Hourglass/Clock, Compass, Chart, Target, Ruler, Graph, Microscope).

---

### 🔹 2. `src/pages/leaderboard.astro`
- **Location**: Ranking rows (lines ~10–25).
- **Action**:
  - Replace raw flag emojis (`🇺🇸`, `🇯🇵`, `🇩🇪`, `🇨🇦`, `🇬🇧`, `🇦🇺`) with sleek vector flag SVGs or monospace uppercase ISO badge chips (`US`, `JP`, `DE`, `CA`, `GB`, `AU`).

---

### 🔹 3. `src/pages/depression-test.astro`
- **Location**: Crisis support helpline list (lines ~204–215).
- **Action**:
  - Replace raw flag emojis (`🇺🇸`, `🇬🇧`, `🇦🇺`, `🇩🇪`, `🇫🇮`, `🌐`) with clean vector flag SVGs or high-trust monospace country badge tags.

---

### 🔹 4. `src/pages/brown-noise.astro`
- **Location**: Soundscape presets, noise generators, and timer controls (lines ~197–550).
- **Action**:
  - Replace all ~19 emojis (`🔊`, `✨`, `🌙`, `⚡`, `🌊`, `🌧️`, `🧘`, `🎨`, `🎛️`, `📻`, `🧠`, `💨`, `⏱️`, `🟤`, `🌸`, `⚪`, `🌿`) with 16×16 inline SVGs (Speaker, Sparkles, Moon, Bolt, Wave, Cloud-Rain, Lotus/Brain, Palette, Sliders, Radio, Wind, Timer, Circle indicators).

---

### 🔹 5. `src/pages/color-blind-test.astro`
- **Location**: Diagnostic calibration alert, plate mode buttons, shape controls, copy/print actions (lines ~255–530).
- **Action**:
  - Replace `⚠️`, `🔢`, `⭐`, `🚫`, `📋`, `🖨️`, `🔄`, `✓`, `☀️` with 16×16 inline SVGs (AlertTriangle, HashNumber, Star, Ban, Clipboard, Printer, RefreshCw, Check, Sun).

---

### 🔹 6. `src/pages/memento-mori.astro`
- **Location**: Input form icons and download poster CTA (lines ~179–410).
- **Action**:
  - Replace `📅`, `🧬`, `📜`, `🔬`, `🏛️`, `↻` with 16×16 inline SVGs (Calendar, Dna, Scroll/FileText, Microscope, Landmark/Pillar, RotateCcw).

---

### 🔹 7. `src/pages/hearing-test.astro`
- **Location**: Calibration alert, audio controls, frequency sweep controls (lines ~256–680).
- **Action**:
  - Replace `🎧`, `⚡`, `📊`, `🔊`, `▶`, `⏹`, `⬇`, `🔬`, `🌊`, `🚫` with 16×16 inline SVGs (Headphones, Bolt, BarChart, Volume2, Play, Square, Download, Microscope, Waves, Slash).

---

### 🔹 8. `src/pages/calorie-calculator.astro`
- **Location**: Body fat estimator, caloric target, macronutrient cards (lines ~354–545).
- **Action**:
  - Replace `📏`, `🎯`, `🥗`, `🧠`, `🔬` with 16×16 inline SVGs (Ruler, Target, Apple/Leaf, Brain, Microscope).

---

### 🔹 9. `src/pages/circle-of-control.astro`
- **Location**: Worry input prompt, stoic category chips, print plan CTA (lines ~152–430).
- **Action**:
  - Replace `✍️`, `💼`, `💬`, `📉`, `🌿`, `⧉`, `⬇`, `🖨`, `🦉`, `🦁`, `⚖️`, `🌊`, `🏛️`, `↻` and bullet glyphs (`●`, `◐`, `○`) with clean 16×16 inline SVGs.

---

### 🔹 10. `src/pages/typing-test.astro`
- **Location**: Test mode tabs, sound toggle, motor buffer cards (lines ~228–640).
- **Action**:
  - Replace `⏱️`, `📝`, `🔊`, `🧠`, `📐`, `⌨️`, `🛋️`, `⬇` with 16×16 inline SVGs (Clock, FileText, Volume2, Brain, Compass, Keyboard, Sofa, Download).

---

## 🛡️ VERIFICATION & ACCEPTANCE GATE (MANDATORY)

1. **Automated Build Test**:
   ```powershell
   npm run build
   ```
   *Requirement: 0 build errors and 0 new warnings.*
2. **Grep Emoji Verification**:
   - Run grep for common emoji Unicode ranges across `src/pages/` and `src/components/`.
   - Must confirm ZERO raw cartoon emojis in UI chrome across all 10 target files.
3. **Visual Confirmation**:
   - Check `brown-noise.astro`, `color-blind-test.astro`, `tools.astro`, and `leaderboard.astro` in browser to confirm that all icons render as crisp, vector SVG micro-icons with proper alignment and contrast.

---

## 💾 LOCAL GIT COMMIT CHECKPOINT (MANDATORY)
Once all tasks and verification gates pass:
```powershell
git add src/pages/tools.astro src/pages/leaderboard.astro src/pages/depression-test.astro src/pages/brown-noise.astro src/pages/color-blind-test.astro src/pages/memento-mori.astro src/pages/hearing-test.astro src/pages/calorie-calculator.astro src/pages/circle-of-control.astro src/pages/typing-test.astro
git commit -m "feat(ui): complete Phase 2 emoji purge (replace cartoon emojis with 16x16 inline vector SVGs)"
```
