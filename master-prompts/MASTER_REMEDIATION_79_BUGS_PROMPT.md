# MASTER REMEDIATION PROMPT: 79 VERIFIED DEFECTS STEP-BY-STEP FIX EXECUTION

> **ROLE & MISSION DIRECTIVE:**
> You are an Elite Principal Software Engineer, Psychometric Systems Architect, and Production Reliability Specialist.
> Your mission is to systematically fix all **79 Confirmed Real Defects** and the actionable items from the contextual clashes identified in `master-prompts/report verification.md` across the repository at `E:\Antigravity\freeiqexam.com`.
> 
> **OPERATIONAL GOLDEN RULES:**
> 1. **STEP-BY-STEP BATCH EXECUTION (10 BUGS PER PHASE):** You must fix bugs in structured batches of 10. Do not attempt to fix all 79 bugs simultaneously.
> 2. **CONTINUOUS PROGRESS TRACKER (`REMEDIATION_PROGRESS.md`):** You must create and maintain a dedicated tracking file `REMEDIATION_PROGRESS.md` in the workspace root. For each bug fixed:
>    - Mark the bug as `[x] FIXED`.
>    - Record the exact file modified, line numbers, and verification command/check.
>    - After every 10 bugs (one batch), log a batch milestone summary before starting the next batch.
> 3. **ZERO CODE REGRESSION & NO UNNECESSARY REWRITES:** Only touch the exact lines, objects, or attributes required to resolve each defect. Do not refactor adjacent working code.
> 4. **STRICT FALSE-POSITIVE BLACKLIST:** Under NO circumstances should you touch or "fix" the 29 debunked false positives (e.g. DO NOT revert the Russian item bank answer keys; DO NOT translate Schema.org vocabularies; DO NOT clamp theta to [-3, +3]).

---

## PROGRESS TRACKER SPECIFICATION (`REMEDIATION_PROGRESS.md`)

Before starting Batch 1, create `E:\Antigravity\freeiqexam.com\REMEDIATION_PROGRESS.md` with the following structure and update it continuously:

```markdown
# 🛠️ REMEDIATION PROGRESS TRACKER

- **Total Confirmed Defects:** 79 (+ Actionable Contextual Items)
- **Batches Completed:** 0 / 9
- **Current Active Batch:** Batch 1 (Defects 01–10)
- **Last Updated:** [Timestamp]

| Defect ID | Priority | Category | Target File | Status | Verification Status |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **DEF-01** | P0 | Visual Contrast | `src/scripts/tools/eye-tester.js` | [ ] Pending | Unverified |
| **DEF-02** | P0 | Scoring Loss | `src/pages/test.astro` | [ ] Pending | Unverified |
...
```

---

## BATCH 1: DEFECTS 01–10 (P0 CRITICAL — SCORING INTEGRITY & CRASH BLOCKERS)

### 🔴 DEF-01: Eye Test "Tumbling E" Canvas Optotype Invisible in Dark Mode
- 📍 **Location:** `src/scripts/tools/eye-tester.js:136`
- 🔍 **What Is Wrong:** SVG generator hardcodes `fill="#000000"` on `<g transform="rotate(...)">`. On dark themes (`dark:bg-[#09090b]`), the optotype E is completely invisible, making visual acuity testing unplayable.
- 💡 **Exact Fix:** Replace hardcoded `fill="#000000"` with `class="fill-zinc-950 dark:fill-white"` or `fill="currentColor"`.

### 🔴 DEF-02: Expired Session Auto-Submit Discards Real Score and Triggers Fake Demo
- 📍 **Location:** `src/pages/test.astro`, `src/pages/quick-test.astro`, `src/pages/id/tes.astro`, `src/pages/ru/test.astro`
- 🔍 **What Is Wrong:** When session expires, inline runner executes `submitTestImmediately()`, which calls `window.__fiqSaveSessionResult`. However, that function is assigned in a deferred module at line ~1000 and is `undefined` at execution time. The session is never saved, and `/results` displays a fake DEMO score (IQ 124).
- 💡 **Exact Fix:** Move the declaration and assignment of `window.__fiqSaveSessionResult` into an early `<script is:inline>` block before the test runner executes, or guarantee it is available synchronously.

### 🔴 DEF-03: Results Page Uncaught TypeError on Missing/Corrupted Schema
- 📍 **Location:** `src/pages/results.astro`, `src/pages/id/hasil.astro`, `src/pages/ru/results.astro`
- 🔍 **What Is Wrong:** `JSON.parse` result from `localStorage.getItem('iq_assessment_result')` lacks structural validation. Direct property dereferences (`result.confidenceInterval[0]`, `result.domainBreakdown[key].total`) throw unhandled TypeErrors if corrupt, freezing the UI.
- 💡 **Exact Fix:** Add defensive schema validation: verify `result` is an object, `Array.isArray(result.confidenceInterval)` with length 2, and `result.domainBreakdown` has required keys. Fall back safely to a clean empty/unscored state if invalid.

### 🔴 DEF-04: Indonesian Item 74 Probability Answer Key Inverted
- 📍 **Location:** `src/data/item-bank-id.json` (Item ID 74)
- 🔍 **What Is Wrong:** Problem asks for probability of picking 2 red marbles out of 15 without replacement. Explanation correctly computes $(4/15) \times (3/14) = 2/35$. Option 1 (`2/35`) is marked `isCorrect: false`, while Option 2 (`4/35`) is marked `isCorrect: true`.
- 💡 **Exact Fix:** In `src/data/item-bank-id.json`, set `isCorrect: true` on Option 1 (`2/35`) and `isCorrect: false` on Option 2 (`4/35`).

