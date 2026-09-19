# MASTER ENGLISH PAGES DESIGN PARITY & COMPLIANCE AUDIT PROMPT
# Version: 1.0.0 (Phase 1 English Review Directive)
# Sovereign Baseline: Commit 857dc4b & design-specs/
# Execution Mode: REVIEW-ONLY AUDIT (Zero Auto-Fixing)

---

## 🎯 MISSION OBJECTIVE
Conduct an exhaustive, page-by-page design parity and architectural compliance audit across **ALL 56 English Astro Pages** of `freeiqexam.com` against the **Sovereign Immutable Baseline (Commit `857dc4b`)** and the **14 Master Design Specifications** in `design-specs/`.

You will verify whether the polished, developer-grade aesthetic established on the English Homepage (`src/pages/index.astro`) is uniformly and flawlessly applied across every individual page, test, game, and calculator.

---

## 👑 SOVEREIGN UNIVERSAL DESIGN LAW & AUDIT BENCHMARKS

Every page must be audited against these immutable directives:
1. **Commit `857dc4b` Parity**:
   - **Hero Canvas**: Pure flat `#000000` (Dark) / `#ffffff` (Light). Strictly **ZERO radial background glows (`.fx-hero-glow`)**, strictly **ZERO purple/blue gradient spotlights behind hero headlines**.
   - **Header & Navigation**: Apple frosted glass (`backdrop-blur-2xl bg-white/95 dark:bg-[#0c0d12]/95 border border-zinc-200/80 dark:border-white/10`) with **100% inline SVG micro-icons (16×16 / 18×18)**. Strictly **ZERO cartoon emojis** (`🧠`, `⚡`, `🎯`, `dYZ_`).
2. **Typography Triad**:
   - **Display & Headings (H1–H3)**: `Geist` (`font-display font-extrabold tracking-tight` with negative letter-spacing `-0.025em`).
   - **Body & Editorial Copy**: `Inter` (Apple 17px body standard: `text-[17px] leading-relaxed text-zinc-600 dark:text-zinc-400`).
   - **Eyebrows / Badges / Metrics**: `Geist Mono` (`font-mono uppercase tracking-wider text-xs`).
3. **Color Palette & Restraint**:
   - **Primary Action**: Single Action Blue (`#0066cc` Light / `#2997ff` Dark).
   - **Ink Hierarchy**: Headings `#09090b` (Light) / `#ffffff` (Dark); Body `#52525b` / `#a1a1aa`.
   - **Accents**: CHC / Clinical accent hues restricted strictly to micro chips, badge dots, and ambient card halos. Never full-card saturated floods.
4. **Surfaces & Elevation**:
   - Crisp 1px hairline borders (`border-zinc-200/80 dark:border-white/10`).
   - Surfaces: Pure white / parchment `#f5f5f7` (Light) and obsidian `#000000` / deep dark glass `#0f1016` (Dark).
   - Zero double-nested borders; zero heavy/muddy box shadows.
5. **Emil Kowalski Micro-Interactions**:
   - Tactile feedback: Every button / interactive element has `active:scale-[0.97]` or `active:scale-[0.98]`.
   - Smooth bezier transitions under 250ms (`transition-all duration-200`).
6. **Accessibility & Usability (WCAG 2.2 AA)**:
   - Minimum tap target size $\ge 44\times 44\text{px}$.
   - Minimum contrast ratio $\ge 4.5:1$ for normal text, $\ge 3:1$ for large text.
7. **Anti-AI Slop Gate**:
   - Strictly ban the 20 AI signature clichés (generic 3-card icon grids, robotic copywriting "Unlock your true potential", fake user counters, mechanical rounded corners).

---

## 📋 COMPLETE INVENTORY OF 56 ENGLISH PAGES TO AUDIT

Audit each page grouped across these 6 distinct batches:

### 🔹 Batch 1: Core Hubs & Architecture (9 Pages)
1. `src/pages/index.astro` (Homepage - Baseline Reference)
2. `src/pages/practice.astro` (Practice Hub)
3. `src/pages/games.astro` (Games Landing Hub)
4. `src/pages/tools.astro` (Tools Landing Hub)
5. `src/pages/methodology.astro` (Clinical Psychometrics)
6. `src/pages/about.astro` (Institutional About)
7. `src/pages/results.astro` (Psychometric Diagnostic Breakdown)
8. `src/pages/leaderboard.astro` (Global Leaderboard)
9. `src/pages/preview-master-v3.astro` (V3 Architecture Preview)

