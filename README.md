# FreeIQExam.com

<div align="center">

<img src="public/logo-horizontal.svg" alt="FreeIQExam Logo" width="360" />

<p align="center">
  <strong>The open, scientifically grounded, paywall-free cognitive assessment platform.</strong><br />
  Powered by 2-Parameter Logistic (2PL) Item Response Theory, Cattell-Horn-Carroll (CHC) psychometrics, and 10 interactive neurocognitive drills.
</p>

[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=flat&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Deployed-F38020?style=flat&logo=cloudflare&logoColor=white)](https://freeiqexam.pages.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Core Web Vitals](https://img.shields.io/badge/Lighthouse-100%2F100-emerald)](https://pagespeed.web.dev)

</div>

---

## 🌟 Overview

**FreeIQExam.com** was engineered to solve the single largest frustration in the online cognitive testing industry: **deceptive paywalls and email captures**. 

While legacy competitors bait users through 40 questions only to lock their results behind a $19.99 subscription trap or forced email newsletter, **FreeIQExam.com** provides instant, unproctored, clinically normed intelligence screening directly in the browser—with zero sign-up, zero credit card requirements, and zero data selling.

---

## 🔬 Psychometric & Scientific Methodology

FreeIQExam is built on contemporary cognitive science and psychometric test theory rather than simplistic raw-score percentages:

* **Cattell-Horn-Carroll (CHC) Model:** Items are categorized across four core broad cognitive abilities:
  * **Fluid Reasoning ($G_f$):** Inductive pattern logic, non-verbal matrix completion, and topological series.
  * **Visual-Spatial Processing ($G_v$):** Mental 3D rotation, orthographic projection, and cube folding nets.
  * **Quantitative Reasoning ($G_q$):** Number series induction, arithmetic reasoning, and quantitative relational logic.
  * **Crystallized Knowledge & Verbal Comprehension ($G_c$):** Lexical analogies, semantic classifications, and formal deductive syllogisms.
* **2-Parameter Logistic (2PL) Item Response Theory (IRT):**
  $$\displaystyle P_i(\theta) = \frac{1}{1 + e^{-1.702 \cdot a_i (\theta - b_i)}}$$
  Where $\theta$ represents the test-taker's latent cognitive ability, $b_i$ is item difficulty, and $a_i$ is item discrimination.
* **Calibrated Item Bank:** Includes 100 psychometrically validated items with precise difficulty ($b \in [-2.5, +2.5]$) and discrimination ($a \in [0.8, 2.2]$) parameters.
* **Normed Scale Standardization:** Standard deviation $\sigma = 15$, population median $\mu = 100$, generating accurate percentile curves from $<0.1\%$ to $99.9\%$.

---

## 🚀 Key Modules & Pages (36 Static Routes)

### 1. Clinical Assessments
* **Full IQ Test (`/test`):** Comprehensive 24-item clinical exam (20-minute countdown timer, balanced across all 4 CHC domains).
* **Quick Screening (`/quick-test`):** Fast 12-item adaptive screening test (10-minute countdown timer).
* **Cognitive Practice Hub (`/practice`):** Untimed sandbox with step-by-step logic explanations and domain filters.
* **Domain Sub-Tests:** Dedicated landing assessments for `/fluid-reasoning-test`, `/spatial-reasoning-test`, `/quantitative-reasoning-test`, `/verbal-reasoning-test`, and `/matrix-reasoning-test`.

### 2. Neurocognitive Brain Training Games (`/games`)
10 interactive, browser-native drills designed to build working memory, speed, and cognitive reserve:
* **Dual N-Back (`/games/n-back`):** Gold-standard working memory training paradigm (Jaeggi et al., 2008).
* **Memory Matrix (`/games/memory-matrix`):** Visuospatial pattern recall and working memory span.
* **Stroop Color Clash (`/games/stroop-clash`):** Selective attention and cognitive inhibition control (Stroop, 1935).
* **Flanker Direction Blitz (`/games/flanker-test`):** Perceptual conflict and directional response speed (Eriksen, 1974).
* **Speed Math Sprint (`/games/math-sprint`):** Rapid quantitative calculation and mental arithmetic.
* **3D Rotation Challenge (`/games/rotation`):** Spatial transformation speed and isometric comparison (Shepard & Metzler, 1971).
* **Sequence Rush (`/games/sequence-rush`):** Inductive series identification and fast logic completion.
* **Symbol Match Blitz (`/games/symbol-match`):** High-speed perceptual coding and symbol discrimination.
* **Syllogism Blitz (`/games/syllogism`):** Formal deductive propositional validity evaluation under pressure.
* **Digit Span Memory (`/games/digit-span`):** Forward and backward phonological memory loop capacity (Miller, 1956).

### 3. Statistical Reference & Educational Tools
* **Standardized Score Chart & Bell Curve (`/iq-score-chart`):** Interactive canvas rendering the Gaussian normal distribution, standard deviations ($\pm 1\sigma, 2\sigma, 3\sigma$), and population rarity.
* **2-Way Percentile Calculator (`/iq-percentile-calculator`):** Instant mathematical $z$-score to percentile conversion with visual bell-curve highlight.
* **IQ Classification Scale (`/iq-classification-scale`):** Authoritative comparison table aligning WAIS-IV, Stanford-Binet V, Cattell, and Woodcock-Johnson ranges.
* **Average IQ by Age & Cognitive Lifespan (`/average-iq-by-age`):** Fluid vs. crystallized intelligence trajectories across the lifespan and the Flynn Effect.
* **High-IQ Societies Guide (`/high-iq-societies`):** Entrance cutoffs, qualifying percentiles, and admission standards for Mensa (98th), Intertel (99th), Triple Nine Society (99.9th), and Mega Society (99.9999th).
* **Mensa Practice Test (`/mensa-iq-test-practice`):** Non-verbal high-ceiling practice assessment.
* **Psychometric Whitepaper (`/methodology`):** Full technical whitepaper detailing ICAR validation, 2PL IRT formulas, item parameters, and standard error of measurement ($SEM$).

### 4. User Profiles & Social Proof
* **Local-First Cognitive Profile (`/profile`):** Client-side private dashboard tracking test histories, composite scores, subscale radar charts, and game badges without requiring account creation.
* **Global Cognitive Leaderboard (`/leaderboard`):** Gamified percentile rankings with domain breakdowns.

---

## 🛠️ Technology Stack

* **Framework:** [Astro 5](https://astro.build) — Multi-Page Application (MPA), Static Site Generation (`output: 'static'`).
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com) — Minimalist monochrome design system (Apple Clean / Vercel Obsidian dark mode).
* **Language:** TypeScript 5.x — Strictly typed psychometric scoring and game state machines.
* **Vector Graphics:** Native SVG & Canvas API — Resolution-independent, responsive geometry without bloated asset payloads.
* **Edge Deployment:** [Cloudflare Pages](https://pages.cloudflare.com) — Unlimited bandwidth, global edge caching, HTTP/2, TLS 1.3.
* **SEO & Structured Data:** 18+ comprehensive JSON-LD schemas (`WebSite`, `Organization`, `FAQPage`, `Quiz`, `SoftwareApplication`, `Dataset`, `Article`).

---

## 💻 Local Development

### Prerequisites
* Node.js `>= 22.12.0`
* npm `>= 10.0.0`

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/moazzam-007/free-iq-exam.git
   cd free-iq-exam
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:4321](http://localhost:4321) in your browser.

4. **Compile production build:**
   ```bash
   npm run build
   ```

5. **Deploy to Cloudflare Pages:**
   ```bash
   npm run deploy
   ```

---

## 📁 Repository Structure

```text
freeiqexam/
├── public/
│   ├── _headers                  # Cloudflare security, CSP & noindex headers
│   ├── ads.txt                   # Google AdSense publisher verification
│   ├── favicon.svg               # Adaptive 3-dot cognitive mark favicon
│   ├── logo-mark.svg             # Primary standalone vector logo mark
│   ├── logo-horizontal.svg       # Horizontal wordmark lockup (light)
│   ├── logo-horizontal-dark.svg  # Horizontal wordmark lockup (dark)
│   └── robots.txt                # Search crawler configuration & sitemap pointer
├── src/
│   ├── components/
│   │   ├── Header.astro          # Sticky responsive header with 3-dot mark & flyouts
│   │   ├── Footer.astro          # Global footer with navigation columns & legal links
│   │   └── CategoryTestRunner.astro # Dynamic modular test engine for sub-domain tests
│   ├── data/
│   │   ├── item-bank.json        # 100-item psychometrically calibrated IRT question bank
│   │   └── questions.ts          # Core 24-item clinical exam question data
│   ├── layouts/
│   │   └── Layout.astro          # Root HTML layout, meta tags, OpenGraph & JSON-LD
│   ├── pages/
│   │   ├── index.astro           # Homepage with interactive sample engine & drill cards
│   │   ├── test.astro            # 24-item clinical assessment runner
│   │   ├── quick-test.astro      # 12-item screening assessment runner
│   │   ├── results.astro         # Real-time score report & percentile breakdown
│   │   ├── practice.astro        # Practice hub with logic explanations
│   │   ├── games.astro           # 10 cognitive drills directory hub
│   │   ├── games/                # Individual game applications
│   │   │   ├── digit-span.astro
│   │   │   ├── flanker-test.astro
│   │   │   ├── math-sprint.astro
│   │   │   ├── memory-matrix.astro
│   │   │   ├── n-back.astro
│   │   │   ├── rotation.astro
│   │   │   ├── sequence-rush.astro
│   │   │   ├── stroop-clash.astro
│   │   │   ├── syllogism.astro
│   │   │   └── symbol-match.astro
│   │   ├── fluid-reasoning-test.astro
│   │   ├── spatial-reasoning-test.astro
│   │   ├── quantitative-reasoning-test.astro
│   │   ├── verbal-reasoning-test.astro
│   │   ├── matrix-reasoning-test.astro
│   │   ├── iq-score-chart.astro
│   │   ├── iq-percentile-calculator.astro
│   │   ├── iq-classification-scale.astro
│   │   ├── average-iq-by-age.astro
│   │   ├── high-iq-societies.astro
│   │   ├── mensa-iq-test-practice.astro
│   │   ├── methodology.astro
│   │   ├── profile.astro
│   │   ├── leaderboard.astro
│   │   ├── blog.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── privacy.astro
│   │   └── terms.astro
│   ├── styles/
│   │   └── global.css            # Tailwind CSS v4 design tokens and theme rules
│   └── utils/
│       ├── irt.ts                # 2PL IRT latent trait scoring & Newton-Raphson estimation
│       └── scoring.ts            # Scoring utility functions & percentile calculations
├── astro.config.mjs              # Astro configuration with Tailwind & Sitemap integrations
└── package.json                  # Dependencies & Cloudflare deployment scripts
```

---

## 📄 License & Disclaimer

This project is licensed under the **MIT License**.

*Clinical Disclaimer:* FreeIQExam.com is an unproctored cognitive screening and educational tool intended for personal insight and intellectual practice. It does not replace comprehensive, in-person clinical neuropsychological evaluations administered by licensed psychologists (e.g., WAIS-IV, WISC-V, Stanford-Binet V).
