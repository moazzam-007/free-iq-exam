# FreeIQExam — Site Architecture & Technical SEO Specification (Step 2.1 QA Corrected)
## Information Architecture, Routing Blueprint, User Flows, Structured Data & Technical File Tree

---

## 1. Information Architecture & URL Routing Blueprint

```
freeiqexam.com (Apex Root Domain)
│
├── / (Homepage — Core 24-Item Assessment Tool + Authoritative Editorial Context)
│
├── [ STAGED SECONDARY TOOL ]
│   └── /quick-iq-test/ (Dedicated 10-Item Speeded Screener Tool — Staged in MVP, indexed post-baseline)
│
├── [ EDUCATIONAL, PRIVACY & INTENT-DISTINCT SILOS ]
│   ├── /free-iq-test-no-email/ (Distinct Editorial Guide: Testing Privacy & Paywall Scams + Fast Widget)
│   ├── /iq-score-chart/ (Classification Scale, Normal Curve Data, SD 15 vs SD 24)
│   ├── /iq-percentile-calculator/ (Interactive Reverse Conversion Tool)
│   ├── /mensa-iq-test-practice/ (High-IQ Society Benchmarks & Preparation Guide)
│   ├── /matrix-reasoning-test/ (Dedicated Abstract Pattern Induction Practice & Rules)
│   └── /average-iq-by-age/ (Developmental Cognitive Trajectory & Longitudinal Data)
│
├── [ AUTHORITY, TRUST & E-E-A-T CORE ]
│   ├── /methodology/ (Psychometric Technical Manual, CHC & 2PL IRT Formulas)
│   └── /about/ (Mission Statement, Editorial Standards, Author Bio)
│
└── [ MANDATORY COMPLIANCE & LEGAL PAGES ]
    ├── /contact/ (Direct Inquiries & Cloudflare Email Routing)
    ├── /privacy-policy/ (GDPR, CCPA, Cookie Disclosures, AdSense Ads, Zero-PII Policy)
    ├── /terms-of-service/ (Psychometric Disclaimers, Acceptable Use, IP Notice)
    └── /404/ (Custom Branded Error Page with Smart Navigation)
```

---

## 2. Exhaustive Page Specifications & Distinct Intent Mapping

* `[Established Evidence]`
* **Anti-Doorway Policy:** To comply with Google Search Essentials spam policies, no page on FreeIQExam is a keyword-swapped duplicate clone. Every URL answers a genuinely distinct user intent and offers unique editorial content.