### 🔴 DEF-05: Indonesian Item 78 Verbal Analogy Answer Key Inverted
- 📍 **Location:** `src/data/item-bank-id.json` (Item ID 78)
- 🔍 **What Is Wrong:** Analogy `KAYU : MEJA :: BESI : ?`. Explanation correctly states iron is raw material for `pagar` (fence). Option 1 (`pohon` - tree) is marked `isCorrect: true`, while Option 4 (`pagar`) is marked `isCorrect: false`.
- 💡 **Exact Fix:** Set `isCorrect: true` on Option 4 (`pagar`) and `isCorrect: false` on Option 1 (`pohon`).

### 🔴 DEF-06: Indonesian Item 84 Verbal Antonym Answer Key Inverted
- 📍 **Location:** `src/data/item-bank-id.json` (Item ID 84)
- 🔍 **What Is Wrong:** Analogy `SIANG : MALAM :: TERBIT : ?`. Opposite of rise (`terbit`) is set (`tenggelam`). Option 1 (`matahari` - sun) is marked `isCorrect: true`, while Option 2 (`tenggelam`) is marked `isCorrect: false`.
- 💡 **Exact Fix:** Set `isCorrect: true` on Option 2 (`tenggelam`) and `isCorrect: false` on Option 1 (`matahari`).

### 🔴 DEF-07: Indonesian Items 28–36 Prompts Invalidate 2D Spatial Tasks
- 📍 **Location:** `src/data/item-bank-id.json` (Items 28–36)
- 🔍 **What Is Wrong:** Items 28–36 are 2D sequence/matrix inductions (e.g. satellite indicator rotation, 2x2 matrix). Indonesian `promptText` mistakenly instructs the user: *"Bentuk mana yang merupakan hasil rotasi 3D yang valid dari objek stimulus?"*.
- 💡 **Exact Fix:** Re-translate `promptText` for items 28–36 to faithfully describe 2D pattern progression and matrix completion matching the English source items.

### 🔴 DEF-08: Indonesian Items 38–52 Prompts Invalidate 2D Pattern Strips & Nets
- 📍 **Location:** `src/data/item-bank-id.json` (Items 38–52)
- 🔍 **What Is Wrong:** Items 38–52 prompt texts instruct generic 3D cube rotations even for unfolding nets, paper folding, and compound spatial slices.
- 💡 **Exact Fix:** Replace generic cube rotation prompts in items 38–52 with precise task-specific translations matching the English bank.

### 🔴 DEF-09: Indonesian Items 37 & 38 Options Left in Untranslated English
- 📍 **Location:** `src/data/item-bank-id.json` (Items 37 & 38)
- 🔍 **What Is Wrong:** Text-only items 37 and 38 have option strings left in raw English (e.g. *"Solid with three stepped cubes"*, *"Four symmetric holes"*).
- 💡 **Exact Fix:** Translate all option strings in items 37 and 38 into natural, precise Indonesian.

### 🔴 DEF-10: Russian Items 37 & 38 Options Left in Untranslated English
- 📍 **Location:** `src/data/item-bank-ru.json` (Items 37 & 38)
- 🔍 **What Is Wrong:** Text-only items 37 and 38 have option strings left in raw English without Cyrillic translation.
- 💡 **Exact Fix:** Translate all option strings in items 37 and 38 into natural, precise Russian.

> 📝 **Milestone Check 1:** Update `REMEDIATION_PROGRESS.md`. Verify all 10 fixes pass syntax and JSON linting.

---

## BATCH 2: DEFECTS 11–20 (P1 HIGH — SVG XML PARSING, DARK CONTRAST & ITEM INTEGRITY)

### 🟠 DEF-11: Items 91–95 Missing 4th Distractor (English Bank)
- 📍 **Location:** `src/data/item-bank.json` (Items 91–95)
- 🔍 **What Is Wrong:** Items 91–95 have only 3 options instead of the required minimum of 4, inflating guessing parameter $c$ from 0.25 to 0.33.
- 💡 **Exact Fix:** Add a 4th plausible distractor option (`id: 4`, `isCorrect: false`, `distractorType: "feature_attraction"`) to items 91–95.

### 🟠 DEF-12: Items 91–95 Missing 4th Distractor (Indonesian Bank)
- 📍 **Location:** `src/data/item-bank-id.json` (Items 91–95)
- 🔍 **What Is Wrong:** Same 3-option specification defect in Indonesian bank.
- 💡 **Exact Fix:** Add a 4th plausible Indonesian distractor option to items 91–95 matching the English addition.

### 🟠 DEF-13: Items 91–95 Missing 4th Distractor (Russian Bank)
- 📍 **Location:** `src/data/item-bank-ru.json` (Items 91–95)
- 🔍 **What Is Wrong:** Same 3-option specification defect in Russian bank.
- 💡 **Exact Fix:** Add a 4th plausible Russian distractor option to items 91–95 matching the English addition.

### 🟠 DEF-14: Item 16 Unclosed `<g>`/`<rect>` XML Tag in English Bank
- 📍 **Location:** `src/data/item-bank.json` (Item 16 `promptSvg`, col 3441)
- 🔍 **What Is Wrong:** Strict XML parser fails on mismatched tag `<rect ...>` without self-closing `/>` or unclosed `<g>`.
- 💡 **Exact Fix:** Ensure all opening tags in Item 16 `promptSvg` are properly closed (`<rect ... />`) and valid XML.

### 🟠 DEF-15: Item 16 Duplicate `stroke-width` in Option 6 (English Bank)
- 📍 **Location:** `src/data/item-bank.json` (Item 16, Option 6 `svgContent`)
- 🔍 **What Is Wrong:** Tag contains duplicate `stroke-width="2" stroke-width="5"`.
- 💡 **Exact Fix:** Remove the duplicate `stroke-width="2"` attribute, keeping only the intended `stroke-width="5"`.

