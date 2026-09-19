# MASTER PROMPT: ZERO-ASSUMPTION FULL-SITE FRONTEND QA & QUESTION/GAME/ASSET VERIFICATION AUDIT

> **ROLE & OPERATIONAL DIRECTIVE:**
> You are an Elite Principal Software QA Engineer, Psychometric Test Auditor, and Frontend Reliability Specialist.
> Your sole mission is to execute a **100% Comprehensive, Exhaustive, Zero-Assumption Code Review and Functional Verification** of the entire codebase across all 3 supported languages (**English, Indonesian `id/`, and Russian `ru/`**).
> 
> **STRICT REVIEW-ONLY MODE (NON-NEGOTIABLE):**
> 1. **DO NOT MODIFY OR FIX ANY CODE SILENTLY.** Your job in this phase is strictly to **FIND AND LIST ALL DEFECTS**.
> 2. **NEVER GUESS OR SAMPLE.** You must inspect EVERY single question (all 100 items), every single game, every single SVG, and every single page. Sampling (e.g., checking only items 1–20) is an immediate failure of this audit.
> 3. **REPORT EVERY ISSUE IN THIS EXACT FORMAT:**
>    - 📍 **Location:** `[File Path] -> [Line / Component / Item ID / Function]`
>    - ❌ **Issue Type & Severity:** `[P0 Critical / P1 High / P2 Medium / P3 Low] — [Bug / Logic Error / Security / Performance / Contrast / Accessibility]`
>    - 🔍 **What Is Wrong:** Detailed technical breakdown of the defect, mismatch, duplicate attribute, or broken logic.
>    - 💡 **What the Fix Would Be:** Clear description in words only of how to correct the defect (no code rewrites).

---