```
+---------------------------------------------------------------------------------------------------------------------------------------------+
|                                                      EXACT URL SPECIFICATION MATRIX                                                         |
+------------------------------+---------------------------+-----------+--------------------+-------------------------------------------------+
| URL PATH                     | TARGET PRIMARY KEYWORD(S) | US VOLUME | INTENT TYPE        | SEO & DISTINCT CONTENT PURPOSE                  |
+------------------------------+---------------------------+-----------+--------------------+-------------------------------------------------+
| `/`                          | `iq test`, `free iq test`,| 309K–550K | Transactional /    | • Flagship assessment page                      |
|                              | `real iq test`            |           | Tool (Head Term)   | • Delivers 24-item core assessment above fold   |
|                              |                           |           |                    | • Proportional authoritative context below fold |
+------------------------------+---------------------------+-----------+--------------------+-------------------------------------------------+
| `/quick-iq-test/`            | `quick iq test`,          | 26K       | Transactional /    | • Standalone 10-item speeded screener           |
| (Staged in MVP)              | `10 minute iq test`       | (Cluster) | Time-Bound         | • Built in codebase, activated post-baseline    |
+------------------------------+---------------------------+-----------+--------------------+-------------------------------------------------+
| `/free-iq-test-no-email/`    | `free iq test no email`,  | 14K       | Informational /    | • Distinct consumer-protection guide breaking   |
|                              | `iq test no sign up`      | (Cluster) | Privacy Intent     |   down subscription traps and email spam scams  |
|                              |                           |           |                    | • Includes quick start embed to primary test    |
+------------------------------+---------------------------+-----------+--------------------+-------------------------------------------------+
| `/iq-score-chart/`           | `iq score chart`,         | 42K       | Informational /    | • Comprehensive score interpretation table      |
|                              | `what is a good iq score` | (Cluster) | Reference          | • Normal curve data & standard deviation guide  |
|                              |                           |           |                    | • Interactive SVG bell curve visualization      |
+------------------------------+---------------------------+-----------+--------------------+-------------------------------------------------+
| `/iq-percentile-calculator/` | `iq percentile calculator`| 18K       | Utility /          | • Client-side reverse calculation tool          |
|                              | `iq to percentile`        | (Cluster) | Calculational      | • Converts exact score to percentile & z-score  |
|                              |                           |           |                    | • Bridges searchers into test engagement        |
+------------------------------+---------------------------+-----------+--------------------+-------------------------------------------------+
| `/mensa-iq-test-practice/`   | `mensa iq test practice`, | 35K       | Educational /      | • Objective guide on high-IQ society cutoffs    |
|                              | `mensa practice test free`| (Cluster) | Benchmark Prep     | • Sample non-verbal logic problems with keys    |
|                              |                           |           |                    | • Clear nominative fair-use legal disclaimers   |
+------------------------------+---------------------------+-----------+--------------------+-------------------------------------------------+
| `/matrix-reasoning-test/`    | `matrix reasoning test`,  | 8K        | Educational /      | • In-depth explanation of Carpenter 5 rules     |
|                              | `abstract reasoning test` | (Cluster) | Skill Practice     | • 5 interactive walkthrough logic puzzles       |
+------------------------------+---------------------------+-----------+--------------------+-------------------------------------------------+
| `/average-iq-by-age/`        | `average iq by age`,      | 45K       | Informational /    | • Authoritative analysis of developmental Gf    |
|                              | `normal iq for 16 year old| (Cluster) | Demographic        | • Longitudinal age trajectory tables (16 to 75+)|
+------------------------------+---------------------------+-----------+--------------------+-------------------------------------------------+
| `/methodology/`              | `iq test methodology`,    | 2K        | High-Trust /       | • Full technical manual (CHC, 2PL IRT, SE)      |
|                              | `how is iq calculated`    |           | E-E-A-T Academic   | • Core trust anchor for Google Quality Raters   |
+------------------------------+---------------------------+-----------+--------------------+-------------------------------------------------+
| `/about/`                    | `about free iq exam`      | Nav       | E-E-A-T Anchor     | • Mission statement, author background, ethics  |
+------------------------------+---------------------------+-----------+--------------------+-------------------------------------------------+
| `/contact/`                  | `contact free iq exam`    | Nav       | Trust / Functional | • Inquiries form + verified email forwarding    |
+------------------------------+---------------------------+-----------+--------------------+-------------------------------------------------+
| `/privacy-policy/`           | `privacy policy`          | Legal     | Mandatory AdSense  | • GDPR, CCPA, zero personal data submission     |
+------------------------------+---------------------------+-----------+--------------------+-------------------------------------------------+
| `/terms-of-service/`         | `terms of service`        | Legal     | Mandatory AdSense  | • Psychometric disclaimers, liability, IP notice|
+------------------------------+---------------------------+-----------+--------------------+-------------------------------------------------+
| `/404/`                      | Custom 404                | System    | Navigation Recovery| • Guides lost users back to primary test        |
+------------------------------+---------------------------+-----------+--------------------+-------------------------------------------------+
```

---

## 3. End-to-End User Journeys & Flow Diagrams

### 3.1 Primary User Flow: First-Time Searcher (The Conversion Funnel)

```mermaid
graph TD
    A[Google Search: 'free iq test no email'] --> B[Landing on Homepage /]
    B --> C{Above the Fold}
    C -->|Reads Trust Badges| D[Hero Card: '100% Free • No Email • Instant Results • SD 15']
    D -->|Clicks 'Start Test'| E[Enter Interactive Test Island #main-interactive-tool]
    
    subgraph Speeded Power Test Execution
        E --> F[Q1: Easy Matrix Reasoning - Warming Up]
        F --> G[Progress Bar + 20-Min Countdown Timer]
        G --> H[Q2-Q23: Ascending Difficulty & Typologies]
        H --> I[Q24: High-Ceiling Boolean Matrix]
    end
    
    I -->|User Clicks 'Submit' OR Timer Expires| J[1.2-Sec Psychometric Computation Screen]
    J -->|Client-Side 2PL Solver| K[Results Dashboard: Score 118, 95% CI: 107-129]
    
    subgraph Post-Test Engagement & Exploration
        K --> L[View Interactive Bell Curve]
        K --> M[Inspect Descriptive Domain Strengths]
        K --> N[Read Educational Content Below Fold]
        K --> O[Click 'Compare on IQ Score Chart']
        O --> P[/iq-score-chart/ Page View]
    end
```

---

## 4. Internal Linking Strategy & Contextual Distribution

* `[Strong Design Recommendation]`

### 4.1 Hub-and-Spoke Silo Architecture
1. **The Apex Hub (`/`):** The homepage is the primary ranking target. Every supporting content page links back to `/` using diverse, contextual anchor texts (e.g., *"take the official fluid intelligence test"*, *"free online cognitive assessment"*, *"measure your fluid reasoning score"*).
2. **Horizontal Silo Linking:**
   * `/iq-score-chart/` contextually links to `/iq-percentile-calculator/` and `/mensa-iq-test-practice/`.
   * `/free-iq-test-no-email/` points directly to the core test widget with transparency messaging.
3. **Cross-Linking Best Practice:** External sister site cross-linking should be natural, contextually relevant, and gradual rather than deploying automated sitewide footer blocks.

---

## 5. Structured Data & Schema.org Blueprint

* `[Established Evidence]`
* Structured data is deployed to accurately describe visible page content to search engine crawlers:

### 5.1 Homepage (`/`): WebApplication Schema (Zero Fabricated Ratings)
* **Crucial Rule:** We strictly **exclude fabricated `AggregateRating` data**. Only genuine properties are included:
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "FreeIQExam — Free Online IQ Test",
  "url": "https://freeiqexam.com/",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "A 100% free, non-verbal online cognitive assessment measuring fluid reasoning and visual-spatial abilities. Instant on-screen results with no email required."
}
```

### 5.2 Content & Tool Pages: FAQPage Schema
* Deployed strictly on pages where the visible text presents helpful, authentic questions and answers:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is this IQ test really free without an email or payment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. FreeIQExam.com calculates and displays your score directly on-screen immediately upon test submission. We do not require an email address, user registration, credit card details, or paywalls."
      }
    },
    {
      "@type": "Question",
      "name": "What theoretical model does this assessment use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This assessment is grounded in the Cattell-Horn-Carroll (CHC) theory of cognitive abilities, focusing on Fluid Reasoning (Gf) and Visual Processing (Gv) using rule-governed visual matrix induction and 3D mental rotation tasks."
      }
    }
  ]
}
```

---

## 6. Technical File Tree & Astro.js Codebase Architecture

* `[Strong Design Recommendation]`

```
freeiqexam.com/
├── public/
│   ├── _headers                    # Staging duplicate prevention (to be verified on deploy)
│   ├── robots.txt                  # Directs crawlers to XML sitemap index
│   ├── sitemap-index.xml           # Generated automatically via @astrojs/sitemap
│   ├── ads.txt                     # Google AdSense publisher verification
│   ├── favicon.ico                 # Multi-res favicon suite (16x16, 32x32)
│   └── site.webmanifest            # Android / PWA mobile manifest
│
├── src/
│   ├── components/
│   │   ├── Header.astro            # Global header with dark/light mode toggle
│   │   ├── Footer.astro            # Global footer with legal links & disclaimers
│   │   ├── BellCurve.astro         # Dynamic SVG normal distribution curve
│   │   ├── FaqAccordion.astro      # Collapsible FAQ component with schema
│   │   ├── ScoreTable.astro        # Standardized deviation IQ classification table
│   │   └── TestRunner/             # Interactive Astro Client Island
│   │       ├── TestRunner.astro    # Container wrapper (#main-interactive-tool)
│   │       ├── QuestionDisplay.tsx # Reactive question renderer (React/Preact/Vanilla)
│   │       ├── OptionGrid.tsx      # 6–8 choice button matrix with keyboard listeners
│   │       ├── TimerBar.tsx        # 20-minute countdown with warning states
│   │       └── ResultsView.tsx     # Post-submission dashboard & domain breakdown
│   │
│   ├── data/
│   │   ├── items.ts                # Master 24-item provisional parameter seed dataset
│   │   ├── quickItems.ts           # 10-item quick screener parameter dataset (staged)
│   │   └── faqs.ts                 # Centralized FAQ questions & structured answers
│   │
│   ├── layouts/
│   │   ├── Layout.astro            # Global base HTML shell (SEO meta, fonts, GA4)
│   │   └── LegalLayout.astro       # Clean typography layout for terms & privacy
│   │
│   ├── lib/
│   │   ├── irtEngine.ts            # Client-side 2PL Newton-Raphson trait solver
│   │   ├── norming.ts              # Percentile, conditional SE, and CI calculator
│   │   └── telemetry.ts            # Anonymous timing helper
│   │
│   ├── pages/
│   │   ├── index.astro             # Homepage (Flagship 24-Item Exam)
│   │   ├── quick-iq-test.astro     # Staged 10-Item Screener Page
│   │   ├── free-iq-test-no-email.astro # Distinct Privacy Guide & Screener Page
│   │   ├── iq-score-chart.astro    # Score Classification Table & Bell Curve
│   │   ├── iq-percentile-calculator.astro # Reverse Percentile Utility Tool
│   │   ├── mensa-iq-test-practice.astro # Mensa Prep Guide & Benchmark Rules
│   │   ├── matrix-reasoning-test.astro  # Pattern Induction Educational Silo
│   │   ├── average-iq-by-age.astro # Demographic Age Norms Analysis
│   │   ├── methodology.astro       # Full Psychometric Technical Manual
│   │   ├── about.astro             # About Us & Editorial Standards
│   │   ├── contact.astro           # Contact Form & Cloudflare Email Forwarding
│   │   ├── privacy-policy.astro    # Privacy & Cookie Disclosures
│   │   ├── terms-of-service.astro  # Psychometric Disclaimers & IP Protection
│   │   └── 404.astro               # Custom 404 Error Page
│   │
│   └── styles/
│       └── global.css              # Tailwind CSS 4 directives & semantic tokens
│
├── astro.config.mjs                # Astro configuration (@astrojs/sitemap, tailwind)
├── package.json                    # Dependencies and build/deploy scripts
├── tsconfig.json                   # Strict TypeScript compiler options
└── wrangler.toml                   # Cloudflare Pages deployment configuration
```

---

## 7. Edge Deployment & Production Headers (`public/_headers`)

* `[Strong Design Recommendation]`
* To ensure only the canonical custom domain is indexed, staging URLs are protected via headers (to be empirically verified upon production deployment):
```http
# public/_headers
https://*.pages.dev/*
  X-Robots-Tag: noindex, nofollow