### 🟠 DEF-16: Item 16 Duplicate `stroke-width` in Indonesian Bank
- 📍 **Location:** `src/data/item-bank-id.json` (Item 16 `promptSvg` and Option 6)
- 🔍 **What Is Wrong:** Contains duplicate `stroke-width` attributes in multiple tags.
- 💡 **Exact Fix:** Clean all tags to contain exactly one `stroke-width` attribute.

### 🟠 DEF-17: Item 16 Duplicate `stroke-width` in Russian Bank
- 📍 **Location:** `src/data/item-bank-ru.json` (Item 16 `promptSvg` and Option 4)
- 🔍 **What Is Wrong:** Contains duplicate `stroke-width` attributes in multiple tags.
- 💡 **Exact Fix:** Clean all tags to contain exactly one `stroke-width` attribute.

### 🟠 DEF-18: Item 47 Dark Mode Invisible Strokes (English Bank)
- 📍 **Location:** `src/data/item-bank.json` (Item 47 `promptSvg` and options)
- 🔍 **What Is Wrong:** Polygons and lines use `stroke="#18181b"` without `dark:stroke-zinc-200` overrides, rendering shapes invisible against `#09090b` dark backgrounds.
- 💡 **Exact Fix:** Add `class="dark:stroke-zinc-200"` to all SVG polygon/path elements with dark stroke.

### 🟠 DEF-19: Item 47 Dark Mode Invisible Strokes (Indonesian Bank)
- 📍 **Location:** `src/data/item-bank-id.json` (Item 47 `promptSvg` and options)
- 🔍 **What Is Wrong:** Dark mode stroke invisibility in Indonesian bank.
- 💡 **Exact Fix:** Add `class="dark:stroke-zinc-200"` across Item 47 in `item-bank-id.json`.

### 🟠 DEF-20: Item 47 Dark Mode Invisible Strokes (Russian Bank)
- 📍 **Location:** `src/data/item-bank-ru.json` (Item 47 `promptSvg` and options)
- 🔍 **What Is Wrong:** Dark mode stroke invisibility in Russian bank.
- 💡 **Exact Fix:** Add `class="dark:stroke-zinc-200"` across Item 47 in `item-bank-ru.json`.

> 📝 **Milestone Check 2:** Update `REMEDIATION_PROGRESS.md`. Run XML parse script to verify 0 XML errors in all 3 item banks.

---

## BATCH 3: DEFECTS 21–30 (P1 HIGH — ROUTING PARITY & MISSING LOCALIZED PAGES)

### 🟠 DEF-21: Missing Click Speed Test in Indonesian Locale
- 📍 **Location:** `src/pages/id/permainan/click-speed-test.astro`
- 🔍 **What Is Wrong:** English has `src/pages/games/click-speed-test.astro`, but Indonesian folder `src/pages/id/permainan/` lacks this page (returns 404).
- 💡 **Exact Fix:** Create `src/pages/id/permainan/click-speed-test.astro` with full Indonesian localization and link it in the Indonesian games hub (`src/pages/id/permainan.astro`).

### 🟠 DEF-22: Missing Click Speed Test in Russian Locale
- 📍 **Location:** `src/pages/ru/games/click-speed-test.astro`
- 🔍 **What Is Wrong:** Russian folder `src/pages/ru/games/` lacks Click Speed Test.
- 💡 **Exact Fix:** Create `src/pages/ru/games/click-speed-test.astro` with full Russian localization and link it in the Russian games hub (`src/pages/ru/games.astro`).

### 🟠 DEF-23: Register `click-speed-test` in `profileStore.ts`
- 📍 **Location:** `src/utils/profileStore.ts:119–130`
- 🔍 **What Is Wrong:** `VALID_GAME_IDS` omit `click-speed-test`, causing imported or saved profiles to drop click speed test records.
- 💡 **Exact Fix:** Add `'click-speed-test'` to the allowed game IDs array and legacy mapping in `profileStore.ts`.

### 🟠 DEF-24: Russian Missing Tool — Calorie Calculator
- 📍 **Location:** `src/pages/ru/calorie-calculator.astro`
- 🔍 **What Is Wrong:** Tool exists in EN and ID but is missing in Russian (404).
- 💡 **Exact Fix:** Create `src/pages/ru/calorie-calculator.astro` importing `calorie-engine-ru.js` (or creating the RU engine if missing) with Russian layout.

### 🟠 DEF-25: Russian Missing Tool — Circle of Control
- 📍 **Location:** `src/pages/ru/circle-of-control.astro`
- 🔍 **What Is Wrong:** Mindfulness tool missing in Russian locale.
- 💡 **Exact Fix:** Create `src/pages/ru/circle-of-control.astro` with localized Russian copy and UI.

### 🟠 DEF-26: Russian Missing Tool — Memento Mori
- 📍 **Location:** `src/pages/ru/memento-mori.astro`
- 🔍 **What Is Wrong:** Life calendar tool missing in Russian locale.
- 💡 **Exact Fix:** Create `src/pages/ru/memento-mori.astro` with Russian life expectancy norms and copy.

### 🟠 DEF-27: Russian Missing Tool — Brown Noise Generator
- 📍 **Location:** `src/pages/ru/brown-noise.astro`
- 🔍 **What Is Wrong:** Audio generator missing in Russian locale.
- 💡 **Exact Fix:** Create `src/pages/ru/brown-noise.astro` with localized sound preset labels and timers.

### 🟠 DEF-28: Item 25 Missing `xmlns` Attribute on Option SVGs
- 📍 **Location:** `src/data/item-bank*.json` (Item 25, Options 1–6 in EN, ID, RU)
- 🔍 **What Is Wrong:** 18 option SVGs lack `xmlns="http://www.w3.org/2000/svg"`, use single quotes, and miss `select-none`.
- 💡 **Exact Fix:** Add `xmlns="http://www.w3.org/2000/svg"` and standard responsive classes to all 18 option SVGs.

