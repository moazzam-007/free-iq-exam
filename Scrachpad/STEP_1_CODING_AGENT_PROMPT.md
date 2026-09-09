# Step 1: Upgrading Core Cognitive Assessment Architecture & Dual Test Tracks
**Target Agent:** Coding Agent (Agent 3)  
**Project:** FreeIQExam.com (Astro v5 + TailwindCSS + TypeScript)  
**Working Directory:** `e:/Antigravity/freeiqexam.com`

---

## 1. Objective & Scope

Upgrade the cognitive test engine from a static 24-question visual matrix test into a comprehensive, multi-domain cognitive assessment ecosystem powered by the 100-item open-source calibrated item bank located at `Scrachpad/OPEN_SOURCE_COGNITIVE_ITEM_BANK_100.json`.

You will deliver:
1. **Upgraded Type Definitions & Item Bank:** Update `src/data/questions.ts` to support multimodal items (SVG visual matrices + clean typography text questions) across 4 Cattell-Horn-Carroll (CHC) broad domains:
   - Fluid Reasoning ($G_f$)
   - Visual-Spatial Processing ($G_v$)
   - Quantitative Reasoning ($G_q$)
   - Verbal Comprehension ($G_c$)
2. **Psychometric Scoring Engine (2PL IRT + Bayesian EAP):** Upgrade `src/utils/scoring.ts` to accept dynamic item vectors and compute:
   - Full-scale Composite IQ (Mean 100, SD 15, range 60-160)
   - Standard Error of Measurement ($SEM$) & 95% Confidence Interval
   - Percentile Rank (derived from standard normal CDF)
   - 4 CHC Domain Index Sub-Scores (FRI, VSI, QRI, VCI) scaled to standard scores (Mean 100, SD 15)
3. **Dual Test Tracks:**
   - **Track A (Quick Screening):** New route `src/pages/quick-test.astro` (12 balanced items: 3 Fluid, 3 Spatial, 3 Quantitative, 3 Verbal; 8-10 min timer).
   - **Track B (Comprehensive Exam):** Upgrade `src/pages/test.astro` (24 balanced items: 6 Fluid, 6 Spatial, 6 Quantitative, 6 Verbal sampled dynamically from the bank; 20 min timer).
4. **Upgraded Results Dashboard:** Upgrade `src/pages/results.astro` to render:
   - Composite IQ score with 95% CI pill and percentile.
   - 4 Domain Index Cards (FRI, VSI, QRI, VCI) with visual progress bars and percentile ranks.
   - Question-by-Question Solution Review with step-by-step mathematical/logical explanations and distractor analysis.
   - Clear educational disclaimer.

---

## 2. File Specifications & Architecture

### File 1: `src/data/questions.ts`
- **Location:** `src/data/questions.ts`
- **Interfaces to define:**
  ```typescript
  export type CHCDomain = 'fluid' | 'spatial' | 'quantitative' | 'verbal';

  export interface QuestionOption {
    id: number;
    text: string;           // Option text for verbal/quantitative items, empty for pure SVG
    svgContent?: string;    // SVG snippet for visual options
    isCorrect: boolean;
    distractorType?: string;
  }

  export interface QuestionItem {
    id: number;
    domain: CHCDomain;
    subType: string;
    domainLabel: string;
    promptType: 'svg' | 'text' | 'hybrid';
    promptText: string;
    promptSvg?: string;
    options: QuestionOption[];
    a: number; // Discrimination parameter (0.8 - 2.2)
    b: number; // Difficulty parameter (-2.5 - +2.5)
    explanation: string;
    sourceRef?: string;
  }
  ```
- **Data Integration:**
  - Import or embed the 100 items from `Scrachpad/OPEN_SOURCE_COGNITIVE_ITEM_BANK_100.json`.
  - Export `QUESTION_BANK: QuestionItem[]`.
  - Export sampler helper functions:
    - `getQuickTestSet(): QuestionItem[]`: Returns exactly 12 items (3 from each of the 4 domains).
    - `getStandardTestSet(seed?: number): QuestionItem[]`: Returns exactly 24 items (6 from each of the 4 domains).

---

### File 2: `src/utils/scoring.ts`
- **Location:** `src/utils/scoring.ts`
- **Updated Interface:**
  ```typescript
  export interface DomainIndexScore {
    rawScore: number;
    total: number;
    theta: number;
    standardScore: number; // Mean 100, SD 15
    percentile: number;
  }

  export interface AssessmentResult {
    rawScore: number;
    totalQuestions: number;
    theta: number;
    sem: number;
    iqEstimate: number; // Standardized IQ (Mean 100, SD 15)
    confidenceInterval: [number, number]; // [lower, upper]
    percentile: number;
    domainBreakdown: Record<CHCDomain, DomainIndexScore>;
    testType: 'quick' | 'standard';
  }
  ```