### 🔹 Batch 2: Cognitive CHC & IQ Batteries (7 Pages)
10. `src/pages/matrix-reasoning-test.astro` (Matrix Reasoning / $G_f$)
11. `src/pages/fluid-reasoning-test.astro` (Fluid Intelligence / $G_f$)
12. `src/pages/spatial-reasoning-test.astro` (Spatial Visualization / $G_v$)
13. `src/pages/quantitative-reasoning-test.astro` (Mathematical Logic / $G_q$)
14. `src/pages/verbal-reasoning-test.astro` (Crystallized Verbal / $G_c$)
15. `src/pages/quick-test.astro` (Rapid 5-Minute Screener)
16. `src/pages/mensa-iq-test-practice.astro` (Mensa Practice Battery)

### 🔹 Batch 3: Interactive Brain Games (11 Pages in `src/pages/games/`)
17. `src/pages/games/click-speed-test.astro` (CPS Reflex Meter)
18. `src/pages/games/digit-span.astro` (Working Memory Digit Span)
19. `src/pages/games/flanker-test.astro` (Eriksen Selective Attention)
20. `src/pages/games/math-sprint.astro` (Quantitative Speed Sprint)
21. `src/pages/games/memory-matrix.astro` (Spatial Grid Pattern Recall)
22. `src/pages/games/n-back.astro` (Dual N-Back Working Memory)
23. `src/pages/games/rotation.astro` (Shepard-Metzler Mental Rotation)
24. `src/pages/games/sequence-rush.astro` (Working Memory Sequence Rush)
25. `src/pages/games/stroop-clash.astro` (Cognitive Interference Stroop)
26. `src/pages/games/syllogism.astro` (Deductive Syllogistic Logic)
27. `src/pages/games/symbol-match.astro` (Perceptual Speed Symbol Matching)

### 🔹 Batch 4: Clinical Screeners & Sensory Benchmarks (10 Pages)
28. `src/pages/adhd-test.astro` (WHO ASRS v1.1 Adult Screener)
29. `src/pages/anxiety-test.astro` (GAD-7 Clinical Anxiety Screener)
30. `src/pages/autism-test.astro` (AQ-10 Autism Spectrum Quotient)
31. `src/pages/depression-test.astro` (PHQ-9 Depression Index)
32. `src/pages/reaction-time-test.astro` (Visual Latency Millisecond Benchmark)
33. `src/pages/aim-trainer.astro` (Spatial Motor Precision Benchmark)
34. `src/pages/color-blind-test.astro` (Ishihara Pseudoisochromatic Diagnostic)
35. `src/pages/hearing-test.astro` (Frequency Sweep 20Hz–20kHz)
36. `src/pages/eye-test.astro` (Landolt C / Snellen Visual Acuity)
37. `src/pages/mic-test.astro` (Hardware Frequency & Audio Analysis)

### 🔹 Batch 5: Circadian Tools & Lifestyle Calculators (8 Pages)
38. `src/pages/sleep-calculator.astro` (Ultradian 90-Min Sleep Architecture)
39. `src/pages/brown-noise.astro` (Spectral Noise & Focus Generator)
40. `src/pages/calorie-calculator.astro` (Mifflin-St Jeor Energy Expenditure)
41. `src/pages/memento-mori.astro` (Life Weeks Visualization Calendar)
42. `src/pages/circle-of-control.astro` (Stoic Epictetian Locus Visualizer)
43. `src/pages/flag-quiz.astro` (Cartographic Recognition)
44. `src/pages/typing-test.astro` (WPM & Accuracy Engine)
45. `src/pages/test.astro` (Core Test Entry Route)