### 🟠 DEF-29: Indonesian Mic Test DOM ID Mounting Mismatch
- 📍 **Location:** `src/pages/id/tes-mikrofon.astro` vs `src/scripts/tools/mic-tester-id.js`
- 🔍 **What Is Wrong:** Page renders container IDs `mic-shell`, `mount`, and `test-page`, but `mic-tester-id.js` expects `mic-app`, `controls`, `error`, `error-message`, and `unsupported`. Error handling silently fails.
- 💡 **Exact Fix:** Align the container DOM IDs in `tes-mikrofon.astro` to match what `mic-tester-id.js` queries.

### 🟠 DEF-30: Russian Crisis Interstitial Lacks Russian Helplines
- 📍 **Location:** `src/pages/ru/depression-test.astro`, `src/pages/ru/anxiety-test.astro`
- 🔍 **What Is Wrong:** Emergency crisis modal lists only US/UK telephone hotlines (988, 111).
- 💡 **Exact Fix:** Add official Russian psychological crisis hotlines (e.g. Russian Single Helpline `8-800-200-0122` and emergency `112`) with Russian descriptions.

> 📝 **Milestone Check 3:** Update `REMEDIATION_PROGRESS.md`. Verify all new routes exist and compile.

---

## BATCH 4: DEFECTS 31–40 (P1/P2 — EXPERIMENTAL GUARDS & ACCESSIBILITY)

### 🟠 DEF-31: Flanker Test Missing Premature Keypress Guard ($<150\text{ms}$) in EN
- 📍 **Location:** `src/pages/games/flanker-test.astro:663`
- 🔍 **What Is Wrong:** `handleResponse()` records any latency without lower bound; spamming keys produces fake sub-100ms reactions.
- 💡 **Exact Fix:** Add `if (latency < 150) return;` (ignore anticipatory response without advancing trial).

### 🟠 DEF-32: Flanker Test Missing Premature Guard in ID & RU
- 📍 **Location:** `src/pages/id/permainan/tes-flanker.astro`, `src/pages/ru/games/flanker-test.astro`
- 🔍 **What Is Wrong:** Same lack of anticipatory guard in localized Flanker tests.
- 💡 **Exact Fix:** Port the `<150ms` latency check to Indonesian and Russian Flanker implementations.

### 🟠 DEF-33: Color-Blind Test Overclaim Regarding Tritanopia
- 📍 **Location:** `src/pages/color-blind-test.astro`, `src/pages/id/tes-buta-warna.astro`, `src/pages/ru/color-blind-test.astro`
- 🔍 **What Is Wrong:** Page titles and descriptions claim Tritanopia (blue-yellow) screening, but dataset only contains red-green Ishihara plates.
- 💡 **Exact Fix:** Update copy and metadata to specify that the test is a Red-Green (Protan/Deutan) Ishihara screening test.

### 🟡 DEF-34: Color-Blind Engine Unsure Responses Inflate Errors
- 📍 **Location:** `src/scripts/tools/color-blind-engine*.js:422–430`
- 🔍 **What Is Wrong:** Marking "Unsure" counts as an outright error, biasing severity classification.
- 💡 **Exact Fix:** Treat "Unsure" as a distinct indeterminate category and provide retest guidance rather than defaulting to severe deficiency.

### 🟡 DEF-35: Indonesian Eye Test Missing Print & Share Sections
- 📍 **Location:** `src/pages/id/tes-mata.astro`
- 🔍 **What Is Wrong:** ID page is missing report print/share container IDs present in EN, causing print button and share actions to fail.
- 💡 **Exact Fix:** Port the printable report and social share markup from `eye-test.astro` into `tes-mata.astro`.

### 🟡 DEF-36: Indonesian Depression & Anxiety Duplicate Severity Label
- 📍 **Location:** `src/scripts/tools/depression-screener-id.js:21–26`, `anxiety-screener-id.js:25–30`
- 🔍 **What Is Wrong:** Likert levels 2 and 3 both use the exact same label `"Sangat sulit"`.
- 💡 **Exact Fix:** Differentiate labels (e.g. Level 2: `"Sangat sulit"`, Level 3: `"Luar biasa sulit / Ekstrem"`).

### 🟡 DEF-37: Russian Test & Results Hardcoded English Leaks
- 📍 **Location:** `src/pages/ru/test.astro`, `src/pages/ru/results.astro`
- 🔍 **What Is Wrong:** Exit modal text (*"Your current progress..."*) and results section headers contain unlocalized English text.
- 💡 **Exact Fix:** Translate all hardcoded English strings in Russian test and results pages to Russian.

### 🟡 DEF-38: Cyrillic Function Name in Russian Test Runner
- 📍 **Location:** `src/pages/ru/test.astro:732`, `quick-test.astro`
- 🔍 **What Is Wrong:** Uses non-ASCII function identifier `renderCurrentВопрос()`.
- 💡 **Exact Fix:** Rename to standard ASCII `renderCurrentQuestion()`.

### 🟡 DEF-39: Indonesian Profile Page Stub
- 📍 **Location:** `src/pages/id/profil.astro`
- 🔍 **What Is Wrong:** Indonesian profile page is a 136-line stub that never imports `profileStore.ts` and renders no game/test history (EN is 1007 lines).
- 💡 **Exact Fix:** Port the complete profile view, test history, domain radar chart, and export/import features from `src/pages/profile.astro` into `src/pages/id/profil.astro`.

### 🟡 DEF-40: Indonesian Flag Quiz Continent Filter Disconnect
- 📍 **Location:** `src/pages/id/kuis-bendera.astro`
- 🔍 **What Is Wrong:** Filter dropdown emits translated Indonesian names (`'Eropa'`, `'Afrika'`), but `flag-quiz-engine.js` expects English keys (`'Europe'`, `'Africa'`), returning 0 flags.
- 💡 **Exact Fix:** Keep English values (`value="Europe"`) in `<option>` elements while displaying Indonesian visible labels (`Eropa`).