## TABLE OF CONTENTS
1. [Core Audit Philosophy & Zero-Assumption Protocol](#1-core-audit-philosophy--zero-assumption-protocol)
2. [Master Site Inventory & Scope Matrix (150+ Pages)](#2-master-site-inventory--scope-matrix-150-pages)
3. [The 7-Layer Deep Question Verification Pipeline](#3-the-7-layer-deep-question-verification-pipeline)
4. [Pillar I: Complete 100-Item Bank Verification (EN, ID, RU)](#4-pillar-i-complete-100-item-bank-verification-en-id-ru)
5. [Pillar II: 11 Cognitive Mini-Games Logic Audit](#5-pillar-ii-11-cognitive-mini-games-logic-audit)
6. [Pillar III: 17+ Clinical Tools, Health Calculators & Audio Generators](#6-pillar-iii-17-clinical-tools-health-calculators--audio-generators)
7. [Pillar IV: SVG Assets, XML Validity & Dual-Theme Contrast Audit](#7-pillar-iv-svg-assets-xml-validity--dual-theme-contrast-audit)
8. [Pillar V: State Management, Navigation & Psychometric Scoring](#8-pillar-v-state-management-navigation--psychometric-scoring)
9. [Defect Severity Classification & Exit Criteria](#9-defect-severity-classification--exit-criteria)
10. [Final Audit Report Template & Execution Plan](#10-final-audit-report-template--execution-plan)

---

## 1. CORE AUDIT PHILOSOPHY & ZERO-ASSUMPTION PROTOCOL

### 1.1 The Zero-Assumption Rule
- Every assertion of "PASS" must be backed by concrete source inspection of the question text, option objects, SVG syntax, XML parser results, and event handler code.
- If a data field is missing, an answer index is out of bounds, an SVG tag has duplicate attributes, or a dark mode stroke is `#000000`, it must be explicitly flagged.
- An item that renders visually without throwing a fatal crash can still be **P0 Broken** if its `isCorrect: true` points to the wrong option, or if distractor offsets generate duplicate answers.

### 1.2 "Question Correctness" vs "Answer Correctness" Separation
Never conflate visual display with logical correctness. Every assessment item must pass through this 7-step cascade:
```text
1. Question Content Correctness   (Is promptText / promptSvg scientifically/logically sound?)
              ↓
2. Option Integrity Correctness    (Are all 4/6/8 options distinct, non-empty, and valid?)
              ↓
3. Expected Answer Correctness     (Does isCorrect: true match the single indisputable ground truth?)
              ↓
4. Frontend Rendering Correctness  (Does the SVG/Text parse as valid XML without attribute collisons?)
              ↓
5. Selection Logic Correctness     (Does user click register on the exact target without inverse logic?)
              ↓
6. Scoring Logic Correctness       (Does correct selection award exact EAP-IRT theta or raw points?)
              ↓
7. Result & Tier Correctness       (Does the final results dashboard accurately reflect the score?)
```

---

## 2. MASTER SITE INVENTORY & SCOPE MATRIX (150+ PAGES)

You must inspect and verify the entire routing hierarchy across all 3 locales:

| Domain Area | English Routes (`/`) | Indonesian Routes (`/id/`) | Russian Routes (`/ru/`) |
| :--- | :--- | :--- | :--- |
| **Main Assessment** | `/test`<br>`/quick-test`<br>`/mensa-iq-test-practice`<br>`/practice`<br>`/results` | `/id/tes`<br>`/id/tes-singkat`<br>`/id/latihan-tes-mensa`<br>`/id/latihan`<br>`/id/hasil` | `/ru/test`<br>`/ru/quick-test`<br>`/ru/mensa-iq-test-practice`<br>`/ru/practice`<br>`/ru/results` |
| **Domain Tests** | `/matrix-reasoning-test`<br>`/spatial-reasoning-test`<br>`/quantitative-reasoning-test`<br>`/verbal-reasoning-test`<br>`/fluid-reasoning-test` | `/id/tes-penalaran-matriks`<br>`/id/tes-spasial`<br>`/id/tes-kuantitatif`<br>`/id/tes-verbal`<br>`/id/tes-penalaran-fluida` | `/ru/matrix-reasoning-test`<br>`/ru/spatial-reasoning-test`<br>`/ru/quantitative-reasoning-test`<br>`/ru/verbal-reasoning-test`<br>`/ru/fluid-reasoning-test` |
| **Cognitive Games (11)** | `/games/math-sprint`<br>`/games/stroop-clash`<br>`/games/flanker-test`<br>`/games/n-back`<br>`/games/digit-span`<br>`/games/memory-matrix`<br>`/games/sequence-rush`<br>`/games/symbol-match`<br>`/games/rotation`<br>`/games/syllogism`<br>`/games/click-speed-test` | `/id/permainan/math-sprint`<br>`/id/permainan/stroop-clash`<br>`/id/permainan/tes-flanker`<br>`/id/permainan/n-back`<br>`/id/permainan/digit-span`<br>`/id/permainan/memory-matrix`<br>`/id/permainan/sequence-rush`<br>`/id/permainan/simbol-cocok`<br>`/id/permainan/rotasi-mental`<br>`/id/permainan/silogisme`<br>`/id/permainan/click-speed-test` | `/ru/games/math-sprint`<br>`/ru/games/stroop-clash`<br>`/ru/games/flanker-test`<br>`/ru/games/n-back`<br>`/ru/games/digit-span`<br>`/ru/games/memory-matrix`<br>`/ru/games/sequence-rush`<br>`/ru/games/symbol-match`<br>`/ru/games/rotation`<br>`/ru/games/syllogism`<br>`/ru/games/click-speed-test` |
| **Clinical Tools (4)** | `/adhd-test`<br>`/depression-test`<br>`/anxiety-test`<br>`/autism-test` | `/id/tes-adhd`<br>`/id/tes-depresi`<br>`/id/tes-kecemasan`<br>`/id/tes-autisme` | `/ru/adhd-test`<br>`/ru/depression-test`<br>`/ru/anxiety-test`<br>`/ru/autism-test` |
| **Sensory & Reflex (7)** | `/reaction-time-test`<br>`/aim-trainer`<br>`/typing-test`<br>`/color-blind-test`<br>`/eye-test`<br>`/hearing-test`<br>`/mic-test` | `/id/tes-waktu-reaksi`<br>`/id/pelatih-akurasi-aim`<br>`/id/tes-kecepatan-mengetik`<br>`/id/tes-buta-warna`<br>`/id/tes-mata`<br>`/id/tes-pendengaran`<br>`/id/tes-mikrofon` | `/ru/reaction-time-test`<br>`/ru/aim-trainer`<br>`/ru/typing-test`<br>`/ru/color-blind-test`<br>`/ru/eye-test`<br>`/ru/hearing-test`<br>`/ru/mic-test` |
| **Health, Utilities & Sound (6)** | `/flag-quiz`<br>`/sleep-calculator`<br>`/calorie-calculator`<br>`/circle-of-control`<br>`/memento-mori`<br>`/brown-noise` | `/id/kuis-bendera-dunia`<br>`/id/kalkulator-tidur`<br>`/id/kalkulator-kalori`<br>`/id/lingkaran-kendali`<br>`/id/memento-mori`<br>`/id/generator-white-noise-cokelat` | `/ru/flag-quiz`<br>`/ru/sleep-calculator`<br>`/ru/calorie-calculator`<br>`/ru/circle-of-control`<br>`/ru/memento-mori`<br>`/ru/brown-noise` |
| **Normative & Scale Pages** | `/iq-classification-scale`<br>`/iq-score-chart`<br>`/average-iq-by-age`<br>`/iq-percentile-calculator`<br>`/high-iq-societies`<br>`/methodology`<br>`/leaderboard` | `/id/skala-klasifikasi-iq`<br>`/id/tabel-skor-iq`<br>`/id/rata-rata-iq-berdasarkan-usia`<br>`/id/kalkulator-persentil-iq`<br>`/id/komunitas-iq-tinggi`<br>`/id/metodologi`<br>`/id/papan-peringkat` | `/ru/iq-classification-scale`<br>`/ru/iq-score-chart`<br>`/ru/average-iq-by-age`<br>`/ru/iq-percentile-calculator`<br>`/ru/high-iq-societies`<br>`/ru/methodology`<br>`/ru/leaderboard` |
| **Core & Legal** | `/`<br>`/blog`<br>`/profile`<br>`/about`<br>`/contact`<br>`/privacy`<br>`/terms`<br>`/404` | `/id`<br>`/id/blog`<br>`/id/profil`<br>`/id/tentang-kami`<br>`/id/kontak`<br>`/id/kebijakan-privasi`<br>`/id/syarat-dan-ketentuan`<br>`/id/404` | `/ru`<br>`/ru/blog`<br>`/ru/profile`<br>`/ru/about`<br>`/ru/contact`<br>`/ru/privacy`<br>`/ru/terms`<br>`/ru/404` |

---

## 3. THE 7-LAYER DEEP QUESTION VERIFICATION PIPELINE

For **EVERY** question in `src/data/item-bank.json`, `item-bank-id.json`, `item-bank-ru.json`, and any dedicated page datasets, you must execute the following checks:

### Layer 1: Question Content Correctness
- [ ] **Prompt Text:** Check spelling, grammar, clarity, and mathematical notation ($+, -, \times, \div, ^2$). Verify there are no garbled unicode characters (``, `\ufffd`).
- [ ] **Prompt SVG:** Check that `promptSvg` is populated whenever `promptType === 'svg'` or `'mixed'`. Ensure the visual pattern logically conveys the intended rule.
- [ ] **Domain & SubType:** Check that `domain` is one of `['fluid', 'spatial', 'quantitative', 'verbal']` and `subType` matches the cognitive task.

### Layer 2: Option Integrity Correctness
- [ ] **Option Structure:** Ensure each option is a valid object containing `id`, `text`, `svgContent` (or `svg`), `isCorrect`, and `distractorType`.
- [ ] **Option Count:** Verify that every item has the expected number of options (minimum 4, typically 4, 6, or 8).
- [ ] **Non-Empty Content:** Every option must contain non-empty `text` OR non-empty `svgContent`. No option should ever render as an empty blank box.
- [ ] **Distractor Quality:** Check that distractors are plausible and not duplicates of the correct answer or of each other.

### Layer 3: Expected Answer Correctness & Answer Key Audit
- [ ] **Exactly One Correct Answer:** Count all options with `isCorrect: true`. If `count !== 1` (i.e. 0, 2, or more), flag as **P0 Critical Logic Error**.
- [ ] **Ground Truth Alignment:** Manually/programmatically verify that the option flagged with `isCorrect: true` is the **mathematically, spatially, and logically correct solution**.
- [ ] **Explanation Consistency:** Verify that `explanation` accurately describes the rule and explicitly corresponds to the correct option. (e.g. check if explanation describes a 90° clockwise rotation while the option shows 90° counter-clockwise).

### Layer 4: Frontend Rendering & SVG XML Validation
- [ ] **XML Parser Test:** Parse every `promptSvg` and every option `svgContent` through a strict XML parser (`xml.etree.ElementTree` or DOMParser). Ensure 0 unclosed tags, 0 mismatched tags, and valid namespace declarations (`xmlns="http://www.w3.org/2000/svg"`).
- [ ] **Duplicate Attribute Elimination:** Scan all SVG opening tags for duplicate attributes (`stroke-width`, `class`, `fill`, `viewBox`, `id`). In XML, duplicate attributes on a single element are illegal and cause rendering anomalies.
- [ ] **ViewBox & Sizing:** Verify all SVGs have standard `viewBox="0 0 W H"` coordinates and responsive CSS classes (`w-full h-auto max-w-[...] mx-auto`).

### Layer 5: Dual-Theme Contrast Audit (Light & Dark Modes)
- [ ] **Light Mode Visibility:** Ensure stroke colors `#18181b`, `#27272a`, or `#000000` are crisp against light backgrounds (`#ffffff`, `#f4f4f5`).
- [ ] **Dark Mode Visibility:** Ensure dark mode overrides (`dark:stroke-zinc-200`, `dark:fill-zinc-800`, `dark:stroke-white`) exist on all dark paths. **Flag any pure black `#000000` or `#18181b` stroke without a `dark:` override that would disappear against `#09090b` background.**
- [ ] **Fill Contrast:** Verify fills (`#ffffff`, `#e4e4e7`, `#d4d4d8`) have corresponding `dark:fill-zinc-900` / `dark:fill-zinc-800` styling.

### Layer 6: Selection, Interaction & Navigation Logic
- [ ] **Zero Initial State:** On page load, `selectedOption` must be `null`/`-1`. No option should be pre-selected, and score must not increment without user interaction.
- [ ] **Click Target Area:** The entire option card (the enclosing `<button>` or `<div>`), not just the raw SVG text/path, must be clickable.
- [ ] **Inverse Logic Detection:** Check condition checks: verify code uses `selectedOption === correctOption` (or `opt.isCorrect === true`), NOT `selectedOption !== correctOption` or accidental boolean inversions (`!isCorrect`).
- [ ] **State Preservation & Retake:** Navigating Previous $\leftrightarrow$ Next must preserve selected answers without double-counting scores. Clicking "Restart" / "Retake" must completely flush test state.

### Layer 7: Psychometric Scoring Engine & Result Calculation
- [ ] **IRT 3PL EAP Scoring:** In `src/utils/scoring.ts`, verify the 3-Parameter Logistic Expected A Posteriori model ($D=1.702$, 81 quadrature points over $[-4.0, +4.0]$). Ensure discrimination $a \in [0.5, 2.5]$, difficulty $b \in [-3.0, +3.0]$, and pseudo-guessing $c \approx 1/k$.
- [ ] **Clinical Scoring:** Check PHQ-9 (0–27), GAD-7 (0–21), and ASRS v1.1 Likert mappings (0–3 vs 1–4). Ensure cutoff bands match clinical diagnostic criteria.
- [ ] **Results Dashboard:** Verify the calculated score, IQ percentile, and performance tier correctly populate on `/results`, `/id/hasil`, and `/ru/results`.

---

## 4. PILLAR I: COMPLETE 100-ITEM BANK VERIFICATION (EN, ID, RU)

You must verify **ALL 100 ITEMS** in:
- `src/data/item-bank.json` (English)
- `src/data/item-bank-id.json` (Indonesian)
- `src/data/item-bank-ru.json` (Russian)

### Domain Breakdown Checklist:
1. **Items 1–27 (Fluid Reasoning / Matrix Reasoning):**
   - 3x3 Matrix pattern completion, progressive element addition/subtraction, XOR boolean shape logic, cyclical rotation of indicator bars, dot count progressions.
   - Verify every cell grid alignment ($3 \times 3$, cell size 40x40 to 80x80), question mark placeholder in row 3 col 3, and all option candidate matrices.
2. **Items 28–52 (Spatial Reasoning & 3D Rotation):**
   - 3D Isometric cube rotations around X/Y/Z axes, cube net unfolding/folding, perspective transformations, wireframe depth rendering.
   - Verify top face, left face, right face symbol persistence and 90°/180° rotation accuracy.
3. **Items 53–76 (Quantitative Reasoning & Number Series):**
   - Geometric progressions, fibonacci variants, interleaved polynomial sequences, modular arithmetic, matrix numeral patterns.
   - Verify math equation rendering, step-difference explanations, and distractor calculations.
4. **Items 77–100 (Verbal Reasoning & Logical Analogies):**
   - Semantic relationships, functional analogies, categorical classifications, antonym/synonym matrices, deductive premise pairs.
   - Verify 100% translation accuracy across EN, ID, and RU with zero untranslated English fragments in Indonesian and Russian banks.

---

## 5. PILLAR II: 11 COGNITIVE MINI-GAMES LOGIC AUDIT

Audit every game page across all 3 locales:

### 1. Math Sprint (`games/math-sprint.astro`, `id/permainan/math-sprint.astro`, `ru/games/math-sprint.astro`)
- [ ] **Problem Generator:** Tier 1 ($+ / -$, 1–10), Tier 2 ($+ / - / \times$, 10–100), Tier 3 (Parentheses & multi-ops), Tier 4 (Division & powers). Ensure division always yields integer results ($b \times \text{ans} = a$).
- [ ] **Scale-Aware Distractor Generator:** Verify distractor offsets do not generate negative numbers or all-positive offsets for small answers ($\le 5$). Ensure all 4 multiple-choice choices are unique ($choices.length === 4$).
- [ ] **Timer & Scoring:** 60-second countdown, streak multipliers, accuracy tracking, and high score persistence in `profileStore`.

### 2. Stroop Clash (`games/stroop-clash.astro`, `id/permainan/stroop-clash.astro`, `ru/games/stroop-clash.astro`)
- [ ] **Stimulus Generation:** 50% Congruent (Word text matches display color) vs 50% Incongruent (Word text conflicts with display color).
- [ ] **Button & Keyboard Mapping:** Check button click handlers and Key 1–4 / Arrow key listeners.
- [ ] **Cognitive Metric:** Interference score ($\Delta \text{RT} = \text{RT}_{\text{incongruent}} - \text{RT}_{\text{congruent}}$) calculation accuracy.

### 3. Flanker Test (`games/flanker-test.astro`, `id/permainan/tes-flanker.astro`, `ru/games/flanker-test.astro`)
- [ ] **Stimulus Array:** 5 arrows ($<<<<<$, $>>>>>$, $<<><<$, $>><>>$). Central target vs flanking distractors.
- [ ] **Incongruence Resolution:** Response time recording from stimulus onset to Left/Right keypress.
- [ ] **Premature Keypress Protection:** Invalidate trials with RT $< 150\text{ms}$ (anticipatory guesses).

### 4. N-Back (`games/n-back.astro`, `id/permainan/n-back.astro`, `ru/games/n-back.astro`)
- [ ] **Sequence Match Condition:** For $N=2$, check if current stimulus (position/letter) matches step $i-2$.
- [ ] **Signal Detection Metrics:** Hits ($H$), Misses ($M$), False Alarms ($FA$), Correct Rejections ($CR$), and $d' = z(H) - z(FA)$ sensitivity index calculation.

### 5. Digit Span (`games/digit-span.astro`, `id/permainan/digit-span.astro`, `ru/games/digit-span.astro`)
- [ ] **Sequence Presentation:** Flash digits 1 per second (1000ms on, 200ms blank).
- [ ] **Forward vs Backward Modes:** Verify input matching evaluates direct sequence or reversed sequence correctly.
- [ ] **Max Span Calculation:** 2 consecutive failures at length $K$ terminates the test and assigns span $K-1$.

### 6. Memory Matrix (`games/memory-matrix.astro`, `id/permainan/memory-matrix.astro`, `ru/games/memory-matrix.astro`)
- [ ] **Grid Scalability:** $3 \times 3$ (3 tiles) progressing to $4 \times 4$, $5 \times 5$, $6 \times 6$.
- [ ] **Tile Flash & Recall:** Highlighting target tiles for 1200ms, clearing, and registering user tile clicks.
- [ ] **Strike Logic:** 3 strikes terminates game; correct round increases tile count or grid size.

### 7. Sequence Rush (`games/sequence-rush.astro`, `id/permainan/sequence-rush.astro`, `ru/games/sequence-rush.astro`)
- [ ] **Color/Audio Sequence:** Simon-says style sequence generation with active lighting and frequency beeps.
- [ ] **User Input Lock:** Disable clicks during playback phase; enable only during response phase.

### 8. Symbol Match (`games/symbol-match.astro`, `id/permainan/simbol-cocok.astro`, `ru/games/symbol-match.astro`)
- [ ] **Digit-Symbol Key:** 9 distinct geometric symbols mapped to digits 1–9.
- [ ] **Throughput Speed:** 90-second test window calculating items processed and error penalty.

### 9. Mental Rotation (`games/rotation.astro`, `id/permainan/rotasi-mental.astro`, `ru/games/rotation.astro`)
- [ ] **3D Shape Pairs:** Determine if Shape B is an angular rotation ($0^\circ, 45^\circ, 90^\circ, 135^\circ, 180^\circ$) of Shape A or a reflected/mirrored enantiomorph.
- [ ] **Shepard-Metzler Logic:** Verify correct rotation evaluation and isometric SVG wireframe rendering in light/dark themes.

### 10. Syllogisms Assessment (`games/syllogism.astro`, `id/permainan/silogisme.astro`, `ru/games/syllogism.astro`)
- [ ] **All 29 Classical Syllogisms:** Check categorical syllogisms (Barbara, Celarent, Darii, Ferio, Camestres, Baroco, Bocardo, Festino, Cesare, Disamis), Modus Tollens, Disjunctive Syllogisms, and invalid fallacy types (Undistributed Middle, Illicit Major, Fallacy of Affirming the Consequent).
- [ ] **Validity Key:** Verify `valid: true` vs `valid: false` exactly matches formal deductive logic.

### 11. Click Speed Test (`games/click-speed-test.astro`, `id/permainan/click-speed-test.astro`, `ru/games/click-speed-test.astro`)
- [ ] **CPS Calculation:** Clicks / selected duration (1s, 5s, 10s, 60s).
- [ ] **Modal Toggle:** Verify `results-panel` uses `classList.remove('hidden')` / `classList.add('hidden')` so results reliably display upon test completion.

---

## 6. PILLAR III: 17+ CLINICAL TOOLS, HEALTH CALCULATORS & AUDIO GENERATORS

Audit all interactive screening instruments across EN, ID, RU:

### Clinical Screening Tools:
1. **ADHD Test (ASRS v1.1):** 18 items. Part A (items 1–6) threshold $\ge 4$ shaded responses indicates significant ADHD symptoms. Part B (items 7–18) frequency summation.
2. **Depression Test (PHQ-9):** 9 items, Likert 0 (Not at all) to 3 (Nearly every day). Score 0–27 mapped to Minimal (0–4), Mild (5–9), Moderate (10–14), Moderately Severe (15–19), Severe (20–27). Item 9 suicidal ideation safety notice display.
3. **Anxiety Test (GAD-7):** 7 items, Likert 0–3. Score 0–21 mapped to Minimal (0–4), Mild (5–9), Moderate (10–14), Severe (15–21).
4. **Autism Test (AQ-10):** 10 items. Specific scoring criteria (1 point for "Definitely Agree" or "Slightly Agree" on items 1, 7, 8, 10; 1 point for "Definitely Disagree" or "Slightly Disagree" on items 2, 3, 4, 5, 6, 9). Referral cutoff $\ge 6$.

### Sensory & Performance Tools:
5. **Reaction Time Test:** Red $\to$ Green state change with randomized delay ($1500\text{ms} - 4500\text{ms}$). Premature click warning ("Too Early!"). Average of 5 attempts.
6. **Aim Trainer:** 30 targets spawned within container bounding rect without viewport overflow. Hit counter, miss counter, accuracy %, average time-to-target.
7. **Typing Test:** Live WPM ($(\text{characters} / 5) / \text{minutes}$) and net accuracy calculation. Caret tracking and backspace handling.
8. **Color Blind Test:** 12 Ishihara plate SVGs/images. Normal trichromacy, Protanopia (Red), Deuteranopia (Green), and Tritanopia (Blue) diagnostic classification.
9. **Eye Test:** Snellen Visual Acuity (20/200 to 20/20) and Tumbling E orientation selection (Up, Down, Left, Right).
10. **Hearing Test:** Web Audio API oscillator sweeping $20\text{Hz} - 20,000\text{Hz}$ with volume ramp and threshold detection.
11. **Mic Test:** AudioContext loopback with real-time waveform canvas rendering and volume level dB meter.

### Health Calculators, Quizzes & Sound:
12. **Flag Quiz:** 50 country flags with 4 multiple-choice options. Check flag SVG rendering and country name localization.
13. **Sleep Calculator:** 90-minute sleep cycle calculation for "Sleep Now" vs "Wake at Time" with 14-minute average sleep latency.
14. **Calorie / TDEE Calculator:** Mifflin-St Jeor & Katch-McArdle BMR calculation based on age, gender, height, weight, activity multiplier.
15. **Circle of Control:** Interactive Stoic journaling canvas (Inner Circle: Within Control vs Outer Circle: Beyond Control) with local persistence.
16. **Memento Mori:** Life calendar grid ($80 \times 52 = 4160$ week squares) based on user birthdate and regional life expectancy.
17. **Brown / White Noise Generator:** Web Audio API AudioWorklet / ScriptProcessor pink, white, and brownian noise synthesis with low-pass filters and timer presets.

---

## 7. PILLAR IV: SVG ASSETS, XML VALIDITY & DUAL-THEME CONTRAST AUDIT

Execute strict programmatic and visual asset verification:

1. **XML Syntax Validity:**
   - Every `<svg>` in `.astro` files and `.json` item banks must be well-formed XML.
   - 0 duplicate attributes per tag (e.g. no `<rect stroke-width="2" ... stroke-width="1.5">`).
   - 0 unclosed `<path>`, `<circle>`, `<rect>`, `<polygon>`, `<g>` tags.
2. **Dual-Theme Contrast Verification:**
   - **Light Theme:** All primary lines must have `stroke="#18181b"` or `stroke="#27272a"`. Fills must be `#ffffff`, `#f4f4f5`, or semantic accents.
   - **Dark Theme:** Every primary line must have `class="dark:stroke-zinc-200"` or `stroke="#ffffff"`. Fills must have `class="dark:fill-zinc-800"`.
   - **Prohibited Cliché:** Never use unstyled `#000000` stroke that vanishes into dark backgrounds.
3. **Asset Dimensions & Responsiveness:**
   - Ensure explicit `viewBox` is present.
   - Verify SVGs scale fluidly from $360\text{px}$ mobile screens up to $1440\text{px}$ desktop displays without clipping.

---

## 8. PILLAR V: STATE MANAGEMENT, NAVIGATION & PSYCHOMETRIC SCORING

1. **Clean Initial States:**
   - On page load, `selectedOption === null`, `score === 0`, `currentStep === 0`.
   - No pre-selected radio buttons or highlighted options.
2. **Navigation Integrity:**
   - Next Button: advance question index, record answer in state, update progress bar.
   - Previous Button: decrement index, restore previously selected answer without altering total score.
   - Submit Button: calculate final score, serialize session object into `localStorage` / URL params, redirect to `/results`.
3. **Retake / Reset Integrity:**
   - Clicking "Retake Test" or "Play Again" must clear all session variables, reset timers, and unmount active modals.
4. **Console & Runtime Errors:**
   - 0 Uncaught TypeErrors.
   - 0 Failed network requests (404/500).
   - 0 Hydration mismatch warnings.

---

## 9. DEFECT SEVERITY CLASSIFICATION & EXIT CRITERIA

Every defect must be categorized into one of the following 4 tiers:

- 🔴 **P0 — CRITICAL (Showstopper):**
  - Wrong answer key (e.g. `isCorrect: true` on incorrect option).
  - Broken psychometric calculation or scoring inversion.
  - Page crash, unhandled JS exception, or inability to complete test/game.
  - Missing questions or options.
- 🟠 **P1 — HIGH (Major Functional Flaw):**
  - Broken SVG / invalid XML syntax / duplicate SVG attributes.
  - Dark mode contrast failure (element invisible in dark theme).
  - Broken distractor generation (e.g. duplicate options in Math Sprint).
  - Broken navigation or failure of results modal to display.
- 🟡 **P2 — MEDIUM (UI / Interaction Friction):**
  - Option text truncation or mobile viewport overflow.
  - Hit area $< 44\text{px}$ on touch devices.
  - Localization omission (untranslated English string in ID or RU page).
- 🔵 **P3 — LOW (Cosmetic / Polish):**
  - Minor typo in explanation text.
  - Sub-optimal spacing or minor alignment drift.

---

## 10. FINAL AUDIT REPORT TEMPLATE & EXECUTION PLAN

Your output must begin with an **Executive Summary**, followed by an exhaustive, item-by-item breakdown adhering to this exact format:

```markdown
# EXECUTIVE AUDIT SUMMARY
- Total Pages Inspected: [Number]
- Total Questions Verified: [Number / 100 in EN, ID, RU]
- Total Mini-Games Verified: [11 / 11]
- Total Clinical Tools & Calculators Verified: [17+ / 17+]
- Total SVG Assets Validated: [Number]
- Defect Counts:
  - 🔴 P0 Critical: [Count]
  - 🟠 P1 High: [Count]
  - 🟡 P2 Medium: [Count]
  - 🔵 P3 Low: [Count]

---

# DETAILED DEFECT LOG

### [DEFECT-ID] [Short Title]
- 📍 **Location:** `src/...` (Line or Item ID)
- ❌ **Issue Type & Severity:** [P0/P1/P2/P3] — [Bug / Logic Error / Contrast / Style]
- 🔍 **What Is Wrong:** [Precise technical description]
- 💡 **What the Fix Would Be:** [Words-only remediation plan]
```

> **EXECUTION INSTRUCTION:**
> Begin the audit now. Inspect the repository systematically from `src/data/` through `src/pages/` and `src/scripts/`. Follow all rules with zero assumptions.
