# MASTER PHASE 7B — 56 ENGLISH PAGES ON-PAGE SEO IMPLEMENTATION & TOPICAL MESH
# Version: 2.0.0 (Execution Directive — Multi-Keyword Topical Optimization & Content Architecture)
# Target Codebase: freeiqexam.com (src/pages/*.astro — 56 English Routes)
# Authority Blueprint: PHASE7A_ENGLISH_56_SEO_MAPPING_REPORT.md (Generated from Phase 7A Baseline Audit)
# Authority Standards: 2026 Google Search Essentials, Sovereign Baseline (Commit 857dc4b)
# SEO Research Assets:
#   - Primary Blueprint: PHASE7A_ENGLISH_56_SEO_MAPPING_REPORT.md (in repository root)
#   - Keyword Research Log: SEO_English_Keyword_Research_Log.txt (634+ verified keyword metrics)
#   - Raw JSON Database: SEO_ENGLISH_EXPANDED_29_TOOLS_RESEARCH.json

---

## 🎯 OBJECTIVE & MANDATE

You are the **Lead Technical SEO Engineer & Front-End Design Systems Specialist**. 
Your objective is to execute **Phase 7B: Comprehensive On-Page SEO Implementation** across all **52 indexable English routes** of `freeiqexam.com` (leaving 4 compliance routes exempt), strictly adhering to the specifications established in **`PHASE7A_ENGLISH_56_SEO_MAPPING_REPORT.md`**.

### 💡 2026 Google Ranking Philosophy: How to Rank for Maximum Keywords Without Spam Penalties
To rank high across both mega-volume head terms and dozens of secondary/long-tail queries, **DO NOT engage in mechanical keyword repetition (keyword stuffing)**. Google's Search Essentials and Spam Policies penalize unnatural density.

Instead, achieve **maximum keyword coverage through Topical Depth & Intent Clustering**:
1. **Primary Head Query**: Embedded naturally in `<title>`, `<meta name="description">`, `<h1>`, and within the opening 100 words.
2. **Secondary High-Volume Queries**: Built as dedicated, authoritative `<h2>` and `<h3>` subheadings (e.g. On `/calorie-calculator`: dedicated sections for *"TDEE Calculator & Daily Calorie Needs"*, *"Calorie Deficit Calculator for Fat Loss"*, *"BMR vs TDEE"*).
3. **Long-Tail & People Also Ask (PAA) Queries**: Answered directly in clear, informative paragraphs and interactive FAQ accordions.
4. **Remediate Thin Test Runners (P0 Priority)**: Pages like `/test` (117 words) and `/quick-test` (112 words) currently function only as raw test runners. You MUST add rich psychometric framework explanations, scoring scale definitions, and FAQ sections beneath the interactive test canvas so search engines have sufficient topical context to rank them.
5. **Topical Internal Linking Mesh**: Interlink sister tools and domain batteries using natural, keyword-rich anchor texts (e.g., linking between `/test`, `/matrix-reasoning-test`, `/iq-score-chart`, and `/methodology`).
6. **Modernized Structured Data (Schema.org)**: Implement supported schemas (`WebApplication`, `MedicalWebPage`, `Quiz`, `Article`, `TechArticle`, `ItemList`, `Organization`). Note: Google deprecated FAQ rich results in May 2026; maintain visible FAQ content for user experience and featured snippets, but do not rely on `FAQPage` schema for rankings.

---

## 🛡️ CRITICAL NON-NEGOTIABLE BOUNDARIES

1. **👑 Sovereign Universal Design Law (Baseline Commit `857dc4b`)**:
   - Pure flat canvas: solid `#000000` (Dark) / `#ffffff` (Light). Strictly **ZERO radial background glows (`.fx-hero-glow`)**, strictly **ZERO purple/blue text gradients**.
   - Pure SVG micro-icons (16×16 / 18×18). Strictly **ZERO cartoon emojis** in headers, navigation, or badges.
   - Tactile button standards: maintain `:active:scale-[0.97]` on buttons (never revert to `scale-95`).
   - 10-section flagship architecture on `/` preserved.

2. **⚙️ Psychometric & Calculation Engine Safeguards**:
   - Strictly **DO NOT alter** JavaScript timers, scoring algorithms (2PL Item Response Theory), question arrays, test state machines, or calculation formulas.
   - All enhancements must be presentational, educational, metadata, and structural content additions.

3. **🛡️ Exemption of Compliance & Non-Indexed Routes**:
   - `/privacy`, `/terms`, `/404`, `/preview-master-v3` must remain **STRICTLY EXEMPT** from SEO keyword targeting.

---

## 📐 ON-PAGE SEO IMPLEMENTATION PROTOCOL (PER PAGE)