> 📝 **Milestone Check 4:** Update `REMEDIATION_PROGRESS.md`. Validate all form controls and locale strings.

---

## BATCH 5: DEFECTS 41–50 (P2 MEDIUM — GAME ENGINE HARMONIZATION)

### 🟡 DEF-41: Indonesian Math Sprint Zero-Distractor & Negative Filter Bug
- 📍 **Location:** `src/pages/id/permainan/math-sprint.astro:680`
- 🔍 **What Is Wrong:** Checks `if (fake >= 0)` which permits `0` as an answer option and allows negative subtractions.
- 💡 **Exact Fix:** Enforce `if (fake > 0 && choices.indexOf(fake) === -1)` and ensure distractors are non-zero positive integers.

### 🟡 DEF-42: Indonesian Math Sprint Streak Bonus Inconsistency
- 📍 **Location:** `src/pages/id/permainan/math-sprint.astro:719–729`
- 🔍 **What Is Wrong:** Awards `gained += 15` (total 25 pts on streak) vs EN/RU `score += 5` (total 15 pts), inflating scores by 66%.
- 💡 **Exact Fix:** Unify streak bonus to `+5` points to match English and Russian engines.

### 🟡 DEF-43: Indonesian Math Sprint Final Score Divisor Divergence
- 📍 **Location:** `src/pages/id/permainan/math-sprint.astro:800`
- 🔍 **What Is Wrong:** Computes `round(score / 3.5)` instead of standard throughput + accuracy bonus used in EN/RU.
- 💡 **Exact Fix:** Port standard throughput + accuracy calculation from `src/pages/games/math-sprint.astro`.

### 🟡 DEF-44: Math Sprint Tier 3 Subtraction Negative Result Guard (All Locales)
- 📍 **Location:** `src/pages/games/math-sprint.astro`, `id/permainan/math-sprint.astro`, `ru/games/math-sprint.astro`
- 🔍 **What Is Wrong:** Tier 3 subtraction picks $a \in [30, 79]$ and $b \in [15, 39]$. When $a < b$, answer is negative (e.g. $30 - 39 = -9$), violating positive elementary arithmetic rules.
- 💡 **Exact Fix:** Guarantee $a > b$ by generating $b$ first and setting $a = b + \text{delta}$ where $\text{delta} \ge 1$.

### 🟡 DEF-45: Indonesian Stroop Clash Weighting Fork
- 📍 **Location:** `src/pages/id/permainan/stroop-clash.astro:772–779`
- 🔍 **What Is Wrong:** Uses 50% Accuracy / 35% Speed / 15% Conflict vs EN/RU 50% Accuracy / 40% Speed / 10% Conflict.
- 💡 **Exact Fix:** Harmonize weighting to 50/40/10 and align baseline latency constants with English.

### 🟡 DEF-46: Stroop Clash Escape Key Lockup in ID
- 📍 **Location:** `src/pages/id/permainan/stroop-clash.astro:862–887`
- 🔍 **What Is Wrong:** Escape key handler is placed after the trial input gate, making pause/quit unreachable during active trials.
- 💡 **Exact Fix:** Move Escape key listener before input lock check to allow immediate pause.

### 🟡 DEF-47: Memory Matrix Indonesian Engine Architecture Fork
- 📍 **Location:** `src/pages/id/permainan/memory-matrix.astro`
- 🔍 **What Is Wrong:** Lacks level config table, grows to 6x6 (EN max 5x5), missing 400ms retention mask, 2 lives instead of 3.
- 💡 **Exact Fix:** Replace the diverged ID matrix engine with the standardized EN level config, retention mask, and 3-life rule.

### 🟡 DEF-48: Mental Rotation "Different" Trials Only Alter Color
- 📍 **Location:** `src/pages/games/rotation.astro:625–632`, `id/permainan/rotasi-mental.astro`, `ru/games/rotation.astro`
- 🔍 **What Is Wrong:** "Different" pairs change face color instead of testing chiral 3D reflection (mirror enantiomorph).
- 💡 **Exact Fix:** Generate "Different" pairs by chiral vertex inversion (mirror reflection) while preserving exact color scheme.

### 🟡 DEF-49: N-Back Missing Sensitivity Index ($d'$) Across All Locales
- 📍 **Location:** `src/pages/games/n-back.astro:796–801`, `id/permainan/n-back.astro`, `ru/games/n-back.astro`
- 🔍 **What Is Wrong:** Reports balanced accuracy without Signal Detection Theory sensitivity index $d' = z(H) - z(FA)$.
- 💡 **Exact Fix:** Implement $d'$ computation with log-linear correction for edge rates and display it in results.

### 🟡 DEF-50: Click Speed Test Starter Click Undercount
- 📍 **Location:** `src/pages/games/click-speed-test.astro:431–439`
- 🔍 **What Is Wrong:** The initial click starts the timer but is not counted in the total clicks tally, causing a $1/\text{duration}$ CPS deficit.
- 💡 **Exact Fix:** Include the initial starter click in `totalClicks` count (`totalClicks = 1` on start).

> 📝 **Milestone Check 5:** Update `REMEDIATION_PROGRESS.md`. Test all 11 mini-games across all 3 languages.

---

## BATCH 6: DEFECTS 51–60 (P2 MEDIUM — STATE ISOLATION & RESULTS ENGINE LIFECYCLE)

