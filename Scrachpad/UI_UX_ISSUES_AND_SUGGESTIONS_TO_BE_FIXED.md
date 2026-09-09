# UI/UX Issues & Suggestions To Be Fixed

This document tracks all design critiques, accessibility audits, mobile ergonomics issues, contrast warnings, and UX polish suggestions provided by the Senior UI/UX Specialist AI Agents for `FreeIQExam.com`.

> [!IMPORTANT]
> **Audit & Recording Phase Only:**
> No code changes are applied during this phase. All findings are logged, categorized by severity (P0 Blocker, P1 Major UX, P2 Visual Polish, P3 Micro-Enhancement), and analyzed before any implementation begins.

---

## Batch 1: Global Design System & Shell
**Audited Files:**
- `src/layouts/Layout.astro`
- `src/styles/global.css`
- `src/components/Header.astro`
- `src/components/Footer.astro`

### Summary Scorecard
- **Structural Architecture:** Solid (Astro MPA, SSR/SSG pre-render, semantic HTML baseline).
- **A11y / WCAG AA Compliance:** ❌ **Fails** due to Light Mode contrast (<3:1 on multiple text elements) and touch targets (<44px).
- **Mobile Navigation Ergonomics:** ❌ **P0 Fail** (In-flow document push causing CLS; 700px+ height without scroll container; missing ARIA disclosure & drawer mechanics).
- **Design Token Discipline:** ❌ Raw Tailwind utilities scattered inline; 3 competing surface blacks (`black`, `black/90`, `black/95`).

---

### Detailed Findings & Issues Log