For each of the 52 indexable pages, apply the exact specifications from `PHASE7A_ENGLISH_56_SEO_MAPPING_REPORT.md`:

### 1. Title Tag (`<title>`)
- Formulate a clear, concise, compelling title that naturally incorporates the primary search query and brand suffix `| FreeIQExam`.
- Avoid arbitrary character counting or keyword stuffing.

### 2. Meta Description (`<meta name="description">`)
- Provide an accurate, compelling 140–160 character summary.
- Highlight key differentiators: instant confidential results, no email/registration, scientifically validated norms (e.g., WHO ASRS v1.1, AQ-10, PHQ-9, 2PL IRT), and zero paywalls.

### 3. Semantic Headings (`<h1>`, `<h2>`, `<h3>`)
- **`<h1>`**: Clear, descriptive heading featuring the primary target query in pure solid ink.
- **`<h2>` Subheadings**: Sub-sections targeting secondary high-volume queries from the mapping report.
- **`<h3>` Subheadings**: Detailed sub-topics, calculation formulas, or clinical criteria.

### 4. Thin Page Remediation & Content Depth
- For pages with thin content (especially `/test`, `/quick-test`, `/fluid-reasoning-test`, `/quantitative-reasoning-test`), add:
  - **Educational Overview**: What the construct measures and its real-world relevance.
  - **Scoring & Percentile Interpretation**: How results map to standard deviations and population norms.
  - **Visible FAQ Accordion**: 3–5 high-intent questions answering common search queries.

### 5. Structured Data (Schema.org JSON-LD)
- Inject or update clean JSON-LD blocks matching the exact proposed schema in `PHASE7A_ENGLISH_56_SEO_MAPPING_REPORT.md`:
  - `WebApplication` (Interactive calculators, sound generators, games)
  - `MedicalWebPage` + `Quiz` (Clinical screeners: ADHD, Autism, Depression, Anxiety, Vision, Hearing)
  - `Article` / `TechArticle` (Statistical score charts, age norms, methodology)
  - `ItemList` / `CollectionPage` (Hubs: `/games`, `/tools`, `/blog`)

### 6. Topical Internal Linking
- Include contextual crawlable links to related tools within the same topical cluster as mapped in Phase 7A.

---

## 🗂️ 52-PAGE BATCH EXECUTION WORKFLOW

Execute the implementation across 5 structured batches. Run `npm run build` after each batch to guarantee zero regressions:

### 🏆 Batch 1: Mega-Volume Interactive Landing Pages (15 Pages)
*Targeting massive monthly search queries (100k+ to 1M searches/mo).*
1. `src/pages/calorie-calculator.astro` (`calorie calculator` 1.0M, `tdee calculator` 450k, `calorie deficit calculator` 301k)
2. `src/pages/typing-test.astro` (`typing test` 550k, `wpm test` 135k, `1 minute typing test` 33k)
3. `src/pages/index.astro` (`iq test` 368k, `free iq test` 90.5k, `online iq test` 9.9k)
4. `src/pages/autism-test.astro` (`autism test` 301k, `adult autism test` 49.5k, `asd autism test` 301k)
5. `src/pages/adhd-test.astro` (`adhd test` 165k, `adult adhd test` 27.1k, `add test` 40.5k)
6. `src/pages/depression-test.astro` (`depression test` 135k, `phq 9 test` 3.6k, `depression quiz` 33.1k)
7. `src/pages/color-blind-test.astro` (`color blind test` 201k, `ishihara test` 12.1k)
8. `src/pages/memento-mori.astro` (`memento mori` 201k, `life in weeks` 260)
9. `src/pages/mic-test.astro` (`mic test` 135k, `microphone test` 135k)
10. `src/pages/games/click-speed-test.astro` (`cps test` 110k, `click speed test` 33.1k)
11. `src/pages/sleep-calculator.astro` (`sleep calculator` 110k, `sleep cycle calculator` 9.9k)
12. `src/pages/brown-noise.astro` (`brown noise` 110k, `pink noise` 33.1k, `brown noise sleep` 27.1k)
13. `src/pages/reaction-time-test.astro` (`reaction time test` 74k, `reflex test` 12.1k)
14. `src/pages/quick-test.astro` (`quick iq test` 6.6k, `fast iq test` 2.9k) — **Remediate thin content gap**
15. `src/pages/test.astro` (`online iq test` 9.9k, `test my iq` 22k) — **Remediate thin content gap**