### 🟡 DEF-51: LocalStorage Key Collision Across Locales
- 📍 **Location:** `src/pages/games/*.astro`, `src/pages/id/permainan/*.astro`, `src/pages/ru/games/*.astro`
- 🔍 **What Is Wrong:** All 3 locales share identical storage keys (`fiq_game_math_best`, `fiq_game_stroopclash_best`), causing cross-locale high score contamination.
- 💡 **Exact Fix:** Namespace game storage keys by locale (e.g. `fiq_en_game_math_best`, `fiq_id_game_math_best`, `fiq_ru_game_math_best`).

### 🟡 DEF-52: Results Page `DOMContentLoaded` Race Condition
- 📍 **Location:** `src/pages/results.astro:845`, `id/hasil.astro`, `ru/results.astro`
- 🔍 **What Is Wrong:** Script attaches listener to `DOMContentLoaded`. If module loads after DOM ready, listener never fires and page hangs.
- 💡 **Exact Fix:** Use `if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }`.

### 🟡 DEF-53: Brown Noise Engine Sleep Timer Leak on Stop
- 📍 **Location:** `src/scripts/tools/brown-noise-engine.js:198–214`
- 🔍 **What Is Wrong:** `this.stop()` tears down Web Audio nodes but fails to clear `this.timerInterval`, which keeps ticking in background.
- 💡 **Exact Fix:** Add `if (this.timerInterval) { clearInterval(this.timerInterval); this.timerInterval = null; }` inside `stop()`.

### 🟡 DEF-54: Results Demo Fallback Over-Certification
- 📍 **Location:** `src/pages/results.astro:856–862`
- 🔍 **What Is Wrong:** Visiting `/results` with empty storage displays demo score (IQ 124) with active share/certificate buttons as if real.
- 💡 **Exact Fix:** Display a clear "Demo Preview" banner and disable certificate generation unless an authentic test was completed.

### 🟡 DEF-55: Indonesian & Russian Syllogism Help Modal Fails to Pause Timer
- 📍 **Location:** `src/pages/id/permainan/silogisme.astro`, `src/pages/ru/games/syllogism.astro`
- 🔍 **What Is Wrong:** Opening the help modal does not pause the 15-second per-item countdown in ID and RU, timing out while user reads help.
- 💡 **Exact Fix:** Port the `modalPauseElapsed` pause and resume timer handling from English `syllogism.astro`.

### 🟡 DEF-56: Category Runner Does Not Persist Index on Navigation
- 📍 **Location:** `src/components/CategoryTestRunner.astro:982–998`
- 🔍 **What Is Wrong:** Prev/Next clicks change current question without writing to session storage; reloading loses position.
- 💡 **Exact Fix:** Call `saveState()` on index updates in `CategoryTestRunner.astro`.

### 🟡 DEF-57: Category Runner Practice Mode Displays Active Timer Pill
- 📍 **Location:** `src/components/CategoryTestRunner.astro:727`
- 🔍 **What Is Wrong:** Practice mode is untimed, but the timer pill container is visible with static or confusing text.
- 💡 **Exact Fix:** Hide the timer container completely when `mode === 'practice'`.

### 🟡 DEF-58: Russian Games Performance Tier Names in English
- 📍 **Location:** `src/pages/ru/games/*.astro` (`getPerformanceTier`)
- 🔍 **What Is Wrong:** Performance tier badges return English strings (*"Master"*, *"Advanced"*) inside the Russian UI.
- 💡 **Exact Fix:** Localize tier names to Russian (*"Мастер"*, *"Продвинутый"* etc.).

### 🟡 DEF-59: Indonesian Tool Result Sharing Uses English URLs
- 📍 **Location:** `src/scripts/tools/aim-engine-id.js`, `typing-engine-id.js`, `hearing-engine-id.js`, `calorie-engine-id.js`
- 🔍 **What Is Wrong:** Social share buttons generate English URLs (`/aim-trainer`) instead of Indonesian routes (`/id/pelatih-akurasi-aim`).
- 💡 **Exact Fix:** Parameterize share URLs using the current page's canonical URL or localized path prefix.

### 🟡 DEF-60: Russian Tool Result Sharing Uses English URLs
- 📍 **Location:** `src/scripts/tools/aim-engine-ru.js`, `typing-engine-ru.js`, `hearing-engine-ru.js`
- 🔍 **What Is Wrong:** Social share buttons generate English URLs instead of Russian routes (`/ru/...`).
- 💡 **Exact Fix:** Parameterize share URLs with Russian route prefixes.

> 📝 **Milestone Check 6:** Update `REMEDIATION_PROGRESS.md`. Test share buttons and state persistence.

---

## BATCH 7: DEFECTS 61–70 (P2/P3 — DATA HYGIENE & SEMANTIC DISTRACTOR CLEANUP)

### 🟡 DEF-61: Correct Options Tagged With `distractorType: "random"` (Items 2–10)
- 📍 **Location:** `src/data/item-bank.json`, `item-bank-id.json`, `item-bank-ru.json` (Items 2–10)
- 🔍 **What Is Wrong:** Options where `isCorrect: true` carry `distractorType: "random"`. Psychometrically, correct options are not distractors.
- 💡 **Exact Fix:** Remove `distractorType` property from all options where `isCorrect: true`.

### 🟡 DEF-62: Correct Options Tagged With `distractorType: "random"` (Items 11–24)
- 📍 **Location:** `src/data/item-bank*.json` (Items 11–24)
- 🔍 **What Is Wrong:** Same semantic tag error on items 11–24.
- 💡 **Exact Fix:** Remove `distractorType` from all options where `isCorrect: true`.

### 🟡 DEF-63: Correct Options Tagged With `distractorType: "random"` (Items 39–52)
- 📍 **Location:** `src/data/item-bank*.json` (Items 39–52)
- 🔍 **What Is Wrong:** Same semantic tag error on items 39–52.
- 💡 **Exact Fix:** Remove `distractorType` from all options where `isCorrect: true`.