### 🔹 Batch 6: Psychometric Reference, Scales & Legal Pages (11 Pages)
46. `src/pages/iq-classification-scale.astro` (WAIS-IV Standard Deviation Bands)
47. `src/pages/iq-percentile-calculator.astro` (Gaussian Bell Curve Distribution)
48. `src/pages/iq-score-chart.astro` (Interactive Bell Curve Matrix)
49. `src/pages/average-iq-by-age.astro` (Neuro-Developmental Age Trajectories)
50. `src/pages/high-iq-societies.astro` (Mensa, Intertel, Triple Nine Standards)
51. `src/pages/blog.astro` (Psychometric Research Articles)
52. `src/pages/profile.astro` (User History & Saved Results)
53. `src/pages/privacy.astro` (Data Privacy & Zero-Retention Policy)
54. `src/pages/terms.astro` (Terms of Service)
55. `src/pages/contact.astro` (Contact & Institutional Inquiries)
56. `src/pages/404.astro` (Branded Error State)

---

## 🔍 AUDIT CHECKLIST (10 CRITICAL CRITERIA PER PAGE)

For every page audited, evaluate:
1. **Header Parity**: Does it import and render `Header.astro` with SVG micro-icons and zero emojis?
2. **Hero Background**: Is the hero background flat obsidian `#000000` / white `#ffffff` with NO `.fx-hero-glow` or radial purple/blue text gradients?
3. **Typography Compliance**: Is H1/H2 in `Geist` with negative tracking? Is body text using `Inter` with 17px Apple sizing? Are chips/eyebrows in `Geist Mono`?
4. **Color Tokens**: Are CTAs strictly Action Blue (`#0066cc`/`#2997ff`)? Are domain accents confined to chips/badges?
5. **Hairline Borders**: Are container and card borders 1px hairlines (`border-zinc-200/80 dark:border-white/10`)?
6. **Card Surfaces**: Are cards using dark luxury glass (`bg-white/80 dark:bg-[#0f1016]/90`) without muddy drop shadows?
7. **Micro-Interactions**: Do buttons have `:active` tactile spring scaling (`active:scale-[0.97]`)?
8. **Mobile Tap Targets & Viewport**: Are all buttons $\ge 44\text{px}$? Is there any horizontal scroll overflow at 375px?
9. **Anti-Slop Check**: Are there cartoon emojis, robotic marketing copy, or unstyled default HTML form elements?
10. **SEO & Metadata**: Are descriptive title tags, meta descriptions, canonical URLs, and OpenGraph tags present?

---

## 🚫 REVIEW-ONLY AUDIT PROTOCOL (STRICT DISCIPLINE)

1. **DO NOT modify, edit, or refactor any code during the review.**
2. **Your ONLY job is to inspect and list findings.**
3. **Report every issue in this exact standard format:**
   - 📍 **Page & Location**: `[file-path:line-number]`
   - ❌ **Issue Type**: (Design Inconsistency / Header Drift / Emoji Slop / Hero Glow / Typography / Tap Target / Contrast)
   - 🔍 **What is wrong**: Clear description of the discrepancy compared to Homepage / Baseline `857dc4b`.
   - 💡 **Proposed Fix**: Exact description in words of what the fix WOULD be (zero code rewrites).
4. **If a page is 100% compliant and flawless, state**: `✅ Fully Compliant — No Issues Found.`

---

## 📊 DELIVERABLE FORMAT

Produce a structured markdown audit report:
```markdown
# ENGLISH PAGES DESIGN PARITY AUDIT REPORT

## Executive Summary
- Total Pages Audited: 56
- Fully Compliant Pages: [Count]
- Pages Requiring Design Realignment: [Count]
- Top Recurring Inconsistencies: [List]

---

## Batch-by-Batch Audit Findings

### Batch 1: Core Hubs & Architecture (9 Pages)
...

### Batch 2: Cognitive CHC & IQ Batteries (7 Pages)
...

### Batch 3: Interactive Brain Games (11 Pages)
...

### Batch 4: Clinical Screeners & Sensory Benchmarks (10 Pages)
...

### Batch 5: Circadian Tools & Lifestyle Calculators (8 Pages)
...

### Batch 6: Psychometric Reference, Scales & Legal Pages (11 Pages)
...

---

## Prioritized Remediation Roadmap (For Next Execution Step)
[Summary of batches to execute sequentially]
```