### 🧠 Batch 2: Specialized Cognitive & CHC Domain Batteries (12 Pages)
*Targeting specific clinical, cognitive, optometric, and psychomotor queries.*
16. `src/pages/aim-trainer.astro` (`aim trainer` 49.5k)
17. `src/pages/anxiety-test.astro` (`anxiety test` 49.5k, `gad 7 test` 1.9k)
18. `src/pages/circle-of-control.astro` (`circle of control` 6.6k)
19. `src/pages/eye-test.astro` (`eye test online` 14.8k, `astigmatism test` 12.1k)
20. `src/pages/flag-quiz.astro` (`flag quiz` 49.5k, `world flag quiz` 6.6k)
21. `src/pages/fluid-reasoning-test.astro` (`fluid intelligence test` 260) — **Remediate content depth**
22. `src/pages/hearing-test.astro` (`hearing test online` 18.1k, `ear age test` 170)
23. `src/pages/matrix-reasoning-test.astro` (`matrix reasoning test` 210, `ravens progressive matrices` 1.6k)
24. `src/pages/mensa-iq-test-practice.astro` (`mensa iq test` 27.1k, `mensa practice test` 6.6k)
25. `src/pages/quantitative-reasoning-test.astro` (`quantitative reasoning test` 1k) — **Remediate content depth**
26. `src/pages/spatial-reasoning-test.astro` (`spatial reasoning test` 1.3k)
27. `src/pages/verbal-reasoning-test.astro` (`verbal reasoning test` 3.6k)

### 📊 Batch 3: Statistical Authority & Reference Link Magnets (10 Pages)
*Educational benchmarks and reference data that generate organic backlinks.*
28. `src/pages/average-iq-by-age.astro` (`average iq by age` 14.8k)
29. `src/pages/high-iq-societies.astro` (`high iq societies` 1.9k)
30. `src/pages/iq-classification-scale.astro` (`iq scale` 14.8k, `iq classification` 1k)
31. `src/pages/iq-percentile-calculator.astro` (`iq percentile calculator` 2.4k)
32. `src/pages/iq-score-chart.astro` (`iq score chart` 14.8k, `iq bell curve` 1k)
33. `src/pages/leaderboard.astro` (`iq test leaderboard` 260)
34. `src/pages/methodology.astro` (`psychometric testing methodology` 320)
35. `src/pages/practice.astro` (`iq test practice questions` 4.4k)
36. `src/pages/results.astro` (`iq test results breakdown` 480)
37. `src/pages/tools.astro` (`free cognitive tests and tools` 1.2k)

### 🎮 Batch 4: 11 Brain Games Hub (11 Pages)
*Interactive cognitive training and psychomotor games.*
38. `src/pages/games/index.astro` (`brain games` 74k)
39. `src/pages/games/digit-span.astro` (`digit span test` 4.4k)
40. `src/pages/games/flanker-test.astro` (`flanker test` 2.9k)
41. `src/pages/games/math-sprint.astro` (`mental math test` 6.6k)
42. `src/pages/games/memory-matrix.astro` (`visual memory test` 12.1k)
43. `src/pages/games/n-back.astro` (`dual n back` 14.8k)
44. `src/pages/games/rotation.astro` (`mental rotation test` 4.4k)
45. `src/pages/games/sequence-rush.astro` (`sequence memory test` 9.9k)
46. `src/pages/games/stroop-clash.astro` (`stroop test` 27.1k)
47. `src/pages/games/syllogism.astro` (`syllogism test` 2.4k)
48. `src/pages/games/symbol-match.astro` (`processing speed test` 2.4k)

### 🏛️ Batch 5: Entity & Trust Informational Pages (4 Pages)
49. `src/pages/about.astro` (`about freeiqexam` 300)
50. `src/pages/blog.astro` (`cognitive science blog` 880)
51. `src/pages/contact.astro` (`contact freeiqexam` 150)
52. `src/pages/profile.astro` (`personal cognitive profile` 100)

### 🛡️ Batch 6: Compliance & Non-Indexed Routes (STRICTLY EXEMPT — DO NOT TOUCH)
53. `src/pages/privacy.astro`
54. `src/pages/terms.astro`
55. `src/pages/404.astro`
56. `src/pages/preview-master-v3.astro`

---

## 🧪 VERIFICATION & ACCEPTANCE GATE

Execute the following checks after implementing each batch:

1. **Production Astro Build Gate**:
   ```powershell
   npm run build
   ```
   *Requirement: Exactly 204 generated HTML routes, 0 build errors, 0 broken imports.*

2. **Sovereign Design & Interaction Audit**:
   - Ensure hero canvases remain pure flat `#000000` / `#ffffff` (no blue/purple glows).
   - Ensure all buttons have tactile `:active:scale-[0.97]` classes.
   - Verify zero console runtime errors.

3. **Git Staging & Commit**:
   ```powershell
   git status --short
   git add src/pages/*.astro src/pages/games/*.astro
   git commit -m "feat(seo): implement phase 7b on-page seo metadata and topical clusters across 52 english routes"
   ```