### 🟡 DEF-64: Untranslated English Descriptive Option Text in ID & RU (Items 25–36)
- 📍 **Location:** `src/data/item-bank-id.json`, `item-bank-ru.json` (Items 25–36)
- 🔍 **What Is Wrong:** Option text strings like *"Triangle container"*, *"Satellite at 9 o'clock"* remain English in ID and RU.
- 💡 **Exact Fix:** Translate option accessibility strings to Indonesian and Russian.

### 🟡 DEF-65: Russian Quant Question 72 Has English Options
- 📍 **Location:** `src/data/item-bank-ru.json` (Item 72)
- 🔍 **What Is Wrong:** Question 72 prompt is Russian, but options are untranslated English text with no SVG.
- 💡 **Exact Fix:** Translate Option text for Item 72 into Russian.

### 🟡 DEF-66: Russian Unit Strings in Math Problems Use English Units
- 📍 **Location:** `src/data/item-bank-ru.json` (Items 56, 57, 62, 64, 68)
- 🔍 **What Is Wrong:** Uses English abbreviations (*"m"*, *"cm"*, *"hours"*, *"liters"*, *"degrees"*) with dot decimals instead of Russian standard.
- 💡 **Exact Fix:** Convert unit strings to standard Russian Cyrillic (*"м"*, *"см"*, *"ч"*, *"л"*, *"°"*) with comma decimals.

### 🟡 DEF-67: Indonesian Quant Item 72 Construct Inconsistency
- 📍 **Location:** `src/data/item-bank-id.json` (Item 72)
- 🔍 **What Is Wrong:** Changed equal-price economic construct into an unrelated numeric loss question.
- 💡 **Exact Fix:** Restore the equal-price construct with Rupiah values matching the English psychometric design.

### 🟡 DEF-68: Color-Blind Test Print Button Missing in ID & RU
- 📍 **Location:** `src/pages/id/tes-buta-warna.astro`, `src/pages/ru/color-blind-test.astro`
- 🔍 **What Is Wrong:** Print report button present in EN is missing from ID and RU templates.
- 💡 **Exact Fix:** Add print report button and print stylesheet to ID and RU color blind test pages.

### 🟡 DEF-69: Color-Blind Test Calibration Banner Persistence Missing
- 📍 **Location:** `src/pages/color-blind-test.astro`, `id/tes-buta-warna.astro`, `ru/color-blind-test.astro`
- 🔍 **What Is Wrong:** Dismissing the monitor calibration banner does not persist in `localStorage`, showing banner on every load.
- 💡 **Exact Fix:** Store `fiq_cb_calibrated: true` in `localStorage` on dismissal.

### 🟡 DEF-70: Hearing Test 125 Hz Floor Documentation & Hardware Disclaimer
- 📍 **Location:** `src/pages/hearing-test.astro`, `id/tes-pendengaran.astro`, `ru/hearing-test.astro`
- 🔍 **What Is Wrong:** Page claims testing from 20 Hz, but clinical audio sweeps start at 125 Hz to prevent headphone harmonic distortion.
- 💡 **Exact Fix:** Update UI copy to clearly state 125 Hz – 20,000 Hz clinical air-conduction range with headphone disclaimer.

> 📝 **Milestone Check 7:** Update `REMEDIATION_PROGRESS.md`. Validate all data bank edits with automated schema script.

---

## BATCH 8: DEFECTS 71–79 (P3 LOW — METADATA, POLISH & FOOTER PARITY)

### 🔵 DEF-71: Psychometric Metadata Labeling Drift (2PL vs 3PL)
- 📍 **Location:** `src/utils/scoring.ts:44–52`, `src/data/item-bank*.json` (`sourceRef`), `src/pages/test.astro`
- 🔍 **What Is Wrong:** Algorithm executes a 3PL-EAP model, but UI badges and schema state `2PL-EAP-v1`.
- 💡 **Exact Fix:** Update labels and `assessmentVersion` to consistently state `3PL-EAP-v1`.

### 🔵 DEF-72: Footer Link Parity in Indonesian (26 Links vs 44 Links in EN)
- 📍 **Location:** `src/components/id/FooterId.astro`
- 🔍 **What Is Wrong:** Indonesian footer has only 26 links, omitting games and tools that exist in Indonesian.
- 💡 **Exact Fix:** Mirror the 44-link English footer structure in `FooterId.astro` using `/id/` route prefixes.

### 🔵 DEF-73: Footer Link Parity in Russian (26 Links vs 44 Links in EN)
- 📍 **Location:** `src/components/ru/FooterRu.astro`
- 🔍 **What Is Wrong:** Russian footer omits games and tools with available Russian routes.
- 💡 **Exact Fix:** Update `FooterRu.astro` to include all active Russian game and tool links.

### 🔵 DEF-74: 404 Error Pages Parity in ID and RU
- 📍 **Location:** `src/pages/id/404.astro`, `src/pages/ru/404.astro`
- 🔍 **What Is Wrong:** Missing quick-test and practice tool recommendation cards present on English 404.
- 💡 **Exact Fix:** Port recommendation cards from `src/pages/404.astro` with localized routes.

### 🔵 DEF-75: Indonesian Slug Standardization for Aim Trainer
- 📍 **Location:** `src/pages/id/aim-trainer.astro` & `src/pages/id/pelatih-akurasi-aim.astro`
- 🔍 **What Is Wrong:** Both slugs exist. `aim-trainer.astro` is an English slug stub.
- 💡 **Exact Fix:** Ensure canonical URL points to `/id/pelatih-akurasi-aim` and set a 301/permanent redirect meta tag on `/id/aim-trainer`.

### 🔵 DEF-76: Indonesian Flag Quiz Slug Standardization
- 📍 **Location:** `src/pages/id/kuis-bendera.astro` & `src/pages/id/kuis-bendera-dunia.astro`
- 🔍 **What Is Wrong:** Two duplicate files exist for Flag Quiz in Indonesian.
- 💡 **Exact Fix:** Consolidate into canonical `kuis-bendera.astro` and clean duplicate.