#### 1. Dark/Light Mode & FOUC Prevention
- **Location:** `src/layouts/Layout.astro` (Lines 35-46)
  - **Issue Type:** Logic Error / Accessibility / UX Blocker (P0)
  - **What is wrong:**
    1. `prefers-color-scheme` is never checked. The script forces `light` on first visit and immediately writes `'light'` to `localStorage`, permanently locking OS-level dark mode users into light mode.
    2. The theme initialization script is located after Google Fonts `<link rel="preconnect">` and stylesheet, causing a 100-300ms blocking waterfall before execution and widening the FOUC window.
    3. Missing `<meta name="color-scheme" content="light dark" />` and `<meta name="theme-color" ... />` for light (#ffffff) and dark (#000000), leaving mobile browser chrome (Safari/Chrome address bars) mismatched.
    4. `transition-colors duration-200` on `<body>` causes the initial paint to animate (white-to-black/black-to-white fade on first load).
    5. Duplicate font declarations: `<style is:global>` inside `Layout.astro` duplicates font stacks already declared in `src/styles/global.css`.
    6. Canonical URL uses `Astro.url.href` which leaks query parameters (`?utm_*`); `ogImage` defaults to a relative path (`/og-image.png`), breaking social link unfurls.
  - **What the fix WOULD be:**
    - Move theme script to be the very first child of `<head>`.
    - Check both `localStorage.getItem('theme')` and `window.matchMedia('(prefers-color-scheme: dark)').matches`. Do not write to `localStorage` on initial page load (only on manual user click).
    - Add `color-scheme` and `theme-color` meta tags to `<head>`, plus `html { color-scheme: light dark; }` in CSS.
    - Temporarily disable transitions during initial paint by adding a `no-transitions` class on `<html>` in the head script and removing it upon DOM load.
    - Delete the duplicate `<style is:global>` font block from `Layout.astro` and retain `global.css` as single source of truth.
    - Normalize canonical URL to `Astro.url.origin + Astro.url.pathname` and prefix `ogImage` with the site origin.

---

#### 2. Color Token Architecture & WCAG Contrast Failures
- **Location:** `src/styles/global.css`, `src/components/Header.astro`, `src/components/Footer.astro`
  - **Issue Type:** Accessibility / WCAG AA Failure / Design System (P0)
  - **What is wrong:**
    1. Light Mode Contrast Violations:
       - Header tagline ("Scientific Norms"): `text-zinc-400` on white (~2.8:1 ratio, fails 4.5:1 AA standard).
       - Footer copyright line: `text-zinc-400` on white (~2.8:1 ratio, fails AA).
       - Footer bottom-bar legal links (Privacy, Terms, Psychometrics): `text-zinc-400` on white (~2.8:1 ratio, fails AA - legally load-bearing links).
       - Footer body text: `text-zinc-500` on white (~4.6:1 borderline, fails on dark mode when flipped to `text-zinc-500` on `#000000` at ~4.4:1).
    2. No centralized CSS variable token system. Raw Tailwind utilities are hand-coded across files, leading to three different shades of dark surface: `dark:bg-black`, `dark:bg-black/90`, and `dark:bg-black/95`.
    3. Brand badge discrepancy: `Footer.astro` uses `bg-blue-600 rounded-xl "IQ"` text box, while `Header.astro` uses `bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 rounded-2xl` with SVG brain icon.
    4. Decorative separators & glyphs: Screen readers announce `(C)` instead of `&copy;`/`©`, and `&bull;` bullet characters are announced aloud instead of being marked with `aria-hidden="true"`.
    5. No global `:focus-visible` baseline in `global.css` for links, buttons, and tabbable elements.
    6. No `prefers-reduced-motion` guard in `global.css` for smooth scrolling and animations.
  - **What the fix WOULD be:**
    - Establish CSS variable design tokens in `global.css` (`--color-bg`, `--color-bg-elevated`, `--color-border-subtle`, `--color-text-primary`, `--color-text-secondary`, `--color-focus-ring`) and use them across components.
    - Enforce contrast rules: Light mode body text minimum `zinc-600`, dark mode minimum `zinc-400`. Reserve `zinc-500`/`zinc-400` only for large decorative displays.
    - Standardize the logo/brand badge to the gradient brain icon across both Header and Footer.
    - Replace `(C)` with `&copy; 2026` and wrap bullets with `<span aria-hidden="true">&bull;</span>` or CSS flex gaps.
    - Add global `:where(a, button, [tabindex]):focus-visible` styling in `global.css`.
    - Add `@media (prefers-reduced-motion: reduce)` block resetting scroll-behavior and setting transition/animation durations to 0.01ms.

---

#### 3. Mobile Navigation Ergonomics & Shell Usability
- **Location:** `src/components/Header.astro`
  - **Issue Type:** Ergonomics / Touch Targets / CLS / Accessibility (P0)
  - **What is wrong:**
    1. Touch targets fail the 44x44px minimum thumb standard:
       - Theme toggle button: `w-9 h-9` (36x36px)
       - Hamburger toggle button: `w-9 h-9` (36x36px)
       - Mobile menu link rows: `py-2` (~36px height)
       - Header test CTAs: `py-2` (~32px) and `py-2.5` (~37px)
    2. Header height `h-18 sm:h-20` (72px/80px) is excessively tall on 360px mobile viewports, consuming valuable vertical screen real estate.
    3. Document Flow Layout Shift (CLS): Mobile menu is an inline `<div>` that simply toggles `.hidden` inside document flow. With 16 links across 3 groups (~700-900px tall), opening the menu pushes the entire page (hero, content, footer) down violently.
    4. Missing viewport height containment: No `max-h-[calc(100dvh-4rem)]` or scroll container; on small devices (e.g. iPhone SE), lower links are cut off and unreachable.
    5. Dead code & drift risk: `allMobileLinks` array is defined in the Astro frontmatter but never rendered; all 16 links were hand-coded redundantly in JSX markup.
    6. Incomplete ARIA disclosure pattern:
       - Missing `aria-expanded` and `aria-controls="mobile-menu"` on hamburger button.
       - Missing `role="dialog"` or `<nav aria-label="Mobile">` landmark on mobile menu.
       - Hamburger icon does not morph or switch to an 'X' close icon when opened.
       - No Escape key handler to close the menu.
       - No body scroll lock (`document.body.style.overflow = 'hidden'`) when open.
       - No focus trap or return of focus to the toggle button upon closing.
       - Desktop nav links lack `aria-current="page"` and exact matching fails if trailing slashes differ.
  - **What the fix WOULD be:**
    - Increase icon button sizes to `w-11 h-11` (44x44px min-width/min-height) and mobile link heights to `py-3 min-h-[44px]`.
    - Adjust mobile header height to `h-16 sm:h-20`.
    - Convert mobile menu into a true fixed slide drawer (`fixed inset-y-0 right-0 z-50 w-[85vw] max-w-sm translate-x-full`) with a fixed backdrop (`fixed inset-0 bg-black/40 z-40`) and `overflow-y-auto overscroll-contain`.
    - Render mobile links dynamically using `allMobileLinks.map()` to maintain a single source of truth.
    - Wire complete ARIA disclosure: toggle `aria-expanded`, switch hamburger/X icon, close on Escape, close on backdrop click, lock body scroll, and return focus to hamburger button upon close.
    - Add `aria-label="Primary"` to desktop `<nav>`, normalize trailing slashes on pathname comparison, and apply `aria-current="page"`.

---

#### 4. CSS Performance, Transitions & Landmark Stability
- **Location:** `src/styles/global.css`, `src/layouts/Layout.astro`
  - **Issue Type:** Performance / Layout Thrashing / Accessibility (P1)
  - **What is wrong:**
    1. `.transition-smooth` utility uses `transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1)`. Applying `transition: all` across backdrop-blur headers and layout containers triggers style recalculations and layout thrashing.
    2. `.gradient-text` lacks standard `-webkit-background-clip: text` / `background-clip: text` and high-contrast color fallbacks for older Firefox or forced-colors mode.
    3. Missing keyboard Skip Link: No `<a href="#main">Skip to main content</a>` in `Layout.astro`.
    4. Missing `<main>` landmark at the shell level: `<slot />` in `Layout.astro` is rendered directly inside `<body>`, requiring all 28 individual pages to wrap their content manually.
  - **What the fix WOULD be:**
    - Scope `.transition-smooth` specifically to `transition-property: color, background-color, border-color, transform, opacity`.
    - Add vendor prefixing and fallbacks for `.gradient-text`.
    - Insert an accessible skip link `<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 ...">Skip to content</a>` at the top of `Layout.astro`.
    - Enforce `<main id="main" class="flex-1">` wrapping the `<slot />` in `Layout.astro`.

---

## Batch 2: Core Assessment Engines & Test-Taking Flow
**Audited Files:**
- `src/components/CategoryTestRunner.astro`
- `src/pages/test.astro`
- `src/pages/quick-test.astro`

### Summary Scorecard
- **Engine Logic & Sampling:** Strong IRT foundation and Mulberry32 seeded sampling, but severe architectural duplication between `CategoryTestRunner.astro` and `test.astro`/`quick-test.astro`.
- **Correctness & Safety:** ❌ **Critical Bugs** in `CategoryTestRunner.astro` (un-debounced auto-advance skips questions, naive timer decrementing without wall-clock reconciliation, mid-test mode switching leaks answers).
- **Responsive & SVG Display:** ❌ **P0 Fail** (No global or scoped `svg { max-width: 100%; height: auto }` defensive styling; hardcoded SVG widths risk horizontal overflow at 360px).
- **Touch Targets & Thumb Zones:** ❌ **Fail** on navigation/meta controls (Submit ~32px, Flag ~24px, Navigator pills 28-36px, Mode tabs ~34px fail 44px standard).
- **A11y & Focus Management:** ❌ Incomplete ARIA on question transitions (no `aria-live`), focus lost on re-render, modal focus trap missing in `CategoryTestRunner.astro`.

---

### Detailed Findings & Issues Log

#### 1. Critical Execution & Logic Bugs (CategoryTestRunner)
- **Location:** `src/components/CategoryTestRunner.astro` (Lines 531-548, 670-695)
  - **Issue Type:** Bug / Logic Error / Data Corruption (P0)
  - **What is wrong:**
    1. **Un-debounced Auto-Advance Skips Questions:** When a user selects an answer and then quickly changes their mind (within 220ms), multiple `setTimeout` callbacks queue up without `clearTimeout`. Both fire, advancing `currentIndex` by 2, silently skipping a question without the user seeing it.
    2. **Naive Timer Desync:** Timer decrements naively via `setInterval(..., 1000)` with `timeRemaining--` and no wall-clock reconciliation or `visibilitychange`/`focus` listeners. Backgrounding the tab throttles the timer, allowing users to pause the countdown indefinitely across all 4 category tests.
    3. **Mid-Test Mode Switching Leaks Answers:** Users can toggle between "Timed" and "Practice Drill" tabs mid-session. Switching to practice mode immediately displays green/red answer feedback for questions answered under timed conditions.
  - **What the fix WOULD be:**
    - Port `test.astro`'s `clearTimeout(autoAdvanceTimer)` and `currentIndex === answeredIdx` double-guard into `CategoryTestRunner.astro`.
    - Port `test.astro`'s wall-clock synchronization (`targetEndTime = Date.now() + timeRemaining * 1000`, `syncTimerFromWallClock()`, and `visibilitychange`/`focus` listeners).
    - Lock mode tabs once the first question is answered, or warn the user that switching modes resets the attempt.

---

#### 2. Stimulus Card Readability & SVG Scaling
- **Location:** `src/components/CategoryTestRunner.astro`, `src/pages/test.astro`, `src/pages/quick-test.astro`, `src/styles/global.css`
  - **Issue Type:** Responsive / Overflow / Layout Shift (P0)
  - **What is wrong:**
    1. Stimulus SVGs are injected via `innerHTML` into `#stimulus-container` and `#cat-stimulus-container` without any defensive CSS (`max-width: 100%; height: auto; display: block`). A fixed `width="400"` SVG inside a 360px viewport causes horizontal overflow.
    2. Card containers lack `overflow-hidden`.
    3. In `test.astro`, text questions set `stimulusCard.style.display = 'none'`, causing the option grid to abruptly jump upward by ~200px (layout shift).
    4. Sizing discrepancy: `test.astro` uses `max-w-md` while `CategoryTestRunner.astro` uses `max-w-lg`, rendering the exact same stimulus type at different physical scales.
    5. Item difficulty parameter `b: +0.00` is exposed in `CategoryTestRunner.astro` DOM, leaking psychometric calibration to users.
  - **What the fix WOULD be:**
    - Add global defensive rules in `global.css` for `#stimulus-container svg, #cat-stimulus-container svg, #options-grid svg, #cat-options-grid svg { max-width: 100%; height: auto; max-height: 320px; }`.
    - Add `overflow-hidden` to both card containers.
    - Keep stimulus card mounted with `min-h-0` rather than `display: none` for text questions to prevent CLS.
    - Standardize stimulus card dimensions between standalone and category engines.
    - Remove the `b: +0.00` difficulty parameter from client-facing markup.

---

#### 3. Touch Targets & Thumb Ergonomics
- **Location:** `src/components/CategoryTestRunner.astro`, `src/pages/test.astro`, `src/pages/quick-test.astro`
  - **Issue Type:** Ergonomics / Touch Targets / WCAG 2.5.8 (P0 / P1)
  - **What is wrong:**
    1. Answer options pass (min-h-[44px] to min-h-[110px]), but all secondary controls fail the 44px minimum thumb standard:
       - Header "Submit" / "Finish Test" button: ~32-40px
       - Question Flag button: ~24-26px
       - Prev / Next navigation buttons: ~40-42px
       - CategoryTestRunner Mode tabs: ~34px
       - Question Navigator pills: 28-36px (CategoryTestRunner packs 16 pills tightly, test.astro has fixed 32-36px pills)
    2. Prev/Next bar is in-flow after content rather than sticky bottom-0, forcing one-handed mobile users on tall screens to scroll down just to tap "Next".
  - **What the fix WOULD be:**
    - Increase Submit, Prev, Next buttons to `min-h-[44px]` (`py-3`).
    - Enlarge the tap hit-area for navigator pills using transparent padding / pseudo-elements so the touch target hits 44px without bloating the visual grid.
    - Make the Prev/Next navigation bar sticky to viewport bottom (`sticky bottom-0`) with `env(safe-area-inset-bottom)` and subtle backdrop blur.

---

#### 4. Cognitive Load, Focus Management & Screen Reader Announcements
- **Location:** `src/components/CategoryTestRunner.astro`, `src/pages/test.astro`, `src/pages/quick-test.astro`
  - **Issue Type:** Accessibility / WCAG AA / Cognitive Load (P1)
  - **What is wrong:**
    1. No `aria-live` announcement on question transitions. Screen reader users receive no auditory indication when a question loads or auto-advances.
    2. Focus is destroyed when `optionsGrid.innerHTML = ''` runs during question render.
    3. Numeric key presses (1-9) select options visually but fail to call `.focus()` on the corresponding button element.
    4. Auto-advance delay (220-240ms) is too abrupt on touchscreens, risking accidental double-taps advancing without recovery time.
    5. Modal parity gap: `CategoryTestRunner.astro` submit modal lacks focus trap, initial focus, `aria-labelledby`, and Escape key listener (all present in `test.astro`).
    6. Timer announcements: `role="timer" aria-live="polite"` announces every second in screen readers (too noisy); Category timer has no role or aria-live at all.
    7. Unselected options in practice review use `opacity-60`, which drops text contrast below 3:1 on white.
  - **What the fix WOULD be:**
    - Add a visually hidden `<div aria-live="polite" class="sr-only">` announcing "Question X of Y: [prompt]".
    - Retain focus on question prompt (`tabindex="-1"`) upon transition.
    - Explicitly call `.focus()` on the option button when selected via keyboard.
    - Increase auto-advance delay to ~400-500ms with a brief confirmation visual state.
    - Copy `test.astro`'s focus-trap, initial focus, and Escape handler into `CategoryTestRunner.astro`.
    - Change timer `aria-live` to announce only at critical thresholds (e.g., 5 min, 1 min remaining) and guard pulsing animations with `prefers-reduced-motion`.
    - Replace `opacity-60` with explicit muted color tokens that maintain 4.5:1 contrast.

---

#### 5. LocalStorage Isolation & Abandonment Prevention
- **Location:** `src/pages/test.astro`, `src/pages/quick-test.astro`, `src/components/CategoryTestRunner.astro`
  - **Issue Type:** Logic Error / State Management (P1)
  - **What is wrong:**
    1. Key collision between `/test` and `/quick-test`: Both use the same `iq_assessment_answers`, `iq_active_questions`, and `iq_test_type` keys. Navigating between them in different tabs or before completion causes cross-contamination.
    2. No `beforeunload` warning: Closing tab or navigating back loses unsaved progress without an OS/browser confirmation prompt.
    3. Stale session resumption: Expired sessions (hours/days old) silently restore with a fresh countdown timer without prompting the user to "Resume" or "Start Over".
  - **What the fix WOULD be:**
    - Namespace localStorage keys (`freeiq_full_test_...` vs `freeiq_quick_test_...`).
    - Add a window `beforeunload` listener that warns users if `userAnswers` is non-empty and test is not submitted.
    - Add a timestamp (`savedAt: Date.now()`) and offer a "Resume Test or Start Fresh" prompt if the session is older than 60 minutes.

---

## Batch 3: Results Dashboard & Certificate Canvas
**Audited Files:**
- `src/pages/results.astro`
- `src/pages/fluid-reasoning-test.astro`

### Summary Scorecard
- **Information Architecture:** Strong scientific narrative flow (Composite Score -> 95% Credible Interval -> Percentile Grid -> Official Certificate -> Domain Breakdown -> Question Review).
- **Hero & Hydration:** ❌ **Flashing Fake Data** (Hardcoded 118 IQ renders statically before client-side hydration overwrites it with real user score).
- **Canvas Certificate:** ❌ **Critical Mobile Gaps** (iOS Safari download fails on data URI; 1600x1130 canvas lacks 2x retina/print resolution; text overflows with long user names; `ctx.letterSpacing` Chromium-only; certificate container is excluded from print stylesheet).
- **Print Stylesheet:** ❌ **Dark Mode Print Failure** (No `@media print` light-background forcing; printing in dark mode prints a solid black background).
- **Mobile Collision:** ❌ **Double Sticky Header Confirmed** on `fluid-reasoning-test.astro` (Runner bar `top-0 z-30` slides under global header `top-0 z-50`).
- **Contrast & Ethics:** ❌ Recurring `text-zinc-400` on white (~2.4:1); "Generate Certificate" button `amber-600` fails contrast (~3.4:1); simulated leaderboard needs clear "Sample Data" disclaimer.

---

### Detailed Findings & Issues Log

#### 1. Results Hero, Hydration Flash & Heading Hierarchy
- **Location:** `src/pages/results.astro` (Lines 24-140)
  - **Issue Type:** Visual Flashing / Accessibility / UX (P0 / P1)
  - **What is wrong:**
    1. **Flash of Fake Data:** Hardcoded placeholder "118 IQ", "107-129" CI, and "88.5%" is rendered in initial static HTML. Because the client script is a deferred ES module, users see the fake 118 score flash for 100-300ms before their real score appears.
    2. **Missing `<h1>` on Screen:** Screen-rendered view has no `<h1>` element (only print view has one); the score is a `<span>` and the document jumps directly to `<h2>`, breaking screen reader hierarchy.
    3. **Double Eyebrow:** "STANDARDIZED COMPOSITE COGNITIVE ABILITY..." and "Estimated Cognitive Ability Score" are stacked redundantly.
  - **What the fix WOULD be:**
    - Render a loading skeleton placeholder (`opacity-0` or `—` with `aria-busy="true"`) until hydration writes the verified score.
    - Add an accessible `<h1>` (e.g. `<h1 class="sr-only">Your Cognitive Assessment Results</h1>`).
    - Consolidate the two stacked eyebrow tags into a single clean subtitle.

---

#### 2. 95% Posterior Credible Interval & Bell Curve SVG
- **Location:** `src/pages/results.astro` (Lines 340-390)
  - **Issue Type:** Scientific Visualization / Dark Mode Contrast (P1)
  - **What is wrong:**
    1. 95% Credible Interval (107-129) is purely textual; there is no visual whisker/bracket on the standard deviation bell curve.
    2. Bell curve tick labels (9-11px) have hardcoded `fill="#71717a"` / `#a1a1aa` with no dark mode classes, rendering with poor contrast on dark mode near-black backgrounds.
    3. The shaded area under the curve represents cumulative percentile from 50 to the score, but lacks a legend; users misinterpret the shaded area as the 95% CI.
  - **What the fix WOULD be:**
    - Render a visual whisker/bracket indicator representing the CI bounds directly below the score or on the bell axis.
    - Add `dark:fill-zinc-400` or `#52525b` with `font-size: 12px` to SVG axis labels.
    - Add a clear visual legend distinguishing cumulative percentile fill from the credible interval score pin.

---

#### 3. HTML5 Canvas Certificate Generator (Retina, Mobile & Print)
- **Location:** `src/pages/results.astro` (Lines 1078-1247)
  - **Issue Type:** Bug / Mobile Compatibility / Accessibility / Print (P0)
  - **What is wrong:**
    1. **iOS Safari Download Failure:** `link.download = ...; link.click()` does not trigger file download on iOS Safari for data URIs, silently failing or opening in a tab without saving.
    2. **Retina & Print Blur:** 1600x1130 canvas buffer at 300 DPI yields only a ~5.3 inch image, resulting in blur on high-DPI screens and physical A4 prints.
    3. **Text Overflow:** Long user names (up to 60 characters) or narrative performance text can overflow the certificate's decorative double borders because text wrapping and dynamic font scaling are missing.
    4. **Browser Incompatibility:** `ctx.letterSpacing` is Chromium-only (no-ops on Safari/Firefox); `ctx.roundRect` can crash on Safari < 16 without a fallback check.
    5. **Excluded from Print:** The certificate element has `print:hidden`, meaning a user clicking "Save PDF / Print" gets the document without the certificate.
    6. **Button Contrast Failure:** "Generate Certificate" button uses `bg-amber-600` with white text (~3.4:1 contrast ratio, failing the 4.5:1 AA threshold).
    7. **Missing Accessibility Label:** Name input relies solely on `placeholder` without `<label>` or `aria-label`.
    8. **Credential Overstatement:** Calling an unproctored online screening "VERIFIED PSYCHOMETRIC EVALUATION" with a random `FIQ-2026-${Math.random()}` number risks credibility.
  - **What the fix WOULD be:**
    - Detect iOS Safari and provide an explicit fallback (e.g. opening image in modal with "Long-press to save" or converting to Blob URL).
    - Render canvas at 2x resolution (3200x2260) with `ctx.scale(2, 2)`.
    - Implement a `fitText()` function to dynamically reduce name font size and split long performance text into multiple lines.
    - Add polyfills/fallbacks for `ctx.roundRect` and avoid hard dependency on `ctx.letterSpacing`.
    - Mirror canvas output to a hidden `<img>` tag with `class="hidden print:block"` so it prints with the report.
    - Upgrade button to `bg-amber-700` and add `aria-label="Full name for certificate"` to the input.
    - Rename certificate title to "Unproctored Cognitive Screening Certificate" and add an honest methodology disclaimer footer.

---

#### 4. Print Stylesheet (@media print) & Dark Mode Override
- **Location:** `src/pages/results.astro`
  - **Issue Type:** Bug / Print Fidelity (P0)
  - **What is wrong:**
    1. If a user is in dark mode and triggers `window.print()`, the page prints with a black background and white text, consuming excessive ink and producing an unreadable document.
    2. Missing `print-color-adjust: exact`, causing score bars and bell curve fills to disappear on default browser print settings.
    3. Domain breakdown cards lack `break-inside: avoid`, risking awkward splits across printed page boundaries.
  - **What the fix WOULD be:**
    - Add a global `@media print` stylesheet forcing `body, main { background: #ffffff !important; color: #000000 !important; }` and `-webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;`.
    - Add `print:break-inside-avoid` to all domain breakdown and percentile cards.

---

#### 5. Domain Test Wrapper & Double Sticky Header Collision
- **Location:** `src/pages/fluid-reasoning-test.astro` (Line 24), `src/components/CategoryTestRunner.astro` (Line 90)
  - **Issue Type:** Bug / Mobile Ergonomics / Layout Collision (P0)
  - **What is wrong:**
    1. **Double Sticky Stack Confirmed:** `fluid-reasoning-test.astro` renders global `Header.astro` (`sticky top-0 z-50`), while `CategoryTestRunner.astro` renders its own runner header (`sticky top-0 z-30`). On scroll, the runner controls slide underneath the site header, completely obscuring timer, question progress, and mode tabs.
    2. Screen readers announce the `&bull;` in the construct eyebrow (`Gf &bull; CULTURE-REDUCED`).
  - **What the fix WOULD be:**
    - Offset `CategoryTestRunner`'s sticky bar with `top-16 sm:top-20` (matching Header height) and appropriate z-index, OR adopt `test.astro`'s distraction-free shell (omit global header during test session).
    - Wrap `&bull;` with `<span aria-hidden="true">&bull;</span>`.

---

#### 6. Ethical Transparency & Contrast Sweep
- **Location:** `src/pages/results.astro`
  - **Issue Type:** Ethics / Credibility / WCAG Contrast (P1)
  - **What is wrong:**
    1. Leaderboard preview displays simulated names and scores ("Alex_V. — 146 IQ") alongside a "Launching Soon" tag, which can be perceived as fake social proof.
    2. Pervasive `text-zinc-400` on white in IQ suffix, CI explanation, percentile labels, and IRT parameter notes (~2.4:1 contrast).
    3. Domain cards duplicate calculation logic (`getCertResult()` re-runs `calculateScore()`).
  - **What the fix WOULD be:**
    - Add a prominent "Simulated Preview / Sample Data" badge to the upcoming leaderboard.
    - Replace `text-zinc-400` with `text-zinc-500 dark:text-zinc-400`.
    - Pass the already computed `result` object to certificate generation rather than recalculating.

---

## Batch 4: Cognitive Mini-Games Suite & Item-Bank SVG
**Audited Files (Consolidated Bundle):**
- Full Consolidated Bundle: `e:\Antigravity\freeiqexam.com\Scrachpad\BATCH_4_GAMES_AND_SAMPLES_BUNDLE.txt`
- Component Files:
  - `src/pages/games.astro` (Hub)
  - `src/pages/games/n-back.astro` (Dual N-Back)
  - `src/pages/games/rotation.astro` (3D Rotation)
  - `src/pages/games/math-sprint.astro` (Math Sprint)
  - `src/pages/games/symbol-match.astro` (Symbol Match)
  - `src/pages/games/syllogism.astro` (Syllogism Blitz)
  - `src/data/item-bank.json` (Item Bank SVGs)

### Summary Scorecard
- **Arena Architecture & Consistency:** Outstanding structural consistency across all 5 games (unified Arena pattern: Start Overlay -> HUD -> Stimulus Card -> Response Controls -> Fixed-Height Toast -> End-of-Round Modal). Zero layout shift on toast messages.
- **Item-Bank SVG Bug:** ❌ **Critical SVG Syntax Error** (Duplicate `class` attributes on `<rect>` tags in `item-bank.json` cause browsers to drop `dark:stroke-zinc-800`, breaking dark-mode rendering; `h-full` without parent height distorts aspect ratios).
- **Animation & Frame Performance:** ❌ **rAF Timer DOM Thrash** (Writing `.textContent` and `.style.width` at 60 FPS for 10Hz tenth-of-a-second timers causes needless layout recalculations every frame).
- **Accessibility & Focus:** ❌ **Zero Live Regions & Missing Dialog Semantics** (No `role="status"`, `role="dialog"`, or `aria-live`; keyboard shortcuts fire when modals are open; background arena remains tabbable behind the start overlay).
- **Contrast & Micro-Typography:** ❌ Systemic 10px `text-zinc-400` HUD labels (~2.2:1 contrast fail on light zinc background); `amber-600` buttons fail contrast (~3.4:1).

---

### Detailed Findings & Issues Log

#### 1. Item-Bank SVG Syntax Defect & Aspect Ratio Distortion
- **Location:** `src/data/item-bank.json` (Items 1, 2, 3...)
  - **Issue Type:** Bug / Syntax Error / Dark Mode Broken (P0)
  - **What is wrong:**
    1. **Duplicate `class` Attribute:** Elements contain invalid double class declarations:
       `<rect fill="#f4f4f5" class="dark:fill-zinc-900" stroke="#e4e4e7" class="dark:stroke-zinc-800">`. HTML/SVG parsers keep the first `class` attribute and silently drop the second, causing dark-mode border strokes (`dark:stroke-zinc-800`) to fail completely.
    2. **Aspect Ratio Distortion:** Root SVGs declare `class="w-full h-full max-w-[280/360px]"`. Using `h-full` without a fixed height on parent wrapper elements distorts SVG aspect ratios on certain viewport heights.
  - **What the fix WOULD be:**
    - Merge duplicate classes into a single attribute: `class="dark:fill-zinc-900 dark:stroke-zinc-800"`.
    - Change `h-full` to `h-auto` to preserve intrinsic viewBox aspect ratios.

---

#### 2. Rendering Performance & requestAnimationFrame DOM Thrashing
- **Location:** `src/pages/games/rotation.astro:1169-1193`, `src/pages/games/math-sprint.astro:1760-1784`, `src/pages/games/symbol-match.astro:2255-2282`, `src/pages/games/syllogism.astro:2952-2979`
  - **Issue Type:** Performance / Layout Thrashing (P1)
  - **What is wrong:**
    1. Countdowns run via `requestAnimationFrame(step)` at 60 FPS, but the displayed text only changes at 10 Hz (`(remaining / 1000).toFixed(1) + 's'`). The code writes `timerText.textContent` and `progressBar.style.width` and manipulates `classList` 60 times per second, triggering unnecessary browser style recalculations and layout passes on low-end mobile devices.
    2. Buttons use `transition-all duration-100`, which forces the browser to evaluate all properties (including layout-triggering properties) on every fast-speed tap.
    3. `hover:scale-105` on rapid-tap buttons triggers compositing jank during fast reaction gameplay.
  - **What the fix WOULD be:**
    - Throttle DOM writes to only occur when the tenth-of-a-second integer changes (`var tenths = Math.ceil(remaining / 100); if (tenths !== lastTenths) { ... }`).
    - Scope button transitions strictly to `transition-property: transform, background-color, border-color`.
    - Remove `hover:scale-105` on rapid-tap mobile game controls; retain only `active:scale-95`.

---

#### 3. Accessibility, ARIA Live Regions & Modal Isolation
- **Location:** All 5 game files (`src/pages/games/*.astro`)
  - **Issue Type:** Accessibility / Keyboard Hijacking / WCAG AA (P0 / P1)
  - **What is wrong:**
    1. **Zero Auditory Feedback:** Fast-changing game states (new letter, new equation, feedback toast) are completely silent to screen readers.
    2. **Start Screen Focus Leak:** The `#start-overlay` is purely a visual absolute cover. While it is displayed, keyboard users can Tab straight into the hidden background arena controls.
    3. **Missing Dialog Semantics:** End-of-round modals lack `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
    4. **Keyboard Event Hijack:** Global key listeners (Space, A, L, 1-6, V, I) continue to fire even when the end-of-round modal is open. No Escape key dismiss, no focus trap, and no focus restoration.
  - **What the fix WOULD be:**
    - Add `role="status" aria-live="polite"` to `#feedback-toast` and `role="img" aria-label="..."` to stimulus cards.
    - Set `inert` on the game arena until the start overlay is dismissed, and programmatically move focus to the arena on start.
    - Add `role="dialog" aria-modal="true"` to modals, guard key listeners with `if (!modal.classList.contains('hidden')) return;`, and add Escape key handlers with Tab focus traps.

---

#### 4. Cognitive Load & Pace Ergonomics
- **Location:** `src/pages/games/syllogism.astro`, `src/pages/games/math-sprint.astro`, `src/pages/games/n-back.astro`
  - **Issue Type:** Cognitive Load / Usability (P1)
  - **What is wrong:**
    1. In `syllogism.astro`, a 15-second timer for 3 complex logical premises plus a brief 1400ms auto-advance explanation window is rushed for slow or ESL readers.
    2. Toast feedback (500-700ms) fades out too quickly, and relies solely on color (emerald vs rose) with text.
    3. Flashing animations (`animate-pulse`, `animate-bounce`) trigger without `@media (prefers-reduced-motion: reduce)` guards.
  - **What the fix WOULD be:**
    - Add an untimed practice toggle for Syllogism Blitz (similar to `CategoryTestRunner`).
    - Extend feedback toast duration to ~1200ms and add small ✓ and ✗ SVG icons for colorblind support.
    - Wrap pulsing and bouncing animations in reduced-motion media queries.

---

#### 5. LocalStorage Robustness & Contrast Polish
- **Location:** `src/pages/games.astro`, `src/pages/games/*.astro`
  - **Issue Type:** Reliability / WCAG Contrast (P1)
  - **What is wrong:**
    1. **Unprotected Storage Calls:** `localStorage.getItem()` and `localStorage.setItem()` are called with zero `try/catch` wrapping. In private browsing modes or restricted enterprise browsers, storage access throws an exception and completely crashes `startRound()`.
    2. **HUD Micro-Typography Contrast:** 10px uppercase labels (`text-[10px] text-zinc-400` on zinc-100) fail WCAG contrast with ~2.2:1 ratio.
    3. **Amber Button Contrast:** `bg-amber-600` with white text on start/restart buttons fails contrast (~3.4:1 ratio).
  - **What the fix WOULD be:**
    - Wrap all `localStorage` access in `try { ... } catch (e) { ... }` blocks.
    - Bump HUD labels to minimum 11px with `text-zinc-500 dark:text-zinc-400`.
    - Change amber buttons to `bg-amber-700`.

---

## Batch 5: Entire Remaining Site (Pillar Guides, Landing, Hubs & Tools)
**Audited Files (Consolidated Bundle - 20 Pages):**
- Full Consolidated Bundle: `e:\Antigravity\freeiqexam.com\Scrachpad\BATCH_5_ALL_REMAINING_PAGES_BUNDLE.txt` *(403 KB)*
- Component Files Included:
  1. `src/pages/index.astro` (Homepage Landing & Conversion Funnel)
  2. `src/pages/methodology.astro` (Academic Methodology & IRT Validation)
  3. `src/pages/practice.astro` (Cognitive Practice Hub)
  4. `src/pages/leaderboard.astro` (Global Cognitive Leaderboard)
  5. `src/pages/blog.astro` (Psychometric Research Blog Hub)
  6. `src/pages/iq-classification-scale.astro` (Pillar Guide: Classification Scale)
  7. `src/pages/high-iq-societies.astro` (Pillar Guide: High IQ Societies)
  8. `src/pages/iq-score-chart.astro` (Reference Tool: Score Chart & Bell Curve)
  9. `src/pages/iq-percentile-calculator.astro` (Interactive Tool: Percentile Calculator)
  10. `src/pages/average-iq-by-age.astro` (Pillar Guide: Average IQ by Age)
  11. `src/pages/matrix-reasoning-test.astro` (Practice Guide: Matrix Reasoning)
  12. `src/pages/mensa-iq-test-practice.astro` (Practice Guide: Mensa IQ Practice)
  13. `src/pages/spatial-reasoning-test.astro` (Domain Test: Visual-Spatial Gv)
  14. `src/pages/quantitative-reasoning-test.astro` (Domain Test: Quantitative Gq)
  15. `src/pages/verbal-reasoning-test.astro` (Domain Test: Verbal Comprehension Gc)
  16. `src/pages/about.astro` (Institutional About & Standards)
  17. `src/pages/contact.astro` (Academic & Support Contact)
  18. `src/pages/privacy.astro` (Privacy Policy & Compliance)
  19. `src/pages/terms.astro` (Terms of Service & Disclaimers)
  20. `src/pages/404.astro` (Custom 404 Recovery)

### Summary Scorecard
- **Content & Funnel Architecture:** Outstanding SEO structure, semantic layout, conversion funnel (Hero -> Quick Test -> Full Test), and E-E-A-T academic citations across all 20 pages.
- **Systemic Contrast Debt:** ❌ **P0 Global Defect** (`text-zinc-400` occurs 231 times; 11px text occurs 17 times; 10px text occurs 7 times; failing WCAG AA 4.5:1 contrast on white).
- **Dense Data Tables:** ❌ Missing `min-w-[560px]` on classification tables (causes text squishing on 360px mobile viewports); missing sticky `thead` on tall tables; missing `scope="col"` and `<caption>`.
- **Interactive Calculators:** ❌ Sliders fail 44px touch target (native thumb ~20px); output cards lack `role="status" aria-live="polite"`; missing `inputmode="numeric"`.
- **Formulas & SVG ICC:** ❌ Missing `role="img" aria-labelledby` and `<title>` on ICC charts; SVG axis labels fail small-text contrast.
- **Domain Wrappers Duplication:** ❌ Spatial, Quantitative, and Verbal pages duplicate Fluid test wrapper and inherit the double-sticky header collision.

---

### Detailed Findings & Issues Log

#### 1. Systemic Light Mode Contrast & Micro-Typography Sweep
- **Location:** Across all 20 pages (231 occurrences of `text-zinc-400`)
  - **Issue Type:** Accessibility / WCAG AA Failure / Global Design Debt (P0)
  - **What is wrong:**
    1. `text-zinc-400` on white `#ffffff` produces ~2.4:1 contrast ratio (violates the 4.5:1 minimum threshold for body and instructional text).
    2. 10px and 11px micro-text (`text-[10px]`, `text-[11px]`) in table headers and widget labels (e.g. `text-zinc-500` on `#f4f4f5` = ~4.2:1) fails contrast requirements for sub-14pt text.
  - **What the fix WOULD be:**
    - Perform a global token replacement: `text-zinc-400` (on light surfaces) -> `text-zinc-500 dark:text-zinc-400`.
    - Bump body micro-typography (`text-[10px]`, `text-[11px]`) to `text-xs` (12px) minimum with `text-zinc-600 dark:text-zinc-300`.

---

#### 2. Dense Tables: Min-Width, Sticky Headers & Table A11y
- **Location:** `src/pages/iq-classification-scale.astro:2791`, `src/pages/iq-percentile-calculator.astro:4492`, `src/pages/methodology.astro:1136`, etc.
  - **Issue Type:** Responsive Layout / Accessibility / UX (P1)
  - **What is wrong:**
    1. Tables wrapped in `overflow-x-auto` lack `min-w-[560px]`. On a 360px viewport, 4 columns squish into 328px (~82px per column), causing awkward line-wrapping for terms like "130 and above / Very Superior".
    2. Long tables (Classification, High IQ Societies, Age Norms) lack a sticky `thead`; column headers scroll off-screen as users read down the rows.
    3. Missing semantic `<caption>` and `scope="col"` on header cells.
    4. `classificationRows` frontmatter array contains an unrendered `desc` property (dead data payload).
  - **What the fix WOULD be:**
    - Add `min-w-[560px]` (or `min-w-[600px]`) to tables inside `overflow-x-auto` containers.
    - Add `thead class="sticky top-16 bg-white dark:bg-zinc-900 z-10"` to keep column headers visible.
    - Add `<caption>` and `scope="col"` for screen reader compliance.
    - Remove unused `desc` fields from frontmatter or display them via expandable detail rows.

---

#### 3. Calculator Ergonomics: Sliders, Inputs & Live Outputs
- **Location:** `src/pages/iq-percentile-calculator.astro:4340-4477`, `src/pages/iq-classification-scale.astro:2713-2767`
  - **Issue Type:** Ergonomics / Touch Targets / Screen Reader Live Regions (P0 / P1)
  - **What is wrong:**
    1. Range input sliders use native browser thumbs (~20px), failing the 44px touch target standard on mobile thumbs.
    2. Mode toggle buttons (`py-2 px-4` ~36px) fail 44px touch target and lack `aria-pressed` or `role="tab"`.
    3. Output elements (`#output-percentile`, `#output-rarity`, `#output-classification`) lack `role="status" aria-live="polite"`, leaving screen reader users unaware of live slider recalculations.
    4. Inputs lack `inputmode="numeric"` for mobile keypad triggering and lack out-of-range visual error validation.
  - **What the fix WOULD be:**
    - Add CSS rules: `input[type=range] { min-height: 44px; } input[type=range]::-webkit-slider-thumb { width: 28px; height: 28px; }`.
    - Bump mode toggles to `min-h-[44px]` and add `aria-pressed="true/false"`.
    - Add `role="status" aria-live="polite"` to calculation output containers.
    - Add `inputmode="numeric"` and numerical clamping with user-facing validation hints.

---

#### 4. Scientific Formulas & SVG ICC Curve Accessibility
- **Location:** `src/pages/methodology.astro:1199-1283`
  - **Issue Type:** Accessibility / Data Visualization (P1)
  - **What is wrong:**
    1. LaTeX-style mono formulas using `<sub>` and `<sup>` are garbled when read by screen readers.
    2. SVG ICC curve chart lacks `role="img"`, `aria-labelledby`, `<title>`, and fallback table description.
    3. SVG axis tick text (`fill="#a1a1aa"`) and colored legend items (`#3b82f6`, `#4f46e5`, `#9333ea` on tinted background) fail AA contrast.
  - **What the fix WOULD be:**
    - Add plain-text `sr-only` descriptions alongside complex mathematical notation.
    - Add `role="img" aria-labelledby="icc-title"` and `<title id="icc-title">` to the ICC SVG.
    - Darken legend colors and update axis labels to `#52525b` with `font-size: 12px`.

---

#### 5. FAQ Accordions, Chevron Icons & Semantic Heading Cleanups
- **Location:** Across 8 pages containing FAQ accordions, `src/pages/404.astro:6651`
  - **Issue Type:** Polish / Accessibility / Clean Markup (P1 / P2)
  - **What is wrong:**
    1. `<summary>` tags use HTML entity `&darr;` rotated with `group-open:rotate-180`, causing visual distortion during rotation.
    2. `<summary>` elements lack `:focus-visible:ring-2` styling.
    3. Breadcrumb separators (`/` and `&bull;`) are announced by screen readers without `aria-hidden="true"`.
    4. On `404.astro`, both `<h1>` (404) and `<h2>` (Page Not Found) compete as headings.
  - **What the fix WOULD be:**
    - Replace text arrows in `<summary>` with clean SVG chevrons and add focus rings.
    - Wrap breadcrumb separators with `<span aria-hidden="true">/</span>`.
    - Set `<h1>Page Not Found</h1>` on 404 page and mark the large numerical display with `aria-hidden="true"`.

---

## MASTER UI/UX IMPLEMENTATION ROADMAP (PHASES 1 - 5)

| Execution Priority | Phase Scope | Key Target Files | High-Impact Deliverables |
|---|---|---|---|
| **Phase 1: Shell & Tokens (P0)** | Design System & Navigation | `global.css`, `Layout.astro`, `Header.astro`, `Footer.astro` | Semantic CSS tokens, FOUC prefers-color-scheme fix, 44px touch targets, Fixed slide mobile drawer with backdrop & scroll-lock, Skip link. |
| **Phase 2: Test Engines (P0)** | Assessment Execution & IRT | `CategoryTestRunner.astro`, `test.astro`, `quick-test.astro` | Debounce auto-advance (fix question skip bug), Port wall-clock timer to Category runner, Lock mode tabs mid-test, Defensive SVG max-width, Separate localStorage keys. |
| **Phase 3: Results & Cert (P0)** | Score Delivery & Certificate | `results.astro`, `fluid-reasoning-test.astro` | Score hydration skeleton (kill fake 118 flash), iOS Safari canvas download fallback, 2x retina certificate canvas, Dark-mode print stylesheet, Fix double sticky header. |
| **Phase 4: Mini-Games (P1)** | Cognitive Training Arena | `games.astro`, `games/*.astro`, `item-bank.json` | Fix duplicate `class` in `item-bank.json` (restore dark strokes), Throttle rAF timer writes to 10Hz, Add ARIA live regions & modal focus traps, Wrap localStorage in try/catch. |
| **Phase 5: Site-Wide Sweep (P1)** | 20 Reference & Pillar Pages | `index.astro`, `methodology.astro`, `iq-classification-scale.astro`, etc. | Global `text-zinc-400` -> `zinc-500` contrast sweep, Table `min-w-[560px]` & sticky thead, Range slider 44px thumbs, SVG chevrons in FAQs, 404 heading hierarchy. |