/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
```

---

## 8. Summary of Labeled Architecture Decisions

```
+---------------------------------------------------------------------------------------------------------------+
|                                    SITE ARCHITECTURE SPECIFICATION DECISION LOG                               |
+-------------------------------------------------------------+-------------------------------------------------+
| DECISION ITEM                                               | EVIDENCE TIER                                   |
+-------------------------------------------------------------+-------------------------------------------------+
| 14-page distinct intent architecture & URL routing          | [Strong Design Recommendation] (SEO Silos)      |
| Strict anti-doorway distinct utility per URL                | [Established Evidence] (Google Spam Policies)   |
| Zero fabricated AggregateRating in structured data schema   | [Established Evidence] (Google Guidelines)      |
| Static Astro.js Multi-Page Application (Zero-JS default)    | [Established Evidence] (CWV / Lighthouse 100)   |
| Cloudflare Pages Edge CDN hosting with $0/month cost        | [Established Evidence] (Hosting economics)      |
| Canonical 301 redirect rule consolidating www to apex root  | [Established Evidence] (PageRank consolidation) |
| public/_headers X-Robots-Tag: noindex on *.pages.dev        | [Strong Design Recommendation] (Staging Guard)  |
| Proportional, intent-aligned helpful editorial content      | [Established Evidence] (AdSense quality policy) |
| JSON-LD FAQPage on visible authentic Q&A sections           | [Established Evidence] (Search semantics)       |
| Staged rollout of /quick-iq-test/ post-primary stabilization| [Strong Design Recommendation] (Scope control)  |
+-------------------------------------------------------------+-------------------------------------------------+
```