### 🔵 DEF-77: Memento Mori Life Expectancy Dual Constant Drift
- 📍 **Location:** `src/scripts/tools/memento-engine*.js`
- 🔍 **What Is Wrong:** Uses 52 weeks/year in grid calculation vs 52.1775 in math calculations.
- 💡 **Exact Fix:** Standardize on consistent astronomical weeks constant (52.1775) with 52-column visual grid rendering.

### 🔵 DEF-78: Flag Quiz Remote CDN Image Error Fallback
- 📍 **Location:** `src/scripts/tools/flag-quiz-engine*.js`
- 🔍 **What Is Wrong:** Flag SVG image tags lack an `onerror` fallback when external CDN fails.
- 💡 **Exact Fix:** Add `onerror="this.src='/fallback-flag.svg'"` or inline SVG fallback.

### 🔵 DEF-79: Clean Stale `question-bank` Unused Import
- 📍 **Location:** `src/pages/quick-test.astro:3`
- 🔍 **What Is Wrong:** Unused import of deprecated question-bank file.
- 💡 **Exact Fix:** Remove the unused import statement.

> 📝 **Milestone Check 8:** Update `REMEDIATION_PROGRESS.md`. Run full Astro production build (`npm run build`).

---

## BATCH 9: ACTIONABLE CONTEXTUAL DEFECTS & ARCHITECTURAL CLASHES

### 🟡 CTX-01: Resolve Answer-Position Bias in EN and ID Item Banks (Items 1–52)
- 📍 **Location:** `src/data/item-bank.json`, `src/data/item-bank-id.json` (Items 1–52)
- 🔍 **Context & Problem:** In EN and ID, all 52 visual items have the correct answer fixed at Option ID 1 (index 0). This creates a predictable position-cueing vulnerability. (The Russian bank already randomized option placement).
- 💡 **Actionable Fix:** Pseudorandomly shuffle option positions in EN and ID items 1–52 (carrying `isCorrect: true` with the correct SVG content), mirroring the balanced distribution of the Russian bank.

### 🟡 CTX-02: Stroop Clash Documented Ratio Transparency
- 📍 **Location:** `src/pages/games/stroop-clash.astro`, `id/permainan/stroop-clash.astro`, `ru/games/stroop-clash.astro`
- 🔍 **Context & Problem:** 10 congruent / 15 incongruent (40/60) ratio is psychometrically sound to elicit interference, but instructions should clearly explain the test format.
- 💡 **Actionable Fix:** Ensure the introductory overlay accurately states "25 trials: 10 standard, 15 high-conflict" across all 3 languages.

### 🟡 CTX-03: Shared Storage Keys Migration Script
- 📍 **Location:** `src/utils/profileStore.ts`
- 🔍 **Context & Problem:** Transitioning to locale-namespaced storage keys (`fiq_en_...`, `fiq_id_...`) must not wipe existing user progress.
- 💡 **Actionable Fix:** Add a lightweight migration routine on load: if legacy key `fiq_game_math_best` exists and new namespaced key does not, migrate the record to the active locale key.

---

## 🚫 STRICT FALSE-POSITIVE BLACKLIST (DO NOT TOUCH / DISMISS)

The following 29 claims were proven **FALSE** or **HARMFUL**. The AI agent must **NOT** execute changes for these:
1. ❌ **DO NOT touch Russian item bank answer keys:** All 100 Russian items have correct answers. Changing them to index 0 would break the Russian bank.
2. ❌ **DO NOT clamp theta range to [-3.0, +3.0]:** `[-4.0, +4.0]` is intentional and mathematically required for Mensa IQ 160 differentiation.
3. ❌ **DO NOT translate Schema.org vocabularies:** `@type: Question`, `@type: Answer` are W3C ontology keywords.
4. ❌ **DO NOT translate developer comments or CSS class names.**
5. ❌ **DO NOT enable DSP echo cancellation on raw microphone hardware frequency testing.**
6. ❌ **DO NOT change audio frequency floor below 125 Hz in clinical pure-tone audiometry.**
7. ❌ **DO NOT change Reaction Time 1500–5000ms variable foreperiod.**
8. ❌ **DO NOT change Results IQ bell curve stroke #2563eb:** It is the required design system Action Blue accent.

---

## EXECUTION SUMMARY WORKFLOW FOR AI AGENT

When this prompt is given to you:
1. **Initialize Tracker:** Create `REMEDIATION_PROGRESS.md` with all 79+ defects listed.
2. **Execute Batch 1 (Defects 01–10):** Fix each file $\to$ mark `[x]` $\to$ verify.
3. **Execute Batch 2 (Defects 11–20):** Fix SVG/XML/Contrast $\to$ mark `[x]` $\to$ run XML test.
4. **Execute Batch 3 (Defects 21–30):** Add missing pages & routes $\to$ mark `[x]`.
5. **Execute Batch 4 (Defects 31–40):** Guards & Accessibility $\to$ mark `[x]`.
6. **Execute Batch 5 (Defects 41–50):** Game engine alignments $\to$ mark `[x]`.
7. **Execute Batch 6 (Defects 51–60):** State & results lifecycle $\to$ mark `[x]`.
8. **Execute Batch 7 (Defects 61–70):** Distractor cleanup & text $\to$ mark `[x]`.
9. **Execute Batch 8 (Defects 71–79):** Footers, polish & metadata $\to$ mark `[x]`.
10. **Execute Batch 9 (Actionable Contextual):** Shuffling & migrations $\to$ mark `[x]`.
11. **Final Verification:** Run `npm run build` and ensure 100% clean compilation (Exit Code 0).