- **Mathematical Formulas:**
  1. **2PL IRT Item Response Function:**
     $$P_i(\theta) = \frac{1}{1 + \exp\left(-1.702 \cdot a_i \cdot (\theta - b_i)\right)}$$
  2. **Bayesian Expected A Posteriori (EAP) Estimation:**
     Use 81 Gaussian quadrature points from $\theta = -4.0$ to $+4.0$ with standard normal prior $N(0, 1)$.
     $$\hat{\theta}_{EAP} = \sum_{k=1}^{K} q_k \cdot W(q_k), \quad \text{Var}(\theta) = \sum_{k=1}^{K} (q_k - \hat{\theta})^2 \cdot W(q_k)$$
  3. **Score Scaling:**
     $$\text{Composite IQ} = \text{clamp}\left(60, 160, \text{round}(100 + 15 \cdot \hat{\theta})\right)$$
     $$95\% \text{ CI} = [\text{IQ} - 1.96 \cdot 15 \cdot SEM, \; \text{IQ} + 1.96 \cdot 15 \cdot SEM]$$
  4. **Domain Indices:**
     Compute localized $\hat{\theta}_{domain}$ on the subset of items for each domain, scaled as:
     $$\text{Index Score} = \text{clamp}\left(60, 160, \text{round}(100 + 15 \cdot \hat{\theta}_{domain})\right)$$

---

### File 3: `src/pages/quick-test.astro` (NEW PAGE)
- **Location:** `src/pages/quick-test.astro`
- **Functionality:**
  - Fast 12-item screening track.
  - 10-minute countdown timer with visual progress.
  - Universal question renderer:
    - If `item.promptType === 'svg'`, render SVG prompt container.
    - If `item.promptType === 'text'`, render high-contrast typography prompt card with clear math formatting.
    - Render options in a responsive grid (2 columns on mobile, 3 columns on desktop). If option has `text`, render crisp typography button card. If option has `svgContent`, render SVG graphic.
  - Client-side state handling:
    - Store answers in `localStorage.setItem('iq_assessment_answers', JSON.stringify(answers))`
    - Store active question IDs in `localStorage.setItem('iq_active_questions', JSON.stringify(activeQuestions))`
    - Store test metadata `localStorage.setItem('iq_test_type', 'quick')`
    - On test completion or timer expiry, redirect to `/results`.

---

### File 4: `src/pages/test.astro` (UPGRADE)
- **Location:** `src/pages/test.astro`
- **Functionality:**
  - Comprehensive 24-item assessment track.
  - Samples 6 items from Fluid, 6 Spatial, 6 Quantitative, 6 Verbal dynamically.
  - 20-minute countdown timer.
  - Uses the same universal multimodal question renderer (supporting both visual SVGs and text math/verbal questions).
  - Keyboard navigation (keys 1-6 select options, Arrow keys navigate).
  - Store payload in `localStorage` and redirect to `/results`.

---

### File 5: `src/pages/results.astro` (UPGRADE)
- **Location:** `src/pages/results.astro`
- **Functionality:**
  - Read `localStorage.getItem('iq_assessment_answers')`, `localStorage.getItem('iq_active_questions')`, and `localStorage.getItem('iq_test_type')`.
  - Calculate scores via `calculateScore(answers, activeQuestions)`.
  - Render:
    1. **Primary Score Display:** Big IQ score number, 95% Confidence Interval range badge, and normal distribution percentile rank.
    2. **4 CHC Domain Index Cards:**
       - Fluid Reasoning Index (FRI)
       - Visual-Spatial Index (VSI)
       - Quantitative Reasoning Index (QRI)
       - Verbal Comprehension Index (VCI)
       Each with its scaled standard score (e.g. 115), percentile, and progress bar.
    3. **Step-by-Step Question Review Modal / Accordion:**
       - Shows every question attempted.
       - User's selected answer vs. correct answer.
       - Full step-by-step mathematical or logical explanation.
    4. **Clear Educational Disclaimer:**
       - Explicit notice that this online client-side assessment is for educational and cognitive curiosity purposes, not a clinical neuro-psychological diagnosis.

---

## 3. Strict Project Constraints (Build Breakers)

1. **ZERO Em-Dash and En-Dash Violations:**
   - STRICTLY FORBIDDEN characters in all `src/` files:
     - `\u2014` (Em-dash `—`)
     - `\u2013` (En-dash `–`)
   - Use standard ASCII hyphens `-` or colons `:` instead.
2. **Review-Only Override Notice:**
   - The user has explicitly authorized this change in Step 1.
3. **Responsive Mobile-First UI:**
   - Dark glassmorphism styling (`bg-zinc-900/60`, `backdrop-blur-md`, `border-zinc-800`).
   - Touch targets must be at least 44px high.
4. **Verification Step:**
   - Run `npm run build` at completion. The build must exit with code 0 and zero TypeScript or Astro compiler errors.
